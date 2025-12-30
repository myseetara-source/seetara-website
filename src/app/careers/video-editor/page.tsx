'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Camera, Video, ArrowLeft, MapPin, Clock, Briefcase, 
  CheckCircle2, Star, Sparkles, Film, Clapperboard,
  Send, Phone, User, FileText, ChevronDown, ChevronUp,
  Monitor, Palette, Zap, Trophy, Heart, Play, 
  Layers, Wand2, Eye, Target, Rocket, Gift,
  Coffee, Bus, TrendingUp, Award, Users, Building2,
  ArrowRight, CircleDollarSign, Calendar, ChevronRight
} from 'lucide-react';

// Tool icons for video editors - Adobe Creative Cloud style
const editorTools = [
  { name: 'Adobe Premiere Pro', bgColor: '#00005B', borderColor: '#9999FF', letter: 'Pr', textColor: '#9999FF' },
  { name: 'After Effects', bgColor: '#00005B', borderColor: '#9999FF', letter: 'Ae', textColor: '#9999FF' },
  { name: 'DaVinci Resolve', bgColor: '#1a1a1a', borderColor: '#FF6B4A', letter: 'Da', textColor: '#FF6B4A' },
  { name: 'Final Cut Pro', bgColor: '#1a1a1a', borderColor: '#FFFFFF', letter: 'X', textColor: '#FFFFFF' },
  { name: 'Photoshop', bgColor: '#001E36', borderColor: '#31A8FF', letter: 'Ps', textColor: '#31A8FF' },
  { name: 'Lightroom', bgColor: '#001E36', borderColor: '#31A8FF', letter: 'Lr', textColor: '#31A8FF' },
];

const requirements = [
  { text: 'Professional DSLR camera operation experience', icon: Camera, delay: 0 },
  { text: 'Expert in Adobe Premiere Pro / Final Cut Pro', icon: Film, delay: 100 },
  { text: 'After Effects & Motion Graphics skills', icon: Sparkles, delay: 200 },
  { text: 'Product photography & videography experience', icon: Clapperboard, delay: 300 },
  { text: 'Understanding of social media video formats', icon: Monitor, delay: 400 },
  { text: 'Creative eye for color grading & aesthetics', icon: Palette, delay: 500 },
];

const responsibilities = [
  { text: 'Shoot high-quality product videos for bags & accessories', icon: Video },
  { text: 'Edit engaging reels, TikToks, and promotional content', icon: Film },
  { text: 'Operate DSLR cameras for photo & video shoots', icon: Camera },
  { text: 'Create stunning motion graphics & transitions', icon: Wand2 },
  { text: 'Collaborate with marketing team on content strategy', icon: Users },
  { text: 'Maintain consistent brand visual identity', icon: Eye },
];

const benefits = [
  { icon: CircleDollarSign, title: 'रु. 15,550+', desc: 'Starting Salary', color: 'from-green-400 to-emerald-500' },
  { icon: TrendingUp, title: '10% Yearly', desc: 'Salary Increment', color: 'from-blue-400 to-indigo-500' },
  { icon: Bus, title: 'Bus Fare', desc: 'Travel Allowance', color: 'from-amber-400 to-orange-500' },
  { icon: Coffee, title: 'Khaja', desc: 'Daily Snacks', color: 'from-pink-400 to-rose-500' },
];

const whyJoinReasons = [
  { icon: Rocket, title: 'Fast Growth', desc: 'Performance-based promotions' },
  { icon: Palette, title: 'Creative Freedom', desc: 'Your ideas matter here' },
  { icon: Trophy, title: 'Recognition', desc: 'Your work gets noticed' },
  { icon: Users, title: 'Amazing Team', desc: 'Supportive environment' },
  { icon: Gift, title: 'Perks', desc: 'Festivals bonuses & more' },
  { icon: Target, title: 'Learning', desc: 'Grow your skills daily' },
];

const dayInLife = [
  { time: '10:00 AM', activity: 'Morning briefing & content planning', icon: Coffee },
  { time: '11:00 AM', activity: 'Product photoshoot session', icon: Camera },
  { time: '1:00 PM', activity: 'Lunch break with team', icon: Users },
  { time: '2:00 PM', activity: 'Video editing & post-production', icon: Film },
  { time: '4:00 PM', activity: 'Review & creative brainstorming', icon: Sparkles },
  { time: '6:00 PM', activity: 'Wrap up & next day prep', icon: CheckCircle2 },
];

export default function VideoEditorPage() {
  const [showFullRequirements, setShowFullRequirements] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    experience: '',
    portfolio: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [scrollY, setScrollY] = useState(0);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll tracking for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const scrollToApply = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFBF7] via-[#FDF8F3] to-[#F5EDE6] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E8DDD4] px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Link href="/careers" className="flex items-center gap-2 text-[#5D3A1A] hover:text-[#8B5A2B] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <Image
            src="https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/logo/logo.png"
            alt="Seetara"
            width={80}
            height={28}
            className="h-7 w-auto"
          />
          <div className="w-16" />
        </div>
      </header>

      {/* Hero Banner with Parallax */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 px-4 py-10 md:py-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-10 left-5 w-32 h-32 border-2 border-white/20 rounded-full"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white/10 rounded-full"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          />
          
          {/* Floating Tool Icons */}
          <div className="absolute top-16 right-8 animate-float">
            <div className="w-12 h-12 bg-[#9999FF]/30 backdrop-blur-sm rounded-lg flex items-center justify-center text-white font-bold text-sm border border-white/20">
              Pr
            </div>
          </div>
          <div className="absolute bottom-20 left-8 animate-float delay-300">
            <div className="w-10 h-10 bg-[#9999FF]/30 backdrop-blur-sm rounded-lg flex items-center justify-center text-white font-bold text-xs border border-white/20">
              Ae
            </div>
          </div>
          <div className="absolute top-32 left-1/4 animate-bounce-subtle">
            <Camera className="w-8 h-8 text-white/20" />
          </div>
          <div className="absolute bottom-32 right-1/4 animate-pulse">
            <Film className="w-10 h-10 text-white/15" />
          </div>
        </div>

        <div className="relative text-center">
          {/* Urgent Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 border border-white/30 animate-pulse">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="text-sm font-bold text-white">🔥 URGENTLY HIRING</span>
          </div>

          {/* Main Icon */}
          <div className="w-24 h-24 mx-auto mb-5 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl animate-float">
            <Camera className="w-12 h-12 text-white" />
          </div>

          {/* Title with Animation */}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight animate-fade-in">
            Video Editor &<br />DSLR Camera Operator
          </h1>
          <p className="text-white/90 text-xl font-medium mb-2 animate-fade-in delay-100">
            भिडियो एडिटर र DSLR अपरेटर
          </p>
          <p className="text-white/80 text-sm max-w-xs mx-auto animate-fade-in delay-200">
            Join Nepal&apos;s fastest-growing premium bag brand!
          </p>

          {/* Meta Tags */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap animate-fade-in delay-300">
            <span className="flex items-center gap-1.5 text-white text-xs bg-white/15 px-3 py-1.5 rounded-full border border-white/20">
              <MapPin className="w-3.5 h-3.5" /> Tahachal, KTM
            </span>
            <span className="flex items-center gap-1.5 text-white text-xs bg-white/15 px-3 py-1.5 rounded-full border border-white/20">
              <Clock className="w-3.5 h-3.5" /> Full-time
            </span>
            <span className="flex items-center gap-1.5 text-white text-xs bg-white/15 px-3 py-1.5 rounded-full border border-white/20">
              <Building2 className="w-3.5 h-3.5" /> Work from Office
            </span>
          </div>
        </div>
      </section>

      {/* Editor Tools Section */}
      <section className="px-4 py-6 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl p-5 shadow-xl border border-[#E8DDD4]">
          <h3 className="text-center text-sm font-bold text-[#5D3A1A] mb-4">
            🎬 Tools You&apos;ll Master
          </h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {editorTools.map((tool, i) => (
              <div 
                key={tool.name}
                className="group relative"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Adobe Creative Cloud Style Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg shadow-xl transform hover:scale-110 transition-all cursor-pointer border-2 hover:shadow-2xl"
                  style={{ 
                    backgroundColor: tool.bgColor,
                    borderColor: tool.borderColor,
                    color: tool.textColor,
                  }}
                >
                  {tool.letter}
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#2C1810] text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {tool.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salary & Benefits Banner */}
      <section 
        id="salary-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('salary-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 shadow-xl text-white overflow-hidden relative">
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
          </div>
          
          <div className="relative">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CircleDollarSign className="w-6 h-6" />
              💰 Salary & Benefits
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, i) => (
                <div 
                  key={benefit.title}
                  className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <benefit.icon className="w-6 h-6 mb-1" />
                  <p className="font-bold text-base">{benefit.title}</p>
                  <p className="text-white/80 text-xs">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-white/90 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Performance-based promotions & bonuses!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Your Journey */}
      <section 
        id="journey-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('journey-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#E8DDD4]">
          <h2 className="text-xl font-bold text-[#2C1810] mb-2 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-amber-500" />
            Your Journey Starts Here
          </h2>
          <p className="text-[#5D3A1A] text-sm mb-5">
            तपाईंको creative journey यहाँ सुरु हुन्छ! 🚀
          </p>

          {/* Timeline Story */}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-orange-400 to-red-400" />
            
            {[
              { month: 'Month 1-2', title: 'Learn & Adapt', desc: 'Master our style, tools & workflow', icon: Target },
              { month: 'Month 3-6', title: 'Create & Grow', desc: 'Lead projects, build portfolio', icon: TrendingUp },
              { month: 'Month 6+', title: 'Lead & Inspire', desc: 'Mentor juniors, shape brand vision', icon: Trophy },
            ].map((step, i) => (
              <div 
                key={step.month}
                className="relative pl-12 pb-6 last:pb-0"
                style={{ 
                  opacity: visibleSections.has('journey-section') ? 1 : 0,
                  transform: visibleSections.has('journey-section') ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.5s ease ${i * 200}ms`
                }}
              >
                <div className="absolute left-2 top-0 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <step.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                  <span className="text-xs font-bold text-amber-600">{step.month}</span>
                  <h4 className="font-bold text-[#2C1810] mt-1">{step.title}</h4>
                  <p className="text-[#5D3A1A] text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A Day in Life */}
      <section 
        id="day-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('day-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
          <h2 className="text-lg font-bold text-[#2C1810] mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            📅 A Day in Your Life at Seetara
          </h2>
          
          <div className="space-y-3">
            {dayInLife.map((item, i) => (
              <div 
                key={item.time}
                className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-amber-100"
                style={{ 
                  opacity: visibleSections.has('day-section') ? 1 : 0,
                  transform: visibleSections.has('day-section') ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.4s ease ${i * 80}ms`
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-amber-600">{item.time}</span>
                  <p className="text-[#2C1810] text-sm font-medium">{item.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section 
        id="requirements-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('requirements-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#E8DDD4]">
          <h2 className="text-lg font-bold text-[#2C1810] mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Requirements — के चाहिन्छ?
          </h2>
          
          <div className="space-y-3">
            {requirements.slice(0, showFullRequirements ? requirements.length : 4).map((req, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 p-3 bg-gradient-to-r from-[#FFFBF7] to-[#F5EDE6] rounded-xl border border-[#E8DDD4]"
                style={{ 
                  opacity: visibleSections.has('requirements-section') ? 1 : 0,
                  transform: visibleSections.has('requirements-section') ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.4s ease ${i * 100}ms`
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <req.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[#5D3A1A] text-sm pt-2">{req.text}</p>
              </div>
            ))}
          </div>

          {requirements.length > 4 && (
            <button
              onClick={() => setShowFullRequirements(!showFullRequirements)}
              className="w-full mt-4 py-2 text-amber-600 font-medium text-sm flex items-center justify-center gap-1 hover:text-amber-700 transition-colors"
            >
              {showFullRequirements ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Show More <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </section>

      {/* Responsibilities */}
      <section 
        id="responsibilities-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('responsibilities-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#E8DDD4]">
          <h2 className="text-lg font-bold text-[#2C1810] mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" />
            What You&apos;ll Do — के गर्नु पर्छ?
          </h2>
          
          <div className="grid gap-3">
            {responsibilities.map((item, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100"
                style={{ 
                  opacity: visibleSections.has('responsibilities-section') ? 1 : 0,
                  transform: visibleSections.has('responsibilities-section') ? 'scale(0.95)' : 'scale(1)',
                  transition: `all 0.3s ease ${i * 80}ms`
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-[#5D3A1A] text-sm pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Seetara */}
      <section 
        id="why-join-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('why-join-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-gradient-to-br from-[#8B5A2B] to-[#5D3A1A] rounded-2xl p-5 shadow-xl text-white">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-300" />
            Why Join Seetara? ✨
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {whyJoinReasons.map((reason, i) => (
              <div 
                key={reason.title}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                style={{ 
                  opacity: visibleSections.has('why-join-section') ? 1 : 0,
                  transform: visibleSections.has('why-join-section') ? 'scale(1)' : 'scale(0.9)',
                  transition: `all 0.4s ease ${i * 100}ms`
                }}
              >
                <reason.icon className="w-7 h-7 text-[#C9A227] mb-2" />
                <h3 className="font-bold text-sm">{reason.title}</h3>
                <p className="text-white/70 text-xs">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section 
        id="location-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('location-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#E8DDD4]">
          <h2 className="text-lg font-bold text-[#2C1810] mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            📍 Office Location
          </h2>
          
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
            <p className="text-[#2C1810] font-bold text-base mb-1">Work from Office</p>
            <p className="text-[#5D3A1A] text-sm mb-3">
              Bishnumati Track Rd, Tahachal<br />
              Kathmandu, Nepal 🇳🇵
            </p>
            <div className="flex items-center gap-2 text-sm text-[#7A6252]">
              <Bus className="w-4 h-4" />
              <span>Bus fare included in benefits!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="px-4 py-6">
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl p-6 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative">
            <p className="text-2xl font-bold mb-2">
              &ldquo;Create content that inspires&rdquo;
            </p>
            <p className="text-white/90 text-sm">
              Your creativity will reach thousands of customers daily!
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section 
        id="apply-form" 
        data-animate
        className={`px-4 py-8 bg-gradient-to-b from-[#8B5A2B] to-[#5D3A1A] transition-all duration-700 ${visibleSections.has('apply-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3 border border-white/30">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
            <span className="text-sm font-bold text-white">Ready to Create?</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Apply Now! 🎬
          </h2>
          <p className="text-white/80 text-sm">
            तपाईंको creative journey सुरु गर्नुहोस्!
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#2C1810] mb-2">Application Sent! 🎉</h3>
            <p className="text-[#5D3A1A] text-sm mb-4">
              Thank you for applying! हामी छिट्टै सम्पर्क गर्नेछौं।
            </p>
            <Link 
              href="/careers"
              className="inline-flex items-center gap-2 text-[#8B5A2B] font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> View Other Positions
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 shadow-xl space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                Full Name — पूरा नाम *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5A2B]" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                Phone Number — फोन नम्बर *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5A2B]" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="98XXXXXXXX"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                Years of Experience — अनुभव *
              </label>
              <select
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm transition-all bg-white"
              >
                <option value="">Select experience level</option>
                <option value="fresher">Fresher (0-1 year)</option>
                <option value="junior">Junior (1-2 years)</option>
                <option value="mid">Mid-level (2-4 years)</option>
                <option value="senior">Senior (4+ years)</option>
              </select>
            </div>

            {/* Portfolio Link */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                Portfolio / Sample Work Link
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5A2B]" />
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  placeholder="YouTube, Drive, or Portfolio link"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                Why do you want to join Seetara?
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about yourself and why you're interested..."
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-70 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <section className="px-4 py-6 text-center bg-[#FFFBF7]">
        <Link 
          href="/careers"
          className="inline-flex items-center gap-2 text-[#8B5A2B] hover:text-[#C9A227] text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> View All Open Positions
        </Link>
        
        <div className="mt-4">
          <Image
            src="https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/logo/logo.png"
            alt="Seetara"
            width={80}
            height={28}
            className="h-6 w-auto mx-auto opacity-50"
          />
          <p className="text-[#7A6252] text-xs mt-2">
            © {new Date().getFullYear()} Seetara Nepal
          </p>
        </div>
      </section>

      {/* Mobile App Style Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-white/80 backdrop-blur-lg border-t border-[#E8DDD4] safe-area-inset-bottom">
        <button
          onClick={scrollToApply}
          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98] transition-transform animate-pulse-scale"
        >
          <Send className="w-6 h-6" />
          Apply Now — अहिले Apply गर्नुहोस्!
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}
