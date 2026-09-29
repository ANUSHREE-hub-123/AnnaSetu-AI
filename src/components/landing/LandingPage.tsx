import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Route,
  HeartHandshake,
  Play,
  Presentation,
  CheckCircle2,
  Building2,
  Users,
  Leaf,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setShowLandingPage, triggerLiveSimulation, setRole } = useApp();

  const handleLaunchKitchen = () => {
    setRole('kitchen');
    setShowLandingPage(false);
  };

  const handleLaunchNGO = () => {
    setRole('ngo');
    setShowLandingPage(false);
  };

  const handleLaunchSimulation = () => {
    setShowLandingPage(false);
    triggerLiveSimulation();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white text-xs py-2 px-4 text-center font-medium">
        <span>Smart India Hackathon 2026 Prototype • Ministry of Food Processing Industries (MoFPI) • Theme: Agriculture, FoodTech & Rural Development</span>
      </div>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/30">
            <span className="text-2xl">🌾</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                AnnaSetu <span className="text-emerald-600">AI</span>
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              Predict. Prevent. Redistribute.
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</a>
          <a href="#ai-capabilities" className="hover:text-emerald-600 transition-colors">AI Engine</a>
          <a href="#impact" className="hover:text-emerald-600 transition-colors">Impact</a>
          <a href="#architecture" className="hover:text-emerald-600 transition-colors">Architecture</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLaunchSimulation}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700" />
            <span>Simulate Flow</span>
          </button>
          <button
            onClick={handleLaunchKitchen}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md shadow-emerald-600/20 transition-all hover:scale-105"
          >
            <span>Launch Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold mb-6 animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Intelligent Food Waste Reduction & Redistribution Ecosystem</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Turn Surplus Food Into <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
            Measurable Social Impact.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          An AI-powered ecosystem that predicts institutional meal demand, prevents overproduction, monitors food safety in real time, and dynamically matches safe surplus with nearby verified NGOs before expiry.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleLaunchKitchen}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Explore Kitchen Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleLaunchSimulation}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>Run AI Live Simulation</span>
          </button>
          <button
            onClick={handleLaunchNGO}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-all hover:scale-[1.02]"
          >
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>NGO Partner View</span>
          </button>
        </div>

        {/* 5-Step Process Ribbon */}
        <div id="how-it-works" className="mt-16 pt-8 border-t border-slate-200">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">The Core AnnaSetu Storyline</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">5 Simple Steps: From Kitchen to Community</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-6xl mx-auto text-left">
            {[
              {
                step: '01',
                title: 'Predict Demand',
                desc: 'AI predicts precise meal attendance factoring in day, weather, events & history.',
                icon: '📈'
              },
              {
                step: '02',
                title: 'Prevent Overproduction',
                desc: 'Kitchen prepares recommended batch size, stopping waste before cooking begins.',
                icon: '🛡️'
              },
              {
                step: '03',
                title: 'Detect Surplus',
                desc: 'Automated safety classification (Safe, Urgent, Unsafe) with live consumption timers.',
                icon: '⏱️'
              },
              {
                step: '04',
                title: 'Smart Match NGOs',
                desc: 'Algorithm pairs food with nearest verified NGO based on capacity & pickup speed.',
                icon: '🤝'
              },
              {
                step: '05',
                title: 'Measure Impact',
                desc: 'Tracks meals redistributed, carbon emissions avoided, water conserved & FSSAI audit.',
                icon: '🌱'
              }
            ].map(item => (
              <div key={item.step} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-mono font-bold text-slate-400">STEP {item.step}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution Comparison */}
      <section className="py-16 bg-white border-y border-slate-200 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-bold mb-3">
              The Problem Statement
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Institutional Kitchens Face 15-25% Unmanaged Food Loss Daily
            </h2>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed">
              University mess halls, corporate cafeterias, and food processing units overcook out of fear of shortage. When surplus occurs, manual phone coordination is too slow, causing hot food to pass its safe consumption window and end up in landfills.
            </p>
            <div className="mt-6 space-y-3">
              {[
                'Static prep estimates ignoring monsoon rain, exam schedules & holidays',
                'Zero real-time food temperature tracking or consumption deadline alerts',
                'No systematic network connecting kitchens with ready NGO transport',
                'Lack of auditable ESG and CSR impact metrics for institutions'
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              The AnnaSetu AI Solution
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              An End-to-End Intelligent Closed-Loop Ecosystem
            </h3>
            <div className="mt-4 space-y-3.5">
              {[
                { title: 'Dynamic Demand Forecast', desc: 'Predictive models adjust prep down by 4-8% during low consumption periods.' },
                { title: 'Smart Shelf-Life Urgency', desc: 'Color-coded safety classification (Green/Yellow/Red) with digital countdown timers.' },
                { title: 'Weighted Multi-Criteria NGO Match', desc: '96% compatibility matching optimizing distance, capacity and logistics readiness.' },
                { title: 'Full ESG & FSSAI Audit Trail', desc: 'OTP verification, driver tracking, and verified CO2 & water conservation receipts.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-emerald-100 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                    <p className="text-[11px] text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prototype Key Metric Highlights */}
      <section id="impact" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">Demonstrated Impact (Preloaded Scenario)</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Ecosystem Scale & Environmental Savings</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Meals Redistributed', val: '4,620', sub: 'this month alone', icon: '🍲' },
            { label: 'Food Diverted', val: '1,284 kg', sub: 'from municipal landfills', icon: '⚖️' },
            { label: 'CO₂ Avoided', val: '2.7 tons', sub: 'calculated emissions offset', icon: '🌍' },
            { label: 'Water Conserved', val: '10.78 L', sub: 'lakh liters virtual water', icon: '💧' }
          ].map((stat, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <span className="text-3xl block mb-2">{stat.icon}</span>
              <div className="text-2xl font-extrabold text-slate-900">{stat.val}</div>
              <div className="text-xs font-bold text-slate-700 mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-10 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xl">🌾</span>
              <span className="text-lg font-bold text-white">AnnaSetu AI</span>
              <span className="text-xs text-emerald-400 font-medium">| MoFPI SIH 2026</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              “Predict. Prevent. Redistribute.” — Connecting surplus kitchens with communities in need.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleLaunchKitchen}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              Open Live Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
