import { ScoreGauge } from '@/components/ScoreGauge';
import { WebVitalsGrid } from '@/components/WebVitalsGrid';
import { AccessibilityAudit } from '@/components/AccessibilityAudit';
import Link from 'next/link';
import { ArrowLeft, Globe } from 'lucide-react';
import { ExportPdfButton } from '@/components/ExportPdfButton';

interface AuditPageProps {
    params: {
        id: string;
    };
}

export default async function AuditReportPage({ params }: AuditPageProps) {
    const { id } = params;

    // Mock temporário de itens de a11y para validação visual (será substituído pelos dados reais do banco)
    const mockA11yItems = [
        {
            id: 'image-alt',
            title: 'Elementos de imagem sem atributos [alt]',
            description: 'Elementos de imagem devem ter texto alternativo explícito para que leitores de tela possam descrevê-los.',
            badSnippet: '<img src="/hero-cyber.png" />',
            goodSnippet: '<img src="/hero-cyber.png" alt="Ilustração abstrata em estilo cyberpunk com tons de ciano e magenta" />',
        },
        {
            id: 'color-contrast',
            title: 'Contraste de cores insuficiente',
            description: 'O contraste entre a cor do texto de segundo plano e o fundo está abaixo do limite recomendado pelo WCAG AA.',
            badSnippet: '<span class="text-slate-600 bg-slate-500">Texto de exemplo</span>',
            goodSnippet: '<span class="text-slate-100 bg-slate-900 font-medium">Texto de exemplo</span>',
        },
    ];

    return (
        <main className="min-h-screen bg-cyber-bg text-slate-100 p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header com botão de voltar e exportar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyber-border pb-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyber-cyan transition-colors text-sm font-mono print:hidden">
                        <ArrowLeft className="w-4 h-4" /> Voltar ao Início
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-surface border border-cyber-border text-xs font-mono text-cyber-cyan">
                            <Globe className="w-3.5 h-3.5" /> ID: {id}
                        </div>
                        <ExportPdfButton />
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
                    <ScoreGauge score={0.82} label="Acessibilidade" />
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

                {/* Seção de Acessibilidade & Insights */}
                <div className="space-y-4 pt-4">
                    <AccessibilityAudit items={mockA11yItems} />
                </div>

            </div>
        </main>
    );
}