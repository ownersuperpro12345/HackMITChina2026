import { PLANET_RANKS } from "../../../mocks/subjects";

const CURRENT_RANK_INDEX = 0; // Start at Moon

export default function ProgressionPreview() {
  return (
    <section className="py-24 px-6 lg:px-16 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 rounded-full px-4 py-2 mb-6">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-planet-line text-purple-600 text-sm"></i>
              </div>
              <span className="text-xs font-semibold text-purple-700 tracking-widest uppercase">Your Journey</span>
            </div>
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-slate-900 mb-5">
              Progress Through<br />
              <span className="text-gradient-purple">The Universe</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Start at the Moon and work your way to the Sun. Every question answered, every topic mastered brings you closer to the next rank. Your current progress is shown with your actual rank!
            </p>

            <div className="space-y-4">
              {[
                { icon: "ri-question-answer-line", text: "Answer questions to earn XP" },
                { icon: "ri-book-open-line", text: "Complete lessons to unlock topics" },
                { icon: "ri-flashlight-line", text: "Build streaks for bonus rewards" },
                { icon: "ri-award-line", text: "Unlock achievements along the way" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 flex-shrink-0">
                    <i className={`${item.icon} text-purple-600 text-base`}></i>
                  </div>
                  <span className="text-sm text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Rank progression visual with images */}
          <div className="space-card p-8">
            <h3 className="font-orbitron text-sm font-semibold text-slate-700 mb-6 uppercase tracking-widest">Rank Progression</h3>
            <div className="space-y-4">
              {PLANET_RANKS.map((rank, index) => {
                const isCurrent = index === CURRENT_RANK_INDEX;
                const isCompleted = index < CURRENT_RANK_INDEX;
                const isLocked = index > CURRENT_RANK_INDEX;

                return (
                  <div
                    key={rank.name}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      isCurrent
                        ? "bg-purple-50 border-2 border-purple-300"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <img
                        src={rank.image}
                        alt={rank.name}
                        className={`w-full h-full rounded-full object-cover ${isLocked ? "opacity-30 grayscale" : ""}`}
                      />
                      {isCompleted && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                          <i className="ri-check-line text-white text-xs"></i>
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                          <i className="ri-focus-3-line text-white text-xs"></i>
                        </div>
                      )}
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                            <i className="ri-lock-line text-slate-500 text-xs"></i>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-orbitron text-sm font-semibold ${
                            isLocked ? "text-slate-400" : isCurrent ? "text-purple-600" : "text-slate-700"
                          }`}
                        >
                          {rank.name}
                        </span>
                        {isCurrent && (
                          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium whitespace-nowrap border border-purple-200">
                            Current
                          </span>
                        )}
                      </div>
                      {!isLocked && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {rank.minXp.toLocaleString()} — {rank.maxXp === 999999 ? "∞" : rank.maxXp.toLocaleString()} XP
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}