export interface LeaderboardEntry {
  rank: number;
  username: string;
  initials: string;
  planet: string;
  studyPoints: number;
  questionsAnswered: number;
  streak: number;
  change: number;
  isCurrentUser?: boolean;
}

export const STATIC_LEADERBOARD_PLAYERS: Omit<LeaderboardEntry, "rank" | "isCurrentUser">[] = [
  { username: "Emma W.", initials: "EW", planet: "Saturn", studyPoints: 1840, questionsAnswered: 892, streak: 28, change: 0 },
  { username: "Liam T.", initials: "LT", planet: "Jupiter", studyPoints: 1720, questionsAnswered: 840, streak: 21, change: 2 },
  { username: "Sophie K.", initials: "SK", planet: "Saturn", studyPoints: 1590, questionsAnswered: 786, streak: 19, change: -1 },
  { username: "James O.", initials: "JO", planet: "Jupiter", studyPoints: 1460, questionsAnswered: 721, streak: 14, change: 1 },
  { username: "Priya M.", initials: "PM", planet: "Mars", studyPoints: 1350, questionsAnswered: 668, streak: 12, change: -2 },
  { username: "Oliver B.", initials: "OB", planet: "Mars", studyPoints: 1280, questionsAnswered: 630, streak: 10, change: 3 },
  { username: "Amelia R.", initials: "AR", planet: "Jupiter", studyPoints: 1190, questionsAnswered: 590, streak: 16, change: 0 },
  { username: "Noah H.", initials: "NH", planet: "Earth", studyPoints: 1070, questionsAnswered: 528, streak: 8, change: 4 },
  { username: "Isla F.", initials: "IF", planet: "Mars", studyPoints: 980, questionsAnswered: 484, streak: 11, change: -1 },
  { username: "Ethan C.", initials: "EC", planet: "Earth", studyPoints: 890, questionsAnswered: 440, streak: 7, change: 2 },
  { username: "Chloe N.", initials: "CN", planet: "Venus", studyPoints: 820, questionsAnswered: 402, streak: 5, change: -3 },
  { username: "Jack D.", initials: "JD", planet: "Earth", studyPoints: 750, questionsAnswered: 372, streak: 9, change: 1 },
  { username: "Zara P.", initials: "ZP", planet: "Venus", studyPoints: 680, questionsAnswered: 335, streak: 6, change: 0 },
  { username: "Harry S.", initials: "HS", planet: "Earth", studyPoints: 610, questionsAnswered: 300, streak: 4, change: 5 },
  { username: "Mia L.", initials: "ML", planet: "Mercury", studyPoints: 540, questionsAnswered: 267, streak: 3, change: -2 },
  { username: "Oscar A.", initials: "OA", planet: "Venus", studyPoints: 490, questionsAnswered: 241, streak: 7, change: 1 },
  { username: "Grace V.", initials: "GV", planet: "Mercury", studyPoints: 420, questionsAnswered: 208, streak: 2, change: 0 },
  { username: "Alfie J.", initials: "AJ", planet: "Moon", studyPoints: 360, questionsAnswered: 178, streak: 4, change: 3 },
  { username: "Lily G.", initials: "LG", planet: "Moon", studyPoints: 310, questionsAnswered: 153, streak: 1, change: -1 },
  { username: "Finn B.", initials: "FB", planet: "Mercury", studyPoints: 260, questionsAnswered: 128, streak: 2, change: 2 },
];

/**
 * Build leaderboard with current user inserted at their actual rank.
 * studyPoints for user = totalQuestionsAnswered * 3 + streakDays * 5
 */
export function buildLeaderboard(
  userStudyPoints: number,
  username: string,
  planet: string,
  streak: number,
  questionsAnswered: number
): LeaderboardEntry[] {
  const initials = username
    .split(/[\s.]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  // Sort static players by study points desc
  const sorted = [...STATIC_LEADERBOARD_PLAYERS].sort((a, b) => b.studyPoints - a.studyPoints);

  // Find where user fits
  let userRankIdx = sorted.findIndex((p) => userStudyPoints > p.studyPoints);
  if (userRankIdx === -1) userRankIdx = sorted.length;

  const userEntry = {
    username,
    initials,
    planet,
    studyPoints: userStudyPoints,
    questionsAnswered,
    streak,
    change: 0,
    isCurrentUser: true,
  };

  const withUser = [
    ...sorted.slice(0, userRankIdx),
    userEntry,
    ...sorted.slice(userRankIdx),
  ];

  return withUser.map((entry, i) => ({ ...entry, rank: i + 1 }));
}
