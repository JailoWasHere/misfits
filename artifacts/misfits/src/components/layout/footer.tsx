import { Link } from "wouter";
import logoPath from "@assets/immagine_1779966467564.png";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <img src={logoPath} alt="Misfits Logo" className="h-8 mb-6" />
            <p className="text-white/60 max-w-sm mb-6">
              Il toolkit del rappresentante che vuole fare la differenza. Template, guide, mentor e una community. Tutto quello che i tuoi predecessori non ti hanno lasciato.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Prodotto</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-white/60 hover:text-primary transition-colors">Template</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-primary transition-colors">Guide</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-primary transition-colors">Mentorship</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Risorse</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-white/60 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-primary transition-colors">Storie di successo</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-primary transition-colors">Supporto</Link></li>
              <li><Link href="#" className="text-white/60 hover:text-primary transition-colors">Contatti</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Misfits. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Termini di Servizio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
