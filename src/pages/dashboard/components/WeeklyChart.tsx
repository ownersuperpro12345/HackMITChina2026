import { useAuth } from "../../../contexts/AuthContext";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeeklyChart() {
  const { user } = useAuth();
  if (!user) return null;

  const weekData = DAYS.map((day) => ({ day, minutes: 0 }));
  const totalMins = user.studyTimeWeekMinutes;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  const MAX_MINUTES = Math.max(...weekData.map((d) => d.minutes), 30);
  const weeklyGoal = 330;

  return (
    <div className="bg-white border-2 border-purple-300 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-orbitron font-semibold text-sm text-slate-900">This Week</h2>
        <span className="font-orbitron text-sm font-bold text-purple-600">
          {hours > 0 ? `${hours}h ${mins}m` : `${mins}m`}
        </span>
      </div>
      <p className="text-xs text-slate-400 mb-5">Daily study time</p>

      <div className="flex items-end justify-between gap-2 h-24">
        {weekData.map((day) => {
          const height = day.minutes === 0 ? 4 : Math.max((day.minutes / MAX_MINUTES) * 100, 8);
          const today = new Date().toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3);
          const isToday = day.day === today;
          return (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative" style={{ height: "80px" }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${height}%`,
                    background: day.minutes === 0
                      ? "#e9d5ff"
                      : isToday
                      ? "linear-gradient(to top, #7c3aed, #9333ea)"
                      : "linear-gradient(to top, #c4b5fd, #ddd6fe)",
                    minHeight: "4px",
                  }}
                />
              </div>
              <span className={`text-xs ${isToday ? "text-purple-600 font-semibold" : "text-slate-400"}`}>{day.day}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs mb-2">
        <span className="text-slate-500">Weekly goal: 5h 30m</span>
        <span className="text-purple-600 font-semibold">{Math.round((totalMins / weeklyGoal) * 100)}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" style={{ width: `${Math.min((totalMins / weeklyGoal) * 100, 100)}%` }} />
      </div>
      {totalMins === 0 && (
        <p className="text-xs text-slate-400 mt-2 text-center">Study a topic to log your time</p>
      )}
    </div>
  );
}
