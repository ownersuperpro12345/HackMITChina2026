import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import { getSubjectsByQualification } from "../../mocks/subjects";
import { useProgress } from "../../hooks/useProgress";
import { useAuth } from "../../contexts/AuthContext";

export default function TopicDetailPage() {
  const { subjectId, topicId } = useParams<{ subjectId: string; topicId: string }>();
  const { user } = useAuth();
  const SUBJECTS_LIST = getSubjectsByQualification(user?.qualification);
  const subject = SUBJECTS_LIST.find((s) => s.id === subjectId) ?? SUBJECTS_LIST[0];
  const topic = subject.topics.find((t) => t.id === topicId) ?? subject.topics[0];
  const { getSubtopicProgress, getTopicProgress, isUnlocked, isCompleted } = useProgress();
  const [showAll, setShowAll] = useState(false);

  const topicProgress = getTopicProgress(topic.subtopics.map((s) => s.id));

  const getLessonId = () => {
    const lessonMap: Record<string, string> = {
      algebra: "algebra",
      "reading-skills": "reading-skills",
      macbeth: "macbeth",
      "cell-biology": "cell-biology",
      "atomic-structure": "atomic-structure",
      forces: "forces",
      "weimar-nazis": "weimar-nazis",
      programming: "programming",
    };
    return lessonMap[topicId ?? ""] ?? topicId ?? "";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Header — purple tinted */}
        <div className="bg-purple-950/60 border-b border-purple-700/40 px-6 lg:px-10 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-purple-400/70 mb-4 flex-wrap">
              <Link to="/subjects" className="hover:text-purple-300 cursor-pointer transition-colors">Subjects</Link>
              <i className="ri-arrow-right-s-line"></i>
              <Link to={`/subjects/${subjectId}`} className="hover:text-purple-300 cursor-pointer transition-colors">{subject.name}</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-purple-200">{topic.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center flex-shrink-0`}>
                <i className={`${subject.icon} text-white text-2xl`}></i>
              </div>
              <div className="flex-1">
                <h1 className="font-orbitron font-bold text-2xl text-white mb-1">{topic.name}</h1>
                <p className="text-purple-300/80 text-sm">
                  {topic.subtopics.length} subtopics &middot; {topic.questionsCount} questions &middot; ~{topic.avgTime} min avg
                </p>
                <div className="mt-3 w-72 max-w-full">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-purple-400/70">Overall Progress</span>
                    <span className={`font-orbitron font-bold text-sm ${topicProgress >= 100 ? "text-emerald-400" : "text-purple-300"}`}>
                      {topicProgress}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${topicProgress >= 100 ? "bg-gradient-to-r from-emerald-400 to-emerald-600" : "bg-gradient-to-r from-purple-500 to-purple-400"}`}
                      style={{ width: `${topicProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick study lesson button */}
              <Link
                to={`/lesson/${getLessonId()}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-all bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 text-purple-300 hover:text-white"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-book-open-fill" />
                </div>
                Study Lesson
              </Link>
            </div>
          </div>
        </div>

        {/* Unlock notice */}
        <div className="max-w-5xl mx-auto px-6 lg:px-10 pt-6">
          <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-600/30 flex items-start gap-3">
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-lock-unlock-line text-purple-400 text-base"></i>
            </div>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              <strong className="text-purple-300">Progression system:</strong> Complete each subtopic (get 80%+ on the quiz) to unlock the next one. All previous subtopics stay accessible for revision!
            </p>
          </div>
        </div>

        {/* Subtopics */}
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8 space-y-4">
          {topic.subtopics.map((subtopic, i) => {
            const progress = getSubtopicProgress(subtopic.id);
            const unlocked = isUnlocked(subtopic.unlockRequires);
            const completed = isCompleted(subtopic.id);
            const isFirst = i === 0;
            const prevSubtopic = i > 0 ? topic.subtopics[i - 1] : null;

            return (
              <div
                key={subtopic.id}
                className={`bg-white border-2 rounded-2xl p-6 transition-all ${
                  !unlocked
                    ? "opacity-50 border-purple-200/30 bg-white/5"
                    : completed
                    ? "border-emerald-400 bg-white"
                    : "border-purple-400 bg-white hover:border-purple-500"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Step badge */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      !unlocked
                        ? "bg-slate-200 border border-slate-300"
                        : completed
                        ? "bg-emerald-100 border border-emerald-300"
                        : "bg-purple-100 border border-purple-300"
                    }`}>
                      {!unlocked ? (
                        <i className="ri-lock-fill text-slate-400 text-lg" />
                      ) : completed ? (
                        <i className="ri-check-double-line text-emerald-600 text-xl" />
                      ) : (
                        <span className="font-orbitron font-bold text-sm text-purple-700">{String(i + 1).padStart(2, "0")}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h2 className={`font-orbitron font-semibold text-base ${unlocked ? "text-slate-900" : "text-slate-400"}`}>
                          {subtopic.name}
                        </h2>
                        {completed && (
                          <span className="text-xs px-2 py-0.5 rounded-full border border-emerald-400 bg-emerald-100 text-emerald-700 font-semibold">
                            Completed
                          </span>
                        )}
                        {!unlocked && prevSubtopic && (
                          <span className="text-xs px-2 py-0.5 rounded-full border border-slate-300 bg-slate-100 text-slate-500">
                            Locked — finish {prevSubtopic.name} first
                          </span>
                        )}
                        {unlocked && !completed && progress > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full border border-orange-300 bg-orange-50 text-orange-600">
                            In Progress
                          </span>
                        )}
                        {unlocked && !completed && progress === 0 && !isFirst && (
                          <span className="text-xs px-2 py-0.5 rounded-full border border-purple-400 bg-purple-50 text-purple-600 font-semibold">
                            Unlocked!
                          </span>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 w-56 max-w-full">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-500">Progress</span>
                          <span className={`font-orbitron font-bold text-xs ${completed ? "text-emerald-600" : progress > 0 ? "text-purple-600" : "text-slate-400"}`}>
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${completed ? "bg-gradient-to-r from-emerald-400 to-emerald-600" : "bg-gradient-to-r from-purple-500 to-purple-400"}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {!unlocked && prevSubtopic && (
                        <p className="text-xs text-slate-400 mt-2">
                          Score 80%+ on {prevSubtopic.name} quiz to unlock
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: action buttons */}
                  {unlocked ? (
                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                      {/* Lessons — AI-powered lesson page */}
                      <Link
                        to={`/lesson/${subtopic.id}`}
                        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap cursor-pointer transition-all bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-700"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-book-open-line text-sm" />
                        </div>
                        Lesson
                      </Link>

                      {/* Past Papers — AI marked exam papers */}
                      <Link
                        to={`/past-papers/${subjectId}`}
                        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap cursor-pointer transition-all bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-file-paper-2-line text-sm" />
                        </div>
                        Past Papers
                      </Link>

                      {/* Flashcards */}
                      <Link
                        to={`/flashcards/${topicId}`}
                        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs whitespace-nowrap cursor-pointer transition-all bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-700"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-stack-fill text-sm" />
                        </div>
                        Flashcards
                      </Link>

                      {/* Quiz — most prominent */}
                      <Link
                        to={`/quiz/${subtopic.id}`}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap cursor-pointer transition-all bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white border border-purple-500"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-question-answer-fill text-sm" />
                        </div>
                        {completed ? "Revise Quiz" : "Start Quiz"}
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs opacity-40 bg-slate-100 border border-slate-300 text-slate-500 cursor-not-allowed whitespace-nowrap">
                        <i className="ri-lock-fill text-sm" />
                        Locked
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {topic.subtopics.some((s) => isCompleted(s.id)) && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer transition-colors"
              >
                {showAll ? "Hide completed" : "All completed subtopics available for revision above"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
