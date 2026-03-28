import { Link } from "react-router-dom";
import { SUBJECTS } from "../../../mocks/subjects";

export default function SubjectsPreview() {
  const preview = SUBJECTS.slice(0, 6);

  return (
    <section className="py-24 px-6 lg:px-16 bg-[#06061c]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-400/10 border border-orange-400/20 rounded-full px-4 py-2 mb-5">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-book-2-line text-orange-400 text-sm"></i>
              </div>
              <span className="text-xs font-semibold text-orange-400 tracking-widest uppercase">All Major Subjects</span>
            </div>
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-3">
              Every GCSE Subject Covered
            </h2>
            <p className="text-slate-400 max-w-lg">
              From Maths and Sciences to Humanities and Languages — structured lessons, quizzes, and revision for all.
            </p>
          </div>
          <Link
            to="/subjects"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm border border-cyan-400/30 hover:border-cyan-400/60 px-5 py-2.5 rounded-full transition-all cursor-pointer whitespace-nowrap"
          >
            View All Subjects
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line"></i>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {preview.map((subject) => {
            const pct = Math.round((subject.topicsCompleted / subject.totalTopics) * 100);
            return (
              <Link
                key={subject.id}
                to={`/subjects/${subject.id}`}
                className="group space-card p-6 cursor-pointer block"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${subject.icon} text-white text-xl`}></i>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-orbitron font-bold text-white">{pct}%</p>
                    <p className="text-xs text-slate-500">complete</p>
                  </div>
                </div>

                <h3 className="font-orbitron font-semibold text-base text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {subject.topicsCompleted}/{subject.totalTopics} topics mastered
                </p>

                {/* Progress bar */}
                <div className="progress-bar-track h-1.5">
                  <div className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all`} style={{ width: `${pct}%` }}></div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-400">
                    {subject.topics.length} topic areas
                  </span>
                  <span className="text-xs text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Continue <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
