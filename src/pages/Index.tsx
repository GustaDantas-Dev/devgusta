import { ParticlesBackground } from "@/components/ParticlesBackground";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <Header />

      <main>
        <Hero />
        <Portfolio />

        <section id="contato" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="font-mono text-sm text-muted-foreground mb-3">
                <span className="text-primary">$</span> ./contato --open
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-card-foreground">
                Vamos <span className="text-primary text-glow">Conversar</span>?
              </h2>
              <p className="font-mono text-sm text-muted-foreground max-w-lg mx-auto">
                // Aberto a novos projetos e oportunidades
              </p>
            </div>
            <Contact />
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10 bg-background/80 backdrop-blur-lg py-6 mt-20">
        <div className="container mx-auto px-4 text-center font-mono text-xs text-muted-foreground">
          <p>
            <span className="text-primary">©</span> 2024 Gustavo Lima Dantas{" "}
            <span className="text-primary">|</span> Built with{" "}
            <span className="text-primary">{"<code />"}</span> and{" "}
            <span className="text-secondary">💙</span>
          </p>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
};

export default Index;
