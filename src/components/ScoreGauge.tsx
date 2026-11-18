'use client';

interface ScoreGaugeProps {
    score: number; // 0 a 100
    label: string;
}

export function ScoreGauge({score, label}: ScoreGaugeProps){
    // Normaliza o score de 0 a 100
    const normalizedScore = Math.round(score * 100);

    // Define a cor com base na nota do Lighthouse
    let colorClass = 'text-cyber-neonGreen border-cyber-neon/40 shadow-neon-green';
    if(normalizedScore < 50) {
        colorClass = 'text-cyber-magenta border-cyber-magenta/40 shadow-neon-magenta';
    } else if (normalizedScore < 90) {
        colorClass = 'text-yellow-400 border-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.3)]';
    }

    return (
        <div className="bg-cyber-surface border border-cyber-border rounded-xl p-6 flex flex-col items-center justify-center relative group hover:border-slate-500 transition-all">
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center font-mono text-2xl font-bold bg-cyber-bg ${colorClass}`}>
                {normalizedScore}
            </div>
            <span className="mt-4 text-sm font-mono text-slate-300 uppercase tracking-wider text-center">
                {label}
            </span>
        </div>
    );
}