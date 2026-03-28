import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PLANET_RANKS } from "../mocks/subjects";

export interface SubjectProgress {
  subjectId: string;
  topicsCompleted: number;
  totalTopics: number;
  lastStudied: string;
  quizScores: { topicId: string; score: number; total: number; date: string }[];
}

export interface ActivityItem {
  type: "quiz" | "lesson" | "essay" | "flashcards" | "exam";
  subject: string;
  topic: string;
  score?: number;
  total?: number;
  xpEarned: number;
  time: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  qualification: "igcse" | "alevel" | null;
  coreSubjects: string[];
  electiveSubjects: string[];
  avatar: string;
  avatarGradient: string;
  xp: number;
  planetRank: string;
  league: string;
  streakDays: number;
  longestStreak: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  studyTimeWeekMinutes: number;
  studyTimeMonthMinutes: number;
  topicsCompleted: number;
  subjectProgress: SubjectProgress[];
  unlockedAchievements: string[];
  recentActivity: ActivityItem[];
  parentEmail: string;
  notifAchievements: boolean;
  notifLeague: boolean;
  notifWeekly: boolean;
  notifReminders: boolean;
  onboardingComplete: boolean;
  theme?: "dark" | "light";
  createdAt: string;
  lastActiveDate: string;
  nativeLanguage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
  completeOnboarding: (qualification: "igcse" | "alevel", coreSubjects: string[], electiveSubjects: string[]) => void;
  recordStudySession: (opts: { minutes?: number; questionsAnswered?: number; correct?: number; xp?: number }) => void;
}

export interface SignupData {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "stellascholars_users";
const SESSION_KEY = "stellascholars_session";

function getStoredUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function computePlanetRank(xp: number): string {
  for (let i = PLANET_RANKS.length - 1; i >= 0; i--) {
    if (xp >= PLANET_RANKS[i].minXp) return PLANET_RANKS[i].name;
  }
  return "Mercury";
}

function computeLeague(studyPoints: number): string {
  if (studyPoints >= 3500) return "Cosmic Titans";
  if (studyPoints >= 2000) return "Supernova Elites";
  if (studyPoints >= 1000) return "Nebula Knights";
  if (studyPoints >= 500) return "Star Climbers";
  if (studyPoints >= 200) return "Orbit Rookies";
  return "Small Planets";
}

function createNewUser(data: SignupData): User {
  return {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    username: data.username,
    email: "",
    passwordHash: data.password,
    qualification: null,
    coreSubjects: [],
    electiveSubjects: [],
    avatar: "ri-rocket-2-line",
    avatarGradient: "from-violet-600 to-cyan-600",
    xp: 0,
    planetRank: "Mercury",
    league: "Small Planets",
    streakDays: 0,
    longestStreak: 0,
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    studyTimeWeekMinutes: 0,
    studyTimeMonthMinutes: 0,
    topicsCompleted: 0,
    subjectProgress: [],
    unlockedAchievements: [],
    recentActivity: [],
    parentEmail: "",
    notifAchievements: true,
    notifLeague: true,
    notifWeekly: true,
    notifReminders: true,
    onboardingComplete: false,
    createdAt: new Date().toISOString(),
    lastActiveDate: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      const users = getStoredUsers();
      const found = users.find((u) => u.id === sessionId);
      if (found) setUser(found);
    }
    setIsLoading(false);
    // NOTE: Supabase integration point — when connected, fetch user from server here
    // and merge with local data, prioritising server data
  }, []);

  const saveUser = useCallback((u: User) => {
    const users = getStoredUsers();
    const idx = users.findIndex((x) => x.id === u.id);
    if (idx >= 0) users[idx] = u;
    else users.push(u);
    saveUsers(users);
    setUser(u);
    // NOTE: Supabase integration point — also upsert to Supabase here when online
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find(
      (u) => (u.email === identifier.toLowerCase() || u.username.toLowerCase() === identifier.toLowerCase()) && u.passwordHash === password
    );
    if (!found) return { success: false, error: "Invalid username/email or password." };
    localStorage.setItem(SESSION_KEY, found.id);
    setUser(found);
    return { success: true };
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    const users = getStoredUsers();
    if (users.find((u) => u.username.toLowerCase() === data.username.toLowerCase())) {
      return { success: false, error: "This username is already taken." };
    }
    const newUser = createNewUser(data);
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, newUser.id);
    setUser(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const recordStudySession = useCallback((opts: {
    minutes?: number;
    questionsAnswered?: number;
    correct?: number;
    xp?: number;
  }) => {
    setUser((prev) => {
      if (!prev) return prev;
      const today = new Date().toDateString();
      const lastActive = prev.lastActiveDate ? new Date(prev.lastActiveDate).toDateString() : null;
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      let newStreak = prev.streakDays;
      if (lastActive !== today) {
        if (lastActive === yesterday) {
          newStreak = prev.streakDays + 1;
        } else {
          newStreak = 1; // reset streak if missed a day
        }
      }

      const added = {
        studyTimeWeekMinutes: prev.studyTimeWeekMinutes + (opts.minutes ?? 0),
        studyTimeMonthMinutes: prev.studyTimeMonthMinutes + (opts.minutes ?? 0),
        totalQuestionsAnswered: prev.totalQuestionsAnswered + (opts.questionsAnswered ?? 0),
        totalCorrect: prev.totalCorrect + (opts.correct ?? 0),
        xp: prev.xp + (opts.xp ?? 0),
        streakDays: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: new Date().toISOString(),
      };

      const updated: User = { ...prev, ...added };
      updated.planetRank = computePlanetRank(updated.xp);
      updated.league = computeLeague(updated.studyTimeMonthMinutes / 5);
      saveUser(updated);
      return updated;
    });
  }, [saveUser]);

  const updateUser = useCallback((partial: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated: User = { ...prev, ...partial };
      updated.planetRank = computePlanetRank(updated.xp);
      updated.league = computeLeague(updated.studyTimeMonthMinutes / 5);
      saveUser(updated);
      return updated;
    });
  }, [saveUser]);

  const completeOnboarding = useCallback((
    qualification: "igcse" | "alevel",
    coreSubjects: string[],
    electiveSubjects: string[]
  ) => {
    updateUser({ qualification, coreSubjects, electiveSubjects, onboardingComplete: true });
  }, [updateUser]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout, updateUser, completeOnboarding, recordStudySession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
