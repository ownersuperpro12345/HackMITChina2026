export const ACHIEVEMENTS = [
  /* Milestones */
  { id: "first-question", name: "First Contact", description: "Answer your very first question", icon: "ri-question-line", rarity: "Common", xpReward: 10, category: "Milestones", unlocked: false, progress: 0, total: 1 },
  { id: "first-essay", name: "Wordsmith", description: "Complete your first essay question", icon: "ri-quill-pen-line", rarity: "Common", xpReward: 25, category: "Milestones", unlocked: false, progress: 0, total: 1 },
  { id: "questions-100", name: "Century Scorer", description: "Answer 100 questions", icon: "ri-checkbox-multiple-line", rarity: "Common", xpReward: 75, category: "Milestones", unlocked: false, progress: 0, total: 100 },
  { id: "questions-500", name: "Knowledge Machine", description: "Answer 500 questions", icon: "ri-database-2-line", rarity: "Rare", xpReward: 200, category: "Milestones", unlocked: false, progress: 0, total: 500 },
  { id: "questions-1000", name: "Grand Inquisitor", description: "Answer 1,000 questions", icon: "ri-award-line", rarity: "Epic", xpReward: 500, category: "Milestones", unlocked: false, progress: 0, total: 1000 },
  { id: "reach-mars", name: "Red Planet Pioneer", description: "Reach the Mars planet rank", icon: "ri-rocket-line", rarity: "Rare", xpReward: 100, category: "Milestones", unlocked: false, progress: 0, total: 1 },
  { id: "reach-saturn", name: "Ring Master", description: "Reach the Saturn planet rank", icon: "ri-planet-line", rarity: "Epic", xpReward: 250, category: "Milestones", unlocked: false, progress: 0, total: 1 },
  { id: "reach-sun", name: "Solar Sovereign", description: "Reach the Sun — the highest rank", icon: "ri-sun-line", rarity: "Legendary", xpReward: 1000, category: "Milestones", unlocked: false, progress: 0, total: 1 },

  /* Streaks */
  { id: "streak-3", name: "Habit Starter", description: "Maintain a 3-day study streak", icon: "ri-fire-line", rarity: "Common", xpReward: 20, category: "Streaks", unlocked: false, progress: 0, total: 3 },
  { id: "streak-7", name: "Week Warrior", description: "Maintain a 7-day study streak", icon: "ri-fire-line", rarity: "Common", xpReward: 50, category: "Streaks", unlocked: false, progress: 0, total: 7 },
  { id: "streak-14", name: "Fortnight Fighter", description: "Maintain a 14-day study streak", icon: "ri-fire-fill", rarity: "Rare", xpReward: 100, category: "Streaks", unlocked: false, progress: 0, total: 14 },
  { id: "streak-30", name: "Monthly Master", description: "Maintain a 30-day study streak", icon: "ri-meteor-line", rarity: "Epic", xpReward: 250, category: "Streaks", unlocked: false, progress: 0, total: 30 },

  /* Mastery */
  { id: "perfect-quiz", name: "Perfect Score", description: "Get 100% on any quiz", icon: "ri-medal-line", rarity: "Rare", xpReward: 80, category: "Mastery", unlocked: false, progress: 0, total: 1 },
  { id: "perfect-quiz-3", name: "Triple Perfection", description: "Get 100% on 3 different quizzes", icon: "ri-trophy-line", rarity: "Epic", xpReward: 200, category: "Mastery", unlocked: false, progress: 0, total: 3 },
  { id: "topic-complete-5", name: "Topic Trailblazer", description: "Complete 5 full topics", icon: "ri-map-line", rarity: "Common", xpReward: 60, category: "Mastery", unlocked: false, progress: 0, total: 5 },
  { id: "topic-complete-25", name: "Subject Scholar", description: "Complete 25 full topics", icon: "ri-book-2-line", rarity: "Rare", xpReward: 180, category: "Mastery", unlocked: false, progress: 0, total: 25 },
  { id: "all-subjects", name: "Renaissance Scholar", description: "Study at least 1 topic in every subject", icon: "ri-book-open-line", rarity: "Epic", xpReward: 350, category: "Mastery", unlocked: false, progress: 0, total: 12 },
  { id: "flashcard-50", name: "Card Starter", description: "Complete 50 flashcard reviews", icon: "ri-stack-line", rarity: "Common", xpReward: 30, category: "Mastery", unlocked: false, progress: 0, total: 50 },
  { id: "flashcard-100", name: "Card Collector", description: "Complete 100 flashcard reviews", icon: "ri-stack-line", rarity: "Rare", xpReward: 80, category: "Mastery", unlocked: false, progress: 0, total: 100 },
  { id: "mock-exam-1", name: "Trial Run", description: "Complete your first mock exam", icon: "ri-file-paper-2-line", rarity: "Common", xpReward: 30, category: "Mastery", unlocked: false, progress: 0, total: 1 },
  { id: "mock-exam-5", name: "Exam Ready", description: "Complete 5 mock exams", icon: "ri-file-paper-fill", rarity: "Rare", xpReward: 100, category: "Mastery", unlocked: false, progress: 0, total: 5 },

  /* Leaderboard */
  { id: "leaderboard-top20", name: "Rising Star", description: "Reach the top 20 on the leaderboard", icon: "ri-bar-chart-box-line", rarity: "Common", xpReward: 50, category: "Leaderboard", unlocked: false, progress: 0, total: 1 },
  { id: "leaderboard-top10", name: "Elite Scholar", description: "Reach the top 10 on the leaderboard", icon: "ri-bar-chart-fill", rarity: "Rare", xpReward: 150, category: "Leaderboard", unlocked: false, progress: 0, total: 1 },
  { id: "leaderboard-top5", name: "Top 5 Titan", description: "Reach the top 5 on the leaderboard", icon: "ri-trophy-fill", rarity: "Epic", xpReward: 300, category: "Leaderboard", unlocked: false, progress: 0, total: 1 },
  { id: "leaderboard-top1", name: "The Champion", description: "Reach #1 on the leaderboard", icon: "ri-award-fill", rarity: "Legendary", xpReward: 750, category: "Leaderboard", unlocked: false, progress: 0, total: 1 },

  /* Special */
  { id: "night-owl", name: "Night Owl", description: "Study after 10pm five times", icon: "ri-moon-line", rarity: "Rare", xpReward: 80, category: "Special", unlocked: false, progress: 0, total: 5 },
  { id: "early-bird", name: "Early Bird", description: "Study before 7am five times", icon: "ri-sun-line", rarity: "Rare", xpReward: 80, category: "Special", unlocked: false, progress: 0, total: 5 },
  { id: "study-marathon", name: "Study Marathon", description: "Study for over 3 hours in a single day", icon: "ri-time-line", rarity: "Epic", xpReward: 150, category: "Special", unlocked: false, progress: 0, total: 1 },
];

export const ACHIEVEMENT_CATEGORIES = ["All", "Milestones", "Streaks", "Mastery", "Leaderboard", "Special"];

export const RARITY_COLORS: Record<string, string> = {
  Common: "text-slate-600 bg-slate-100 border-slate-300",
  Rare: "text-purple-600 bg-purple-100 border-purple-300",
  Epic: "text-violet-600 bg-violet-100 border-violet-300",
  Legendary: "text-amber-600 bg-amber-100 border-amber-300",
};

/**
 * Check which achievements should be newly unlocked based on current user stats.
 * Returns array of achievement IDs that should be unlocked.
 */
export function checkAchievements(stats: {
  totalQuestionsAnswered: number;
  streakDays: number;
  perfectQuizCount: number;
  topicsCompleted: number;
  flashcardsReviewed: number;
  mockExamsCompleted: number;
  leaderboardRank: number;
  planetRank: string;
  xp: number;
  unlockedAchievements: string[];
}): string[] {
  const newUnlocks: string[] = [];
  const already = new Set(stats.unlockedAchievements);

  const check = (id: string, condition: boolean) => {
    if (condition && !already.has(id)) newUnlocks.push(id);
  };

  check("first-question", stats.totalQuestionsAnswered >= 1);
  check("questions-100", stats.totalQuestionsAnswered >= 100);
  check("questions-500", stats.totalQuestionsAnswered >= 500);
  check("questions-1000", stats.totalQuestionsAnswered >= 1000);
  check("streak-3", stats.streakDays >= 3);
  check("streak-7", stats.streakDays >= 7);
  check("streak-14", stats.streakDays >= 14);
  check("streak-30", stats.streakDays >= 30);
  check("perfect-quiz", stats.perfectQuizCount >= 1);
  check("perfect-quiz-3", stats.perfectQuizCount >= 3);
  check("topic-complete-5", stats.topicsCompleted >= 5);
  check("topic-complete-25", stats.topicsCompleted >= 25);
  check("flashcard-50", stats.flashcardsReviewed >= 50);
  check("flashcard-100", stats.flashcardsReviewed >= 100);
  check("mock-exam-1", stats.mockExamsCompleted >= 1);
  check("mock-exam-5", stats.mockExamsCompleted >= 5);
  check("reach-mars", ["Mars", "Jupiter", "Saturn", "Sun"].includes(stats.planetRank));
  check("reach-saturn", ["Saturn", "Sun"].includes(stats.planetRank));
  check("reach-sun", stats.planetRank === "Sun");
  check("leaderboard-top20", stats.leaderboardRank > 0 && stats.leaderboardRank <= 20);
  check("leaderboard-top10", stats.leaderboardRank > 0 && stats.leaderboardRank <= 10);
  check("leaderboard-top5", stats.leaderboardRank > 0 && stats.leaderboardRank <= 5);
  check("leaderboard-top1", stats.leaderboardRank === 1);

  return newUnlocks;
}
