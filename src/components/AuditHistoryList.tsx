'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

interface AuditItem {
    id: string;
    url: string;
    performanceScore: number;
    createdAt: string;
}

export function AuditHistoryList() {
    const [audits, setAudits] = useState<AuditItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAudits() {
            try {
                const response = await fetch('/api/audit'); // Endpoint GET que criamos na Fase 1
                const data = await response.json();
                if (response.ok) {
                    setAudits(data);
                }
            } catch (error) {
                console.error('Erro ao buscar histórico:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAudits();
    }, []);

    if (loading) {
        return (
            <div className="text-slate-400 font-mono text-sm py-4">
                Carregando histórico de auditorias...
            </div>
        );
    }

    if (audits.length === 0) {
        return (
            <div className="bg-cyber-surface border border-cyber-border rounded-xl p-6 text-center text-slate-400 font-mono text-sm">
                Nenhuma auditoria realizada ainda. Insira uma URL acima para começar!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <History className="w-5 h-5 text-cyber-cyan" /> Auditorias Recentes
            </h3>
            <div className="grid grid-cols-1 gap-3">
                {audits.map((audit) => {
                    const scorePercent = Math.round(audit.performanceScore * 100);
                    return (
                        <div
                            key={audit.id}
                            className="bg-cyber-surface border border-cyber-border rounded-xl p-4 flex items-center justify-between hover:border-cyber-cyan/50 transition-all"
                        >
                            <div className="space-y-1">
                                <span className="text-xs font-mono text-slate-500">
                                    {new Date(audit.createdAt).toLocaleDateString('pt-BR')} às{' '}
                                    {new Date(audit.createdAt).toLocaleTimeString('pt-BR')}
                                </span>
                                <p className="text-white font-mono font-medium text-sm md:text-base truncate max-w-md">
                                    {audit.url}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <span className="text-xs font-mono text-slate-400 block">Performance</span>
                                    <span className="font-mono font-bold text-cyber-cyan text-lg">
                                        {scorePercent}%
                                    </span>
                                </div>
                                <Link
                                    href={`/audit/${audit.id}`}
                                    className="p-2 rounded-lg bg-cyber-bg border border-cyber-border text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}