import { Link } from "react-router-dom";
import { SUBJECTS } from "../../../mocks/subjects";
import { useAuth } from "../../../contexts/AuthContext";

export default function SubjectProgress() {
  const { user } = useAuth();
  if (!user) return null;

  const progressMap = Object.fromEntries(
    (user.subjectProgress ?? []).map((s) => [s.subjectId, s])
  );

  const relevantIds = [
    ...(user.coreSubjects ?? []),
    ...(user.electiveSubjects ?? []),
  ];

  const subjects = relevantIds.length > 0
    ? SUBJECTS.filter((s) => relevantIds.includes(s.id))
    : SUBJECTS.slice(0, 6);

  return (
    <div className="bg-white border-2 border-purple-400 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-orbitron font-semibold text-base text-slate-900">Your Subjects</h2>
        <Link to="/subjects" className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer">
          All Subjects <i className="ri-arrow-right-line" />
        </Link>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm mb-3">No subjects selected yet.</p>
          <Link to="/profile" className="text-xs text-purple-600 hover:text-purple-700 cursor-pointer">Set up your subjects →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {subjects.map((subject) => {
            const progress = progressMap[subject.id];
            const completed = progress?.topicsCompleted ?? 0;
            const total = subject.totalTopics;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <Link key={subject.id} to={`/subjects/${subject.id}`} className="flex items-center gap-4 group cursor-pointer">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center flex-shrink-0`}>
                  <i className={`${subject.icon} text-white text-sm`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-800 group-hover:text-purple-700 transition-colors truncate">{subject.name}</span>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-xs text-slate-400">{completed}/{total}</span>
                      <span className="text-xs font-semibold text-purple-600 w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                {progress?.lastStudied && (
                  <span className="text-xs text-slate-400 whitespace-nowrap hidden sm:block">{progress.lastStudied}</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
