// backend/src/routes/stats.js
const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();


// GET /api/stats/dashboard — all metrics for the React dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalLoans,
      todayLoans,
      pendingAnalysis,
      completedToday,
      fraudFlagged,
      approved,
      rejected,
      avgRiskScore,
      recentLoans,
    ] = await Promise.all([
      prisma.loanApplication.count(),
      prisma.loanApplication.count({ where: { createdAt: { gte: today } } }),
      prisma.loanApplication.count({ where: { analysisStatus: { in: ['QUEUED', 'PROCESSING'] } } }),
      prisma.loanApplication.count({ where: { analysisStatus: 'COMPLETED', analysisCompletedAt: { gte: today } } }),
      prisma.fraudFlag.count({ where: { resolved: false } }),
      prisma.loanApplication.count({ where: { status: 'APPROVED' } }),
      prisma.loanApplication.count({ where: { status: 'REJECTED' } }),
      prisma.loanApplication.aggregate({ _avg: { currentRiskScore: true } }),
      prisma.loanApplication.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          applicationNumber: true,
          applicantName: true,
          loanAmountRequested: true,
          loanType: true,
          analysisStatus: true,
          currentRiskScore: true,
          recommendation: true,
          status: true,
          createdAt: true,
        }
      }),
    ]);

    res.json({
      totals: { totalLoans, todayLoans, pendingAnalysis, completedToday, fraudFlagged, approved, rejected },
      avgRiskScore: Math.round(avgRiskScore._avg.currentRiskScore || 0),
      recentLoans,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;