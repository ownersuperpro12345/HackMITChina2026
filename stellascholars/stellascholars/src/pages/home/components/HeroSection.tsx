import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const STATS = [
  { value: "12", label: "Subjects", icon: "ri-book-2-line", color: "text-cyan-400" },
  { value: "500+", label: "Topics", icon: "ri-map-pin-line", color: "text-violet-400" },
  { value: "10K+", label: "Questions", icon: "ri-question-answer-line", color: "text-orange-400" },
  { value: "AI", label: "Essay Feedback", icon: "ri-robot-line", color: "text-emerald-400" },
];

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden stars-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-[#05051a] via-[#080820] to-[#0a0a25]" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-violet-500/6 rounded-full blur-3xl pointer-events-none" />

      {/* Floating planet */}
      <div className="absolute right-8 lg:right-24 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none animate-float">
        <div
          className="w-52 h-52 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #7bb8ff, #2266cc, #0a2255)",
            boxShadow: "0 0 80px rgba(34,102,204,0.35), inset -20px -20px 40px rgba(0,0,0,0.5)",
          }}
        />
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-72 h-8 border-2 border-cyan-400/20 rounded-full" style={{ transform: "translateX(-50%) rotateX(70deg)" }} />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 pt-28 pb-20">
        <div className="max-w-3xl">

          {/* Fun badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-400/30 rounded-full px-4 py-2 mb-8">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-rocket-line text-orange-400 text-sm" />
            </div>
            <span className="text-xs font-bold text-orange-300 tracking-wide uppercase">Free · No card needed · Start in 30 seconds</span>
          </div>

          {/* Main heading — punchy & teen-friendly */}
          <h1 className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            <span className="text-white">STUDY LESS.</span>
            <br />
            <span className="text-gradient-cyan glow-text-cyan">SCORE MORE.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            StellaScholars turns boring revision into an actual game. Earn XP, rank up through the solar system, beat quizzes, and get AI to mark your essays — all for free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold px-8 py-4 rounded-full transition-all cursor-pointer whitespace-nowrap text-base"
              >
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-rocket-2-line" /></div>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold px-8 py-4 rounded-full transition-all cursor-pointer whitespace-nowrap text-base shadow-lg shadow-orange-500/25"
                >
                  <div className="w-5 h-5 flex items-center justify-center"><i className="ri-rocket-2-line" /></div>
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 border-2 border-white/20 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 font-semibold px-8 py-4 rounded-full transition-all cursor-pointer whitespace-nowrap text-base"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="space-card p-4 text-center hover:scale-105 transition-transform">
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2">
                  <i className={`${stat.icon} ${stat.color} text-xl`} />
                </div>
                <p className="font-orbitron font-black text-xl text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-xs text-slate-500">scroll down</span>
        <i className="ri-arrow-down-line text-slate-500" />
      </div>
    </section>
  );
}
