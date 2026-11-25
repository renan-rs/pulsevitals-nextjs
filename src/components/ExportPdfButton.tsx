'use client';

import { Printer } from 'lucide-react';

export function ExportPdfButton() {
    return (
        <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan hover:bg-cyber-cyan/20 transition-all print:hidden"
        >
            <Printer className="w-3.5 h-3.5" />
            Exportar PDF / Imprimir
        </button>
    );
}