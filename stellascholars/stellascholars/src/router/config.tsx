import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Dashboard from "../pages/dashboard/page";
import SubjectsPage from "../pages/subjects/page";
import SubjectDetailPage from "../pages/subject-detail/page";
import TopicDetailPage from "../pages/topic-detail/page";
import LessonPage from "../pages/lesson/page";
import QuizPage from "../pages/quiz/page";
import EssayPage from "../pages/essay/page";
import FlashcardsPage from "../pages/flashcards/page";
import AchievementsPage from "../pages/achievements/page";
import ProfilePage from "../pages/profile/page";
import LoginPage from "../pages/login/page";
import SignupPage from "../pages/signup/page";
import OnboardingPage from "../pages/onboarding/page";
import MockExamPage from "../pages/mock-exam/page";
import PastPapersPage from "../pages/past-papers/page";
import ProtectedRoute from "../components/feature/ProtectedRoute";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute requireOnboarding={false}>
        <OnboardingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subjects",
    element: (
      <ProtectedRoute>
        <SubjectsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subjects/:subjectId",
    element: (
      <ProtectedRoute>
        <SubjectDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subjects/:subjectId/:topicId",
    element: (
      <ProtectedRoute>
        <TopicDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lesson/:lessonId",
    element: (
      <ProtectedRoute>
        <LessonPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz/:quizId",
    element: (
      <ProtectedRoute>
        <QuizPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/essay/:essayId",
    element: (
      <ProtectedRoute>
        <EssayPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/flashcards/:setId",
    element: (
      <ProtectedRoute>
        <FlashcardsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mock-exam",
    element: (
      <ProtectedRoute>
        <MockExamPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/past-papers",
    element: (
      <ProtectedRoute>
        <PastPapersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/past-papers/:subjectId",
    element: (
      <ProtectedRoute>
        <PastPapersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/achievements",
    element: (
      <ProtectedRoute>
        <AchievementsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  { path: "/leaderboard", element: <Navigate to="/dashboard" replace /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
