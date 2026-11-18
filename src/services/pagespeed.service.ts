import { ParsedAuditResult } from "@/types/audit";
import { parsePageSpeedResponse } from "./pagespeed.parser";

const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export async function runPageSpeedAudit(
    targetUrl: string,
    strategy: 'mobile' | 'desktop' = 'mobile'
): Promise<ParsedAuditResult> {
    const params = new URLSearchParams({
        url: targetUrl,
        strategy,
    });

    // Adiciona as 4 categorias principais do Lighthouse
    ['performace', 'accessibility', 'seo', 'best-practices'].forEach((cat) => 
        params.append('category', cat)
    );

    // Chave opcional via .env (funciona sem chave para testes leves, 
    // mas com chave evita rate-limit)
    if(process.env.PAGESPEED_API_KEY){
        params.append('key', process.env.PAGESPEED_API_KEY);
    }

    const response = await fetch(`${PAGESPEED_API_URL}?${params.toString()}`, {
        method: 'GET',
        cache: 'no-store',
    });

    if(!response.ok){
        const errorBody = await response.json().catch(() => ({}));
        const message = errorBody?.error?.message || `PageSpeed API error: ${response.status}`;
        throw new Error(message);
    }

    const rawData = await response.json();
    return parsePageSpeedResponse(rawData);
}