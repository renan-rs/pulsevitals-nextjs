import { ScoreGauge } from '@/components/ScoreGauge';
import { WebVitalsGrid } from '@/components/WebVitalsGrid';
import Link from 'next/link';
import { ArrowLeft, Globe } from 'lucide-react';

interface AuditPageProps {
    params: {
        id: string;
    };
}

export default async function AuditReportPage({ params }: AuditPageProps) {
    const { id } = params;

    // Aqui faremos a busca real no banco via Prisma ou fetch na API na sequência
    // Exemplo estrutural para renderização do Dashboard:

    return (
        <main className="min-h-screen bg-cyber-bg text-slate-100 p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header com botão de voltar */}
                <div className="flex items-center justify-between border-b border-cyber-border pb-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyber-cyan transition-colors text-sm font-mono">
                        <ArrowLeft className="w-4 h-4" /> Voltar ao Início
                    </Link>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-surface border border-cyber-border text-xs font-mono text-cyber-cyan">
                        <Globe className="w-3.5 h-3.5" /> ID da Auditoria: {id}
                    </div>
                </div>

                {/* Título do Relatório */}
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Relatório de Desempenho</h1>
                    <p className="text-slate-400 text-sm mt-1 font-mono">Análise consolidada gerada pela engine do PulseVitals.</p>
                </div>

                {/* Grid de Scorecards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ScoreGauge score={0.95} label="Performance" />
                    <ScoreGauge score={0.90} label="Acessibilidade" />
                    <ScoreGauge score={1.00} label="Boas Práticas" />
                    <ScoreGauge score={0.92} label="SEO" />
                </div>

                {/* Seção Core Web Vitals */}
                <div className="space-y-4 pt-4">
                    <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyber-cyan" /> Core Web Vitals
                    </h2>
                    <WebVitalsGrid lcp={1.2} cls={0.01} inp={45} />
                </div>

            </div>
        </main>
    );
}