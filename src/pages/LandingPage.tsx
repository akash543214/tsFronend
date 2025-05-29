import Button from "../Components/Assets/Button";
import { CheckCircleIcon } from "lucide-react";
import FeatureCard from '../Components/Assets/Card';
import Footer from "@/Components/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100">
        <div className="text-center mt-10">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Streamline Your Projects, Boost Productivity
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Manage tasks, collaborate with teams, and track progress efficiently with ProjectFlow. Your all-in-one project management solution.
          </p>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg">
            Start Free Trial
          </Button>
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
          <FeatureCard icon={<CheckCircleIcon size={24} />} title="Task Management" description="Easily assign, track, and complete tasks with an intuitive interface." />
          <FeatureCard icon={<CheckCircleIcon size={24} />} title="Team Collaboration" description="Communicate and collaborate with your team in real time." />
          <FeatureCard icon={<CheckCircleIcon size={24} />} title="Progress Tracking" description="Monitor progress and deadlines with detailed reports." />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
