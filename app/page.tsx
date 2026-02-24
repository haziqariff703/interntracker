import { Navbar } from "@/components/layout/navbar";
import {
  ArtificialIntelligence01Icon,
  Target01Icon,
  AnalyticsUpIcon,
} from "hugeicons-react";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { MalaysiaHeatmap } from "@/components/landing/malaysia-heatmap";
import { AiChatPreview } from "@/components/landing/ai-chat-preview";
import { IndustryTicker } from "@/components/landing/industry-ticker";
import { WallOfProof } from "@/components/landing/wall-of-proof";
import { RoiCalculator } from "@/components/landing/roi-calculator";

export default function Home() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden relative">
      <InteractiveGridPattern
        className="fixed inset-0 -z-10 bg-black"
        glowColor="rgba(255, 255, 255, 0.4)"
        borderColor="rgba(255, 255, 255, 0.2)"
      />
      <Navbar />

      <main className="relative pt-32 pb-20">
        {/* Pixel Metric Banner */}
        <section className="border-y-[3px] border-white bg-black text-white overflow-hidden py-4 relative mb-24">
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

        {/* 1. Hero Section */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-32 flex flex-col items-center text-center">
          <div className="inline-block px-4 py-2 border-[3px] border-white bg-black text-white font-black uppercase text-xs tracking-widest mb-12">
            Protocol v1.0
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-12 uppercase">
            BUILD YOUR <br />
            CAREER SYSTEM.
          </h1>

          <p className="max-w-2xl text-xl md:text-2xl font-bold leading-tight mb-12 text-white/70">
            The high-performance platform to track, analyze, and optimize your
            professional applications using AI-powered strategic insights.
          </p>

          <a
            href="/auth/signin"
            className="border-[3px] border-white bg-black text-white hover:bg-white hover:text-black transition-none h-20 px-12 md:px-16 text-xl md:text-2xl uppercase font-black inline-flex items-center justify-center w-full sm:w-auto"
          >
            EXECUTE PROTOCOL
          </a>
        </section>

        <hr className="border-t-[3px] border-white w-full my-24 lg:my-32" />

        {/* 2. What It Does */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-24 lg:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target01Icon className="w-10 h-10" />,
                title: "Strategic",
                desc: "Visualize your career journey with a clean, focused board for all applications.",
              },
              {
                icon: <ArtificialIntelligence01Icon className="w-10 h-10" />,
                title: "AI Analysis",
                desc: "TrackrBot interprets your data to provide strategic advice on interview prep.",
              },
              {
                icon: <AnalyticsUpIcon className="w-10 h-10" />,
                title: "Market Value",
                desc: "A live metric of your career readiness, calculated from your stats.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="border-[3px] border-white p-10 flex flex-col justify-between hover:scale-[1.01] transition-transform bg-black"
              >
                <div>
                  <div className="mb-8 p-3 border-[3px] border-white inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 leading-none tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="font-bold text-white/70 leading-tight">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2.5 Live Industry Stats */}
        <IndustryTicker />

        <hr className="border-t-[3px] border-white w-full my-24 lg:my-32" />

        {/* 3. Product Preview */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                  AI Intelligence
                </h2>
                <p className="font-mono text-sm uppercase tracking-widest text-white/80 leading-relaxed mb-4">
                  Your Tactical Career Navigator.
                </p>
                <p className="text-white/50 text-xs font-mono uppercase tracking-widest leading-loose">
                  TrackrBot interprets your application status and feedback to
                  provide surgical-grade strategy. Real-time tactical advice to
                  optimize your interview conversion rates.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8 border-[3px] border-white bg-black p-4 aspect-4/5 sm:aspect-square md:aspect-video flex flex-col">
              <div className="border-b-[3px] border-white pb-4 mb-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-4 h-4 border-[3px] border-white rounded-none bg-black" />
                  <div className="w-4 h-4 border-[3px] border-white rounded-none bg-black" />
                  <div className="w-4 h-4 border-[3px] border-white rounded-none bg-black" />
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-black tracking-widest uppercase truncate ml-2">
                  REAL-TIME INTERNSHIP INTELLIGENCE
                </div>
              </div>
              <div className="flex-1 border-[3px] border-white flex flex-col items-center justify-center p-0 bg-[#0a0a0a] overflow-hidden">
                <div className="w-full h-full relative">
                  <AiChatPreview />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3.5 Heatmap (Dynamic) */}
        <MalaysiaHeatmap />

        {/* 3.7 Proof & Strategy */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                  Success Protocol
                </h2>
                <p className="font-mono text-sm uppercase tracking-widest text-white/80 leading-relaxed mb-4">
                  Verify Your Market Readiness.
                </p>
                <p className="text-white/50 text-xs font-mono uppercase tracking-widest leading-loose">
                  Our system transforms raw submission data into high-fidelity
                  benchmarks. Monitor live placement frequency and calculate
                  your real-time employment potential index.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <WallOfProof />
              <RoiCalculator />
            </div>
          </div>
        </section>

        {/* Massive Marquee */}
        <section className="border-y-[3px] border-white bg-black overflow-hidden py-12 mb-24 lg:mb-32">
          <div className="relative flex overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee whitespace-nowrap min-w-full">
              {[...Array(2)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center gap-16 px-8">
                  <span
                    className="text-7xl md:text-[9rem] font-black uppercase tracking-tighter leading-none text-transparent"
                    style={{ WebkitTextStroke: "3px white" }}
                  >
                    DATA OVER FEELINGS.
                  </span>
                  <div className="w-8 h-8 md:w-16 md:h-16 bg-white shrink-0" />
                  <span className="text-7xl md:text-[9rem] font-black uppercase tracking-tighter leading-none text-white">
                    OUTWORK EVERYONE.
                  </span>
                  <div className="w-8 h-8 md:w-16 md:h-16 bg-white shrink-0" />
                  <span
                    className="text-7xl md:text-[9rem] font-black uppercase tracking-tighter leading-none text-transparent"
                    style={{ WebkitTextStroke: "3px white" }}
                  >
                    SECURE THE OFFER.
                  </span>
                  <div className="w-8 h-8 md:w-16 md:h-16 bg-white shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. How It Works */}
        <section className="px-6 lg:px-12 max-w-5xl mx-auto mb-24 lg:mb-32">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-16 tracking-tighter text-center">
            How It Works
          </h2>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 border-[3px] border-white p-8 hover:bg-white hover:text-black transition-colors group">
              <div className="text-6xl md:text-7xl font-black leading-none group-hover:text-black">
                01
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">
                  Deploy Protocol
                </h3>
                <p className="text-base md:text-lg font-bold text-white/70 group-hover:text-black/80">
                  Create your account and initialize your personal internship
                  tracking protocol.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 border-[3px] border-white p-8 hover:bg-white hover:text-black transition-colors group">
              <div className="text-6xl md:text-7xl font-black leading-none group-hover:text-black">
                02
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">
                  Feed Data
                </h3>
                <p className="text-base md:text-lg font-bold text-white/70 group-hover:text-black/80">
                  Input your applications, interviews, and offers into the
                  high-performance system.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 border-[3px] border-white p-8 hover:bg-white hover:text-black transition-colors group">
              <div className="text-6xl md:text-7xl font-black leading-none group-hover:text-black">
                03
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase mb-4 tracking-tight">
                  Extract Insights
                </h3>
                <p className="text-base md:text-lg font-bold text-white/70 group-hover:text-black/80">
                  Our AI interprets your data to provide strategic advice on
                  interview prep and skill gaps.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t-[3px] border-white w-full my-24 lg:my-32" />

        {/* 5. Final CTA */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-24 lg:mb-32 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-12 tracking-tighter">
            READY TO COMMIT?
          </h2>
          <a
            href="/auth/signin"
            className="border-[3px] border-white bg-white text-black hover:bg-black hover:text-white transition-none h-20 md:h-24 px-12 md:px-20 text-2xl md:text-4xl uppercase font-black inline-flex items-center justify-center w-full sm:w-auto"
          >
            EXECUTE NOW
          </a>
        </section>
      </main>
    </div>
  );
}
