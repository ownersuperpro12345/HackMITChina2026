import Navbar from "../../components/feature/Navbar";
import DashboardHeader from "./components/DashboardHeader";
import SubjectProgress from "./components/SubjectProgress";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-8">
          <SubjectProgress />
        </div>
      </main>
    </div>
  );
}
