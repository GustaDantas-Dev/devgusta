import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "@/assets/profile.jpg";

const titles = [
  "Desenvolvedor Full-Stack",
  "Especialista em IoT",
  "Criador de Soluções Digitais",
  "Analista de Sistemas",
];

export const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const title = titles[currentTitle];

    if (isTyping) {
      if (displayedText.length < title.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(title.slice(0, displayedText.length + 1));
        }, 60);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentTitle((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentTitle]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="sobre" className="min-h-screen flex items-center pt-32 sm:pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 order-2 lg:order-1"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-card-foreground">
              Gustavo
              <br />
              <span className="text-primary text-glow">Dantas</span>
            </h1>

            {/* Typing effect */}
            <div className="font-mono text-lg md:text-xl text-secondary mb-6 h-8 flex items-center">
              <span className="text-muted-foreground mr-2">&gt;</span>
              <span>{displayedText}</span>
              <span className="animate-pulse text-primary ml-0.5">█</span>
            </div>

            <p className="text-muted-foreground mb-4 max-w-xl font-mono text-sm leading-relaxed">
              Desenvolvedor Full Stack focado em sistemas administrativos, automação
              e soluções IoT para pequenas e médias empresas. Experiência na criação
              de plataformas web, chatbots e integrações que reduzem processos manuais
              e aumentam eficiência operacional.
            </p>

            {/* Status badges */}
            <div className="flex flex-wrap gap-3 mb-8 font-mono text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-primary/20 bg-primary/5 text-primary">
                <Search className="w-3 h-3" />
                À procura de estágio em desenvolvimento ou vaga de Desenvolvedor Jr
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border text-muted-foreground">
                <MapPin className="w-3 h-3" />
                Manaus, AM
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow transition-all duration-300 gap-2 font-mono text-sm"
                onClick={() => scrollToSection("portfolio")}
              >
                <Terminal className="h-4 w-4" />
                Ver Portfólio
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 gap-2 font-mono text-sm"
                onClick={() => scrollToSection("contato")}
              >
                Contato
              </Button>
            </div>
          </motion.div>

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-lg border-2 border-primary/30 p-1.5 shadow-glow animate-float overflow-hidden">
                <img
                  src="https://i.postimg.cc/jd268BTn/Screenshot-20251117-083135.jpg"
                  alt="Gustavo Dantas - Desenvolvedor Full-Stack"
                  className="w-full h-full object-cover rounded-md"
                  loading="eager"
                />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
