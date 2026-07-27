import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/immagine_1779966467564.png";
import { ArrowRight, FileText, Users, Map, Target } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full bg-background overflow-hidden -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Il toolkit del rappresentante che vuole fare la differenza.
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white drop-shadow-lg">
            Non sei più <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
              da solo.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Template, guide, mentor e una community. Tutto quello che i tuoi
            predecessori non ti hanno lasciato. Misfits è la prima community
            italiana di rappresentanti d'istituto. 
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-full shadow-[0_0_40px_-10px_rgba(19,55,244,0.8)] group transition-all"
              >
                Inizia gratis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/la-nostra-missione" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
              >
                Indeciso se candidarti?
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Floating UI Elements indicating features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-20 w-full max-w-5xl relative h-40 md:h-64"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>

          {/* Mockup blocks */}
          <div className="absolute left-[10%] top-0 p-4 bg-card/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transform -rotate-6 animate-float-slow hidden md:block">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="text-sm font-bold">Richiesta Assemblea</div>
            </div>
            <div className="h-2 w-32 bg-white/10 rounded-full mb-2"></div>
            <div className="h-2 w-24 bg-white/10 rounded-full"></div>
          </div>

          <div className="absolute right-[10%] top-10 p-4 bg-card/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transform rotate-6 animate-float-delayed hidden md:block">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Users className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="text-sm font-bold">Community: Liceo Roma</div>
            </div>
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 border-2 border-background"></div>
              <div className="h-8 w-8 rounded-full bg-indigo-500 border-2 border-background"></div>
              <div className="h-8 w-8 rounded-full bg-purple-500 border-2 border-background"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
