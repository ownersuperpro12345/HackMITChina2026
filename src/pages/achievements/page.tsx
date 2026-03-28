import { useState, useEffect } from "react";
import Navbar from "../../components/feature/Navbar";

import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, RARITY_COLORS } from "../../mocks/achievements";
import { useAuth } from "../../contexts/AuthContext";

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { user } = useAuth();
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<any>(null);
  
  const userUnlocked = user?.unlockedAchievements ?? [];

  // Show ALL achievements (locked + unlocked)
  const allAchievements = ACHIEVEMENTS.map((ach) => ({
    ...ach,
    unlocked: userUnlocked.includes(ach.id),
  }));

  const filtered = activeCategory === "All" 
    ? allAchievements 
    : allAchievements.filter((a) => a.category === activeCategory);

  const unlockedCount = allAchievements.filter((a) => a.unlocked).length;

  // Simulated unlock (in real app, this would be triggered when user completes a milestone)
  useEffect(() => {
    const pendingUnlock = localStorage.getItem("pending_achievement_unlock");
    if (pendingUnlock) {
      const achievement = ACHIEVEMENTS.find((a) => a.id === pendingUnlock);
      if (achievement && userUnlocked.includes(achievement.id)) {
        setUnlockedAchievement(achievement);
        setShowUnlockModal(true);
        localStorage.removeItem("pending_achievement_unlock");
      }
    }
  }, [userUnlocked]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200 px-6 lg:px-10 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div>
                <h1 className="font-orbitron font-bold text-3xl text-slate-900 mb-2">Achievements</h1>
                <p className="text-slate-700 text-sm">Complete milestones to earn badges and bonus XP.</p>
              </div>
              <div className="bg-white border border-purple-200 rounded-2xl p-5 text-center min-w-[160px]">
                <p className="font-orbitron font-black text-3xl text-purple-600">{unlockedCount}</p>
                <p className="text-xs text-slate-600 mt-1">unlocked</p>
                <div className="progress-bar-track h-1.5 mt-3">
                  <div className="progress-bar-fill h-full" style={{ width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <div className="flex gap-2 flex-wrap mb-8">
            {ACHIEVEMENT_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${activeCategory === cat ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900 hover:bg-slate-200"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((ach) => (
              <div key={ach.id} className={`bg-slate-50 border-2 rounded-2xl p-5 relative transition-all duration-200 ${ach.unlocked ? "border-purple-300 hover:scale-[1.02]" : "border-slate-200 opacity-60"}`}>
                {ach.unlocked && (
                  <div className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center bg-emerald-100 rounded-full">
                    <i className="ri-check-line text-emerald-600 text-xs" />
                  </div>
                )}
                {!ach.unlocked && (
                  <div className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center bg-slate-200 rounded-full">
                    <i className="ri-lock-line text-slate-500 text-xs" />
                  </div>
                )}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${ach.unlocked ? "bg-gradient-to-br from-purple-100 to-purple-50" : "bg-slate-100"}`}>
                  <i className={`${ach.icon} text-2xl ${ach.unlocked ? "text-purple-600" : "text-slate-400"}`} />
                </div>
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold mb-3 ${RARITY_COLORS[ach.rarity]}`}>
                  {ach.rarity}
                </div>
                <h3 className={`font-orbitron font-bold text-sm mb-1 ${ach.unlocked ? "text-slate-900" : "text-slate-600"}`}>{ach.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{ach.description}</p>
                {!ach.unlocked && ach.progress !== undefined && ach.total && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-500">Progress</span>
                      <span className="text-xs text-slate-600 font-semibold">{ach.progress}/{ach.total}</span>
                    </div>
                    <div className="progress-bar-track h-1.5">
                      <div className="progress-bar-fill h-full" style={{ width: `${(ach.progress / ach.total) * 100}%` }} />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{ach.unlocked ? (ach.unlockedDate ?? "Unlocked") : "Locked"}</span>
                  <span className="text-xs text-amber-600 font-semibold">+{ach.xpReward} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Achievement Unlock Modal */}
      {showUnlockModal && unlockedAchievement && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white border border-purple-200 rounded-3xl p-10 max-w-md w-full text-center relative overflow-hidden animate-scaleIn">
            {/* Celebration particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-ping" />
              <div className="absolute top-8 right-8 w-2 h-2 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: "0.2s" }} />
              <div className="absolute bottom-12 left-12 w-2.5 h-2.5 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: "0.4s" }} />
              <div className="absolute bottom-8 right-6 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: "0.6s" }} />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full mb-4">
                <i className="ri-trophy-fill text-purple-600 text-xs" />
                <span className="text-xs text-purple-700 font-semibold">Achievement Unlocked!</span>
              </div>

              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-5 animate-bounce" style={{ animationDuration: "1.5s", animationIterationCount: "3" }}>
                <i className={`${unlockedAchievement.icon} text-4xl text-white`} />
              </div>

              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-semibold mb-3 ${RARITY_COLORS[unlockedAchievement.rarity]}`}>
                {unlockedAchievement.rarity}
              </div>

              <h2 className="font-orbitron font-bold text-2xl text-slate-900 mb-2">{unlockedAchievement.name}</h2>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{unlockedAchievement.description}</p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
                <p className="text-xs text-slate-600 mb-1">XP Reward</p>
                <p className="font-orbitron font-bold text-2xl text-amber-600">+{unlockedAchievement.xpReward} XP</p>
              </div>

              <button
                onClick={() => setShowUnlockModal(false)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-bold font-orbitron tracking-wide transition-all cursor-pointer whitespace-nowrap"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}