import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface ThemeClasses {
  page: string;
  section: string;
  card: string;
  cardHover: string;
  text: string;
  textMuted: string;
  textDim: string;
  border: string;
  navBg: string;
  navText: string;
  navLinkActive: string;
  navLinkInactive: string;
  input: string;
  badge: string;
}

interface ThemeContextType {
  theme: "dark" | "light";
  isDark: boolean;
  setTheme: (t: "dark" | "light") => void;
  tc: ThemeClasses;
}

const DARK: ThemeClasses = {
  page: "bg-[#05051a] text-white",
  section: "bg-[#08081f]",
  card: "border border-white/8 bg-white/3",
  cardHover: "hover:bg-white/6 hover:border-white/15",
  text: "text-white",
  textMuted: "text-slate-400",
  textDim: "text-slate-500",
  border: "border-white/8",
  navBg: "bg-[#05051a]/95 backdrop-blur-xl border-b border-white/8",
  navText: "text-white",
  navLinkActive: "text-cyan-400 bg-cyan-400/10",
  navLinkInactive: "text-slate-300 hover:text-white hover:bg-white/6",
  input: "bg-white/6 border border-white/12 text-white placeholder:text-slate-500 focus:border-cyan-400/60",
  badge: "bg-white/8 border border-white/12 text-slate-300",
};

const LIGHT: ThemeClasses = {
  page: "bg-gray-50 text-slate-900",
  section: "bg-white",
  card: "border border-slate-200 bg-white",
  cardHover: "hover:bg-gray-50 hover:border-slate-300",
  text: "text-slate-900",
  textMuted: "text-slate-500",
  textDim: "text-slate-400",
  border: "border-slate-200",
  navBg: "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm",
  navText: "text-slate-900",
  navLinkActive: "text-purple-600 bg-purple-50",
  navLinkInactive: "text-slate-600 hover:text-slate-900 hover:bg-gray-100",
  input: "bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-purple-400",
  badge: "bg-slate-100 border border-slate-200 text-slate-600",
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_STORAGE_KEY = "stellascholars_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, updateUser } = useAuth();

  const getInitialTheme = (): "dark" | "light" => {
    if (user?.theme) return user.theme;
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") return stored;
    } catch (_) { /* ignore */ }
    return "dark";
  };

  const [theme, setThemeState] = useState<"dark" | "light">(getInitialTheme);

  // Keep in sync when user loads
  useEffect(() => {
    if (user?.theme && user.theme !== theme) {
      setThemeState(user.theme);
    }
  }, [user?.theme]);

  // Apply classes + data-theme to root and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "dark") {
      root.classList.add("theme-dark");
      root.classList.remove("theme-light");
      root.setAttribute("data-theme", "dark");
      body.setAttribute("data-theme", "dark");
    } else {
      root.classList.add("theme-light");
      root.classList.remove("theme-dark");
      root.setAttribute("data-theme", "light");
      body.setAttribute("data-theme", "light");
    }
    try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch (_) { /* ignore */ }
  }, [theme]);

  const setTheme = (t: "dark" | "light") => {
    setThemeState(t);
    try { localStorage.setItem(THEME_STORAGE_KEY, t); } catch (_) { /* ignore */ }
    if (user) updateUser({ theme: t });
  };

  const tc = theme === "dark" ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", setTheme, tc }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
