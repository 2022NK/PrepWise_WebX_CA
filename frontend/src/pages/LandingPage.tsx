"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Confetti from "../components/ui/confetti";
import Particles from "../components/ui/particles";
import ScrollProgress from "../components/ui/scroll-progress";
import WordPullUp from "../components/ui/word-pull-up";
import Navbar from "../components/ui/navbar";
import TypingAnimation from "../components/ui/typing-animation";
import { Book, Calendar, Target, Sparkles, ArrowRight } from 'lucide-react';

function App() {
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const navigate = useNavigate();

  const handleConfetti = () => {
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 3000);
  };

  const handleGetStarted = () => {
    handleConfetti();
    navigate("/auth");
  };

  const goToRoadmap = () => {
    navigate("/roadmap");
  };

  // Feature cards data
  const features = [
    {
      title: "Personalized Roadmaps",
      description: "Get a custom learning path tailored to your specific goals, speed, and experience level",
      icon: Target,
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "AI-Powered Planning",
      description: "Our advanced AI creates a detailed day-by-day study plan with milestones to track progress",
      icon: Sparkles,
      color: "from-indigo-500 to-indigo-700"
    },
    {
      title: "Expert Resources",
      description: "Access curated books, websites, and YouTube channels recommended for each topic",
      icon: Book,
      color: "from-violet-500 to-violet-700"
    },
    {
      title: "Flexible Timeline",
      description: "Set your own start and end dates to create a schedule that works for your availability",
      icon: Calendar,
      color: "from-fuchsia-500 to-fuchsia-700"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      text: "The personalized roadmap made my JEE preparation so much more efficient!",
      name: "Raj Kumar",
      role: "JEE Advanced, AIR 342"
    },
    {
      text: "I was overwhelmed with GATE preparation until I found this roadmap generator.",
      name: "Priya Singh",
      role: "GATE CS, 99.2 percentile"
    },
    {
      text: "The structured approach helped me crack UPSC in my first attempt.",
      name: "Ankit Sharma",
      role: "UPSC CSE, Rank 127"
    }
  ];

  return (
    <div className="relative font-inter bg-black text-white min-h-screen">
      <Navbar />
      <Particles 
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={50}
        ease={50}
      />
      <ScrollProgress />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="text-center space-y-6 max-w-4xl px-4">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            <TypingAnimation>
              AI-Powered Learning Roadmaps
            </TypingAnimation>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 drop-shadow-md max-w-2xl mx-auto">
            Get a personalized learning path tailored to your goals, learning style, and timeline for competitive exams like JEE, UPSC, GATE, and more
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              Create Your Roadmap
            </button>
            <a
              href="#features"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full shadow-lg hover:bg-white/10 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <WordPullUp>How It Works</WordPullUp>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {[
              { number: "01", title: "Choose Your Exam", description: "Select the competitive exam you're preparing for (JEE, UPSC, GATE, etc.)" },
              { number: "02", title: "Set Your Parameters", description: "Specify your learning speed, experience level, and timeline" },
              { number: "03", title: "Generate Roadmap", description: "Our AI creates a personalized learning path just for you" },
              { number: "04", title: "Track Progress", description: "Follow your day-by-day plan to reach your goals effectively" }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-7 left-full w-full transform -translate-x-6">
                    <ArrowRight className="text-purple-600 w-12 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <WordPullUp>Why Choose Our Roadmap Generator?</WordPullUp>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            <WordPullUp>Success Stories</WordPullUp>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative"
              >
                <div className="absolute -top-5 left-6 text-6xl text-purple-600/30">"</div>
                <p className="text-gray-300 mb-6 relative z-10">{testimonial.text}</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-purple-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-10 max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Learning Path?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Generate a personalized, AI-powered roadmap in minutes and start your journey toward success.
            </p>
            <button
              onClick={goToRoadmap}
              className="px-10 py-5 bg-purple-600 text-white font-semibold rounded-full text-xl shadow-lg hover:scale-110 transition-transform"
            >
              Create Your Roadmap Now
            </button>
          </div>
        </div>
      </section>

      {/* Confetti Effect */}
      {confettiTrigger && <Confetti />}
    </div>
  );
}

export default App;
