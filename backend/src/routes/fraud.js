// backend/src/routes/fraud.js
const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();


// GET /api/fraud/flags — all fraud-flagged applications
router.get('/flags', async (req, res) => {
  try {
    const { resolved, page = 1, limit = 20 } = req.query;
    const where = resolved !== undefined ? { resolved: resolved === 'true' } : {};

    const [flags, total] = await Promise.all([
      prisma.fraudFlag.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        include: {
          loanApplication: {
            select: {
              id: true,
              applicationNumber: true,
              applicantName: true,
              loanAmountRequested: true,
              loanType: true,
              status: true,
            }
          }
        }
      }),
      prisma.fraudFlag.count({ where })
    ]);

    res.json({ flags, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/fraud/flags/:id/resolve — mark a flag as resolved
router.patch('/flags/:id/resolve', async (req, res) => {
  try {
    const officerId = req.headers['x-officer-id'] || 'system';

    const flag = await prisma.fraudFlag.update({
      where: { id: req.params.id },
      data: { resolved: true, resolvedBy: officerId, resolvedAt: new Date() }
    });

    res.json(flag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/fraud/summary — fraud stats summary
router.get('/summary', async (req, res) => {
  try {
    const [total, unresolved, highRisk, autoReported] = await Promise.all([
      prisma.fraudFlag.count(),
      prisma.fraudFlag.count({ where: { resolved: false } }),
      prisma.fraudFlag.count({ where: { riskScore: { gte: 70 } } }),
      prisma.complianceReport.count({ where: { reportType: 'RBI_FIU_AUTO' } }),
    ]);

    res.json({ total, unresolved, highRisk, autoReported });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;