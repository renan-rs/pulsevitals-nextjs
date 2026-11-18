'use client';

import { motion } from 'framer-motion';
import { UrlInputForm } from './UrlInputForm';
import { useState } from 'react';

export function Hero() {
    const [isLoading, setIsLoading] = useState(false);

    const handleAuditSubmit = async (url: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erro ao auditar');

            console.log('Auditoria realizada com sucesso:', data);
            // Na Fase 3 redirecionaremos ou exibiremos o resultado no Dashboard
            alert(`Auditoria concluída! ID: ${data.id} - Performance: ${data.performanceScore}`);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Erro desconhecido';
            alert(`Erro: ${message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden bg-cyber-bg text-slate-100">
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyber-magenta/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-border bg-cyber-surface/80 text-cyber-cyan text-xs font-mono mb-2 shadow-neon-cyan"
                >
                    <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                    PulseVitals Engine v1.0 • Next.js & PostgreSQL
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
                >
                    Auditoria Web de Alta Precisão para <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta">Performance & SEO</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-sans"
                >
                    Analise Core Web Vitals, acessibilidade (a11y) e boas práticas em segundos com relatórios visuais de nível corporativo.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="pt-4"
                >
                    <UrlInputForm onSubmit={handleAuditSubmit} isLoading={isLoading} />
                </motion.div>
            </div>
        </section>
    );
}