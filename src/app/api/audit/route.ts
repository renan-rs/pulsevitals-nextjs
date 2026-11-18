import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { runPageSpeedAudit } from '@/services/pagespeed.service';
import { cleanUrl } from '@/utils/formatters';
import { Prisma } from '@prisma/client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const rawUrl = body?.url;
        const strategy = body?.strategy === 'desktop' ? 'desktop' : 'mobile';

        if (!rawUrl || typeof rawUrl !== 'string') {
            return NextResponse.json({ error: 'URL válida é obrigatória.' }, { status: 400 });
        }

        const formattedUrl = cleanUrl(rawUrl.trim());
        new URL(formattedUrl); // Valida formato da URL

        const auditResult = await runPageSpeedAudit(formattedUrl, strategy);

        const savedAudit = await prisma.audit.create({
            data: {
                url: auditResult.url,
                performanceScore: auditResult.performanceScore,
                accessibilityScore: auditResult.accessibilityScore,
                seoScore: auditResult.seoScore,
                bestPracticesScore: auditResult.bestPracticesScore,
                rawMetrics: {
                    coreWebVitals: auditResult.coreWebVitals,
                    accessibilityIssues: auditResult.accessibilityIssues,
                    strategy,
                } as unknown as Prisma.InputJsonValue, // <- Cast via 'unknown' primeiro
            },
        });

        return NextResponse.json(savedAudit, { status: 201 });
    } catch (error) {
        console.error('[POST /api/audit] Error:', error);
        const message = error instanceof Error ? error.message : 'Erro interno ao processar auditoria.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const recentAudits = await prisma.audit.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
        });

        return NextResponse.json(recentAudits, { status: 200 });
    } catch (error) {
        console.error('[GET /api/audit] Error:', error);
        return NextResponse.json({ error: 'Erro ao buscar histórico.' }, { status: 500 });
    }
}