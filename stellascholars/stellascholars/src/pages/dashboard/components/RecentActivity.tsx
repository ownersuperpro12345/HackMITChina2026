import { useAuth } from "../../../contexts/AuthContext";

const ACTIVITY_ICONS: Record<string, string> = {
  quiz: "ri-question-answer-line",
  lesson: "ri-book-open-line",
  essay: "ri-quill-pen-line",
  flashcards: "ri-stack-line",
  exam: "ri-file-paper-2-line",
};
const ACTIVITY_COLORS: Record<string, string> = {
  quiz: "text-cyan-400 bg-cyan-400/10",
  lesson: "text-violet-400 bg-violet-400/10",
  essay: "text-orange-400 bg-orange-400/10",
  flashcards: "text-emerald-400 bg-emerald-400/10",
  exam: "text-amber-400 bg-amber-400/10",
};

export default function RecentActivity() {
  const { user } = useAuth();
  if (!user) return null;

  const activity = user.recentActivity ?? [];

  return (
    <div className="space-card p-5">
      <h2 className="font-orbitron font-semibold text-sm text-white mb-5">Recent Activity</h2>
      {activity.length === 0 ? (
        <div className="text-center py-6">
          <div className="w-8 h-8 mx-auto bg-white/4 rounded-xl flex items-center justify-center mb-3">
            <i className="ri-history-line text-slate-500 text-base" />
          </div>
          <p className="text-xs text-slate-500">No activity yet. Start a lesson or quiz to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activity.slice(0, 5).map((act, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${ACTIVITY_COLORS[act.type] ?? "text-slate-400 bg-white/8"}`}>
                <i className={`${ACTIVITY_ICONS[act.type] ?? "ri-time-line"} text-sm`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-200 leading-snug">{act.topic}</p>
                <p className="text-xs text-slate-500 mt-0.5">{act.subject}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {act.score !== undefined && (
                    <span className="text-xs text-emerald-400 font-semibold">{act.score}/{act.total}</span>
                  )}
                  <span className="text-xs text-yellow-500">+{act.xpEarned} XP</span>
                  <span className="text-xs text-slate-600">{act.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
