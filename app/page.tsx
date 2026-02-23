import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative h-12 w-48 mb-4">
            <Image
              src="/next.svg"
              alt="Next.js logo"
              fill
              className="dark:invert object-contain"
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground max-w-2xl">
            Track your internships with{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
            A premium internship tracking platform designed for the modern
            student. Manage applications, track progress, and get AI-powered
            insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              href="/auth/signin"
            >
              Get Started
            </a>
            <a
              className="flex h-12 items-center justify-center rounded-xl border border-border px-8 text-foreground font-semibold transition-all hover:bg-secondary active:scale-[0.98]"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
            {[
              {
                title: "Mobile Ready",
                desc: "Designed first for the device in your pocket.",
              },
              {
                title: "Dark Mode",
                desc: "Sleek, eye-friendly interface for night owls.",
              },
              {
                title: "AI Insights",
                desc: "AI-powered feedback on your applications.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-secondary/50 border border-border/50 backdrop-blur-sm text-left"
              >
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
