import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const IGCSE_CORE = ["maths"];
const IGCSE_SELECTIVES_POOL = ["english-lang", "chinese", "biology", "physics", "chemistry"];
const ALEVEL_MIN = 3;
const ALEVEL_MAX = 4;

const ALL_SUBJECTS = [
  { id: "maths", name: "Mathematics", icon: "ri-calculator-line", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
  { id: "english-lang", name: "English Language", icon: "ri-quill-pen-line", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/30" },
  { id: "english-lit", name: "English Literature", icon: "ri-book-open-line", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
  { id: "biology", name: "Biology", icon: "ri-microscope-line", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
  { id: "chemistry", name: "Chemistry", icon: "ri-flask-line", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" },
  { id: "physics", name: "Physics", icon: "ri-flashlight-line", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  { id: "history", name: "History", icon: "ri-ancient-gate-line", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  { id: "geography", name: "Geography", icon: "ri-earth-line", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
  { id: "computer-science", name: "Computer Science", icon: "ri-code-box-line", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/30" },
  { id: "french", name: "French", icon: "ri-translate-2", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10 border-fuchsia-500/30" },
  { id: "spanish", name: "Spanish", icon: "ri-global-line", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/30" },
  { id: "psychology", name: "Psychology", icon: "ri-mental-health-line", color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/30" },
  { id: "business", name: "Business Studies", icon: "ri-briefcase-line", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/30" },
  { id: "economics", name: "Economics", icon: "ri-line-chart-line", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
  { id: "chinese", name: "Chinese", icon: "ri-translate", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
];

const TUTORIAL_STEPS = [
  {
    icon: "ri-planet-line",
    color: "text-purple-600",
    title: "Start Learning Right Away",
    desc: "Pick your subjects and dive into lessons, quizzes, and flashcards. We'll track your progress and help you study smarter.",
  },
  {
    icon: "ri-question-answer-line",
    color: "text-purple-500",
    title: "Multiple Ways to Study",
    desc: "Use Lessons to learn, Flashcards to memorize, Quizzes to test yourself, and Essay practice for deeper understanding. Choose what works best for you!",
  },
  {
    icon: "ri-fire-line",
    color: "text-orange-500",
    title: "Build Your Study Streak",
    desc: "Study every day to build momentum. The longer you keep going, the more confident you'll become. Miss a day? Just start again tomorrow!",
  },
  {
    icon: "ri-award-line",
    color: "text-amber-500",
    title: "Track Your Progress",
    desc: "Watch your scores improve over time. Every quiz, every flashcard, every essay brings you closer to exam success.",
  },
];

type Step = "qualification" | "subjects" | "tutorial" | "ready";

export default function OnboardingPage() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("qualification");
  const [qualification, setQualification] = useState<"igcse" | "alevel" | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [tutorialStep, setTutorialStep] = useState(0);

  const toggleSubject = (id: string) => {
    if (qualification === "igcse") {
      if (IGCSE_CORE.includes(id)) return; // maths is mandatory
      if (!IGCSE_SELECTIVES_POOL.includes(id)) return; // only pool subjects
      const selectives = selectedSubjects.filter((s) => !IGCSE_CORE.includes(s));
      if (selectives.includes(id)) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== id));
      } else if (selectives.length < 3) {
        setSelectedSubjects([...selectedSubjects, id]);
      }
    } else {
      if (selectedSubjects.includes(id)) {
        if (selectedSubjects.length > ALEVEL_MIN) {
          setSelectedSubjects(selectedSubjects.filter((s) => s !== id));
        }
      } else if (selectedSubjects.length < ALEVEL_MAX) {
        setSelectedSubjects([...selectedSubjects, id]);
      }
    }
  };

  const getAvailableSubjects = () => {
    if (qualification === "igcse") {
      return ALL_SUBJECTS.filter((s) => IGCSE_CORE.includes(s.id) || IGCSE_SELECTIVES_POOL.includes(s.id));
    }
    return ALL_SUBJECTS;
  };

  const isSubjectDisabled = (id: string) => {
    if (qualification === "igcse") {
      if (IGCSE_CORE.includes(id)) return true;
      const selectives = selectedSubjects.filter((s) => !IGCSE_CORE.includes(s));
      return !selectedSubjects.includes(id) && selectives.length >= 3;
    } else {
      return !selectedSubjects.includes(id) && selectedSubjects.length >= ALEVEL_MAX;
    }
  };

  const canProceed = () => {
    if (qualification === "igcse") {
      return selectedSubjects.filter((s) => !IGCSE_CORE.includes(s)).length >= 1;
    } else {
      return selectedSubjects.length >= ALEVEL_MIN && selectedSubjects.length <= ALEVEL_MAX;
    }
  };

  const handleComplete = () => {
    if (!qualification) return;
    if (qualification === "igcse") {
      const electives = selectedSubjects.filter((s) => !IGCSE_CORE.includes(s));
      completeOnboarding(qualification, IGCSE_CORE, electives);
    } else {
      completeOnboarding(qualification, selectedSubjects, []);
    }
    navigate("/dashboard");
  };

  // Auto-select IGCSE core on qualification change
  useEffect(() => {
    if (qualification === "igcse") {
      setSelectedSubjects(IGCSE_CORE);
    } else if (qualification === "alevel") {
      setSelectedSubjects([]);
    }
  }, [qualification]);

  const stepIndex = { qualification: 0, subjects: 1, tutorial: 2, ready: 3 };
  const progress = ((stepIndex[step] + 1) / 4) * 100;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 relative overflow-hidden">

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <i className="ri-star-fill text-white text-xs" />
            </div>
            <span className="font-orbitron font-bold text-base text-slate-900">StellaScholars</span>
          </div>
          <div className="w-full h-1 bg-purple-100 rounded-full mt-4">
            <div className="h-full bg-gradient-to-r from-purple-600 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            {["Qualification", "Subjects", "Tutorial", "Ready!"].map((label, i) => (
              <span key={label} className={`text-xs transition-colors ${i <= stepIndex[step] ? "text-purple-600" : "text-slate-400"}`}>{label}</span>
            ))}
          </div>
        </div>

        {/* Step: Qualification */}
        {step === "qualification" && (
          <div className="space-card p-8 text-center">
            <div className="w-14 h-14 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-5">
              <i className="ri-graduation-cap-line text-purple-600 text-2xl" />
            </div>
            <h2 className="font-orbitron font-bold text-2xl text-slate-900 mb-2">
              Welcome, {user?.username}!
            </h2>
            <p className="text-slate-600 text-sm mb-8 max-w-md mx-auto">
              Tell us which qualification you&apos;re studying for. This personalises your subject list and content difficulty.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {(["igcse", "alevel"] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setQualification(q)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer ${qualification === q ? "border-purple-400 bg-purple-50" : "border-slate-200 bg-white hover:border-purple-200 hover:bg-purple-25"}`}
                >
                  <div className={`text-2xl mb-3 font-orbitron font-bold ${qualification === q ? "text-purple-600" : "text-slate-900"}`}>
                    {q === "igcse" ? "IGCSE" : "A-Level"}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {q === "igcse"
                      ? "International General Certificate of Secondary Education. Age 14–16. Covers GCSE core + elective subjects."
                      : "Advanced Level qualifications. Age 16–18. Deeper, more specialised subject study."}
                  </p>
                  {qualification === q && (
                    <div className="mt-3 flex items-center gap-1 text-purple-600 text-xs font-semibold">
                      <i className="ri-check-circle-fill" /> Selected
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => { if (qualification) setStep("subjects"); }}
              disabled={!qualification}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-bold font-orbitron tracking-wide transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Continue &rarr;
            </button>
          </div>
        )}

        {/* Step: Subject Selection */}
        {step === "subjects" && (
          <div className="bg-white border border-purple-200 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <i className="ri-book-2-line text-purple-600 text-2xl" />
              </div>
              <h2 className="font-orbitron font-bold text-xl text-slate-900">
                {qualification === "igcse" ? "Choose Your Selective Subjects" : "Choose Your 3–4 A-Level Subjects"}
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                {qualification === "igcse"
                  ? "Maths is your compulsory core subject. Choose up to 3 selectives from: English, Chinese, Biology, Physics, Chemistry."
                  : "For A-Level there are no fixed core subjects — pick 3 or 4 subjects you're studying."}
              </p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-slate-600">
                {qualification === "igcse" 
                  ? "Core: Mathematics (auto-included) · Choose 3 selectives below" 
                  : `Select ${ALEVEL_MIN}–${ALEVEL_MAX} subjects · No core subjects for A-Level`
                }
              </p>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                qualification === "alevel" 
                  ? (selectedSubjects.length >= ALEVEL_MIN && selectedSubjects.length <= ALEVEL_MAX ? "text-purple-600 border-purple-300 bg-purple-50" : "text-slate-500 border-slate-300 bg-slate-50")
                  : (selectedSubjects.filter(s => !IGCSE_CORE.includes(s)).length === 3 ? "text-purple-600 border-purple-300 bg-purple-50" : "text-slate-500 border-slate-300 bg-slate-50")
              }`}>
                {qualification === "igcse" 
                  ? `${selectedSubjects.filter(s => !IGCSE_CORE.includes(s)).length}/3 electives`
                  : `${selectedSubjects.length}/${ALEVEL_MAX} chosen`
                }
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {getAvailableSubjects().map((s) => {
                const selected = selectedSubjects.includes(s.id);
                const disabled = isSubjectDisabled(s.id);
                const isCoreIGCSE = qualification === "igcse" && IGCSE_CORE.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSubject(s.id)}
                    disabled={disabled && !selected}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${
                      selected 
                        ? `${s.bg} border-opacity-80 cursor-pointer` 
                        : disabled 
                          ? "border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed" 
                          : "border-slate-200 bg-white hover:border-purple-200 hover:bg-purple-25 cursor-pointer"
                    }`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center`}>
                      <i className={`${s.icon} text-xl ${selected ? s.color : "text-slate-500"}`} />
                    </div>
                    <span className={`text-xs font-semibold leading-tight ${selected ? "text-slate-900" : "text-slate-600"}`}>{s.name}</span>
                    {isCoreIGCSE && <span className="text-xs text-purple-600 font-semibold">Core</span>}
                    {selected && !isCoreIGCSE && <div className="w-4 h-4 flex items-center justify-center"><i className={`ri-checkbox-circle-fill ${s.color} text-base`} /></div>}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("qualification")}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 text-sm transition-all cursor-pointer whitespace-nowrap"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep("tutorial")}
                disabled={!canProceed()}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-bold font-orbitron tracking-wide transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue with {selectedSubjects.length} subject{selectedSubjects.length > 1 ? "s" : ""} →
              </button>
            </div>
          </div>
        )}

        {/* Step: Tutorial */}
        {step === "tutorial" && (
          <div className="space-card p-8">
            <div className="text-center mb-2">
              <h2 className="font-orbitron font-bold text-xl text-slate-900">How StellaScholars Works</h2>
              <p className="text-slate-600 text-sm mt-1">Quick guide — {tutorialStep + 1} of {TUTORIAL_STEPS.length}</p>
            </div>

            <div className="w-full h-0.5 bg-purple-100 rounded-full my-5">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-500 rounded-full transition-all duration-400"
                style={{ width: `${((tutorialStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
              />
            </div>

            <div className="min-h-[220px] flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-5">
                <i className={`${TUTORIAL_STEPS[tutorialStep].icon} ${TUTORIAL_STEPS[tutorialStep].color} text-3xl`} />
              </div>
              <h3 className="font-orbitron font-bold text-lg text-slate-900 mb-3">{TUTORIAL_STEPS[tutorialStep].title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-md">{TUTORIAL_STEPS[tutorialStep].desc}</p>
            </div>

            <div className="flex items-center gap-2 justify-center mb-6">
              {TUTORIAL_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTutorialStep(i)}
                  className={`rounded-full transition-all cursor-pointer ${i === tutorialStep ? "w-5 h-2 bg-purple-600" : "w-2 h-2 bg-slate-300 hover:bg-purple-300"}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => tutorialStep > 0 ? setTutorialStep(t => t - 1) : setStep("subjects")}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 text-sm transition-all cursor-pointer whitespace-nowrap"
              >
                &larr; Back
              </button>
              <button
                onClick={() => tutorialStep < TUTORIAL_STEPS.length - 1 ? setTutorialStep(t => t + 1) : setStep("ready")}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-bold font-orbitron tracking-wide transition-all cursor-pointer whitespace-nowrap"
              >
                {tutorialStep < TUTORIAL_STEPS.length - 1 ? "Next →" : "Finish Tutorial →"}
              </button>
            </div>
          </div>
        )}

        {/* Step: Ready */}
        {step === "ready" && (
          <div className="space-card p-10 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center animate-pulse-glow">
                <i className="ri-rocket-2-line text-white text-3xl" />
              </div>
            </div>
            <h2 className="font-orbitron font-bold text-2xl text-slate-900 mb-3">Ready to Start!</h2>
            <p className="text-slate-600 text-sm mb-2 max-w-sm mx-auto">
              Your profile is all set. Let&apos;s get studying and start improving those grades!
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-4 mb-8">
              <span className="text-xs px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 font-semibold">
                {qualification?.toUpperCase()}
              </span>
              {selectedSubjects.map((s) => (
                <span key={s} className="text-xs px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 capitalize">
                  {s.replace(/-/g, " ")}
                </span>
              ))}
            </div>
            <button
              onClick={handleComplete}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-bold font-orbitron tracking-wide transition-all cursor-pointer whitespace-nowrap"
            >
              Start Learning 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
