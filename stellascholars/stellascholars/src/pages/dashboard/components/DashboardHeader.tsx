import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { PLANET_RANKS } from "../../../mocks/subjects";

const FUN_GREETINGS = [
  "Back for more? Let's go",
  "Ready to grind",
  "The galaxy awaits",
  "Let's get some XP",
  "Time to level up",
  "Welcome back, scholar",
];

export default function DashboardHeader() {
  const { user } = useAuth();
  if (!user) return null;

  const planet = PLANET_RANKS.find((p) => p.name === user.planetRank);
  const xpProgress = planet ? ((user.xp - planet.minXp) / (planet.maxXp - planet.minXp)) * 100 : 0;
  const nextPlanet = PLANET_RANKS[PLANET_RANKS.findIndex((p) => p.name === user.planetRank) + 1];
  const xpToNext = planet ? planet.maxXp - user.xp : 0;
  const greeting = FUN_GREETINGS[new Date().getHours() % FUN_GREETINGS.length];

  return (
    <div className="bg-purple-950/60 border-b border-purple-700/40 px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left: user info */}
          <div className="flex items-center gap-4">
            <Link to="/profile" className="cursor-pointer flex-shrink-0">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl text-white bg-gradient-to-br ${user.avatarGradient}`}
                style={{ boxShadow: `0 0 0 3px ${planet?.color}55` }}
              >
                <i className={`${user.avatar} text-xl`} />
              </div>
            </Link>
            <div>
              <p className="text-purple-400/70 text-xs mb-0.5">{greeting},</p>
              <h1 className="font-orbitron font-black text-2xl text-white">{user.username}!</h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full border"
                  style={{ color: planet?.color, borderColor: `${planet?.color}55`, background: `${planet?.color}18` }}
                >
                  {user.planetRank}
                </span>
                {user.qualification && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border border-amber-400/35 bg-amber-400/12 text-amber-400">
                    {user.qualification.toUpperCase()}
                  </span>
                )}
                {user.streakDays > 0 && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border border-orange-400/35 bg-orange-400/12 text-orange-400 flex items-center gap-1">
                    <i className="ri-fire-line text-xs" />{user.streakDays} day streak
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: XP card */}
          <div className="bg-white border-2 border-purple-300 rounded-2xl p-5 min-w-[240px] flex-shrink-0">
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Your XP</p>
                <p className="font-orbitron font-black text-3xl text-purple-600">
                  {user.xp.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-0.5">Next up</p>
                <p className="font-orbitron font-bold text-sm text-slate-900">{nextPlanet?.name ?? "MAX"}</p>
                <p className="text-xs text-slate-400">{xpToNext.toLocaleString()} XP away</p>
              </div>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-purple-600 to-purple-400"
                style={{ width: `${Math.min(xpProgress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-slate-400">{planet?.name}</span>
              <span className="text-xs text-slate-400">{nextPlanet?.name ?? "Galaxy"}</span>
            </div>
          </div>
        </div>

        {/* Quick action strip */}
        <div className="flex gap-3 mt-6 flex-wrap">
          <Link to="/subjects"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap">
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-book-2-line text-sm" /></div>
            Study Now
          </Link>
          <Link to="/mock-exam"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 hover:text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap">
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-file-paper-2-line text-sm" /></div>
            Mock Exam
          </Link>

          <Link to="/past-papers"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap">
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-file-paper-line text-sm" /></div>
            Past Papers
          </Link>
        </div>
      </div>
    </div>
  );
}
