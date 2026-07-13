import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoPath from "@assets/immagine_1779966467564.png";

const perks = [
  "300+ template legali pronti",
  "Wiki Burocratica completa",
  "Canale Telegram Misfits Alert",
  "Community di rappresentanti italiani",
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<"name" | "email" | "password" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden selection:bg-primary selection:text-white">

      {/* ── Left branding panel ── */}
      <motion.aside
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-[44%] xl:w-[40%] relative flex-col justify-between p-12 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-indigo-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Decorative blobs */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full mix-blend-screen blur-[160px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen blur-[120px] opacity-15 pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <Link href="/">
            <motion.img
              src={logoPath}
              alt="Misfits"
              className="h-9 w-auto cursor-pointer"
              whileHover={{ scale: 1.05 }}
            />
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight mb-4">
              Il mandato inizia{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
                adesso.
              </span>
            </h2>
            <p className="text-white/50 leading-relaxed text-lg max-w-xs">
              Tutto quello che i tuoi predecessori non ti hanno lasciato. Da oggi è tuo.
            </p>
          </div>

          <ul className="space-y-3">
            {perks.map((perk, i) => (
              <motion.li
                key={perk}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 text-white/70 text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                {perk}
              </motion.li>
            ))}
          </ul>

          {/* Floating stat pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3"
          >
            <div className="flex -space-x-2">
              {["bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500"].map((c, i) => (
                <div key={i} className={`h-7 w-7 rounded-full ${c} border-2 border-background`} />
              ))}
            </div>
            <p className="text-sm text-white/60">
              <span className="font-bold text-white">12.000+</span> rappresentanti attivi
            </p>
          </motion.div>
        </div>

        <div className="relative z-10">
          <p className="text-white/20 text-xs">© 2025 Misfits. Tutti i diritti riservati.</p>
        </div>
      </motion.aside>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Blobs for mobile / right side */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-screen blur-[200px] opacity-10 pointer-events-none lg:opacity-5" />

        {/* Mobile header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between px-6 py-5 lg:hidden"
        >
          <Link href="/">
            <img src={logoPath} alt="Misfits" className="h-8 w-auto cursor-pointer" />
          </Link>
          <Link href="/">
            <span className="flex items-center gap-1.5 text-sm text-white/45 hover:text-white/70 transition-colors cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              Home
            </span>
          </Link>
        </motion.header>

        {/* Back link — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="hidden lg:flex px-10 py-6 justify-end"
        >
          <Link href="/">
            <motion.span
              whileHover={{ x: -3 }}
              className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna alla home
            </motion.span>
          </Link>
        </motion.div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full max-w-md"
          >
            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs text-primary mb-4">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse" />
                Registrazione gratuita
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Entra nel movimento.
              </h1>
              <p className="text-white/45 text-sm mt-2">
                Crea il tuo account in meno di un minuto.
              </p>
            </motion.div>

            {/* Google button */}
            <motion.div variants={itemVariants}>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-xl border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold flex items-center gap-3 mb-6 transition-all hover:border-white/25"
                data-testid="signup-google"
              >
                <GoogleIcon />
                Continua con Google
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-white/30 font-medium">oppure via email</span>
              <div className="flex-1 h-px bg-white/8" />
            </motion.div>

            {/* Form fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-semibold text-white/60">
                  Nome e cognome
                </Label>
                <div className="relative group">
                  <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${focused === "name" ? "text-primary" : "text-white/25"}`} />
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Mario Rossi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className="pl-10 h-12 rounded-xl bg-white/[0.04] border-white/8 text-white placeholder:text-white/20 focus:border-primary/40 focus:ring-0 focus:bg-white/[0.07] transition-all"
                  />
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
                    animate={{ opacity: focused === "name" ? 1 : 0, scaleX: focused === "name" ? 1 : 0.3 }}
                    style={{ transformOrigin: "center" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-white/60">
                  Email
                </Label>
                <div className="relative">
                  <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${focused === "email" ? "text-primary" : "text-white/25"}`} />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@scuola.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className="pl-10 h-12 rounded-xl bg-white/[0.04] border-white/8 text-white placeholder:text-white/20 focus:border-primary/40 focus:ring-0 focus:bg-white/[0.07] transition-all"
                  />
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
                    animate={{ opacity: focused === "email" ? 1 : 0, scaleX: focused === "email" ? 1 : 0.3 }}
                    style={{ transformOrigin: "center" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-white/60">
                  Password
                </Label>
                <div className="relative">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${focused === "password" ? "text-primary" : "text-white/25"}`} />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Minimo 8 caratteri"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    className="pl-10 h-12 rounded-xl bg-white/[0.04] border-white/8 text-white placeholder:text-white/20 focus:border-primary/40 focus:ring-0 focus:bg-white/[0.07] transition-all"
                  />
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
                    animate={{ opacity: focused === "password" ? 1 : 0, scaleX: focused === "password" ? 1 : 0.3 }}
                    style={{ transformOrigin: "center" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_-8px_rgba(19,55,244,0.7)] hover:shadow-[0_0_50px_-8px_rgba(19,55,244,0.9)] transition-all group"
                  data-testid="signup-submit"
                >
                  Crea account gratuito
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </motion.div>
            </form>

            {/* Footer */}
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p className="text-white/30 text-xs">
                Hai già un account?{" "}
                <Link href="/login">
                  <span className="text-primary/70 hover:text-primary cursor-pointer transition-colors">
                    Accedi
                  </span>
                </Link>
              </p>
              <p className="text-white/20 text-xs mt-3 leading-relaxed max-w-xs mx-auto">
                Registrandoti accetti i{" "}
                <span className="text-white/35 hover:text-white/55 cursor-pointer transition-colors">Termini di Servizio</span>
                {" "}e la{" "}
                <span className="text-white/35 hover:text-white/55 cursor-pointer transition-colors">Privacy Policy</span>.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
