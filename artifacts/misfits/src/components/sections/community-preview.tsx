import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Hash, MessageSquare, Bell, Circle } from "lucide-react";

const channels = [
  { name: "burocrazia-101", unread: 12, icon: Hash },
  { name: "template-condivisi", unread: 5, icon: Hash },
  { name: "consigli-di-istituto", unread: 3, icon: Hash },
  { name: "mentor-match", unread: 0, icon: Hash },
  { name: "eventi-nazionali", unread: 8, icon: Hash },
];

const messages = [
  {
    avatar: "MR",
    color: "bg-blue-600",
    name: "Marco R.",
    school: "Liceo Volta",
    time: "2 min fa",
    msg: "Ho usato il template per la richiesta assemblea e ha funzionato! La presidenza ha risposto in 24 ore.",
    reactions: [{ emoji: "🔥", count: 14 }, { emoji: "✅", count: 9 }],
  },
  {
    avatar: "SF",
    color: "bg-indigo-600",
    name: "Sofia F.",
    school: "ITIS Fermi",
    time: "8 min fa",
    msg: "Qualcuno ha esperienza con i consigli di classe straordinari? Devo convocare uno urgente.",
    reactions: [{ emoji: "👋", count: 5 }],
  },
  {
    avatar: "LB",
    color: "bg-purple-600",
    name: "Luca B.",
    school: "Liceo Manzoni",
    time: "15 min fa",
    msg: "Mentor update: ho avuto la mia prima sessione e mi ha salvato da una situazione con il preside. Questo servizio è gold.",
    reactions: [{ emoji: "💎", count: 22 }, { emoji: "❤️", count: 11 }],
  },
];

const onlineMembers = [
  { initials: "AR", color: "bg-blue-500" },
  { initials: "GC", color: "bg-violet-500" },
  { initials: "FM", color: "bg-indigo-500" },
  { initials: "EP", color: "bg-blue-700" },
  { initials: "TN", color: "bg-purple-600" },
];

export function CommunityPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="community" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
            Community
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Non sei il solo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
              misfit
            </span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            La prima rete attiva di rappresentanti da tutta Italia. Sempre qualcuno
            online, sempre qualcuno che ha già affrontato il tuo stesso problema.
          </p>
        </motion.div>

        {/* Community UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
          data-testid="community-preview-ui"
        >
          <div className="rounded-3xl border border-white/10 bg-card overflow-hidden shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-background/50">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/70"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
              </div>
              <span className="text-white/40 text-xs mx-auto">Misfits Community</span>
            </div>

            <div className="flex h-80 md:h-96">
              {/* Sidebar */}
              <div className="w-48 border-r border-white/10 flex-shrink-0 flex flex-col bg-background/30 hidden md:flex">
                <div className="p-3 border-b border-white/10">
                  <div className="text-xs text-white/40 uppercase tracking-widest px-2 mb-2">Canali</div>
                  {channels.map((ch) => {
                    const Icon = ch.icon;
                    return (
                      <div
                        key={ch.name}
                        className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer group"
                      >
                        <div className="flex items-center gap-1.5">
                          <Icon className="h-3.5 w-3.5 text-white/40 group-hover:text-white/60" />
                          <span className="text-xs text-white/60 group-hover:text-white/80 truncate">
                            {ch.name}
                          </span>
                        </div>
                        {ch.unread > 0 && (
                          <span className="text-xs bg-primary rounded-full h-4 min-w-4 flex items-center justify-center px-1 font-bold text-white">
                            {ch.unread}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Online */}
                <div className="p-3 mt-auto">
                  <div className="text-xs text-white/40 uppercase tracking-widest px-2 mb-2">Online ora</div>
                  <div className="flex -space-x-2 px-2">
                    {onlineMembers.map((m) => (
                      <div
                        key={m.initials}
                        className={`h-7 w-7 rounded-full ${m.color} border-2 border-card flex items-center justify-center text-[9px] font-bold text-white`}
                        title={m.initials}
                      >
                        {m.initials}
                      </div>
                    ))}
                    <div className="h-7 w-7 rounded-full bg-white/10 border-2 border-card flex items-center justify-center text-[9px] text-white/50 font-bold">
                      +847
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 flex flex-col">
                {/* Channel header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <Hash className="h-4 w-4 text-white/40" />
                  <span className="text-sm font-semibold text-white/80">burocrazia-101</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Circle className="h-2 w-2 fill-green-400 text-green-400" />
                    <span className="text-xs text-white/40">852 online</span>
                  </div>
                </div>

                {/* Messages list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((m, i) => (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.15 }}
                      className="flex gap-3"
                      data-testid={`community-message-${i}`}
                    >
                      <div className={`h-8 w-8 rounded-full ${m.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                        {m.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-bold text-white">{m.name}</span>
                          <span className="text-xs text-white/30">{m.school}</span>
                          <span className="text-xs text-white/20 ml-auto flex-shrink-0">{m.time}</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed mb-1.5">{m.msg}</p>
                        <div className="flex gap-1.5">
                          {m.reactions.map((r) => (
                            <span
                              key={r.emoji}
                              className="inline-flex items-center gap-1 text-xs bg-white/5 border border-white/10 rounded-full px-2 py-0.5 hover:bg-white/10 cursor-pointer"
                            >
                              {r.emoji} <span className="text-white/50">{r.count}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Input bar */}
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/10">
                    <MessageSquare className="h-4 w-4 text-white/30" />
                    <span className="text-xs text-white/30 flex-1">Scrivi in #burocrazia-101...</span>
                    <Bell className="h-4 w-4 text-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
