'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, ExternalLink } from 'lucide-react';

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
                const response = await fetch('/api/audit');
                const data = await response.json();

                if (response.ok) {
                    if (Array.isArray(data)) {
                        setAudits(data);
                    } else if (Array.isArray(data?.audits)) {
                        setAudits(data.audits);
                    } else {
                        setAudits([]);
                    }
                } else {
                    setAudits([]);
                }
            } catch (error) {
                console.error('Erro ao buscar histórico:', error);
                setAudits([]);
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

    const auditList = Array.isArray(audits) ? audits : [];

    if (auditList.length === 0) {
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
                {auditList.map((audit) => {
                    const rawScore = audit.performanceScore ?? 0;
                    const normalizedScore = rawScore <= 1 ? rawScore * 100 : rawScore;
                    const scorePercent = Math.min(100, Math.max(0, Math.round(normalizedScore)));
                    //const scorePercent = Math.round((audit.performanceScore ?? 0) * 100);
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