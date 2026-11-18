'use client';

import { BeforeAfterCode } from './BeforeAfterCode';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

interface A11yItem {
    id: string;
    title: string;
    description: string;
    badSnippet: string;
    goodSnippet: string;
}

interface AccessibilityAuditProps {
    items: A11yItem[];
}

export function AccessibilityAudit({ items }: AccessibilityAuditProps) {
    if (!items || items.length === 0) {
        return (
            <div className="bg-cyber-surface border border-cyber-border rounded-xl p-6 text-center text-slate-400 font-mono text-sm">
                <CheckCircle2 className="w-8 h-8 text-cyber-neonGreen mx-auto mb-2" />
                Nenhum problema crítico de acessibilidade detectado nesta auditoria!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-cyber-magenta" /> Diagnóstico de Acessibilidade (a11y) & Correções
            </h3>

            <div className="grid grid-cols-1 gap-4">
                {items.map((item) => (
                    <BeforeAfterCode
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        badSnippet={item.badSnippet}
                        goodSnippet={item.goodSnippet}
                    />
                ))}
            </div>
        </div>
    );
}