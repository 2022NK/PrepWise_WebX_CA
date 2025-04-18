import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Menu, X, ChevronRight, Award, BarChart, Star } from 'lucide-react';
import Logo from '../assets/PrepLogo.png';
import Name from '../assets/PrepName.png';

interface StatItem {
  label: string;
  value: string;
  icon: React.ElementType;
}

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats: StatItem[] = [
    { label: 'Roadmap Completions', value: '1,500+', icon: BarChart },
    { label: 'Success Rate', value: '92%', icon: Award },
    { label: 'Active Users', value: '10,000+', icon: Star },
  ];

  const navItems: NavItem[] = [
    { to: "/roadmap", icon: MapPin, label: "Create Roadmap" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Enhanced Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/40 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center group cursor-pointer">
              <div className="flex-shrink-0">
                <img 
                  src={Logo} 
                  alt="PrepWise Logo" 
                  className="h-12 w-12 object-contain transform transition-all duration-300 group-hover:rotate-12 rounded-2xl"
                />
              </div>
              <div className="ml-3">
                <img 
                  src={Name} 
                  alt="PrepWise" 
                  className="h-8 object-contain transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center text-black hover:text-purple-600 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-purple-50"
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden bg-white/95 backdrop-blur-md`}>
          <div className="px-4 py-3 space-y-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center text-gray-700 hover:text-purple-600 p-3 rounded-lg transition-colors duration-200 hover:bg-purple-50"
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-600 bg-size-200 animate-gradient-x">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white space-y-8 animate-fade-in">
              <h1 className="text-5xl font-bold leading-tight">
                Your AI-Powered Learning Roadmap
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Get a personalized learning path tailored to your goals, learning style, and timeline with our advanced AI roadmap generator.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/roadmap" className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
                  Create Your Roadmap
                  <ChevronRight className="inline ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-white/10 backdrop-blur-lg rounded-2xl">
              {stats.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="text-white p-6 rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105"
                >
                  <Icon className="w-8 h-8 mb-4" />
                  <div className="text-3xl font-bold mb-2">{value}</div>
                  <div className="text-sm opacity-80">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#9333ea15_1px,transparent_1px),linear-gradient(to_bottom,#9333ea15_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(147,51,234,0.05),transparent)]" />
        
        {/* Content */}
        <div className="relative py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Use Our AI Roadmap Generator?</h2>
              <p className="text-xl text-gray-600">Create a personalized learning journey that fits your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Personalized Learning Paths",
                  description: "Get a customized roadmap based on your specific goals, learning speed, and experience level."
                },
                {
                  icon: Star,
                  title: "Expert Resources",
                  description: "Access curated learning resources including books, websites, and YouTube channels for each topic."
                },
                {
                  icon: BarChart,
                  title: "Structured Timeline",
                  description: "Follow a day-by-day plan with clear milestones to track your progress and stay motivated."
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white border border-gray-100 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  style={{ boxShadow: "0 6px 8px rgba(147, 51, 234, 0.3)" }}
                  onMouseEnter={() => setActiveSection(index)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div className="bg-purple-50 rounded-xl p-4 w-16 h-16 mb-6 transition-all duration-300 group-hover:bg-purple-100">
                    <feature.icon className={`w-8 h-8 transition-colors duration-300 ${
                      activeSection === index ? 'text-purple-600' : 'text-purple-500'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;