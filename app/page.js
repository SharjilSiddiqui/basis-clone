"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';

const METRICS = [
  { id: 1, text: "IMPROVE YOUR WEBSITE CONVERSION RATE BY 10%" },
  { id: 2, text: "GROW YOUR ONBOARDING BY 80%" },
  { id: 3, text: "LOWER YOUR COST OF ACQUISITION BY 40%" },
  { id: 4, text: "INCREASE MARKET SHARE BY REBRANDING" },
  { id: 5, text: "DOUBLE THE NUMBER OF APP USERS IN ONE YEAR" },
];

const NAV_LINKS = [
  { name: "HOME", num: "01" },
  { name: "SERVICES", num: "02" },
  { name: "CASE STUDIES", num: "03" },
  { name: "FINTECH EXPERTISE", num: "04" },
  { name: "LET'S CONNECT", num: "05" },
];

const PROCESS_STEPS = [
  { id: 1, title: "Align on your key product goal", description: "Start with what matters—your core product objective. We build solutions around real user needs to set a strong foundation for growth." },
  { id: 2, title: "Collaborate like a true partner", description: "We're hands-on through implementation to ensure every design decision stays aligned with your vision, your market, and your mission." },
  { id: 3, title: "Launch at speed, improve and scale", description: "Launch is just the beginning. We stay close to refine, optimize and scale with intention as your product evolves and grows." }
];

const TESTIMONIALS = [
  { quote: "Basis Studio worked like an agency that feels in-house. In just 12 weeks, they built our product and website from scratch — and it looks like something straight out of a Series B company.", author: "Michal, Co-founder, Finance" },
  { quote: "Basis Studio helped us level up our brand, social presence, and website. It's not just a redesign — it's shaping our next phase of growth.", author: "Jessie Jett, Senior Manager, Visa" },
  { quote: "We are thrilled! The process of working together to get to a design style that feels fresh, authentic, and creative was smooth and the design itself is top-notch quality.", author: "Kristina Kosa, Co-founder, Yoginess" },
  { quote: "As an engineering leader, working with Michal and Basis Studio been a game changer. He truly understands how to support engineers in building design systems, making collaboration seamless.", author: "Frederik Vanhevel, Engineering Lead" },
];

const getPlaceholderUrl = (text, width, height, bg = '111', color = 'fff') => 
  `https://placehold.co/${width}x${height}/${bg}/${color}?text=${text.replace(/ /g, '+')}&font=inter`;

// Intersection Observer Hook
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isIntersecting];
};

// Navbar with Expanding Menu
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const debounceRef = useRef(null);

  const handleEnter = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setIsMenuOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    debounceRef.current = setTimeout(() => setIsMenuOpen(false), 150);
  }, []);

  return (
    <header 
      className="fixed top-0 left-0 w-full z-[100] flex justify-center pt-8 pointer-events-none transition-all duration-300"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="pointer-events-auto">
        <div 
          className={`relative rounded-2xl shadow-2xl transition-all duration-500 ease-out overflow-hidden ${
            isMenuOpen 
              ? 'w-[400px] h-auto px-8 py-6' 
              : 'w-auto h-auto px-4 py-3'
          }`}
          style={{
            background: 'rgba(60, 60, 60, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Glass effect overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          />

          {/* Collapsed State - Logo with Dots */}
          <div className={`relative z-10 flex items-center justify-center space-x-3 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-0 h-0' : 'opacity-100'
          }`}>
            <span className="text-white font-bold text-xl tracking-[0.15em]">BASIS</span>
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Expanded State - Menu Items */}
          <div className={`relative z-10 transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 h-0 pointer-events-none'
          }`}>
            <div className="flex items-center justify-center space-x-3 mb-6 pb-4 border-b border-white/10">
              <span className="text-white font-bold text-xl tracking-[0.15em]">BASIS</span>
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-col space-y-1 text-white">
              {NAV_LINKS.map((item) => (
                <a 
                  key={item.name} 
                  href={`#${item.name.toLowerCase().replace(/ /g, '-')}`} 
                  className="group text-base font-medium flex justify-between items-center py-2.5 px-3 transition-all duration-200"
                >
                  <span className="relative text-gray-200 group-hover:text-white transition-colors">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                  <span className="text-xs text-gray-500 font-normal">{item.num}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Parallax Hero
const ParallaxHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) / 30; 
      const moveY = (e.clientY - centerY) / 30; 
      setMousePosition({ x: moveX, y: moveY });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const images = [
    { id: 1, text: 'Product', depth: 1, x: 5, y: 20, rotate: -10 },
    { id: 2, text: 'Blue', depth: 2, x: 75, y: 15, rotate: 15 },
    { id: 3, text: 'Card', depth: 3, x: 10, y: 70, rotate: 5 },
    { id: 4, text: 'Yellow', depth: 2, x: 70, y: 75, rotate: -20 },
    { id: 5, text: 'Green', depth: 1, x: 80, y: 5, rotate: 0 },
  ];

  return (
    <section ref={containerRef} className="h-[100vh] bg-black text-white pt-20 flex items-center justify-center relative overflow-hidden">
      {images.map(img => (
        <img
          key={img.id}
          src={getPlaceholderUrl(img.text, img.depth * 50 + 100, img.depth * 50 + 100)}
          alt={img.text}
          className="absolute w-auto h-auto rounded-xl shadow-2xl object-cover transition-transform duration-50"
          style={{
            top: `${img.y}%`,
            left: `${img.x}%`,
            width: '200px',
            height: '200px',
            transform: `translate(-50%, -50%) rotate(${img.rotate}deg) translate3d(${mousePosition.x * img.depth}px, ${mousePosition.y * img.depth}px, 0)`,
          }}
        />
      ))}
      
      <div className="relative z-10 text-center px-4">
        <p className="text-sm text-gray-400 mb-2 tracking-wide">Creative & Technology Studio for AI age</p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
          Turn your vision into <br/>
          a remarkable <span className="text-pink-400">brand</span>, <br/>
          <span className="text-pink-400">website</span> or <span className="text-pink-400">ai product</span>
        </h1>
        <p className="text-sm text-gray-400 mb-8 tracking-wide">
          A decade of proven results for startups scaling from Series A to unicorn
        </p>
        <button className="border border-white text-white px-8 py-3 rounded-xl uppercase text-sm tracking-widest hover:bg-white hover:text-black transition duration-300">
          START HERE
        </button>
      </div>
    </section>
  );
};

// Metric Carousel with Scroll - SIMPLIFIED
const MetricCarousel = () => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id'), 10);
            setCurrentMetric(id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0,
      }
    );

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const currentText = METRICS[currentMetric]?.text || METRICS[0].text;
  
  const metricStyle = { 
    fontFamily: 'Georgia, serif', 
    wordBreak: 'break-word', 
    hyphens: 'auto',
    lineHeight: '0.9',
    WebkitTextStroke: '1px white' 
  };

  return (
    <section className="relative bg-black text-white py-32">
      <div className="sticky top-0 min-h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-12">
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-10 leading-snug">
              You will work with Basis to:
            </h2>
            <button className="bg-pink-400 text-black font-semibold px-8 py-3 rounded-xl text-lg hover:bg-pink-500 transition duration-300 w-fit mb-4 shadow-lg">
              BOOK A FREE STRATEGY SESSION
            </button>
            <button className="border border-gray-600 text-white font-semibold px-8 py-3 rounded-xl text-sm hover:bg-gray-800 transition duration-300 w-fit">
              EXPLORE CASE STUDIES
            </button>
          </div>

          <div className="md:w-1/2 flex items-center justify-center">
            <p 
              key={currentMetric} 
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white transition-all duration-700"
              style={metricStyle}
            >
              {currentText}
            </p>
          </div>
        </div>
      </div>
      
      {/* Hidden scroll triggers */}
      {METRICS.map((_, index) => (
        <div 
          key={index}
          ref={el => stepRefs.current[index] = el} 
          data-id={index}
          className="h-screen w-full"
        />
      ))}
    </section>
  );
};

// Product Showcase - REMOVED (blank section)
const ProductShowcase = () => {
  return null;
};

// Logo Marquee
const LogoMarquee = () => {
  const logos = [
    { name: 'Mastercard' }, { name: 'Prosody' }, { name: 'Google' }, { name: 'Seen' }, 
    { name: 'Disney' }, { name: 'Airbnb' }, { name: 'Red Bull' }, { name: 'Sable' },
    { name: 'Mastercard' }, { name: 'Prosody' }, { name: 'Google' }, { name: 'Seen' }
  ];

  return (
    <section className="bg-black text-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <p className="text-xl md:text-2xl font-semibold text-gray-400">
          Seen Website: <span className="text-white">8M+ views and counting</span>
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden whitespace-nowrap">
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .marquee-content {
            animation: marquee 30s linear infinite;
          }
          .marquee-content:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="marquee-content inline-block">
          {logos.map((logo, index) => (
            <div key={index} className="inline-block px-8">
              <span className="text-2xl text-gray-600 hover:text-gray-400 transition duration-300 font-bold">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// NOW Section - REMOVED (blank section)
const NowSection = () => {
  return null;
};

// Process Carousel - SIMPLIFIED
const ProcessCarousel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id'), 10);
            setCurrentStep(id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0,
      }
    );

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const step = PROCESS_STEPS[currentStep] || PROCESS_STEPS[0];

  return (
    <section className="relative bg-black text-white py-32">
      <div className="sticky top-20 text-center mb-24 z-20 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          How we turn startup <span className="bg-pink-400 text-black px-2 py-0.5 rounded-md inline-block leading-relaxed">goals into results</span>
        </h2>
      </div>

      <div className="sticky top-0 min-h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-12 relative">
          <div className="md:w-1/3 text-left">
            <p key={`title-${currentStep}`} className="text-2xl md:text-3xl font-semibold transition-opacity duration-500">
              {step.title}
            </p>
          </div>

          <div className="md:w-1/3 flex justify-center items-center">
            <span 
              key={`num-${currentStep}`} 
              className="text-[150px] md:text-[200px] font-extrabold text-white transition-transform duration-500"
              style={{ 
                fontFamily: 'Arial Black, sans-serif',
                WebkitTextStroke: '1px white',
              }}
            >
              {currentStep + 1}
            </span>
          </div>

          <div className="md:w-1/3 text-left md:text-right">
            <p key={`desc-${currentStep}`} className="text-base md:text-lg text-gray-400 transition-opacity duration-500">
              {step.description}
            </p>
          </div>
        </div>
      </div>

      {/* Hidden scroll triggers */}
      {PROCESS_STEPS.map((_, index) => (
        <div 
          key={index}
          ref={el => stepRefs.current[index] = el} 
          data-id={index}
          className="h-screen w-full"
        />
      ))}
    </section>
  );
};

// Testimonials
const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-gray-400 mb-2">What they say about us</p>
        </div>
        
        <div className="overflow-hidden relative">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {TESTIMONIALS.map((t, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-1/3 p-4">
                <div className="p-8 bg-gray-900 rounded-2xl h-full shadow-lg">
                  <span className="text-4xl text-pink-400 font-serif mb-4 block">"</span>
                  <p className="text-lg mb-6 leading-relaxed">{t.quote}</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full"></div>
                    <div>
                      <p className="font-semibold">{t.author.split(',')[0]}</p>
                      <p className="text-xs text-gray-400">{t.author.split(',').slice(1).join(',')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Growth Stage Hero - REMOVED (blank section)
const GrowthStageHero = () => {
  return null;
};

// Footer
const Footer = () => {
  const [time, setTime] = useState({
    bangkok: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' }),
    london: new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
    bucharest: new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit' })
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime({
        bangkok: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit' }),
        london: new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
        bucharest: new Date().toLocaleTimeString('en-US', { timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit' })
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large BASIS text */}
        <div className="mb-20">
          <h2 className="text-[120px] sm:text-[180px] md:text-[240px] lg:text-[320px] font-black leading-none tracking-tighter text-white" style={{ fontFamily: 'Arial Black, sans-serif' }}>
            BASIS
          </h2>
        </div>

        {/* Timezone clocks */}
        <div className="flex flex-wrap justify-start gap-16 mb-24">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center relative">
              <div className="absolute w-0.5 h-5 bg-white origin-bottom transform rotate-[30deg]" style={{ top: '50%', left: '50%', transformOrigin: '50% 100%' }}></div>
              <div className="absolute w-0.5 h-6 bg-white origin-bottom" style={{ top: '50%', left: '50%', transformOrigin: '50% 100%' }}></div>
            </div>
            <div>
              <p className="text-xl font-medium text-white">Bangkok</p>
              <p className="text-sm text-gray-400">{time.bangkok} local time</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center relative">
              <div className="absolute w-0.5 h-5 bg-white origin-bottom" style={{ top: '50%', left: '50%', transformOrigin: '50% 100%' }}></div>
              <div className="absolute w-0.5 h-6 bg-white origin-bottom transform rotate-[90deg]" style={{ top: '50%', left: '50%', transformOrigin: '50% 100%' }}></div>
            </div>
            <div>
              <p className="text-xl font-medium text-white">London</p>
              <p className="text-sm text-gray-400">{time.london} local time</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center relative">
              <div className="absolute w-0.5 h-5 bg-white origin-bottom transform rotate-[45deg]" style={{ top: '50%', left: '50%', transformOrigin: '50% 100%' }}></div>
              <div className="absolute w-0.5 h-6 bg-white origin-bottom transform rotate-[100deg]" style={{ top: '50%', left: '50%', transformOrigin: '50% 100%' }}></div>
            </div>
            <div>
              <p className="text-xl font-medium text-white">Bucharest</p>
              <p className="text-sm text-gray-400">{time.bucharest} local time</p>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="border-t border-gray-800 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-pink-500 text-sm font-semibold mb-4">Email Us</h4>
              <p className="text-white text-lg mb-2">hello@basis.work</p>
              <p className="text-white text-lg">careers@basis.work</p>
            </div>

            <div>
              <h4 className="text-pink-500 text-sm font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-white text-lg">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Fintech Expertise</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-pink-500 text-sm font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-white text-lg">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Linkedin</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Threads</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">X</a></li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-8">© 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App
export default function App() {
  return (
    <div className="min-h-screen bg-black font-inter antialiased">
      <Navbar />
      <main>
        <ParallaxHero />
        <MetricCarousel />
        <ProductShowcase />
        <LogoMarquee />
        <NowSection />
        <ProcessCarousel />
        <TestimonialsCarousel />
        <GrowthStageHero />
        <Footer />
      </main>
    </div>
  );
}