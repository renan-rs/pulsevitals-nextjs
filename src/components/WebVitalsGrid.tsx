'use client';

interface WebVitalsProps {
    lcp: number;
    cls: number;
    inp: number;
}

export function WebVitalsGrid({ lcp, cls, inp }: WebVitalsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* LCP */}
            <div className="bg-cyber-surface border border-cyber-border rounded-xl p-5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-slate-400">LCP (Largest Contentful Paint)</span>
                    <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                    {lcp ? `${lcp.toFixed(2)}s` : 'N/A'}
                </div>
                <p className="text-xs text-slate-500 mt-2">Mede o tempo de carregamento do conteúdo principal.</p>
            </div>

            {/* CLS */}
            <div className="bg-cyber-surface border border-cyber-border rounded-xl p-5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-slate-400">CLS (Cumulative Layout Shift)</span>
                    <span className="w-2 h-2 rounded-full bg-cyber-magenta animate-pulse" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                    {cls !== undefined ? cls.toFixed(3) : 'N/A'}
                </div>
                <p className="text-xs text-slate-500 mt-2">Mede a estabilidade visual da página durante o carregamento.</p>
            </div>

            {/* INP */}
            <div className="bg-cyber-surface border border-cyber-border rounded-xl p-5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-slate-400">INP (Interaction to Next Paint)</span>
                    <span className="w-2 h-2 rounded-full bg-cyber-neonGreen animate-pulse" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                    {inp ? `${Math.round(inp)}ms` : 'N/A'}
                </div>
                <p className="text-xs text-slate-500 mt-2">Mede a responsividade geral a interações do usuário.</p>
            </div>
        </div>
    );
}