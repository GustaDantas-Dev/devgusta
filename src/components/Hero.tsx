import { Rocket, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="sobre" className="min-h-screen flex items-center pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Desenvolvendo{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                soluções digitais
              </span>{" "}
              que unem código e criatividade
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Sou <strong className="text-foreground">Gustavo Lima Dantas</strong>, desenvolvedor Full-Stack e especialista em IoT. 
              Combino habilidades técnicas avançadas com visão criativa para criar experiências digitais inovadoras.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow-lg transition-all duration-300 gap-2"
                onClick={() => scrollToSection("portfolio")}
              >
                <Rocket className="h-5 w-5" />
                Ver Portfólio
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted gap-2"
                onClick={() => scrollToSection("contato")}
              >
                <Send className="h-5 w-5" />
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
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-primary p-2 shadow-glow animate-float">
                <img
                  src="https://i.postimg.cc/jd268BTn/Screenshot-20251117-083135.jpg"
                  alt="Gustavo Lima Dantas - Desenvolvedor Full-Stack"
                  className="w-full h-full object-cover rounded-full"
                  loading="eager"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
