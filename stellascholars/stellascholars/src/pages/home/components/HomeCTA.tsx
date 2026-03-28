import { Link } from "react-router-dom";

export default function HomeCTA() {
  return (
    <section className="py-24 px-6 lg:px-16 bg-[#05051a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-cyan-400/3 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-2 mb-8">
          <div className="w-4 h-4 flex items-center justify-center animate-twinkle">
            <i className="ri-star-fill text-cyan-400 text-sm"></i>
          </div>
          <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">Ready to Begin?</span>
        </div>

        <h2 className="font-orbitron font-black text-3xl md:text-5xl text-white mb-6 leading-tight">
          Your Galaxy Awaits.<br />
          <span className="text-gradient-cyan">Start Today.</span>
        </h2>

        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of students already exploring the cosmos of knowledge. Every subject, every topic — right here. Free, engaging, and built for results.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-semibold px-10 py-4 rounded-full transition-all duration-200 animate-pulse-glow cursor-pointer whitespace-nowrap text-base"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-rocket-2-line"></i>
            </div>
            Launch Your Dashboard
          </Link>
          <Link
            to="/leaderboard"
            className="flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 rounded-full border border-white/10 hover:border-white/20 transition-all cursor-pointer whitespace-nowrap text-base"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-trophy-line"></i>
            </div>
            View Leaderboards
          </Link>
        </div>

        {/* Mini planet strip */}
        <div className="flex items-center justify-center gap-3 mt-14 flex-wrap">
          {["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Sun", "Black Hole", "Galaxy"].map((planet) => (
            <div key={planet} className="text-xs text-slate-600 whitespace-nowrap px-2 py-1 rounded-full border border-white/5">
              {planet}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">11 ranks to conquer on your way to Galaxy</p>
      </div>
    </section>
  );
}
