-- CreateTable
CREATE TABLE "audits" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "performanceScore" INTEGER NOT NULL,
    "accessibilityScore" INTEGER NOT NULL,
    "seoScore" INTEGER NOT NULL,
    "bestPracticesScore" INTEGER NOT NULL,
    "rawMetrics" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "audits_url_idx" ON "audits"("url");
