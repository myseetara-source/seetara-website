'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, Video, ArrowLeft, MapPin, Clock, Briefcase, 
  CheckCircle2, Star, Heart, Music, MessageCircle,
  Send, Phone, User, Link2, ChevronDown, ChevronUp,
  TrendingUp, Mic, Smile, Crown, Palette, Camera,
  Bus, Coffee, Gift, Rocket, Trophy, Users,
  CircleDollarSign, Calendar, Building2, Target,
  Play, Eye, Zap, Award, ChevronRight, ArrowRight
} from 'lucide-react';

// Creator tools icons - Authentic app style
const creatorTools = [
  { name: 'TikTok', bgGradient: 'linear-gradient(135deg, #000000 0%, #25F4EE 50%, #FE2C55 100%)', icon: '♪', textColor: '#FFFFFF' },
  { name: 'CapCut', bgGradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', icon: '✂', textColor: '#FFFFFF', hasBorder: true },
  { name: 'Instagram', bgGradient: 'linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #FCAF45 100%)', icon: '📷', textColor: '#FFFFFF' },
  { name: 'Canva', bgGradient: 'linear-gradient(135deg, #00C4CC 0%, #7B2CBF 100%)', icon: '◈', textColor: '#FFFFFF' },
  { name: 'Reels', bgGradient: 'linear-gradient(135deg, #405DE6 0%, #833AB4 50%, #E1306C 100%)', icon: '▶', textColor: '#FFFFFF' },
];

const requirements = [
  { text: 'Fluent communication skills in Nepali & English', icon: MessageCircle, delay: 0 },
  { text: 'Experience creating viral TikTok content', icon: TrendingUp, delay: 100 },
  { text: 'Creative storytelling & on-camera presence', icon: Mic, delay: 200 },
  { text: 'Understanding of trends & viral formats', icon: Sparkles, delay: 300 },
  { text: 'Comfortable appearing on camera', icon: Camera, delay: 400 },
  { text: 'Good personality & presentation skills', icon: Smile, delay: 500 },
];

const responsibilities = [
  { text: 'Create engaging TikTok videos for Seetara products', icon: Video },
  { text: 'Drive organic sales through creative content', icon: TrendingUp },
  { text: 'Develop viral video concepts & storytelling', icon: Sparkles },
  { text: 'Present products with confidence & style', icon: Crown },
  { text: 'Follow trends and adapt to new formats quickly', icon: Zap },
  { text: 'Build authentic connection with audience', icon: Heart },
];

const benefits = [
  { icon: CircleDollarSign, title: 'रु. 15,550+', desc: 'Starting Salary', color: 'from-green-400 to-emerald-500' },
  { icon: Award, title: 'Performance', desc: 'Based Promotion', color: 'from-purple-400 to-pink-500' },
  { icon: Bus, title: 'Bus Fare', desc: 'Travel Allowance', color: 'from-amber-400 to-orange-500' },
  { icon: Coffee, title: 'Khaja', desc: 'Daily Snacks', color: 'from-pink-400 to-rose-500' },
];

const whyYouReasons = [
  { icon: Crown, title: 'Be a Brand Face', desc: 'Become the face of a premium brand' },
  { icon: TrendingUp, title: 'Grow Followers', desc: 'Build your personal brand' },
  { icon: Camera, title: 'Pro Photoshoots', desc: 'Free professional content' },
  { icon: Gift, title: 'Free Products', desc: 'Access to latest bags' },
  { icon: Rocket, title: 'Career Growth', desc: 'Performance promotions' },
  { icon: Heart, title: 'Fun Team', desc: 'Supportive environment' },
];

const idealCandidate = [
  { emoji: '👩', text: 'Female, age 18-30' },
  { emoji: '📱', text: 'Active on TikTok' },
  { emoji: '🎯', text: 'Goal-oriented' },
  { emoji: '✨', text: 'Good looking & confident' },
  { emoji: '🗣️', text: 'Excellent communication' },
  { emoji: '💡', text: 'Creative mindset' },
];

const dayInLife = [
  { time: '10:00 AM', activity: 'Content planning & trend research', icon: Sparkles },
  { time: '11:00 AM', activity: 'Video shooting session', icon: Camera },
  { time: '1:00 PM', activity: 'Lunch & team vibes', icon: Coffee },
  { time: '2:00 PM', activity: 'Editing with CapCut', icon: Video },
  { time: '4:00 PM', activity: 'Post & engage with audience', icon: Heart },
  { time: '5:00 PM', activity: 'Review performance & plan next', icon: TrendingUp },
];

const successStories = [
  { views: '50K+', label: 'Views/Video', icon: Eye },
  { views: '10K+', label: 'Followers', icon: Users },
  { views: '500+', label: 'Daily Sales', icon: TrendingUp },
];

export default function ContentCreatorPage() {
  const [showFullRequirements, setShowFullRequirements] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    tiktok: '',
    experience: '',
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
    <main className="min-h-screen bg-gradient-to-b from-[#FFFBF7] via-[#FDF8F3] to-[#F5EDE6] pb-24">
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
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 px-4 py-10 md:py-16">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-10 left-5 w-32 h-32 border-2 border-white/20 rounded-full"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white/10 rounded-full"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          />
          
          {/* Floating Icons */}
          <div className="absolute top-20 right-8 animate-float text-3xl">🎵</div>
          <div className="absolute bottom-24 left-8 animate-float delay-300 text-2xl">✨</div>
          <div className="absolute top-32 left-1/4 animate-bounce-subtle text-2xl">📱</div>
          <div className="absolute bottom-32 right-1/4 animate-pulse text-3xl">💖</div>
          <Heart className="absolute top-16 left-12 w-8 h-8 text-white/20 animate-pulse" />
          <Music className="absolute bottom-20 right-16 w-10 h-10 text-white/15 animate-float" />
        </div>

        <div className="relative text-center">
          {/* Female Only Badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-2 border border-white/30">
            <Crown className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-bold text-white">👩 FEMALE ONLY</span>
          </div>
          
          {/* Urgent Badge */}
          <div className="inline-flex items-center gap-1.5 bg-yellow-400 px-3 py-1 rounded-full mb-4 ml-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-red-700">🔥 URGENTLY HIRING</span>
          </div>

          {/* Main Icon */}
          <div className="w-24 h-24 mx-auto mb-5 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl animate-float">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight animate-fade-in">
            TikTok Content Creator
          </h1>
          <p className="text-white/90 text-xl font-medium mb-2 animate-fade-in delay-100">
            कन्टेन्ट क्रिएटर — महिला मात्र 👩
          </p>
          <p className="text-white/80 text-sm max-w-xs mx-auto animate-fade-in delay-200">
            Create viral videos & become the face of Seetara!
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

      {/* Creator Tools Section */}
      <section className="px-4 py-6 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl p-5 shadow-xl border border-[#E8DDD4]">
          <h3 className="text-center text-sm font-bold text-[#5D3A1A] mb-4">
            📱 Tools You&apos;ll Use
          </h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {creatorTools.map((tool, i) => (
              <div 
                key={tool.name}
                className="group relative"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Authentic App Style Icon */}
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl transform hover:scale-110 transition-all cursor-pointer hover:shadow-2xl ${tool.hasBorder ? 'border-2 border-white/30' : ''}`}
                  style={{ 
                    background: tool.bgGradient,
                    color: tool.textColor,
                  }}
                >
                  <span className="drop-shadow-lg">{tool.icon}</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#2C1810] text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {tool.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="px-4 py-4">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-5 text-white">
          <h3 className="text-center text-sm font-bold mb-4">✨ What You Can Achieve</h3>
          <div className="grid grid-cols-3 gap-3">
            {successStories.map((stat, i) => (
              <div key={stat.label} className="text-center bg-white/15 rounded-xl p-3 backdrop-blur-sm border border-white/20">
                <stat.icon className="w-6 h-6 mx-auto mb-1" />
                <p className="font-bold text-xl">{stat.views}</p>
                <p className="text-white/80 text-xs">{stat.label}</p>
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
                >
                  <benefit.icon className="w-6 h-6 mb-1" />
                  <p className="font-bold text-base">{benefit.title}</p>
                  <p className="text-white/80 text-xs">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 space-y-1">
              <p className="text-sm text-white/90 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Performance-based promotions!
              </p>
              <p className="text-xs text-white/70">
                Note: 0% annual increment, but fast promotions based on performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Candidate */}
      <section 
        id="ideal-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('ideal-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-200">
          <h2 className="text-lg font-bold text-[#2C1810] mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-pink-500" />
            We&apos;re Looking For — को चाहिन्छ?
          </h2>
          
          <div className="grid grid-cols-2 gap-2">
            {idealCandidate.map((item, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl p-3 border border-pink-100 flex items-center gap-2"
                style={{ 
                  opacity: visibleSections.has('ideal-section') ? 1 : 0,
                  transform: visibleSections.has('ideal-section') ? 'translateX(0)' : 'translateX(-10px)',
                  transition: `all 0.3s ease ${i * 80}ms`
                }}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-[#5D3A1A] text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story - Your Journey */}
      <section 
        id="journey-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('journey-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#E8DDD4]">
          <h2 className="text-xl font-bold text-[#2C1810] mb-2 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-pink-500" />
            Your Journey to Fame ✨
          </h2>
          <p className="text-[#5D3A1A] text-sm mb-5">
            तपाईंको star बन्ने यात्रा यहाँ सुरु! 🌟
          </p>

          {/* Timeline Story */}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 via-rose-400 to-red-400" />
            
            {[
              { month: 'Week 1-2', title: 'Learn the Brand', desc: 'Understand Seetara style & products', icon: Target },
              { month: 'Month 1', title: 'Create & Post', desc: 'Start creating viral content', icon: Video },
              { month: 'Month 2-3', title: 'Go Viral', desc: 'Your videos start trending', icon: TrendingUp },
              { month: 'Month 6+', title: 'Become a Star', desc: 'You\'re the face of Seetara!', icon: Crown },
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
                <div className="absolute left-2 top-0 w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                  <step.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
                  <span className="text-xs font-bold text-pink-600">{step.month}</span>
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
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-200">
          <h2 className="text-lg font-bold text-[#2C1810] mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-500" />
            📅 A Day as Content Creator
          </h2>
          
          <div className="space-y-3">
            {dayInLife.map((item, i) => (
              <div 
                key={item.time}
                className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-pink-100"
                style={{ 
                  opacity: visibleSections.has('day-section') ? 1 : 0,
                  transform: visibleSections.has('day-section') ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.4s ease ${i * 80}ms`
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-pink-600">{item.time}</span>
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
            Skills Required — के चाहिन्छ?
          </h2>
          
          <div className="space-y-3">
            {requirements.slice(0, showFullRequirements ? requirements.length : 4).map((req, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100"
                style={{ 
                  opacity: visibleSections.has('requirements-section') ? 1 : 0,
                  transform: visibleSections.has('requirements-section') ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.4s ease ${i * 100}ms`
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <req.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-[#5D3A1A] text-sm pt-2">{req.text}</p>
              </div>
            ))}
          </div>

          {requirements.length > 4 && (
            <button
              onClick={() => setShowFullRequirements(!showFullRequirements)}
              className="w-full mt-4 py-2 text-pink-600 font-medium text-sm flex items-center justify-center gap-1 hover:text-pink-700 transition-colors"
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

      {/* What You'll Do */}
      <section 
        id="responsibilities-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('responsibilities-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#E8DDD4]">
          <h2 className="text-lg font-bold text-[#2C1810] mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            What You&apos;ll Do — के गर्नु पर्छ?
          </h2>
          
          <div className="grid gap-3">
            {responsibilities.map((item, i) => (
              <div 
                key={i} 
                className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100"
              >
                <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-yellow-600" />
                </div>
                <p className="text-[#5D3A1A] text-sm pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Role is Amazing */}
      <section 
        id="why-section" 
        data-animate
        className={`px-4 py-6 transition-all duration-700 ${visibleSections.has('why-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-gradient-to-br from-[#8B5A2B] to-[#5D3A1A] rounded-2xl p-5 shadow-xl text-white">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-300" />
            Why You&apos;ll LOVE This! 💖
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {whyYouReasons.map((reason, i) => (
              <div 
                key={reason.title}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                style={{ 
                  opacity: visibleSections.has('why-section') ? 1 : 0,
                  transform: visibleSections.has('why-section') ? 'scale(1)' : 'scale(0.9)',
                  transition: `all 0.4s ease ${i * 100}ms`
                }}
              >
                <reason.icon className="w-7 h-7 text-pink-300 mb-2" />
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
          
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100">
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
        <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 rounded-2xl p-6 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative">
            <p className="text-2xl font-bold mb-2">
              &ldquo;Be the star you were born to be&rdquo; ⭐
            </p>
            <p className="text-white/90 text-sm">
              Thousands will see your content every day!
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section 
        id="apply-form" 
        data-animate
        className={`px-4 py-8 bg-gradient-to-b from-pink-600 to-rose-700 transition-all duration-700 ${visibleSections.has('apply-form') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3 border border-white/30">
            <Crown className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-bold text-white">Ready to Shine?</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Apply Now! ✨
          </h2>
          <p className="text-white/80 text-sm">
            तपाईंको star बन्ने journey सुरु गर्नुहोस्!
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
              className="inline-flex items-center gap-2 text-pink-600 font-medium text-sm"
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
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                Phone Number — फोन नम्बर *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="98XXXXXXXX"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                Age — उमेर *
              </label>
              <select
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm transition-all bg-white"
              >
                <option value="">Select your age</option>
                <option value="18-21">18-21 years</option>
                <option value="22-25">22-25 years</option>
                <option value="26-30">26-30 years</option>
              </select>
            </div>

            {/* TikTok Profile */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                TikTok Profile Link *
              </label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                <input
                  type="url"
                  required
                  value={formData.tiktok}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                  placeholder="https://tiktok.com/@yourprofile"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm transition-all"
                />
              </div>
              <p className="text-xs text-[#7A6252] mt-1">Share your TikTok so we can see your content!</p>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                Content Creation Experience
              </label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm transition-all bg-white"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (Just started)</option>
                <option value="hobby">Hobby Creator (Few videos)</option>
                <option value="regular">Regular Creator (Post often)</option>
                <option value="influencer">Influencer (1K+ followers)</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#5D3A1A] mb-1.5">
                Tell us about yourself! ✨
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Why do you want to join Seetara? What makes you unique?"
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8DDD4] focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-sm transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-70 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Application ✨
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
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 text-sm font-medium transition-colors"
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
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-white/80 backdrop-blur-lg border-t border-pink-100 safe-area-inset-bottom">
        <button
          onClick={scrollToApply}
          className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98] transition-transform animate-pulse-scale"
        >
          <Sparkles className="w-6 h-6" />
          Apply Now — अहिले Apply गर्नुहोस्!
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}
