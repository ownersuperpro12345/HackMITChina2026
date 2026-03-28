import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import { getSubjectsByQualification } from "../../mocks/subjects";
import { useProgress } from "../../hooks/useProgress";
import { useAuth } from "../../contexts/AuthContext";

export default function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { user } = useAuth();
  const SUBJECTS_LIST = getSubjectsByQualification(user?.qualification);
  const subject = SUBJECTS_LIST.find((s) => s.id === subjectId) ?? SUBJECTS_LIST[0];
  const [filter, setFilter] = useState<"all" | "in-progress" | "not-started" | "completed">("all");
  const { getTopicProgress, isCompleted, getSubtopicProgress } = useProgress();

  const topicProgresses = subject.topics.map((t) => ({
    topic: t,
    progress: getTopicProgress(t.subtopics.map((s) => s.id)),
    completed: getTopicProgress(t.subtopics.map((s) => s.id)) === 100,
  }));

  const filtered = topicProgresses.filter(({ progress, completed }) => {
    if (filter === "completed") return completed;
    if (filter === "in-progress") return progress > 0 && !completed;
    if (filter === "not-started") return progress === 0;
    return true;
  });

  const completedCount = topicProgresses.filter((t) => t.completed).length;
  const overallProgress = Math.round(
    topicProgresses.reduce((sum, t) => sum + t.progress, 0) / (subject.topics.length || 1)
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Header */}
        <div className="bg-purple-950/60 border-b border-purple-700/40 px-6 lg:px-10 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-purple-400/70 mb-4 flex-wrap">
              <Link to="/subjects" className="hover:text-purple-300 cursor-pointer transition-colors">Subjects</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-purple-200">{subject.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center flex-shrink-0`}>
                <i className={`${subject.icon} text-white text-2xl`}></i>
              </div>
              <div className="flex-1">
                <h1 className="font-orbitron font-bold text-2xl text-white mb-1">{subject.name}</h1>
                <p className="text-purple-300/80 text-sm">
                  {completedCount}/{subject.topics.length} topics completed &middot; Click a topic to see subtopics
                </p>
                <div className="mt-3 w-64 max-w-full">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-purple-400/70">Your Progress</span>
                    <span className="font-orbitron font-bold text-sm text-purple-300">{overallProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-700"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>
              {/* Filter buttons */}
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                {(["all", "in-progress", "not-started", "completed"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap capitalize ${
                      filter === f
                        ? "bg-purple-600/40 border-purple-500 text-purple-200"
                        : "bg-white/5 border-white/15 text-purple-400/70 hover:text-purple-200 hover:border-purple-500/50"
                    }`}
                  >
                    {f.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-purple-400/60">
              <i className="ri-inbox-line text-4xl mb-3 block"></i>
              <p>No topics match this filter. Start studying to see progress!</p>
            </div>
          )}

          {filtered.map(({ topic, progress, completed }, i) => {
            const subtopicProgresses = topic.subtopics.map((s) => ({
              name: s.name,
              progress: getSubtopicProgress(s.id),
            }));
            const unlockedCount = topic.subtopics.filter((_, si) => {
              if (si === 0) return true;
              return getSubtopicProgress(topic.subtopics[si - 1].id) >= 80;
            }).length;

            return (
              <div
                key={topic.id}
                className={`bg-white border-2 rounded-2xl p-6 transition-all ${
                  completed ? "border-emerald-400" : "border-purple-400 hover:border-purple-500"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: topic info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-orbitron font-bold text-sm ${
                      completed ? "bg-emerald-100 border border-emerald-300 text-emerald-700" : "bg-purple-100 border border-purple-300 text-purple-700"
                    }`}>
                      {completed ? <i className="ri-check-line text-emerald-600 text-base" /> : String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h2 className="font-orbitron font-semibold text-base text-slate-900">{topic.name}</h2>
                        {completed && (
                          <span className="text-xs px-2 py-0.5 rounded-full border border-emerald-400 bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1">
                            <i className="ri-checkbox-circle-fill text-xs" /> Completed
                          </span>
                        )}
                        {progress > 0 && !completed && (
                          <span className="text-xs px-2 py-0.5 rounded-full border border-orange-300 bg-orange-50 text-orange-600">
                            {unlockedCount}/{topic.subtopics.length} unlocked
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 mb-3">
                        {topic.questionsCount} questions &middot; ~{topic.avgTime} min avg &middot; {topic.subtopics.length} subtopics
                      </p>

                      {/* Subtopic mini-progress pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {subtopicProgresses.map((sp) => (
                          <div
                            key={sp.name}
                            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${
                              sp.progress >= 100
                                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                                : sp.progress > 0
                                ? "bg-purple-50 border-purple-300 text-purple-700"
                                : "bg-slate-100 border-slate-200 text-slate-500"
                            }`}
                          >
                            {sp.progress >= 100 && <i className="ri-check-line text-xs" />}
                            {sp.name}
                            {sp.progress > 0 && sp.progress < 100 && <span className="text-slate-400">·{sp.progress}%</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: progress bar + button */}
                  <div className="flex flex-col items-end gap-4 flex-shrink-0">
                    <div className="text-right w-40">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-slate-500">Progress</span>
                        <span className={`font-orbitron font-bold text-sm ${completed ? "text-emerald-600" : "text-purple-600"}`}>
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            completed ? "bg-gradient-to-r from-emerald-400 to-emerald-600" : "bg-gradient-to-r from-purple-500 to-purple-400"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      to={`/subjects/${subjectId}/${topic.id}`}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap cursor-pointer transition-all bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white border border-purple-500"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-arrow-right-line text-sm" />
                      </div>
                      {completed ? "Revise Topic" : progress > 0 ? "Continue" : "Start Topic"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-center py-4 text-xs text-purple-500/50">
            Click a topic to see its subtopics and unlock the progression path
          </div>
        </div>
      </main>
    </div>
  );
}
