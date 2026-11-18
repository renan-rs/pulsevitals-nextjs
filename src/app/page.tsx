import { Hero } from "@/components/Hero";
import { Terminal, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-cyber-bg text-slate-100 selection:bg-cyber-cyan selection:text-cyber-bg overflow-x-hidden">
      {/* Hero Section com o Input de URL */}
      <Hero />

      {/* Seção de Recursos / Features Cyberpunk */}
      <section className="relative py-20 px-4 max-w-6xl mx-auto border-t border-cyber-border/40">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Engenharia de Performance <span className="text-cyber-cyan font-mono">&</span> SEO
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Métricas precisas extraídas diretamente do Google PageSpeed Insights, transformadas em relatórios acionáveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-cyber-surface border border-cyber-border rounded-xl p-6 hover:border-cyber-cyan/50 transition-all duration-300 group hover:shadow-neon-cyan">
            <div className="w-12 h-12 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-mono">Core Web Vitals</h3>
            <p className="text-slate-400 text-sm">
              Análise profunda de LCP, INP e CLS com diagnósticos em tempo real para otimizar a experiência do usuário.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-cyber-surface border border-cyber-border rounded-xl p-6 hover:border-cyber-magenta/50 transition-all duration-300 group hover:shadow-neon-magenta">
            <div className="w-12 h-12 rounded-lg bg-cyber-magenta/10 border border-cyber-magenta/30 flex items-center justify-center text-cyber-magenta mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-mono">Auditoria de Acessibilidade</h3>
            <p className="text-slate-400 text-sm">
              Detecção automática de falhas de a11y com sugestões inteligentes de correção no formato "Antes e Depois".
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-cyber-surface border border-cyber-border rounded-xl p-6 hover:border-cyber-neonGreen/50 transition-all duration-300 group hover:shadow-neon-green">
            <div className="w-12 h-12 rounded-lg bg-cyber-neonGreen/10 border border-cyber-neonGreen/30 flex items-center justify-center text-cyber-neonGreen mb-4 group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-mono">Clean Architecture</h3>
            <p className="text-slate-400 text-sm">
              Backend robusto estruturado em serviços modulares, persistência com Prisma e total cobertura de testes TDD.
            </p>
          </div>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="py-8 text-center border-t border-cyber-border/20 text-slate-500 font-mono text-xs">
        &copy; 2026 PulseVitals Engine. Todos os direitos reservados.
      </footer>
    </main>
  );
}