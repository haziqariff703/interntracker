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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4">
      <div className="w-full max-w-md space-y-8 bg-[#111] p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Welcome to InternTracker
          </h1>
          <p className="mt-2 text-gray-400">
            Sign in to manage your applications
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-all active:scale-[0.98]"
          >
            Continue with Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 bg-[#24292e] text-white font-semibold py-3 rounded-xl hover:bg-[#2b3137] transition-all active:scale-[0.98]"
          >
            Continue with GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#111] text-gray-500">Or magic link</span>
          </div>
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold py-3 rounded-xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
