import { useAuth } from "../../../contexts/AuthContext";

export default function StatsStrip() {
  const { user } = useAuth();
  if (!user) return null;

  const weekH = Math.floor(user.studyTimeWeekMinutes / 60);
  const weekM = user.studyTimeWeekMinutes % 60;
  const accuracy = user.totalQuestionsAnswered > 0
    ? Math.round((user.totalCorrect / user.totalQuestionsAnswered) * 100)
    : 0;

  const STATS = [
    {
      icon: "ri-fire-line",
      label: "Study Streak",
      value: user.streakDays > 0 ? `${user.streakDays} Day${user.streakDays === 1 ? "" : "s"}` : "0 Days",
      sub: user.streakDays > 0 ? `Best: ${user.longestStreak} days` : "Start studying today!",
      iconColor: user.streakDays > 0 ? "text-orange-500" : "text-slate-400",
      iconBg: user.streakDays > 0 ? "bg-orange-100" : "bg-slate-100",
      valColor: user.streakDays > 0 ? "text-orange-600" : "text-slate-400",
    },
    {
      icon: "ri-time-line",
      label: "Time This Week",
      value: user.studyTimeWeekMinutes > 0 ? (weekH > 0 ? `${weekH}h ${weekM}m` : `${weekM}m`) : "0m",
      sub: user.studyTimeWeekMinutes > 0 ? "Keep it up!" : "Study to log time",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      valColor: "text-purple-700",
    },
    {
      icon: "ri-checkbox-multiple-line",
      label: "Questions Done",
      value: user.totalQuestionsAnswered.toLocaleString(),
      sub: user.totalQuestionsAnswered > 0 ? `${accuracy}% accuracy` : "No questions yet",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      valColor: "text-emerald-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {STATS.map((stat) => (
        <div key={stat.label} className="bg-white border-2 border-purple-300 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <i className={`${stat.icon} ${stat.iconColor} text-lg`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">{stat.label}</p>
              <p className={`font-orbitron font-bold text-sm ${stat.valColor} leading-tight truncate`}>{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
