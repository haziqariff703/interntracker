import { Navbar } from "@/components/layout/navbar";
import {
  ArtificialIntelligence01Icon,
  Target01Icon,
  Task01Icon,
  AnalyticsUpIcon,
} from "hugeicons-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden">
      <Navbar />

      <main className="relative pt-32 pb-20">
        {/* Pixel Metric Banner (Moving Slider) */}
        <section className="border-y-4 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black overflow-hidden py-4 relative mb-12">
          <div className="absolute inset-0 bg-dotted opacity-10 pointer-events-none" />
          <div className="relative z-10 flex overflow-hidden">
            <div className="flex items-center gap-12 font-pixel text-sm md:text-base animate-marquee whitespace-nowrap min-w-full">
              {[...Array(2)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center gap-12 px-6">
                  {[
                    { label: "PROTOCOL_USERS", value: "12,482" },
                    { label: "SUCCESS_POCKETS", value: "8,211" },
                    { label: "PORTAL_VISITORS", value: "240k+" },
                    { label: "AI_INTERPRETS", value: "1.2M+" },
                    { label: "STATUS", value: "LIVE_STABLE" },
                  ].map((metric, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                        {metric.label}:
                      </span>
                      <span className="font-black tracking-widest">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="flex-1 text-left">
              <div className="inline-block px-4 py-1 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-widest mb-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                Career tracking Protocol v1.0
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase">
                Built for <br />
                <span className="underline decoration-4 underline-offset-8">
                  Growth.
                </span>{" "}
                <br />
                Jobs and <br />
                Internships.
              </h1>

              <p className="max-w-xl text-xl font-bold leading-relaxed mb-10 text-black/60 dark:text-white/60">
                The high-performance platform to track, analyze, and optimize
                your professional applications using AI-powered strategic
                insights.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a
                  href="/auth/signin"
                  className="brutal-btn-primary h-16 px-10 text-lg uppercase font-black w-full sm:w-auto"
                >
                  Join the Cohort
                </a>
                <a
                  href="#features"
                  className="brutal-btn h-16 px-10 text-lg uppercase font-black w-full sm:w-auto"
                >
                  How it works
                </a>
              </div>
            </div>

            {/* Right: Terminal Visual */}
            <div className="flex-1 w-full lg:max-w-xl">
              <div className="relative">
                {/* Background Shadow Layer */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 bg-black dark:bg-white rounded-3xl" />

                {/* Main Card */}
                <div className="relative bg-white dark:bg-black border-4 border-black dark:border-white rounded-3xl p-8 overflow-hidden min-h-[350px]">
                  <div className="flex items-center justify-between mb-8">
                    <div className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-tighter">
                      PORTAL_ACCESS
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-black dark:border-white" />
                      <div className="w-3 h-3 rounded-full border-2 border-black dark:border-white" />
                      <div className="w-3 h-3 rounded-full border-2 border-black dark:border-white" />
                    </div>
                  </div>

                  <div className="font-mono text-lg bg-black dark:bg-[#111] p-6 rounded-2xl border-2 border-black dark:border-white text-white shadow-inner">
                    <div className="mb-4">
                      <span className="text-white/40">career:</span>
                      <span className="text-white">~/tracker</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/40">$</span>
                      <span className="animate-pulse">
                        tracker deploy --status active
                      </span>
                    </div>
                    <div className="mt-8 text-sm text-white/40 border-t border-white/10 pt-4">
                      {">"} AI Engine: READY <br />
                      {">"} Data Sync: ENCRYPTED <br />
                      {">"} Match Rate: 94%
                    </div>
                  </div>

                  {/* Aesthetic dots */}
                  <div className="absolute bottom-4 right-4 flex gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 bg-black/10 dark:bg-white/10 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section
          id="features"
          className="px-6 py-24 lg:py-40 bg-[#f4f4f4] dark:bg-[#080808] mt-20 border-y-4 border-black dark:border-white"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">
              Core Protocol
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Target01Icon className="w-8 h-8" />,
                  title: "Strategic",
                  desc: "Visualize your career journey with a clean, focused board for all applications.",
                },
                {
                  icon: <ArtificialIntelligence01Icon className="w-8 h-8" />,
                  title: "AI Analysis",
                  desc: "Gemini 1.5 interprets your data to provide strategic advice on interview prep.",
                },
                {
                  icon: <Task01Icon className="w-8 h-8" />,
                  title: "Skill Mapping",
                  desc: "Identify exactly which skills are missing from your profile for your dream roles.",
                },
                {
                  icon: <AnalyticsUpIcon className="w-8 h-8" />,
                  title: "Market Value",
                  desc: "A live metric of your career readiness, calculated from your stats.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="brutal-card p-8 group flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-6 p-2 border-2 border-black dark:border-white inline-block">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-4 leading-none">
                      {feature.title}
                    </h3>
                    <p className="font-bold text-black/60 dark:text-white/60 leading-tight">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t-2 border-dashed border-black/10 dark:border-white/10 text-xs font-black uppercase tracking-widest">
                    Module_0{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile First Footer */}
        <footer className="py-20 px-6 border-t-2 border-black dark:border-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 font-black uppercase text-sm tracking-widest">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black dark:bg-white border-2 border-black dark:border-white" />
              <span className="text-xl">InternTracker</span>
            </div>
            <div className="flex gap-10">
              <a href="#" className="hover:line-through">
                Privacy
              </a>
              <a href="#" className="hover:line-through">
                Terms
              </a>
              <a href="#" className="hover:line-through">
                GitHub
              </a>
            </div>
            <p className="text-black/40 dark:text-white/40">
              © 2026 Protocol_v1.0
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
