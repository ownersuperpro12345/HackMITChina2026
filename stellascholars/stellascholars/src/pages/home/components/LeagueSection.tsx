import { LEAGUES } from "../../../mocks/subjects";

const CURRENT_LEAGUE = 3; // Nebula Knights

export default function LeagueSection() {
  return (
    <section className="py-24 px-6 lg:px-16 bg-[#06061c]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-2 mb-6">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-vip-crown-line text-yellow-400 text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-yellow-400 tracking-widest uppercase">Monthly Leagues</span>
          </div>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
            Compete. Climb. Conquer.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every month resets. Study hard, answer questions, and earn study points to climb through the leagues and claim your cosmic rank.
          </p>
        </div>

        {/* League progression */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {LEAGUES.map((league, index) => {
            const isCurrent = index === CURRENT_LEAGUE;
            const isAchieved = index <= CURRENT_LEAGUE;

            return (
              <div
                key={league.name}
                className={`relative flex flex-col items-center p-5 rounded-2xl border transition-all duration-200 ${
                  isCurrent
                    ? "border-white/20 bg-white/8 scale-105"
                    : isAchieved
                    ? "border-white/8 bg-white/4"
                    : "border-white/4 bg-white/2 opacity-50"
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                    Your League
                  </div>
                )}
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${league.color} flex items-center justify-center mb-3 ${isCurrent ? "animate-pulse-glow" : ""}`}
                >
                  <div className="w-7 h-7 flex items-center justify-center">
                    <i className={`${league.icon} text-white text-2xl`}></i>
                  </div>
                </div>
                <h3 className={`font-orbitron text-xs font-bold text-center leading-tight ${isCurrent ? "text-white" : isAchieved ? "text-slate-300" : "text-slate-600"}`}>
                  {league.name}
                </h3>
                <p className={`text-xs mt-1 ${isCurrent ? "text-slate-400" : "text-slate-600"}`}>
                  {league.minPoints}+ pts
                </p>
              </div>
            );
          })}
        </div>

        {/* How leagues work */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "ri-time-line", title: "Study Time", desc: "Minutes spent studying count towards your monthly league score.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
            { icon: "ri-checkbox-multiple-line", title: "Questions Answered", desc: "Each question answered adds points — harder questions are worth more.", color: "text-orange-400", bg: "bg-orange-400/10" },
            { icon: "ri-fire-line", title: "Consistency Bonus", desc: "Daily streaks multiply your earned points. Stay consistent, climb faster.", color: "text-yellow-400", bg: "bg-yellow-400/10" },
          ].map((item) => (
            <div key={item.title} className="space-card p-6">
              <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                <i className={`${item.icon} ${item.color} text-xl`}></i>
              </div>
              <h4 className="font-orbitron font-semibold text-sm text-white mb-2">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
