import { motion } from "framer-motion";

const experiences = [
  {
    period: "2023 - Presente",
    title: "Desenvolvedor Fullstack / Criador de Soluções Digitais",
    company: "Autônomo – múltiplos clientes",
    description: [
      "Desenvolvimento de sites profissionais para TH Rastreamento, LETRAN – Leão Transporte, barbearia e outros pequenos negócios",
      "Criação de portfólios profissionais para filmmaker, advogado e arquiteto",
      "Digitalização de cardápios com criação de chatbots e assistentes virtuais",
      "Construção de sistemas administrativos simples para gerenciamento de serviços",
      "Implementação de soluções de IoT integradas com bots (ESP32 + Telegram)",
      "Documentação completa: requisitos, casos de uso, fluxos, regras de negócio e diagramas ER"
    ]
  },
  {
    period: "2022 - 2023",
    title: "Analista de Sistemas Jr",
    company: "Perfil direcionado para análise de sistemas",
    description: [
      "Coleta e análise de requisitos das áreas de negócio",
      "Documentação clara (casos de uso, fluxos, requisitos funcionais e não funcionais)",
      "Suporte e sustentação a sistemas internos (ERP, financeiro, logística)",
      "Prototipação de telas e elaboração de diagramas (DER, MER, BPMN)",
      "Apoio técnico em integrações, testes e validação de funcionalidades"
    ]
  }
];

export const Experience = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

        {/* Timeline Items */}
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center mb-16 last:mb-0`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 z-10" />

            {/* Content */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-16 md:pl-0`}>
              <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                <div className="text-primary font-semibold mb-2">{exp.period}</div>
                <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                <p className="text-muted-foreground mb-4 font-medium">{exp.company}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
