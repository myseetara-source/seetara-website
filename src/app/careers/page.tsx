'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Camera, Sparkles, ArrowRight, Users, Heart, Rocket, Star, MapPin, Clock, Briefcase,
  Crown, TrendingUp, Zap, Gift, Coffee, Bus, Award, CircleDollarSign, Building2,
  Play, ChevronRight, Palette, Video, Music, Target, Eye, CheckCircle2,
  MessageCircle, Smile, Mic
} from 'lucide-react';

const openPositions = [
  {
    id: 'video-editor',
    title: 'Video Editor & DSLR Operator',
    titleNp: 'भिडियो एडिटर र DSLR अपरेटर',
    department: 'Creative Team',
    location: 'Tahachal, KTM',
    type: 'Full-time',
    icon: Camera,
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50',
    borderColor: 'border-amber-200',
    description: 'Professional video editing & camera operation for product shoots, reels, and brand content.',
    skills: ['Premiere Pro', 'After Effects', 'DSLR', 'Color Grading'],
    salary: 'रु. 15,550+',
    increment: '10% Yearly',
    urgent: true,
  },
  {
    id: 'content-creator',
    title: 'TikTok Content Creator',
    titleNp: 'TikTok कन्टेन्ट क्रिएटर',
    department: 'Marketing Team',
    location: 'Tahachal, KTM',
    type: 'Full-time',
    icon: Sparkles,
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-50 to-rose-50',
    borderColor: 'border-pink-200',
    description: 'Create viral TikTok content, drive organic sales through creative videos & storytelling.',
    skills: ['TikTok', 'CapCut', 'Communication', 'Creativity'],
    salary: 'रु. 15,550+',
    increment: 'Performance Based',
    urgent: true,
    femaleOnly: true,
  },
];

const companyStats = [
  { number: '50K+', label: 'Happy Customers', icon: Heart },
  { number: '100+', label: 'Products', icon: Gift },
  { number: '4.8★', label: 'Rating', icon: Star },
  { number: '2+', label: 'Years', icon: Rocket },
];

const perks = [
  { icon: CircleDollarSign, title: 'Competitive Salary', desc: 'रु. 15,550+ starting', color: 'from-green-400 to-emerald-500' },
  { icon: TrendingUp, title: 'Growth', desc: 'Performance promotions', color: 'from-blue-400 to-indigo-500' },
  { icon: Bus, title: 'Bus Fare', desc: 'Travel allowance', color: 'from-amber-400 to-orange-500' },
  { icon: Coffee, title: 'Khaja', desc: 'Daily snacks', color: 'from-pink-400 to-rose-500' },
  { icon: Award, title: 'Recognition', desc: 'Your work matters', color: 'from-purple-400 to-violet-500' },
  { icon: Users, title: 'Team Vibes', desc: 'Fun environment', color: 'from-teal-400 to-cyan-500' },
];

const whyJoinReasons = [
  { 
    icon: Rocket, 
    title: 'Fast-Growing Brand', 
    desc: 'Join Nepal\'s fastest-growing premium bag brand. Your work will reach thousands daily!',
    color: 'text-amber-500'
  },
  { 
    icon: Palette, 
    title: 'Creative Freedom', 
    desc: 'We value your ideas. Bring creativity to life and see your vision become reality.',
    color: 'text-pink-500'
  },
  { 
    icon: Target, 
    title: 'Real Impact', 
    desc: 'Your content directly drives sales. See real results from your creative work.',
    color: 'text-blue-500'
  },
  { 
    icon: Heart, 
    title: 'Amazing Culture', 
    desc: 'We work hard and celebrate together. Fun team, supportive environment.',
    color: 'text-red-500'
  },
];

const testimonials = [
  {
    quote: "Best decision I made! Started as intern, now leading creative team.",
    name: "Anjali S.",
    role: "Creative Lead",
    avatar: "👩‍💼"
  },
  {
    quote: "The creative freedom here is unmatched. My ideas actually matter!",
    name: "Roshan K.",
    role: "Video Editor",
    avatar: "👨‍💻"
  },
];

export default function CareersPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFBF7] via-[#FDF8F3] to-[#F5EDE6]">
      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden min-h-[85vh] flex flex-col">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5A2B] via-[#5D3A1A] to-[#2C1810]" />
          
          {/* Floating Elements */}
          <div 
            className="absolute top-20 left-10 w-40 h-40 bg-[#C9A227]/20 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute bottom-20 right-10 w-60 h-60 bg-[#8B5A2B]/30 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          />
          
          {/* Animated Icons */}
          <Camera className="absolute top-24 right-12 w-8 h-8 text-white/10 animate-float" />
          <Sparkles className="absolute top-32 left-16 w-6 h-6 text-[#C9A227]/30 animate-pulse" />
          <Video className="absolute bottom-32 left-12 w-10 h-10 text-white/10 animate-float delay-300" />
          <Music className="absolute bottom-24 right-16 w-8 h-8 text-pink-400/20 animate-bounce-subtle" />
          <Heart className="absolute top-1/2 right-8 w-6 h-6 text-pink-400/20 animate-pulse" />
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-50" />
        </div>
        
        <div className="relative flex-1 flex flex-col px-4 pt-8 pb-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="relative group">
              <Image
                src="https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/logo/logo.png"
                alt="Seetara"
                width={140}
                height={50}
                className="h-12 w-auto filter brightness-0 invert group-hover:scale-105 transition-transform"
                priority
              />
            </Link>
          </div>

          {/* Hiring Badge with Animation */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9A227]/30 to-[#8B5A2B]/30 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#C9A227]/40 animate-pulse-scale">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
              </span>
              <span className="text-sm font-bold text-white">🎉 We&apos;re Hiring! Join the Team</span>
            </div>
          </div>

          {/* Main Title with Stagger Animation */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight animate-fade-in">
              Join the <span className="text-gradient-gold">Seetara</span>
              <br />Family
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-md mx-auto animate-fade-in delay-100">
              Build Nepal&apos;s most loved premium bag brand with us!
            </p>
            <p className="text-[#C9A227] text-sm mt-3 animate-fade-in delay-200">
              🇳🇵 Kathmandu, Nepal • Creative Roles Available
            </p>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto mb-8 animate-fade-in delay-300">
            {companyStats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <stat.icon className="w-5 h-5 text-[#C9A227] mx-auto mb-1" />
                  <p className="text-white font-bold text-lg">{stat.number}</p>
                  <p className="text-white/60 text-[10px]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex-1 flex items-end justify-center">
            <div className="flex flex-col items-center animate-bounce-subtle">
              <p className="text-white/50 text-xs mb-2">Scroll to explore</p>
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll-mouse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section 
        id="positions-section" 
        data-animate
        className={`px-4 py-10 transition-all duration-700 ${visibleSections.has('positions-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2 flex items-center justify-center gap-2">
            <Briefcase className="w-6 h-6 text-[#C9A227]" />
            Open Positions
          </h2>
          <p className="text-[#5D3A1A] text-sm">खुला पदहरू — Apply गर्नुहोस्!</p>
        </div>

        <div className="space-y-5">
          {openPositions.map((job, index) => (
            <Link 
              key={job.id} 
              href={`/careers/${job.id}`}
              className="block group"
              style={{ 
                opacity: visibleSections.has('positions-section') ? 1 : 0,
                transform: visibleSections.has('positions-section') ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${index * 150}ms`
              }}
            >
              <div className={`relative bg-gradient-to-br ${job.bgGradient} rounded-3xl p-5 shadow-xl border-2 ${job.borderColor} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]`}>
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {job.urgent && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
                      <Zap className="w-3 h-3" /> URGENT
                    </span>
                  )}
                  {job.femaleOnly && (
                    <span className="bg-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" /> FEMALE
                    </span>
                  )}
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${job.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    <job.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-bold text-[#2C1810] text-lg leading-tight mb-1 group-hover:text-[#8B5A2B] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-[#8B5A2B] font-medium">{job.titleNp}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#5D3A1A] mb-4 leading-relaxed">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill) => (
                    <span key={skill} className="text-xs font-medium bg-white/80 text-[#5D3A1A] px-3 py-1 rounded-full border border-[#E8DDD4]">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Salary & Location */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E8DDD4]/50">
                  <div className="flex items-center gap-4 text-xs text-[#7A6252]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {job.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-green-600 font-bold text-sm">{job.salary}</span>
                    <ChevronRight className="w-5 h-5 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Increment Badge */}
                <div className="mt-3 inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  {job.increment}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Join Section */}
      <section 
        id="why-section" 
        data-animate
        className={`px-4 py-10 transition-all duration-700 ${visibleSections.has('why-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2">
            Why Join Seetara? ✨
          </h2>
          <p className="text-[#5D3A1A] text-sm">किन Seetara मा काम गर्ने?</p>
        </div>

        <div className="space-y-4">
          {whyJoinReasons.map((reason, i) => (
            <div 
              key={reason.title}
              className="bg-white rounded-2xl p-5 shadow-lg border border-[#E8DDD4] flex gap-4"
              style={{ 
                opacity: visibleSections.has('why-section') ? 1 : 0,
                transform: visibleSections.has('why-section') ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.5s ease ${i * 100}ms`
              }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5EDE6] to-white flex items-center justify-center flex-shrink-0`}>
                <reason.icon className={`w-7 h-7 ${reason.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-[#2C1810] text-base mb-1">{reason.title}</h3>
                <p className="text-[#5D3A1A] text-sm leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks & Benefits */}
      <section 
        id="perks-section" 
        data-animate
        className={`px-4 py-10 bg-gradient-to-b from-[#8B5A2B] to-[#5D3A1A] transition-all duration-700 ${visibleSections.has('perks-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Gift className="w-6 h-6 text-[#C9A227]" />
            Perks & Benefits
          </h2>
          <p className="text-white/70 text-sm">हाम्रो टिममा के के पाइन्छ?</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {perks.map((perk, i) => (
            <div 
              key={perk.title}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              style={{ 
                opacity: visibleSections.has('perks-section') ? 1 : 0,
                transform: visibleSections.has('perks-section') ? 'scale(1)' : 'scale(0.9)',
                transition: `all 0.4s ease ${i * 80}ms`
              }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${perk.color} flex items-center justify-center mb-2`}>
                <perk.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-white text-sm">{perk.title}</h3>
              <p className="text-white/70 text-xs">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section 
        id="testimonials-section" 
        data-animate
        className={`px-4 py-10 transition-all duration-700 ${visibleSections.has('testimonials-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#2C1810] mb-2">
            What Our Team Says 💬
          </h2>
        </div>

        <div className="relative bg-gradient-to-br from-[#F5EDE6] to-white rounded-2xl p-6 shadow-lg border border-[#E8DDD4]">
          {testimonials.map((testimonial, i) => (
            <div 
              key={testimonial.name}
              className={`transition-all duration-500 ${activeTestimonial === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-6'}`}
            >
              <div className="text-5xl mb-3 opacity-20">&ldquo;</div>
              <p className="text-[#2C1810] text-lg font-medium mb-4 -mt-8 leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8B5A2B] flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-[#2C1810]">{testimonial.name}</p>
                  <p className="text-[#7A6252] text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${activeTestimonial === i ? 'bg-[#C9A227] w-6' : 'bg-[#E8DDD4]'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section 
        id="location-section" 
        data-animate
        className={`px-4 py-10 transition-all duration-700 ${visibleSections.has('location-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#E8DDD4]">
          <h2 className="text-lg font-bold text-[#2C1810] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            📍 Office Location
          </h2>
          
          <div className="bg-gradient-to-r from-[#F5EDE6] to-white rounded-xl p-4 border border-[#E8DDD4]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5A2B] to-[#5D3A1A] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[#2C1810] font-bold text-base mb-1">Work from Office</p>
                <p className="text-[#5D3A1A] text-sm leading-relaxed">
                  Bishnumati Track Rd, Tahachal<br />
                  Kathmandu, Nepal 🇳🇵
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational CTA */}
      <section className="px-4 py-10">
        <div className="bg-gradient-to-r from-[#C9A227] via-[#E8D48A] to-[#C9A227] rounded-2xl p-6 text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgwLDAsMCwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="relative">
            <h3 className="text-2xl font-bold text-[#2C1810] mb-2">
              Ready to Create Magic? ✨
            </h3>
            <p className="text-[#5D3A1A] text-sm mb-4">
              Your dream creative career starts here!
            </p>
            <div className="flex flex-col gap-2">
              <Link 
                href="/careers/video-editor"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform"
              >
                <Camera className="w-5 h-5" />
                Apply for Video Editor
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/careers/content-creator"
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform"
              >
                <Sparkles className="w-5 h-5" />
                Apply for Content Creator
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-4 py-8 text-center">
        <p className="text-[#5D3A1A] text-sm mb-2">
          Don&apos;t see your role? We&apos;re always looking for talent!
        </p>
        <p className="text-[#8B5A2B] text-xs mb-6">
          📧 Contact: careers@seetara.com.np
        </p>
        
        <div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#8B5A2B] hover:text-[#C9A227] text-sm font-medium transition-colors"
          >
            ← Back to Seetara Store
          </Link>
        </div>

        <div className="mt-6">
          <Image
            src="https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/logo/logo.png"
            alt="Seetara"
            width={80}
            height={28}
            className="h-6 w-auto mx-auto opacity-40"
          />
          <p className="text-[#7A6252] text-xs mt-2">
            © {new Date().getFullYear()} Seetara Nepal • Premium Bags & Accessories
          </p>
        </div>
      </section>
    </main>
  );
}
