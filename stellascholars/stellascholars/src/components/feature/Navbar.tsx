import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { PLANET_RANKS } from "../../mocks/subjects";

const NAV_LINKS = [
  { label: "Dashboard", path: "/dashboard", icon: "ri-dashboard-3-line" },
  { label: "Subjects", path: "/subjects", icon: "ri-book-2-line" },
  { label: "Mock Exam", path: "/mock-exam", icon: "ri-file-paper-2-line" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { tc, isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const planet = PLANET_RANKS.find((p) => p.name === (user?.planetRank ?? "Mercury"));
  const xpProgress = planet && user
    ? ((user.xp - planet.minXp) / (planet.maxXp - planet.minXp)) * 100
    : 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = isHome
    ? scrolled ? tc.navBg : "bg-transparent"
    : tc.navBg;

  const dropdownBg = isDark ? "bg-[#0d0d28] border-white/10" : "bg-white border-slate-200 shadow-lg";
  const dropdownText = isDark ? "text-slate-400 hover:text-white hover:bg-white/4" : "text-slate-600 hover:text-slate-900 hover:bg-gray-50";
  const mobileMenuBg = isDark ? "bg-[#08081f]/98 border-white/8" : "bg-white border-slate-200 shadow-sm";

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const initials = user ? user.username.slice(0, 2).toUpperCase() : "?";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <nav className="px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center animate-pulse-glow">
              <i className="ri-star-fill text-white text-xs" />
            </div>
          </div>
          <span className={`font-orbitron font-bold text-base whitespace-nowrap ${tc.navText}`}>
            Stella<span className="text-cyan-500">Scholars</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.path || location.pathname.startsWith(link.path + "/");
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    active ? tc.navLinkActive : tc.navLinkInactive
                  }`}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${link.icon} text-sm`} />
                  </div>
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              {/* XP Progress */}
              <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${isDark ? "bg-white/4 border border-white/8" : "bg-gray-100 border border-slate-200"}`}>
                <span className={`text-xs whitespace-nowrap font-medium ${tc.textMuted}`}>{user.planetRank}</span>
                <div className="w-20 h-1.5 progress-bar-track">
                  <div className="h-full progress-bar-fill" style={{ width: `${xpProgress}%` }} />
                </div>
                <span className="text-xs text-cyan-500 font-semibold whitespace-nowrap">{user.xp} XP</span>
              </div>

              {/* Avatar with dropdown */}
              <div className="relative group">
                <Link to="/profile" className="cursor-pointer block">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${user.avatarGradient}`}
                    style={{ boxShadow: `0 0 0 2px ${planet?.color}66, 0 0 10px ${planet?.color}33` }}
                  >
                    {user.avatar !== "ri-rocket-2-line" ? (
                      <i className={`${user.avatar} text-sm`} />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                </Link>
                <div className={`absolute right-0 top-full mt-2 w-44 ${dropdownBg} border rounded-xl shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
                  <div className={`px-3 py-2 border-b ${isDark ? "border-white/6" : "border-slate-100"}`}>
                    <p className={`text-xs font-semibold truncate ${tc.text}`}>{user.username}</p>
                    <p className={`text-xs ${tc.textDim}`}>{user.qualification?.toUpperCase() ?? "Not set"}</p>
                  </div>
                  <Link to="/profile" className={`flex items-center gap-2 px-3 py-2 text-xs transition-all cursor-pointer ${dropdownText}`}>
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-user-3-line" /></div> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/6 transition-all cursor-pointer"
                  >
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-logout-box-r-line" /></div> Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className={`px-4 py-2 text-sm transition-colors cursor-pointer font-medium whitespace-nowrap ${tc.navLinkInactive}`}>
                Sign In
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className={`md:hidden w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer ${isDark ? "bg-white/4 text-slate-300 hover:text-white" : "bg-gray-100 text-slate-600 hover:text-slate-900"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className={mobileOpen ? "ri-close-line text-lg" : "ri-menu-3-line text-lg"} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden border-b px-6 pb-4 ${mobileMenuBg}`}>
          {isAuthenticated ? (
            <>
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      active ? tc.navLinkActive : tc.navLinkInactive
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`${link.icon} text-base`} />
                    </div>
                    {link.label}
                  </Link>
                );
              })}
              <div className={`border-t mt-3 pt-3 flex items-center justify-between ${tc.border}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${user?.avatarGradient ?? "from-violet-600 to-cyan-600"}`}>
                    {initials}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${tc.text}`}>{user?.username}</p>
                    <p className={`text-xs ${tc.textMuted}`}>{user?.xp} XP · {user?.planetRank}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="text-xs text-red-400 cursor-pointer">Sign Out</button>
              </div>
            </>
          ) : (
            <div className="space-y-2 py-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className={`block px-3 py-3 text-sm font-medium cursor-pointer ${tc.navLinkInactive}`}>Sign In</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-3 bg-cyan-600/80 text-white text-sm font-semibold rounded-lg cursor-pointer text-center">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
