import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { PLANET_RANKS, SUBJECTS, ALEVEL_SUBJECTS } from "../../mocks/subjects";
import { SUPPORTED_LANGUAGES } from "../../mocks/translations";

const IGCSE_SELECTIVE_POOL_IDS = ["english-lang", "chinese", "biology", "physics", "chemistry"];
const IGCSE_SELECTIVE_SUBJECTS = SUBJECTS.filter((s) => IGCSE_SELECTIVE_POOL_IDS.includes(s.id));
const IGCSE_SELECTIVE_INFO = [
  { id: "english-lang", name: "English Language", icon: "ri-quill-pen-line", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/30" },
  { id: "chinese", name: "Chinese", icon: "ri-translate", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
  { id: "biology", name: "Biology", icon: "ri-microscope-line", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
  { id: "physics", name: "Physics", icon: "ri-flashlight-line", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
  { id: "chemistry", name: "Chemistry", icon: "ri-flask-line", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/30" },
];
const ALEVEL_SUBJECT_INFO = ALEVEL_SUBJECTS.map((s) => ({
  id: s.id,
  name: s.name,
  icon: s.icon,
  color: "text-violet-400",
  bg: "bg-violet-500/10 border-violet-500/30",
}));


type Tab = "overview" | "customise" | "subjects" | "notifications" | "parent" | "account";

const AVATAR_ICONS = [
  { id: "ri-rocket-2-line", label: "Rocket" },
  { id: "ri-planet-line", label: "Planet" },
  { id: "ri-star-fill", label: "Star" },
  { id: "ri-meteor-line", label: "Meteor" },
  { id: "ri-flashlight-fill", label: "Lightning" },
  { id: "ri-sword-line", label: "Sword" },
  { id: "ri-shield-star-line", label: "Shield" },
  { id: "ri-crown-line", label: "Crown" },
  { id: "ri-compass-3-line", label: "Compass" },
  { id: "ri-telescope-line", label: "Telescope" },
  { id: "ri-fire-line", label: "Fire" },
  { id: "ri-brain-line", label: "Brain" },
];

const AVATAR_GRADIENTS = [
  { id: "from-violet-600 to-cyan-600", label: "Nebula" },
  { id: "from-cyan-600 to-emerald-600", label: "Aurora" },
  { id: "from-orange-600 to-red-600", label: "Supernova" },
  { id: "from-pink-600 to-purple-600", label: "Galaxy" },
  { id: "from-amber-500 to-orange-600", label: "Solar" },
  { id: "from-teal-600 to-green-600", label: "Comet" },
  { id: "from-indigo-600 to-violet-600", label: "Deep Space" },
  { id: "from-rose-600 to-pink-600", label: "Pulsar" },
];



const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "ri-user-3-line" },
  { id: "customise", label: "Customise", icon: "ri-palette-line" },
  { id: "subjects", label: "My Subjects", icon: "ri-book-2-line" },
  { id: "notifications", label: "Notifications", icon: "ri-notification-3-line" },
  { id: "parent", label: "Parent Email", icon: "ri-mail-send-line" },
  { id: "account", label: "Account", icon: "ri-settings-3-line" },
];

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [parentEmail, setParentEmail] = useState(user?.parentEmail ?? "");
  const [emailSaved, setEmailSaved] = useState(false);
  const [displayName, setDisplayName] = useState(user?.username ?? "");
  const [accountSaved, setAccountSaved] = useState(false);
  const [selectedElectives, setSelectedElectives] = useState<string[]>(user?.electiveSubjects ?? []);
  const [selectedALevelSubjects, setSelectedALevelSubjects] = useState<string[]>(user?.coreSubjects ?? []);

  if (!user) return null;

  const planet = PLANET_RANKS.find((p) => p.name === user.planetRank);
  const xpPct = planet ? ((user.xp - planet.minXp) / (planet.maxXp - planet.minXp)) * 100 : 0;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleElective = (id: string) => {
    if (selectedElectives.includes(id)) {
      setSelectedElectives((prev) => prev.filter((e) => e !== id));
    } else if (selectedElectives.length < 3) {
      setSelectedElectives((prev) => [...prev, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#05051a] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Profile banner */}
        <div className="relative overflow-hidden border-b border-white/8 bg-[#08081f]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl text-white bg-gradient-to-br ${user.avatarGradient} flex-shrink-0 cursor-pointer`}
                style={{ boxShadow: `0 0 0 3px ${planet?.color}55, 0 0 20px ${planet?.color}33` }}
                onClick={() => setTab("customise")}
                title="Click to customise avatar"
              >
                <i className={`${user.avatar} text-2xl`} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="font-orbitron font-bold text-2xl text-white">{user.username}</h1>
                <p className="text-slate-400 text-sm mt-0.5">
                  {user.qualification?.toUpperCase() ?? "No qualification set"}
                </p>
                <div className="flex items-center gap-2.5 mt-2.5 flex-wrap justify-center sm:justify-start">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full border font-semibold"
                    style={{ color: planet?.color, borderColor: `${planet?.color}44`, background: `${planet?.color}15` }}
                  >
                    {user.planetRank}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 font-semibold">
                    {user.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar tabs */}
            <div className="lg:col-span-1">
              <div className="border border-white/8 rounded-2xl p-2 bg-white/3">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                      tab === t.id
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`${t.icon} text-base`} />
                    </div>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">

              {/* OVERVIEW */}
              {tab === "overview" && (
                <div className="space-y-6">
                  {/* Rank Progression */}
                  <div className="border border-white/8 rounded-2xl p-6 bg-white/3">
                    <h3 className="font-orbitron font-semibold text-sm text-white mb-5">Rank Progression</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2"
                        style={{ borderColor: `${planet?.color}66` }}
                      >
                        {planet?.image ? (
                          <img src={planet.image} alt={planet.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: `${planet?.color}20` }}>
                            <i className="ri-planet-line text-2xl" style={{ color: planet?.color }} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1.5">
                          <span className="font-orbitron font-bold text-white text-sm">{user.planetRank}</span>
                          <span className="text-xs text-slate-400">
                            {user.xp} / {planet?.maxXp === 999999 ? "∞" : planet?.maxXp} XP
                          </span>
                        </div>
                        <div className="h-2 bg-white/8 rounded-full overflow-hidden border border-white/8">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(xpPct, 100)}%`, background: planet?.color }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {planet?.maxXp === 999999
                            ? "Max rank reached!"
                            : `${((planet?.maxXp ?? 0) - user.xp).toLocaleString()} XP to ${PLANET_RANKS[PLANET_RANKS.findIndex((p) => p.name === user.planetRank) + 1]?.name ?? "Black Hole"}`}
                        </p>
                      </div>
                    </div>

                    {/* Rank ladder with planet images */}
                    <div className="flex gap-3 flex-wrap">
                      {PLANET_RANKS.map((p, i) => {
                        const currentIdx = PLANET_RANKS.findIndex((pl) => pl.name === user.planetRank);
                        const isUnlocked = i <= currentIdx;
                        const isCurrent = i === currentIdx;
                        return (
                          <div
                            key={p.name}
                            title={p.name}
                            className={`relative flex flex-col items-center gap-1 cursor-default transition-all ${
                              isCurrent ? "scale-110" : isUnlocked ? "" : "opacity-25 grayscale"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-full overflow-hidden border-2`}
                              style={{
                                borderColor: isCurrent ? p.color : isUnlocked ? `${p.color}60` : "#ffffff20",
                                boxShadow: isCurrent ? `0 0 12px ${p.color}60` : "none",
                              }}
                            >
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            {isCurrent && (
                              <div
                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border border-[#05051a]"
                                style={{ background: p.color }}
                              >
                                <i className="ri-focus-3-line text-white" style={{ fontSize: "8px" }} />
                              </div>
                            )}
                            <span className="text-slate-500 text-center leading-tight" style={{ fontSize: "9px" }}>
                              {p.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-white/8 rounded-2xl p-5 bg-white/3 text-center">
                      <p className="font-orbitron font-bold text-2xl text-cyan-400">{user.xp.toLocaleString()}</p>
                      <p className="text-xs text-slate-400 mt-1">Total XP</p>
                    </div>
                    <div className="border border-white/8 rounded-2xl p-5 bg-white/3 text-center">
                      <p className="font-orbitron font-bold text-2xl text-emerald-400">
                        {user.totalQuestionsAnswered > 0
                          ? `${Math.round((user.totalCorrect / user.totalQuestionsAnswered) * 100)}%`
                          : "—"}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Accuracy</p>
                    </div>
                  </div>
                </div>
              )}

              {/* CUSTOMISE */}
              {tab === "customise" && (
                <div className="space-y-6">
                  <div className="border border-white/8 rounded-2xl p-6 bg-white/3">
                    <h3 className="font-orbitron font-semibold text-base text-white mb-2">Avatar Icon</h3>
                    <p className="text-xs text-slate-400 mb-5">Choose an icon that represents you across the platform.</p>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-6">
                      {AVATAR_ICONS.map((ico) => {
                        const selected = user.avatar === ico.id;
                        return (
                          <button
                            key={ico.id}
                            onClick={() => updateUser({ avatar: ico.id })}
                            title={ico.label}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all cursor-pointer ${
                              selected
                                ? "border-cyan-400/60 bg-cyan-400/10"
                                : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"
                            }`}
                          >
                            <div className="w-6 h-6 flex items-center justify-center">
                              <i className={`${ico.id} text-xl ${selected ? "text-cyan-400" : "text-slate-400"}`} />
                            </div>
                            <span className="text-xs text-slate-400 truncate w-full text-center">{ico.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <h3 className="font-orbitron font-semibold text-base text-white mb-2">Avatar Colour</h3>
                    <p className="text-xs text-slate-400 mb-4">Personalise your avatar background gradient.</p>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                      {AVATAR_GRADIENTS.map((g) => {
                        const selected = user.avatarGradient === g.id;
                        return (
                          <button
                            key={g.id}
                            onClick={() => updateUser({ avatarGradient: g.id })}
                            title={g.label}
                            className="flex flex-col items-center gap-1.5 cursor-pointer group"
                          >
                            <div
                              className={`w-10 h-10 rounded-full bg-gradient-to-br ${g.id} transition-all ${
                                selected ? "ring-2 ring-cyan-400 scale-110" : "opacity-60 hover:opacity-100 hover:scale-105"
                              }`}
                            />
                            <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{g.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Live preview */}
                    <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/8 flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${user.avatarGradient} border-2 border-white/20`}>
                        <i className={`${user.avatar} text-white text-xl`} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{user.username}</p>
                        <p className="text-xs text-slate-400">{user.planetRank} · {user.xp.toLocaleString()} XP</p>
                      </div>
                    </div>
                  </div>

                  {/* Theme */}
                  <div className="border border-white/8 rounded-2xl p-6 bg-white/3">
                    <h3 className="font-orbitron font-semibold text-base text-white mb-1">App Theme</h3>
                    <p className="text-xs text-slate-400 mb-5">Choose between dark and light mode across the entire app.</p>
                    <div className="grid grid-cols-2 gap-4">
                      {(["dark", "light"] as const).map((t) => {
                        const selected = theme === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                              selected
                                ? "border-cyan-400/60 bg-cyan-400/10"
                                : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"
                            }`}
                          >
                            {/* Mini preview */}
                            <div className={`w-full h-16 rounded-xl overflow-hidden border ${t === "dark" ? "bg-[#05051a] border-white/10" : "bg-white border-slate-200"}`}>
                              <div className={`h-4 w-full ${t === "dark" ? "bg-[#08082a] border-b border-white/8" : "bg-slate-100 border-b border-slate-200"}`} />
                              <div className="flex gap-1.5 p-2">
                                <div className={`h-2.5 rounded flex-1 ${t === "dark" ? "bg-white/10" : "bg-slate-200"}`} />
                                <div className={`h-2.5 rounded w-8 ${t === "dark" ? "bg-purple-600/60" : "bg-purple-500/50"}`} />
                              </div>
                              <div className="flex gap-1.5 px-2">
                                <div className={`h-2 rounded flex-1 ${t === "dark" ? "bg-white/6" : "bg-slate-100"}`} />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className={`${t === "dark" ? "ri-moon-line" : "ri-sun-line"} text-sm ${selected ? "text-cyan-400" : "text-slate-400"}`} />
                              </div>
                              <span className={`text-sm font-semibold capitalize ${selected ? "text-white" : "text-slate-400"}`}>
                                {t === "dark" ? "Dark" : "Light"} Mode
                              </span>
                              {selected && <i className="ri-checkbox-circle-fill text-cyan-400 text-sm" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Native Language */}
                  <div className="border border-white/8 rounded-2xl p-6 bg-white/3">
                    <h3 className="font-orbitron font-semibold text-base text-white mb-1">Chinese Translation</h3>
                    <p className="text-xs text-slate-400 mb-5">
                      When Chinese is enabled, <strong className="text-slate-300">Maths</strong> quiz questions and flashcard terms will show a Chinese translation in brackets alongside English. No other subjects are translated.
                      <br />
                      <span className="text-slate-500 mt-1 block">Example: "Solve: 3x + 7 = 22 <span className="text-slate-400">(解方程：3x + 7 = 22)</span>"</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const selected = (user.nativeLanguage ?? "none") === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => updateUser({ nativeLanguage: lang.code })}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                              selected
                                ? "border-cyan-400/60 bg-cyan-400/10"
                                : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"
                            }`}
                          >
                            <span className="text-xl flex-shrink-0">{lang.flag}</span>
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm font-semibold truncate ${selected ? "text-white" : "text-slate-300"}`}>
                                {lang.code === "none" ? "None" : lang.native}
                              </p>
                              <p className="text-xs text-slate-500 truncate">{lang.label}</p>
                            </div>
                            {selected && <i className="ri-checkbox-circle-fill text-cyan-400 text-sm flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {(user.nativeLanguage && user.nativeLanguage !== "none") && (() => {
                      const activeLang = SUPPORTED_LANGUAGES.find(l => l.code === user.nativeLanguage);
                      return (
                        <div className="mt-4 p-3 bg-cyan-400/5 border border-cyan-400/20 rounded-xl">
                          <p className="text-xs text-cyan-300 flex items-center gap-2">
                            <i className="ri-translate-2 text-sm" />
                            {activeLang?.flag} {activeLang?.native} translation active — Maths questions and flashcard terms show in brackets.
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* MY SUBJECTS */}
              {tab === "subjects" && user.qualification === "igcse" && (
                <div className="space-y-5">
                  {/* IGCSE Core — locked */}
                  <div className="border border-white/8 rounded-2xl p-5 bg-white/3">
                    <h3 className="font-orbitron font-semibold text-sm text-white mb-1">Core Subject</h3>
                    <p className="text-xs text-slate-400 mb-4">Mathematics is compulsory for all IGCSE students — it cannot be removed.</p>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-violet-500/30 bg-violet-500/10">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <i className="ri-calculator-line text-sm text-violet-400" />
                      </div>
                      <span className="text-sm font-semibold text-white flex-1">Mathematics</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 font-semibold">Core</span>
                      <i className="ri-lock-line text-slate-500 text-xs" />
                    </div>
                  </div>

                  {/* IGCSE Selectives */}
                  <div className="border border-white/8 rounded-2xl p-6 bg-white/3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-orbitron font-semibold text-base text-white">Selective Subjects</h3>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${selectedElectives.length === 3 ? "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" : "text-slate-400 border-white/10 bg-white/5"}`}>
                        {selectedElectives.length}/3 chosen
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-5">Choose exactly 3 subjects from the options below. These are the only elective options for IGCSE.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {IGCSE_SELECTIVE_INFO.map((s) => {
                        const selected = selectedElectives.includes(s.id);
                        const disabled = !selected && selectedElectives.length >= 3;
                        return (
                          <button
                            key={s.id}
                            onClick={() => {
                              if (selected) {
                                setSelectedElectives((prev) => prev.filter((e) => e !== s.id));
                              } else if (!disabled) {
                                setSelectedElectives((prev) => [...prev, s.id]);
                              }
                            }}
                            disabled={disabled}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer text-left ${
                              selected
                                ? `${s.bg} border-opacity-80`
                                : disabled
                                ? "border-white/5 bg-white/3 opacity-30 cursor-not-allowed"
                                : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"
                            }`}
                          >
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                              <i className={`${s.icon} text-base ${selected ? s.color : "text-slate-400"}`} />
                            </div>
                            <span className={`text-sm font-semibold flex-1 ${selected ? "text-white" : "text-slate-400"}`}>{s.name}</span>
                            {selected && <i className="ri-checkbox-circle-fill text-cyan-400 text-base" />}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => updateUser({ electiveSubjects: selectedElectives })}
                      className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold font-orbitron transition-all cursor-pointer"
                    >
                      Save Subject Selection
                    </button>
                  </div>
                </div>
              )}

              {tab === "subjects" && user.qualification === "alevel" && (
                <div className="border border-white/8 rounded-2xl p-6 bg-white/3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-orbitron font-semibold text-base text-white">A-Level Subjects</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      selectedALevelSubjects.length >= 3 && selectedALevelSubjects.length <= 4
                        ? "text-cyan-400 border-cyan-500/40 bg-cyan-500/10"
                        : "text-slate-400 border-white/10 bg-white/5"
                    }`}>
                      {selectedALevelSubjects.length}/4 chosen
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-5">A-Level has no required subjects — choose 3 or 4 subjects you are studying. No additional &apos;core&apos; subjects apply.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {ALEVEL_SUBJECT_INFO.map((s) => {
                      const selected = selectedALevelSubjects.includes(s.id);
                      const disabled = !selected && selectedALevelSubjects.length >= 4;
                      return (
                        <button
                          key={s.id}
                          onClick={() => {
                            if (selected) {
                              if (selectedALevelSubjects.length > 3) {
                                setSelectedALevelSubjects((prev) => prev.filter((e) => e !== s.id));
                              }
                            } else if (!disabled) {
                              setSelectedALevelSubjects((prev) => [...prev, s.id]);
                            }
                          }}
                          disabled={disabled && !selected}
                          className={`flex items-center gap-2 p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                            selected
                              ? "border-violet-400/50 bg-violet-400/10"
                              : disabled
                              ? "border-white/5 bg-white/3 opacity-30 cursor-not-allowed"
                              : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"
                          }`}
                        >
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                            <i className={`${s.icon} text-sm ${selected ? "text-violet-400" : "text-slate-400"}`} />
                          </div>
                          <span className={`text-xs font-semibold leading-tight ${selected ? "text-white" : "text-slate-400"}`}>{s.name}</span>
                          {selected && <i className="ri-checkbox-circle-fill text-violet-400 text-sm ml-auto flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  {selectedALevelSubjects.length < 3 && (
                    <p className="text-xs text-amber-400 mb-3 flex items-center gap-1.5">
                      <i className="ri-information-line" /> Please select at least 3 subjects before saving.
                    </p>
                  )}
                  <button
                    onClick={() => { if (selectedALevelSubjects.length >= 3) updateUser({ coreSubjects: selectedALevelSubjects, electiveSubjects: [] }); }}
                    disabled={selectedALevelSubjects.length < 3}
                    className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold font-orbitron transition-all cursor-pointer"
                  >
                    Save A-Level Subjects
                  </button>
                </div>
              )}

              {tab === "subjects" && !user.qualification && (
                <div className="border border-white/8 rounded-2xl p-10 bg-white/3 text-center">
                  <i className="ri-information-line text-3xl text-slate-500 mb-3 block" />
                  <p className="text-sm text-slate-400">No qualification set. Please complete onboarding or update your qualification in the Account tab.</p>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {tab === "notifications" && (
                <div className="border border-white/8 rounded-2xl p-6 bg-white/3 space-y-4">
                  <h3 className="font-orbitron font-semibold text-base text-white mb-1">Notification Preferences</h3>
                  {(["notifAchievements", "notifWeekly", "notifReminders"] as const).map((key) => {
                    const labels: Record<string, [string, string]> = {
                      notifAchievements: ["Achievement Unlocked", "Receive a notification each time you earn a badge"],
                      notifWeekly: ["Weekly Summary", "A weekly recap of your study activity and progress"],
                      notifReminders: ["Daily Reminders", "Gentle reminders to keep up your study routine"],
                    };
                    const val = user[key];
                    return (
                      <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/8">
                        <div>
                          <p className="text-sm font-semibold text-white">{labels[key][0]}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{labels[key][1]}</p>
                        </div>
                        <button
                          onClick={() => updateUser({ [key]: !val })}
                          className={`relative w-11 h-6 rounded-full transition-all duration-200 cursor-pointer flex-shrink-0 ${val ? "bg-cyan-500" : "bg-white/15"}`}
                        >
                          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${val ? "left-5" : "left-0.5"}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* PARENT EMAIL */}
              {tab === "parent" && (
                <div className="border border-white/8 rounded-2xl p-6 bg-white/3">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/8 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-send-line text-cyan-400 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-semibold text-base text-white">Parent / Guardian Updates</h3>
                      <p className="text-xs text-slate-400">Weekly reports sent every Sunday at 8:00pm</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                      Parent Email Address
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        value={parentEmail}
                        onChange={(e) => { setParentEmail(e.target.value); setEmailSaved(false); }}
                        placeholder="parent@example.com"
                        className="flex-1 rounded-xl px-4 py-3 text-sm bg-white/6 border border-white/12 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 transition-all"
                      />
                      <button
                        onClick={() => { updateUser({ parentEmail }); setEmailSaved(true); }}
                        className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap"
                      >
                        Save
                      </button>
                    </div>
                    {emailSaved && (
                      <p className="text-xs text-emerald-400 flex items-center gap-1">
                        <i className="ri-check-line" /> Email address saved.
                      </p>
                    )}
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                    <p className="text-xs font-semibold text-white mb-3">Weekly report includes:</p>
                    {[
                      "Total study time for the week",
                      "Subjects and topics studied",
                      "Quiz scores and accuracy",
                      "Achievements earned this week",
                      "Current rank and XP progress",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 mb-2 last:mb-0">
                        <i className="ri-checkbox-circle-line text-emerald-400 text-xs flex-shrink-0" />
                        <span className="text-xs text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACCOUNT */}
              {tab === "account" && (
                <div className="space-y-5">
                  <div className="border border-white/8 rounded-2xl p-6 bg-white/3 space-y-4">
                    <h3 className="font-orbitron font-semibold text-base text-white">Account Details</h3>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Display Name</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => { setDisplayName(e.target.value); setAccountSaved(false); }}
                        className="w-full rounded-xl px-4 py-3 text-sm bg-white/6 border border-white/12 text-white focus:outline-none focus:border-cyan-400/60 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Qualification</label>
                      <select
                        defaultValue={user.qualification ?? ""}
                        className="w-full rounded-xl px-4 py-3 text-sm bg-white/6 border border-white/12 text-white focus:outline-none focus:border-cyan-400/60 transition-all"
                      >
                        <option value="igcse" className="bg-[#05051a]">IGCSE</option>
                        <option value="alevel" className="bg-[#05051a]">A-Level</option>
                      </select>
                    </div>
                    <button
                      onClick={() => { updateUser({ username: displayName }); setAccountSaved(true); }}
                      className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold font-orbitron transition-all cursor-pointer"
                    >
                      Save Changes
                    </button>
                    {accountSaved && (
                      <p className="text-xs text-emerald-400 text-center flex items-center justify-center gap-1">
                        <i className="ri-check-line" /> Changes saved.
                      </p>
                    )}
                  </div>

                  <div className="border border-red-500/20 rounded-2xl p-6 bg-red-500/5">
                    <h3 className="font-orbitron font-semibold text-sm text-red-400 mb-4">Danger Zone</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-white/3 border border-red-500/15 rounded-xl">
                        <div>
                          <p className="text-sm font-semibold text-white">Reset Progress</p>
                          <p className="text-xs text-slate-400 mt-0.5">Wipes all XP, achievements, and study data</p>
                        </div>
                        <button className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap">
                          Reset
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/3 border border-red-500/15 rounded-xl">
                        <div>
                          <p className="text-sm font-semibold text-white">Sign Out</p>
                          <p className="text-xs text-slate-400 mt-0.5">Sign out of your account on this device</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
