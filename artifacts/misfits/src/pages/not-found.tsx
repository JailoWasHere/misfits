import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground px-4 selection:bg-primary selection:text-white">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AlertCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-black text-white tracking-tight">404</h1>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Pagina non trovata</h2>
        <p className="text-white/50 text-sm mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link href="/">
          <Button
            size="lg"
            className="h-12 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Torna alla home
          </Button>
        </Link>
      </div>
    </div>
  );
}
