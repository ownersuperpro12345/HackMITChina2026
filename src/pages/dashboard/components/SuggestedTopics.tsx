import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { SUBJECTS } from "../../../mocks/subjects";
import { useProgress } from "../../../hooks/useProgress";

interface Recommendation {
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  reason: string;
  urgency: "high" | "medium" | "low";
  icon: string;
}

const URGENCY_STYLES = {
  high: "text-red-400 bg-red-400/8 border-red-400/20",
  medium: "text-amber-400 bg-amber-400/8 border-amber-400/20",
  low: "text-slate-400 bg-white/4 border-white/10",
};

export default function SuggestedTopics() {
  const { user } = useAuth();
  const { getTopicProgress } = useProgress();

  const relevantIds = [
    ...(user?.coreSubjects ?? []),
    ...(user?.electiveSubjects ?? []),
  ];
  const subjects = relevantIds.length > 0
    ? SUBJECTS.filter((s) => relevantIds.includes(s.id))
    : SUBJECTS;

  const recs: Recommendation[] = [];
  const seen = new Set<string>();

  subjects.forEach((subject) => {
    subject.topics.forEach((topic) => {
      const progress = getTopicProgress(topic.subtopics.map((s) => s.id));
      const key = `${subject.id}-${topic.id}`;
      if (seen.has(key)) return;
      seen.add(key);

      if (progress === 0) {
        recs.push({
          subjectId: subject.id,
          subjectName: subject.name,
          topicId: topic.id,
          topicName: topic.name,
          reason: "Not started yet",
          urgency: "medium",
          icon: subject.icon,
        });
      } else if (progress < 50) {
        recs.push({
          subjectId: subject.id,
          subjectName: subject.name,
          topicId: topic.id,
          topicName: topic.name,
          reason: `${progress}% complete — keep going!`,
          urgency: "high",
          icon: subject.icon,
        });
      }
    });
  });

  const recommendations = recs
    .sort((a, b) => (a.urgency === "high" ? -1 : 1) - (b.urgency === "high" ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="bg-white border-2 border-purple-400 rounded-2xl p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-7 h-7 flex items-center justify-center bg-amber-400/10 rounded-lg">
          <i className="ri-brain-line text-amber-400 text-base" />
        </div>
        <div>
          <h2 className="font-orbitron font-semibold text-sm text-white">Smart Recommendations</h2>
          <p className="text-xs text-slate-400 mt-0.5">Topics to tackle next</p>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-10 h-10 mx-auto bg-emerald-400/10 rounded-xl flex items-center justify-center mb-3">
            <i className="ri-check-double-line text-emerald-400 text-lg" />
          </div>
          <p className="text-sm text-white font-semibold mb-1">All caught up!</p>
          <p className="text-xs text-slate-500">Start studying to get personalised recommendations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recommendations.map((rec) => (
            <Link
              key={`${rec.subjectId}-${rec.topicId}`}
              to={`/subjects/${rec.subjectId}/${rec.topicId}`}
              className="group p-4 rounded-xl bg-white/3 hover:bg-white/5 border border-white/6 hover:border-amber-400/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${rec.icon} text-sm text-slate-400`} />
                </div>
                <span className="text-xs text-slate-400">{rec.subjectName}</span>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border font-semibold ${URGENCY_STYLES[rec.urgency]}`}>
                  {rec.urgency === "high" ? "Priority" : "Suggested"}
                </span>
              </div>
              <p className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors leading-snug mb-2">
                {rec.topicName}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{rec.reason}</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-line text-slate-600 group-hover:text-amber-400 text-sm transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
