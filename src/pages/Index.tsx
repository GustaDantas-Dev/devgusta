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
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Vamos Conversar?
              </span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Estou sempre aberto a novos projetos e oportunidades. Entre em contato!
            </p>
            <Contact />
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background/80 backdrop-blur-lg py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Gustavo Lima Dantas | Desenvolvido com 💙 e código limpo</p>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
};

export default Index;
