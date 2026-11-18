import { AccessibilityIssue, ParsedAuditResult } from "@/types/audit";

const A11Y_AUDIT_KEYS = [
    'image-alt',
    'color-contrast',
    'button-name',
    'link-name',
    'html-has-lang',
    'label'
];

function generateFixSuggestion(auditId: string, snippetBefore?: string): string | undefined {
    if(!snippetBefore) return undefined;

    switch (auditId) {
        case 'image-alt':
            return snippetBefore.replace(/<img/i, '<img alt="Descrição clara e objetiva da imagem"');
        case 'button-name':
            return snippetBefore.replace(/<button/i, '<button aria-label="Ação do botão"');
        case 'link-name':
            return snippetBefore.replace(/<a/i, '<a aria-label="Destino do link"');
        case 'html-has-lang':
            return snippetBefore.replace(/<html/i, '<html lang="pt-BR"');
        case 'color-contrast':
            return `${snippetBefore} /* Aumente o contraste para no mínimo 4.5:1 (ex: text-slate-100 em fundo escuro) */`;
        default:
            return `<!-- Adicione atributos ARIA ou semântica HTML adequada -->\n${snippetBefore}`;
    }
}

export function parsePageSpeedResponse(rawData: Record<string, unknown>): ParsedAuditResult {
    const lh = (rawData?.lighthouseResult as Record<string, unknown>) ?? {};
    const categories = (lh.categories as Record<string, Record<string, number>>) ?? {};
    const audits = (lh.audits as Record<string, Record<string, unknown>>) ?? {};

    const toPercentage = (score?: number | null) => 
        typeof score === 'number' ? Math.round(score * 100) : 0;
    

    const accessibilityIssues: AccessibilityIssue[] = [];

    for (const key of A11Y_AUDIT_KEYS){
        const audit = audits[key];
        if(audit && typeof audit.score === 'number' && audit.score < 1){
            const details = audit.details as Record<string, unknown> | undefined;
            const items = details?.items as Array<Record<string, unknown>> | undefined;

            // Tenta pegar o snippet tant de node.snippet quanto diretamente de item.snippet
            const firstItem = items?.[0];
            const node = firstItem?.node as Record<string, unknown> | undefined;
            const firstItemSnippet = 
                (node?.snippet as string) || 
                (firstItem?.snippet as string) || 
                undefined;
            accessibilityIssues.push({
                id: (audit.id as string) || key,
                title: (audit.title as string) || key,
                description: (audit.description as string) || '',
                impact: audit.score === 0 ? 'critical' : 'serious',
                snippetBefore: firstItemSnippet,
                snippetAfter: generateFixSuggestion(key, firstItemSnippet),
            });
        }
    }

    return {
        url: (lh.finalUrl as string) || (rawData?.id as string) || '',
        performanceScore: toPercentage(categories.performance?.score),
        accessibilityScore: toPercentage(categories.accessibility?.score),
        seoScore: toPercentage(categories.seo?.score),
        bestPracticesScore: toPercentage(categories['best-practices']?.score),
        coreWebVitals: {
            lcp: {
                value: (audits['largest-contentful-paint']?.displayValue as string) || 'N/A',
                score: toPercentage(audits['largest-contentful-paint']?.score as number),
            },
            cls: {
                value: (audits['cumulative-layout-shift']?.displayValue as string) || 'N/A',
                score: toPercentage(audits['cumulative-layout-shift']?.score as number),
            },
            inp: {
                value:
                (audits['interaction-to-next-paint']?.displayValue as string) ||
                (audits['max-potential-fid']?.displayValue as string) || 
                'N/A',
                score: toPercentage(
                    (audits['interaction-to-next-paint']?.score as number) ?? 
                    (audits['max-potential-fid']?.score as number)
                ),
            },
        },
        accessibilityIssues,
    };
}