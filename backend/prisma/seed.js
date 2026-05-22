// backend/prisma/seed.js
const { PrismaClient } = require('../generated/prisma');
 
const prisma = new PrismaClient();


async function main() {
  console.log('Seeding database...');

  // Create sample loan applications
  const loans = await Promise.all([
    prisma.loanApplication.create({
      data: {
        applicantName: 'Rahul Sharma',
        applicantEmail: 'rahul.sharma@email.com',
        applicantPhone: '9876543210',
        loanAmountRequested: 1200000,
        loanType: 'PERSONAL',
        status: 'UNDER_REVIEW',
        analysisStatus: 'COMPLETED',
        currentRiskScore: 82,
        recommendation: 'REJECT',
        officerId: 'OFFICER-001',
        branchCode: 'MUM-001',
      }
    }),
    prisma.loanApplication.create({
      data: {
        applicantName: 'Priya Patel',
        applicantEmail: 'priya.patel@email.com',
        applicantPhone: '9123456789',
        loanAmountRequested: 800000,
        loanType: 'HOME',
        status: 'APPROVED',
        analysisStatus: 'COMPLETED',
        currentRiskScore: 12,
        recommendation: 'APPROVE',
        officerId: 'OFFICER-001',
        branchCode: 'MUM-001',
      }
    }),
    prisma.loanApplication.create({
      data: {
        applicantName: 'Amit Verma',
        applicantEmail: 'amit.verma@email.com',
        applicantPhone: '9988776655',
        loanAmountRequested: 2500000,
        loanType: 'BUSINESS',
        status: 'PENDING',
        analysisStatus: 'NOT_STARTED',
        officerId: 'OFFICER-002',
        branchCode: 'DEL-003',
      }
    }),
  ]);

  // Create a fraud flag for the high-risk loan
  await prisma.fraudFlag.create({
    data: {
      loanApplicationId: loans[0].id,
      riskScore: 82,
      flaggedBy: 'AI_SYSTEM',
      reasons: ['FONT_INCONSISTENCY', 'INCOME_MISMATCH', 'EMPLOYER_GST_INVALID'],
    }
  });

  console.log(`✅ Seeded ${loans.length} loan applications`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());