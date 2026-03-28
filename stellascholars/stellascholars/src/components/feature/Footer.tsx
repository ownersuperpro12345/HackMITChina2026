import { Link } from "react-router-dom";

const SUBJECT_LINKS = [
  { label: "Mathematics", path: "/subjects/maths" },
  { label: "English Language", path: "/subjects/english-lang" },
  { label: "English Literature", path: "/subjects/english-lit" },
  { label: "Biology", path: "/subjects/biology" },
  { label: "Chemistry", path: "/subjects/chemistry" },
  { label: "Physics", path: "/subjects/physics" },
];

const FEATURE_LINKS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Leaderboards", path: "/leaderboard" },
  { label: "Achievements", path: "/achievements" },
  { label: "Profile", path: "/profile" },
];

export default function Footer() {
  return (
    <footer className="bg-[#030310] border-t border-white/6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <i className="ri-star-fill text-white text-xs"></i>
              </div>
              <span className="font-orbitron font-bold text-base text-white">
                Stella<span className="text-gradient-cyan">Scholars</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              The gamified GCSE revision platform that turns studying into an epic space adventure.
            </p>
            <div className="flex items-center gap-3">
              {["ri-twitter-x-line", "ri-instagram-line", "ri-tiktok-line", "ri-youtube-line"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/4 hover:bg-white/8 border border-white/8 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <i className={`${icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-orbitron text-sm font-semibold text-white mb-4">Subjects</h4>
            <ul className="space-y-2.5">
              {SUBJECT_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-orbitron text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {FEATURE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Planet Progress teaser */}
          <div>
            <h4 className="font-orbitron text-sm font-semibold text-white mb-4">Your Journey</h4>
            <div className="space-y-2">
              {["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn"].map((planet, i) => (
                <div key={planet} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${i <= 3 ? "bg-cyan-400" : "bg-white/15"}`}></div>
                  <span className={`text-xs ${i <= 3 ? "text-slate-300" : "text-slate-600"}`}>{planet}</span>
                </div>
              ))}
              <p className="text-xs text-slate-600 mt-1">+ 5 more ranks to conquer...</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/6 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">© 2025 StellaScholars. Built for GCSE students across the UK.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">Terms of Use</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">Help Centre</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
