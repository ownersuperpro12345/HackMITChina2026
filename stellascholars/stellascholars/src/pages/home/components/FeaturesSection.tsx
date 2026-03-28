const FEATURES = [
  {
    icon: "ri-gamepad-line",
    title: "It's Actually Fun",
    description: "Every question earns XP. Every topic completed levels you up. Go from Mercury all the way to Galaxy rank — revision finally feels like a game.",
    color: "from-cyan-500/20 to-cyan-400/5",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
    tag: "MOST POPULAR",
    tagColor: "bg-cyan-500/20 text-cyan-400 border-cyan-400/30",
  },
  {
    icon: "ri-robot-line",
    title: "AI Marks Your Essays",
    description: "Type your essay answer and get instant feedback — score, what you did well, and exactly what to improve. Like having a tutor at 2am.",
    color: "from-violet-500/20 to-violet-400/5",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
    tag: "AI POWERED",
    tagColor: "bg-violet-500/20 text-violet-400 border-violet-400/30",
  },
  {
    icon: "ri-trophy-line",
    title: "Compete Monthly",
    description: "Leagues reset every month. Study more, climb higher — from Small Planets rookie all the way up to Cosmic Titans. Bragging rights included.",
    color: "from-orange-500/20 to-orange-400/5",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
    tag: "",
    tagColor: "",
  },
  {
    icon: "ri-stack-line",
    title: "Flashcards That Work",
    description: "Flip cards, test yourself, and the app tracks what you keep getting wrong. Spend time on stuff you actually need — not stuff you already know.",
    color: "from-emerald-500/20 to-emerald-400/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    tag: "",
    tagColor: "",
  },
  {
    icon: "ri-bar-chart-2-line",
    title: "See Your Progress",
    description: "Track your streak, weekly study time, quiz scores, and which topics need more work. Your dashboard shows you exactly where to focus.",
    color: "from-yellow-500/20 to-yellow-400/5",
    border: "border-yellow-500/20",
    iconColor: "text-yellow-400",
    tag: "",
    tagColor: "",
  },
  {
    icon: "ri-mail-send-line",
    title: "Keep Parents Happy",
    description: "Weekly summary emails go to your parents so they can see how much you've been studying. Less nagging, more studying. Win-win.",
    color: "from-pink-500/20 to-pink-400/5",
    border: "border-pink-500/20",
    iconColor: "text-pink-400",
    tag: "",
    tagColor: "",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 lg:px-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#05051a] to-[#07071e] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-slate-500 text-sm uppercase tracking-widest font-semibold mb-3">Why students love it</p>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
            Revision, but make it <span className="text-gradient-cyan">actually good</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            All the tools you need to smash your GCSEs — in one place, completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.border} transition-all duration-200 hover:scale-[1.02] hover:brightness-110 relative`}
            >
              {feature.tag && (
                <span className={`absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full border ${feature.tagColor}`}>
                  {feature.tag}
                </span>
              )}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/6 mb-4">
                <i className={`${feature.icon} text-2xl ${feature.iconColor}`} />
              </div>
              <h3 className="font-orbitron font-bold text-base text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
