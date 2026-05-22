// backend/src/workers/documentWorker.js
// Bull queue worker — processes document analysis jobs asynchronously
// This keeps the API non-blocking; React gets real-time updates via Socket.io

const Bull = require('bull');
const { analyzeAllDocuments } = require('../services/documentAnalysisService');
const prisma = require('../lib/prisma');



const REDIS_CONFIG = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD
};

// Create queues
const documentQueue = new Bull('document-analysis', { redis: REDIS_CONFIG });
const notificationQueue = new Bull('notifications', { redis: REDIS_CONFIG });

function setupWorkers(io) {
  // ─── DOCUMENT ANALYSIS WORKER ───────────────────────────
  documentQueue.process('analyze', 3, async (job) => {
    const { loanId, documentPaths, officerId } = job.data;
    console.log(`Processing loan ${loanId}...`);

    // Update status to PROCESSING
    await prisma.loanApplication.update({
      where: { id: loanId },
      data: { analysisStatus: 'PROCESSING', analysisStartedAt: new Date() }
    });

    // Emit real-time status update
    io.to(`loan:${loanId}`).emit('analysis:status', {
      loanId,
      status: 'PROCESSING',
      message: 'AI analysis started...',
      progress: 10
    });

    // Progress updates during long analysis
    const progressInterval = setInterval(() => {
      job.progress(job.progress() + 5);
      io.to(`loan:${loanId}`).emit('analysis:progress', {
        loanId,
        progress: Math.min(85, job.progress())
      });
    }, 3000);

    try {
      // Run the actual AI analysis
      const analysisResult = await analyzeAllDocuments(loanId, documentPaths);
      clearInterval(progressInterval);

      // Save results to DB
      const savedAnalysis = await prisma.documentAnalysis.create({
        data: {
          loanApplicationId: loanId,
          riskScore: analysisResult.riskAssessment.score,
          recommendation: analysisResult.riskAssessment.recommendation,
          riskLevel: analysisResult.riskAssessment.riskLevel,
          processingTimeMs: analysisResult.processingTimeMs,
          documentsResult: analysisResult.documents,
          crossChecks: analysisResult.crossChecks,
          riskFactors: analysisResult.riskAssessment.factors,
          analyzedAt: new Date(analysisResult.analyzedAt)
        }
      });

      // Update loan status
      await prisma.loanApplication.update({
        where: { id: loanId },
        data: {
          analysisStatus: 'COMPLETED',
          analysisCompletedAt: new Date(),
          currentRiskScore: analysisResult.riskAssessment.score,
          recommendation: analysisResult.riskAssessment.recommendation
        }
      });

      // Auto-flag high-risk applications
      if (analysisResult.riskAssessment.score >= 70) {
        await prisma.fraudFlag.create({
          data: {
            loanApplicationId: loanId,
            riskScore: analysisResult.riskAssessment.score,
            flaggedBy: 'AI_SYSTEM',
            reasons: analysisResult.riskAssessment.factors
              .filter(f => f.flags?.length > 0 || f.penalty)
              .map(f => f.check || f.flags?.join(', ') || 'Risk factor')
          }
        });

        // Auto-report to RBI FIU if score > 90
        if (analysisResult.riskAssessment.score >= 90) {
          await notificationQueue.add('rbi-report', {
            loanId,
            riskScore: analysisResult.riskAssessment.score,
            analysisId: savedAnalysis.id
          }, { delay: 5000 });
        }
      }

      // Emit final result via Socket.io
      io.to(`loan:${loanId}`).emit('analysis:complete', {
        loanId,
        status: 'COMPLETED',
        riskScore: analysisResult.riskAssessment.score,
        recommendation: analysisResult.riskAssessment.recommendation,
        riskLevel: analysisResult.riskAssessment.riskLevel,
        processingTimeMs: analysisResult.processingTimeMs,
        analysisId: savedAnalysis.id
      });

      // Notify all officers about high-risk applications
      if (analysisResult.riskAssessment.score >= 70) {
        io.emit('fraud:alert', {
          loanId,
          riskScore: analysisResult.riskAssessment.score,
          message: `High-risk application detected: Loan ${loanId}`
        });
      }

      return { success: true, analysisId: savedAnalysis.id };

    } catch (error) {
      clearInterval(progressInterval);
      console.error(`Analysis failed for loan ${loanId}:`, error);

      await prisma.loanApplication.update({
        where: { id: loanId },
        data: { analysisStatus: 'FAILED', analysisError: error.message }
      });

      io.to(`loan:${loanId}`).emit('analysis:error', {
        loanId,
        error: 'Analysis failed. Please retry or contact support.'
      });

      throw error;
    }
  });

  // ─── NOTIFICATION WORKER ────────────────────────────────
  notificationQueue.process('rbi-report', async (job) => {
    const { loanId, riskScore } = job.data;
    console.log(`Auto-reporting loan ${loanId} (score: ${riskScore}) to RBI FIU`);
    // In production: POST to RBI's GFIN API endpoint
    // For now, log and create audit record
    await prisma.complianceReport.create({
      data: {
        loanApplicationId: loanId,
        reportType: 'RBI_FIU_AUTO',
        riskScore,
        reportedAt: new Date(),
        status: 'SUBMITTED'
      }
    });
  });

  // Queue event handlers
  documentQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
  });

  documentQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed — analysisId: ${result.analysisId}`);
  });

  console.log('Bull queue workers initialized');
}

// Export queue for use in routes
async function enqueueDocumentAnalysis(loanId, documentPaths, officerId) {
  const job = await documentQueue.add('analyze', { loanId, documentPaths, officerId }, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: 50,
    removeOnFail: 20,
    priority: 1
  });
  return job.id;
}

module.exports = { setupWorkers, enqueueDocumentAnalysis };
