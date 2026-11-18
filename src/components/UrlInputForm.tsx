'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, Globe } from 'lucide-react';

interface UrlInputFormProps {
    onSubmit: (url: string) => void;
    isLoading: boolean;
}

export function UrlInputForm({ onSubmit, isLoading }: UrlInputFormProps) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) {
            setError('Por favor, insira uma URL.');
            return;
        }
        setError('');
        onSubmit(url.trim());
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex items-center bg-cyber-surface border border-cyber-border rounded-xl p-2 shadow-2xl hover:border-cyber-cyan/50 transition-colors focus-within:border-cyber-cyan focus-within:shadow-neon-cyan"
            >
                <div className="pl-3 text-slate-400">
                    <Globe className="w-5 h-5 text-cyber-cyan" />
                </div>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) setError('');
                    }}
                    placeholder="Insira a URL (ex: meudominio.com)"
                    className="w-full bg-transparent px-4 py-3 text-slate-100 placeholder-slate-50undas focus:outline-none text-sm md:text-base font-mono"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-cyber-cyan text-cyber-bg font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition-all shadow-neon-cyan disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base cursor-pointer"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Auditando...
                        </>
                    ) : (
                        <>
                            <Search className="w-5 h-5" />
                            Auditar
                        </>
                    )}
                </button>
            </motion.form>
            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-cyber-magenta text-xs mt-2 ml-2 font-mono"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}