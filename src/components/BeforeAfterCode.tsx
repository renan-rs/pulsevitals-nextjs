'use client';

import { useState } from 'react';
import { Code, CheckCircle, AlertTriangle } from 'lucide-react';

interface BeforeAfterCodeProps {
    title: string;
    description: string;
    badSnippet: string;
    goodSnippet: string;
}

export function BeforeAfterCode({ title, description, badSnippet, goodSnippet }: BeforeAfterCodeProps) {
    const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

    return (
        <div className="bg-cyber-surface border border-cyber-border rounded-xl p-5 space-y-4 hover:border-cyber-magenta/40 transition-all">
            {/* Cabeçalho do Card */}
            <div className="flex items-start justify-between">
                <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyber-magenta bg-cyber-magenta/10 border border-cyber-magenta/30 px-2 py-0.5 rounded-full">
                        Acessibilidade (a11y)
                    </span>
                    <h4 className="font-mono font-bold text-white text-base mt-2">
                        {title}
                    </h4>
                </div>
            </div>

            <p className="text-slate-400 text-sm">{description}</p>

            {/* Abas de Alternância: Antes vs Depois */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 border-b border-cyber-border pb-2">
                    <button
                        onClick={() => setActiveTab('before')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${activeTab === 'before'
                                ? 'bg-cyber-magenta/20 border border-cyber-magenta/50 text-cyber-magenta shadow-[0_0_10px_rgba(255,0,127,0.2)]'
                                : 'text-slate-400 hover:text-white bg-cyber-bg'
                            }`}
                    >
                        <AlertTriangle className="w-3.5 h-3.5" /> Antes (Incorreto)
                    </button>

                    <button
                        onClick={() => setActiveTab('after')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${activeTab === 'after'
                                ? 'bg-cyber-neonGreen/20 border border-cyber-neonGreen/50 text-cyber-neonGreen shadow-[0_0_10px_rgba(0,255,102,0.2)]'
                                : 'text-slate-400 hover:text-white bg-cyber-bg'
                            }`}
                    >
                        <CheckCircle className="w-3.5 h-3.5" /> Depois (Correção Sugerida)
                    </button>
                </div>

                {/* Bloco de Código Dinâmico */}
                <div className="bg-cyber-bg border border-cyber-border rounded-lg p-4 font-mono text-xs overflow-x-auto">
                    {activeTab === 'before' ? (
                        <div className="space-y-2">
                            <div className="text-cyber-magenta text-[10px] uppercase flex items-center gap-1">
                                <Code className="w-3 h-3" /> Código original com falha:
                            </div>
                            <pre className="text-cyber-magenta whitespace-pre-wrap">{badSnippet}</pre>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="text-cyber-neonGreen text-[10px] uppercase flex items-center gap-1">
                                <Code className="w-3 h-3" /> Código corrigido (Recomendado):
                            </div>
                            <pre className="text-cyber-neonGreen whitespace-pre-wrap">{goodSnippet}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}