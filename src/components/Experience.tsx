import { motion } from "framer-motion";

const experiences = [
  {
    title: "Desenvolvedor Fullstack / Criador de Soluções Digitais",
    company: "Autônomo – múltiplos clientes",
    status: "ATUAL",
    description: [
      "Sites profissionais para TH Rastreamento, LETRAN, barbearia e PMEs",
      "Portfólios profissionais para filmmaker, advogado e arquiteto",
      "Cardápios digitais com chatbots e assistentes virtuais",
      "Sistemas administrativos para gerenciamento de serviços",
      "Soluções IoT integradas com bots (ESP32 + Telegram)",
      "Documentação completa: requisitos, casos de uso, fluxos e diagramas ER",
    ],
  },
  {
    title: "Analista de Sistemas Jr",
    company: "Perfil direcionado para análise de sistemas",
    status: "CONCLUÍDO",
    description: [
      "Coleta e análise de requisitos das áreas de negócio",
      "Documentação clara (casos de uso, fluxos, requisitos)",
      "Suporte e sustentação a sistemas internos (ERP, financeiro)",
      "Prototipação de telas e diagramas (DER, MER, BPMN)",
      "Apoio técnico em integrações, testes e validação",
    ],
  },
];

export const Experience = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="terminal-border rounded-lg bg-card/50 backdrop-blur overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-primary/10 bg-primary/5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-destructive/60" />
              <span className="w-3 h-3 rounded-full bg-accent/60" />
              <span className="w-3 h-3 rounded-full bg-primary/60" />
              <span className="font-mono text-xs text-muted-foreground ml-2">
                {exp.title.split(" / ")[0].toLowerCase().replace(/\s+/g, "_")}
              </span>
            </div>
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded ${
                exp.status === "ATUAL"
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "bg-muted text-muted-foreground border border-border"
              }`}
            >
              {exp.status}
            </span>
          </div>

          <div className="p-6">
            <h3 className="font-display text-xl font-bold text-card-foreground mb-1">
              {exp.title}
            </h3>
            <p className="font-mono text-sm text-muted-foreground mb-4">
              {exp.company}
            </p>

            <div className="space-y-1.5 font-mono text-sm">
              {exp.description.map((item, i) => (
                <div key={i} className="flex gap-2 text-muted-foreground">
                  <span className="text-primary shrink-0">→</span>
                  <span className="hover:text-card-foreground transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
