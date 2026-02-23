"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("email", { email, callbackUrl: "/" });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4 font-sans">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border border-border shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to InternTracker
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to manage your applications
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-foreground text-background font-semibold py-3 rounded-xl hover:opacity-90 transition-all active:scale-[0.98]"
          >
            Continue with Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-secondary text-secondary-foreground font-semibold py-3 rounded-xl hover:bg-muted transition-all active:scale-[0.98]"
          >
            Continue with GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground font-medium">
              Or magic link
            </span>
          </div>
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground/60"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
