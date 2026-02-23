"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun01Icon, Moon01Icon, ComputerIcon } from "hugeicons-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 bg-accent/50 rounded-lg animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border border-border/50 backdrop-blur-sm">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-lg transition-all ${
          theme === "light"
            ? "bg-background shadow-sm text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Light mode"
      >
        <Sun01Icon size={18} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-lg transition-all ${
          theme === "dark"
            ? "bg-background shadow-sm text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Dark mode"
      >
        <Moon01Icon size={18} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-lg transition-all ${
          theme === "system"
            ? "bg-background shadow-sm text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="System mode"
      >
        <ComputerIcon size={18} />
      </button>
    </div>
  );
}
