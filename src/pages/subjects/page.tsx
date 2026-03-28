import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import { getSubjectsByQualification } from "../../mocks/subjects";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function SubjectsPage() {
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const { tc } = useTheme();
  const SUBJECTS = getSubjectsByQualification(user?.qualification);

  const progressMap = Object.fromEntries(
    (user?.subjectProgress ?? []).map((s) => [s.subjectId, s])
  );

  const userSubjectIds = [
    ...(user?.coreSubjects ?? []),
    ...(user?.electiveSubjects ?? []),
  ];
  const displaySubjects = userSubjectIds.length > 0
    ? SUBJECTS.filter((s) => userSubjectIds.includes(s.id))
    : SUBJECTS;

  const filtered = displaySubjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${tc.page} flex flex-col`}>
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-purple-950/60 border-b border-purple-700/40 px-6 lg:px-10 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-2">
                  {user?.qualification ? user.qualification.toUpperCase() : "GCSE"} &middot; Your Subjects
                </p>
                <h1 className="font-orbitron font-bold text-3xl text-white mb-2">Subject Library</h1>
                <p className="text-purple-300/70 text-sm">Select a subject to study, revise, and earn XP.</p>
              </div>
              {userSubjectIds.length > 0 && (
                <Link to="/profile" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer mt-1 transition-colors">
                  <i className="ri-settings-3-line text-xs" /> Manage subjects
                </Link>
              )}
            </div>
            <div className="relative max-w-sm mt-5">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                <i className="ri-search-line text-purple-400/60 text-sm" />
              </div>
              <input
                type="text"
                placeholder="Search subjects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-purple-900/30 border border-purple-600/40 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-purple-400/60">No subjects found for &quot;{search}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((subject) => {
                const progress = progressMap[subject.id];
                const completed = progress?.topicsCompleted ?? 0;
                const total = subject.totalTopics;
                const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                return (
                  <Link
                    key={subject.id}
                    to={`/subjects/${subject.id}`}
                    className="group bg-white border-2 border-purple-400 rounded-2xl p-5 cursor-pointer block hover:border-purple-500 hover:scale-[1.02] transition-all duration-200"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-4`}>
                      <i className={`${subject.icon} text-white text-xl`} />
                    </div>
                    <h2 className="font-orbitron font-bold text-sm text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">
                      {subject.name}
                    </h2>
                    <p className="text-xs text-slate-500 mb-4">{subject.topics.length} topic areas &middot; {total} subtopics</p>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mb-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">{completed}/{total} completed</span>
                      <span className="text-purple-600 font-semibold">{pct}%</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
