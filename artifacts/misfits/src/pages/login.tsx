import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Mail, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoPath from "@assets/immagine_1779966467564.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<"email" | "password" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth logic out of scope — placeholder
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden relative selection:bg-primary selection:text-white">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-[130px] opacity-30 animate-blob" />
        <div className="absolute top-[20%] right-[-5%] w-80 h-80 bg-blue-400 rounded-full mix-blend-screen filter blur-[120px] opacity-25 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[30%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[140px] opacity-25 animate-blob animation-delay-4000" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between px-6 py-5 relative z-10"
      >
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={logoPath} alt="Misfits" className="h-8 w-auto" />
          </motion.div>
        </Link>

        <Link href="/">
          <motion.div
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla home
          </motion.div>
        </Link>
      </motion.header>

      {/* Centered card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism card */}
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(19,55,244,0.3)] p-8 md:p-10">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-indigo-500/5 pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8 text-center"
              >
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary mb-5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse" />
                  Area riservata
                </span>
                <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                  Bentornato!
                </h1>
                <p className="text-white/50 text-sm">
                  Accedi al tuo profilo.
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-sm font-semibold text-white/70">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                        focused === "email" ? "text-primary" : "text-white/30"
                      }`}
                    />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="tu@scuola.it"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className="pl-10 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                    {/* Focus underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-blue-400 rounded-full"
                      animate={{ scaleX: focused === "email" ? 1 : 0, opacity: focused === "email" ? 1 : 0 }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.25 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.36, duration: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-sm font-semibold text-white/70">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
                        focused === "password" ? "text-primary" : "text-white/30"
                      }`}
                    />
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused(null)}
                      className="pl-10 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-blue-400 rounded-full"
                      animate={{ scaleX: focused === "password" ? 1 : 0, opacity: focused === "password" ? 1 : 0 }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.25 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44, duration: 0.5 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_-8px_rgba(19,55,244,0.7)] hover:shadow-[0_0_40px_-8px_rgba(19,55,244,0.9)] transition-all group"
                    data-testid="login-submit"
                  >
                    Accedi
                    <LogIn className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </motion.div>
              </form>

              {/* Footer links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-6 text-center space-y-2"
              >
                <p className="text-white/30 text-xs">
                  Non hai un account?{" "}
                  <span className="text-primary/70 hover:text-primary cursor-pointer transition-colors">
                    Registrati gratis
                  </span>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Below card note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="text-center text-white/25 text-xs mt-5"
          >
            Accedendo accetti i Termini di Servizio e la Privacy Policy di Misfits.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
