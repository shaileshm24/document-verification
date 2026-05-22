-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('PERSONAL', 'HOME', 'VEHICLE', 'BUSINESS', 'EDUCATION', 'GOLD');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'DISBURSED', 'CLOSED');

-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('NOT_STARTED', 'QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('AADHAAR', 'PAN', 'ITR', 'EMPLOYMENT_LETTER', 'SALARY_SLIP', 'BANK_STATEMENT', 'FORM_16', 'PROPERTY_DOCS');

-- CreateTable
CREATE TABLE "LoanApplication" (
    "id" TEXT NOT NULL,
    "applicationNumber" TEXT NOT NULL,
    "applicantName" TEXT NOT NULL,
    "applicantEmail" TEXT,
    "applicantPhone" TEXT NOT NULL,
    "loanAmountRequested" DOUBLE PRECISION NOT NULL,
    "loanType" "LoanType" NOT NULL DEFAULT 'PERSONAL',
    "status" "LoanStatus" NOT NULL DEFAULT 'PENDING',
    "analysisStatus" "AnalysisStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "analysisStartedAt" TIMESTAMP(3),
    "analysisCompletedAt" TIMESTAMP(3),
    "analysisError" TEXT,
    "documentsUploadedAt" TIMESTAMP(3),
    "currentRiskScore" INTEGER,
    "recommendation" TEXT,
    "officerId" TEXT,
    "branchCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "loanApplicationId" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "s3Key" TEXT NOT NULL,
    "s3Url" TEXT NOT NULL,
    "originalFilename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "analysisStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentAnalysis" (
    "id" TEXT NOT NULL,
    "loanApplicationId" TEXT NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "recommendation" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "processingTimeMs" INTEGER NOT NULL,
    "documentsResult" JSONB NOT NULL,
    "crossChecks" JSONB NOT NULL,
    "riskFactors" JSONB NOT NULL,
    "analyzedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudFlag" (
    "id" TEXT NOT NULL,
    "loanApplicationId" TEXT NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "flaggedBy" TEXT NOT NULL,
    "reasons" TEXT[],
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedBy" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FraudFlag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanDecision" (
    "id" TEXT NOT NULL,
    "loanApplicationId" TEXT NOT NULL,
    "officerId" TEXT NOT NULL,
    "decision" TEXT NOT NULL,
    "reason" TEXT,
    "overrideReason" TEXT,
    "decidedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceReport" (
    "id" TEXT NOT NULL,
    "loanApplicationId" TEXT NOT NULL,
    "reportType" TEXT NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "reportedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "referenceNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComplianceReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoanApplication_applicationNumber_key" ON "LoanApplication"("applicationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "LoanDecision_loanApplicationId_key" ON "LoanDecision"("loanApplicationId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_loanApplicationId_fkey" FOREIGN KEY ("loanApplicationId") REFERENCES "LoanApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentAnalysis" ADD CONSTRAINT "DocumentAnalysis_loanApplicationId_fkey" FOREIGN KEY ("loanApplicationId") REFERENCES "LoanApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FraudFlag" ADD CONSTRAINT "FraudFlag_loanApplicationId_fkey" FOREIGN KEY ("loanApplicationId") REFERENCES "LoanApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanDecision" ADD CONSTRAINT "LoanDecision_loanApplicationId_fkey" FOREIGN KEY ("loanApplicationId") REFERENCES "LoanApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceReport" ADD CONSTRAINT "ComplianceReport_loanApplicationId_fkey" FOREIGN KEY ("loanApplicationId") REFERENCES "LoanApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
