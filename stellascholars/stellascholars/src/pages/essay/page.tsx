import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";

import { SAMPLE_ESSAY } from "../../mocks/lessons";

const AI_FEEDBACK = {
  score: 16,
  total: 20,
  grade: "B+",
  strengths: [
    "Clear thesis statement establishing a strong argument about ambition",
    "Effective use of quotations from Acts I and III to support analysis",
    "Good contextual awareness of the Jacobean political climate",
    "Analytical vocabulary used throughout (e.g. 'subverts', 'catalyses')",
  ],
  improvements: [
    "Explore the role of Lady Macbeth's ambition more thoroughly — her influence is a key examiner focus",
    "Develop your AO3 context further — link the 'Divine Right of Kings' to Macbeth's tragic downfall",
    "Your conclusion would benefit from a more evaluative final statement about Shakespeare's message",
    "Consider exploring how ambition is presented differently at the start vs end of the play",
  ],
  summary: "A well-structured and perceptive response that demonstrates strong understanding of the text. You analyse language effectively and sustain a clear argument throughout. To reach the top band, develop your contextual analysis and ensure every paragraph explores ambition in a nuanced, evaluative way.",
};

export default function EssayPage() {
  const essay = SAMPLE_ESSAY;
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [activeTab, setActiveTab] = useState<"strengths" | "improvements" | "summary">("strengths");

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;
  const maxWords = 500;

  const handleSubmit = () => {
    if (answer.trim().length < 50) return;
    setAnalysing(true);
    setTimeout(() => {
      setAnalysing(false);
      setSubmitted(true);
    }, 2200);
  };

  const scorePct = Math.round((AI_FEEDBACK.score / AI_FEEDBACK.total) * 100);

  return (
    <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
            <Link to="/subjects" className="hover:text-cyan-400 cursor-pointer">Subjects</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/subjects/english-lit" className="hover:text-cyan-400 cursor-pointer">{essay.subjectName}</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-slate-300">Essay Practice</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Essay area */}
            <div className="lg:col-span-2 space-y-5">
              {/* Question */}
              <div className="space-card p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-orange-400/10 rounded-lg">
                    <i className="ri-quill-pen-line text-orange-400 text-base"></i>
                  </div>
                  <div>
                    <h1 className="font-orbitron font-bold text-base text-white">{essay.title}</h1>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-xs text-orange-400 font-semibold">{essay.points} marks available</span>
                      <span className="text-xs text-slate-500">{essay.suggestedTime}</span>
                      <span className="text-xs text-slate-500">{essay.wordGuide} words suggested</span>
                    </div>
                  </div>
                </div>
                <blockquote className="border-l-2 border-cyan-400/50 pl-5 text-slate-200 text-base leading-relaxed italic">
                  "{essay.question}"
                </blockquote>

                <button
                  onClick={() => setShowMarkScheme(!showMarkScheme)}
                  className="mt-4 flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <i className={showMarkScheme ? "ri-eye-off-line" : "ri-eye-line"}></i>
                  {showMarkScheme ? "Hide" : "View"} Mark Scheme
                </button>

                {showMarkScheme && (
                  <ul className="mt-3 space-y-1.5">
                    {essay.markScheme.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <i className="ri-checkbox-circle-line text-cyan-400 mt-0.5 flex-shrink-0"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Writing area */}
              <div className="space-card p-7">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-orbitron text-sm font-semibold text-white">Your Answer</h3>
                  <span className={`text-xs font-medium ${wordCount > maxWords ? "text-red-400" : "text-slate-500"}`}>
                    {wordCount} / {maxWords} words
                  </span>
                </div>
                <textarea
                  value={answer}
                  onChange={(e) => !submitted && setAnswer(e.target.value)}
                  disabled={submitted || analysing}
                  placeholder="Begin your essay here. Introduce your argument, use quotations and analyse language, and refer to context..."
                  className="input-light w-full h-72 rounded-xl p-4 text-sm resize-none disabled:opacity-60 transition-colors leading-relaxed"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-slate-600">
                    {submitted ? (
                      <span className="text-emerald-400 flex items-center gap-1"><i className="ri-check-line"></i> Submitted for analysis</span>
                    ) : analysing ? (
                      <span className="text-cyan-400 animate-pulse flex items-center gap-1"><i className="ri-robot-line"></i> AI is analysing...</span>
                    ) : (
                      <span>AI feedback provided on submission</span>
                    )}
                  </div>
                  {!submitted && (
                    <button
                      onClick={handleSubmit}
                      disabled={answer.trim().length < 50 || analysing || wordCount > maxWords}
                      className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer text-sm whitespace-nowrap"
                    >
                      {analysing ? (
                        <><i className="ri-loader-4-line animate-spin"></i> Analysing...</>
                      ) : (
                        <><i className="ri-robot-line"></i> Submit for AI Analysis</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: AI Panel */}
            <div>
              {submitted ? (
                <div className="space-card p-6 sticky top-24">
                  {/* Score */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none"/>
                        <circle cx="40" cy="40" r="32" stroke="#ff6b35" strokeWidth="8" fill="none"
                          strokeDasharray={`${2 * Math.PI * 32 * scorePct / 100} ${2 * Math.PI * 32}`}
                          strokeLinecap="round"/>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-orbitron font-bold text-lg text-white">{AI_FEEDBACK.score}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">AI Score</p>
                      <p className="font-orbitron font-bold text-2xl text-orange-400">{AI_FEEDBACK.grade}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{AI_FEEDBACK.score}/{AI_FEEDBACK.total} marks</p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 p-1 bg-white/4 rounded-xl mb-5">
                    {(["strengths", "improvements", "summary"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${activeTab === tab ? "bg-white/12 text-white" : "text-slate-500 hover:text-slate-300"}`}
                      >
                        {tab === "strengths" ? "✓" : tab === "improvements" ? "△" : "≡"} {tab}
                      </button>
                    ))}
                  </div>

                  {activeTab === "strengths" && (
                    <ul className="space-y-2.5">
                      {AI_FEEDBACK.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                          <i className="ri-check-line text-emerald-400 mt-0.5 flex-shrink-0"></i>{s}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "improvements" && (
                    <ul className="space-y-2.5">
                      {AI_FEEDBACK.improvements.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                          <i className="ri-lightbulb-line text-orange-400 mt-0.5 flex-shrink-0"></i>{s}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "summary" && (
                    <p className="text-xs text-slate-300 leading-relaxed">{AI_FEEDBACK.summary}</p>
                  )}

                  <div className="flex gap-2 mt-6">
                    <button onClick={() => { setSubmitted(false); setAnswer(""); }} className="flex-1 py-2.5 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all cursor-pointer">Try Again</button>
                    <Link to="/quiz/quiz1" className="flex-1 py-2.5 text-xs font-semibold text-center text-white bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl transition-all cursor-pointer">Next Task</Link>
                  </div>
                </div>
              ) : (
                <div className="space-card p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 flex items-center justify-center bg-violet-400/10 rounded-xl">
                      <i className="ri-robot-line text-violet-400 text-lg"></i>
                    </div>
                    <div>
                      <h3 className="font-orbitron font-semibold text-sm text-white">AI Essay Marker</h3>
                      <p className="text-xs text-slate-500">Powered by StellaScholars AI</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    Write your essay answer and submit it. Our AI will analyse your response and provide a score, strengths, and detailed improvement suggestions — just like a real GCSE examiner.
                  </p>
                  {["+20 XP on submission", "Instant examiner-style feedback", "Personalised improvement tips"].map((tip) => (
                    <div key={tip} className="flex items-center gap-2 mb-2.5">
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                        <i className="ri-star-line text-yellow-400 text-xs"></i>
                      </div>
                      <span className="text-xs text-slate-400">{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
