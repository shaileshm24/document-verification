// backend/src/routes/loans.js
const express = require('express');
const prisma = require('../lib/prisma');
const { z } = require('zod');

const router = express.Router();


// Validation schema
const createLoanSchema = z.object({
  applicantName: z.string().min(2),
  applicantEmail: z.string().email().optional(),
  applicantPhone: z.string().min(10),
  loanAmountRequested: z.number().positive(),
  loanType: z.enum(['PERSONAL', 'HOME', 'VEHICLE', 'BUSINESS', 'EDUCATION', 'GOLD']).default('PERSONAL'),
  branchCode: z.string().optional(),
});

// POST /api/loans — create a new loan application
router.post('/', async (req, res) => {
  try {
    const data = createLoanSchema.parse(req.body);
    const officerId = req.headers['x-officer-id'] || 'system';

    const loan = await prisma.loanApplication.create({
      data: {
        ...data,
        officerId,
        status: 'PENDING',
        analysisStatus: 'NOT_STARTED',
      }
    });

    res.status(201).json(loan);
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
});

// GET /api/loans — list all loan applications
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = status ? { status } : {};

    const [loans, total] = await Promise.all([
      prisma.loanApplication.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        include: {
          fraudFlags: { select: { id: true, riskScore: true } },
          _count: { select: { documents: true } }
        }
      }),
      prisma.loanApplication.count({ where })
    ]);

    res.json({ loans, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/loans/:id — get single loan
router.get('/:id', async (req, res) => {
  try {
    const loan = await prisma.loanApplication.findUnique({
      where: { id: req.params.id },
      include: {
        documents: true,
        analysis: { orderBy: { analyzedAt: 'desc' }, take: 1 },
        fraudFlags: true,
        decision: true,
      }
    });

    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/loans/:id/decision — officer approves or rejects
router.post('/:id/decision', async (req, res) => {
  try {
    const { decision, reason, overrideReason } = req.body;
    const officerId = req.headers['x-officer-id'] || 'system';

    if (!['APPROVED', 'REJECTED', 'ESCALATED'].includes(decision)) {
      return res.status(400).json({ error: 'Invalid decision value' });
    }

    const [loanDecision] = await Promise.all([
      prisma.loanDecision.upsert({
        where: { loanApplicationId: req.params.id },
        create: { loanApplicationId: req.params.id, officerId, decision, reason, overrideReason },
        update: { officerId, decision, reason, overrideReason, decidedAt: new Date() }
      }),
      prisma.loanApplication.update({
        where: { id: req.params.id },
        data: { status: decision === 'ESCALATED' ? 'UNDER_REVIEW' : decision }
      })
    ]);

    // Emit real-time update
    const io = req.app.get('io');
    io.to(`loan:${req.params.id}`).emit('decision:made', { loanId: req.params.id, decision });

    res.json(loanDecision);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;