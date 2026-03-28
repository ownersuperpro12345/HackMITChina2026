import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";

import { buildLeaderboard, LeaderboardEntry } from "../../mocks/leaderboard";
import { PLANET_RANKS } from "../../mocks/subjects";
import { useAuth } from "../../contexts/AuthContext";

type Tab = "overall" | "thisweek";

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("overall");

  const userStudyPoints = user
    ? user.totalQuestionsAnswered * 3 + user.streakDays * 5
    : 0;
  const userPlanet = user?.planetRank ?? "Moon";
  const userUsername = user?.username ?? "You";
  const userStreak = user?.streakDays ?? 0;
  const userQuestionsAnswered = user?.totalQuestionsAnswered ?? 0;

  const leaderboard = useMemo(
    () =>
      buildLeaderboard(
        userStudyPoints,
        userUsername,
        userPlanet,
        userStreak,
        userQuestionsAnswered
      ),
    [userStudyPoints, userUsername, userPlanet, userStreak, userQuestionsAnswered]
  );

  const me = leaderboard.find((e) => e.isCurrentUser);
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const getPlanetColor = (planet: string) => {
    const rank = PLANET_RANKS.find((r) => r.name === planet);
    return rank?.color ?? "#94a3b8";
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-amber-100 text-amber-700 border-amber-300";
    if (rank === 2) return "bg-slate-100 text-slate-600 border-slate-300";
    if (rank === 3) return "bg-orange-100 text-orange-700 border-orange-300";
    return "bg-purple-50 text-purple-700 border-purple-200";
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">

        {/* Header */}
        <div className="bg-gradient-to-br from-purple-50 to-white border-b border-purple-100 px-6 lg:px-10 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 border border-purple-200 rounded-full mb-3">
                  <div className="w-3 h-3 flex items-center justify-center"><i className="ri-trophy-line text-purple-600 text-xs" /></div>
                  <span className="text-xs text-purple-700 font-semibold">Leaderboard</span>
                </div>
                <h1 className="font-orbitron font-bold text-3xl text-slate-900 mb-2">Top Learners</h1>
                <p className="text-slate-600 text-sm">Ranked by study points — earned through questions answered and daily streaks.</p>
              </div>

              {/* Your rank card */}
              {me && (
                <div className="bg-white border-2 border-purple-200 rounded-2xl px-6 py-4 min-w-[220px]">
                  <p className="text-xs text-slate-500 mb-1 font-medium">Your Rank</p>
                  <div className="flex items-center gap-3">
                    <span className="font-orbitron font-black text-3xl text-purple-600">#{me.rank}</span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{me.username}</p>
                      <p className="text-xs text-slate-500">{me.studyPoints.toLocaleString()} pts · {me.planet}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{me.questionsAnswered} questions</span>
                    <span>{me.streak}d streak 🔥</span>
                  </div>
                </div>
              )}
            </div>

            {/* How points are earned */}
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { icon: "ri-question-answer-line", label: "Each question answered = 3 pts" },
                { icon: "ri-fire-line", label: "Each streak day = 5 pts" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600">
                  <div className="w-3 h-3 flex items-center justify-center"><i className={`${item.icon} text-purple-500`} /></div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8">
          {/* Tabs */}
          <div className="inline-flex bg-slate-100 rounded-xl p-1 mb-8">
            {(["overall", "thisweek"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${tab === t ? "bg-white text-slate-900 border border-slate-200" : "text-slate-500 hover:text-slate-700"}`}
              >
                {t === "overall" ? "All Time" : "This Week"}
              </button>
            ))}
          </div>

          {tab === "thisweek" && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center"><i className="ri-information-line text-amber-600" /></div>
                <p className="text-sm text-amber-800">Weekly rankings reset every Monday. Keep studying to climb the board!</p>
              </div>
            </div>
          )}

          {/* Top 3 Podium */}
          {leaderboard.length >= 3 && (
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[top3[1], top3[0], top3[2]].map((entry, pos) => {
                if (!entry) return <div key={pos} />;
                const podiumColors = [
                  "border-slate-300 bg-slate-50",
                  "border-amber-300 bg-amber-50",
                  "border-orange-300 bg-orange-50",
                ];
                const rankColors = ["text-slate-500", "text-amber-600", "text-orange-500"];
                const orders = [2, 1, 3];
                const isMe = entry.isCurrentUser;
                return (
                  <div
                    key={entry.rank}
                    className={`flex flex-col items-center p-5 rounded-2xl border-2 text-center transition-all ${podiumColors[pos]} ${pos === 1 ? "mt-0 ring-2 ring-amber-300/50" : "mt-5"} ${isMe ? "ring-2 ring-purple-400/60" : ""}`}
                  >
                    <span className={`font-orbitron font-black text-3xl mb-3 ${rankColors[pos]}`}>#{orders[pos]}</span>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white mb-2 flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${getPlanetColor(entry.planet)}, ${getPlanetColor(entry.planet)}aa)` }}
                    >
                      {entry.initials}
                    </div>
                    <p className={`font-semibold text-sm ${isMe ? "text-purple-700" : "text-slate-900"}`}>{entry.username}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{entry.planet}</p>
                    <p className={`font-orbitron font-bold text-base mt-2 ${rankColors[pos]}`}>{entry.studyPoints.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">study pts</p>
                    {entry.streak > 0 && <p className="text-xs text-orange-500 mt-1">{entry.streak}d 🔥</p>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Full Leaderboard Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-orbitron font-semibold text-sm text-slate-900">Full Rankings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-5 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider w-16">Rank</th>
                    <th className="text-left px-3 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Learner</th>
                    <th className="text-right px-3 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider hidden sm:table-cell">Planet</th>
                    <th className="text-right px-3 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Points</th>
                    <th className="text-right px-3 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider hidden md:table-cell">Questions</th>
                    <th className="text-right px-5 py-3 text-xs text-slate-500 font-semibold uppercase tracking-wider hidden md:table-cell">Streak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rest.map((entry: LeaderboardEntry) => {
                    const isMe = entry.isCurrentUser;
                    return (
                      <tr
                        key={`${entry.rank}-${entry.username}`}
                        className={`transition-colors ${isMe ? "bg-purple-50 border-l-4 border-l-purple-400" : "hover:bg-slate-50"}`}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-flex items-center justify-center w-8 h-6 rounded-lg border text-xs font-bold ${getRankBadge(entry.rank)}`}>
                              {entry.rank}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${isMe ? "ring-2 ring-purple-400" : ""}`}
                              style={{ background: `linear-gradient(135deg, ${getPlanetColor(entry.planet)}, #9333ea88)` }}
                            >
                              {entry.initials}
                            </div>
                            <span className={`text-sm font-semibold whitespace-nowrap ${isMe ? "text-purple-700" : "text-slate-900"}`}>
                              {entry.username} {isMe && <span className="text-xs font-normal text-purple-400">(You)</span>}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 text-right hidden sm:table-cell">
                          <span className="text-xs text-slate-500 font-medium">{entry.planet}</span>
                        </td>
                        <td className="px-3 py-3.5 text-right">
                          <span className={`font-orbitron font-bold text-sm ${isMe ? "text-purple-600" : "text-slate-900"}`}>
                            {entry.studyPoints.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-right hidden md:table-cell">
                          <span className="text-xs text-slate-500">{entry.questionsAnswered.toLocaleString()}</span>
                        </td>
                        <td className="px-5 py-3.5 text-right hidden md:table-cell">
                          {entry.streak > 0 ? (
                            <span className="text-xs text-orange-500 font-semibold">{entry.streak}d 🔥</span>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "ri-question-answer-line", title: "Answer Questions", desc: "Every question answered earns 3 study points", color: "text-purple-600 bg-purple-50 border-purple-200" },
              { icon: "ri-fire-line", title: "Build Your Streak", desc: "Each day of your streak adds 5 bonus points", color: "text-orange-600 bg-orange-50 border-orange-200" },
              { icon: "ri-trophy-line", title: "Earn Achievements", desc: "Hit leaderboard milestones for bonus XP rewards", color: "text-amber-600 bg-amber-50 border-amber-200" },
            ].map((tip) => (
              <div key={tip.title} className={`flex gap-3 p-4 border rounded-xl ${tip.color}`}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <i className={`${tip.icon} text-lg`} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">{tip.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA if not logged in */}
          {!user && (
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 text-center">
              <h3 className="font-orbitron font-bold text-slate-900 text-lg mb-2">Join the Leaderboard</h3>
              <p className="text-slate-600 text-sm mb-4">Sign up and start studying to earn study points and appear in the rankings.</p>
              <Link to="/signup" className="inline-block px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap">
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
