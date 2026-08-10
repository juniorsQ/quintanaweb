import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crt: {
          bg: "#070b08",
          panel: "#0d1410",
          raised: "#121c15",
          border: "#1f3d28",
          grid: "#14301c",
        },
        phosphor: {
          DEFAULT: "#3dff7a",
          dim: "#1f9a48",
          glow: "#7affab",
          mute: "#0f3d22",
        },
        amber: {
          signal: "#ffb84d",
          dim: "#c47d1a",
        },
        cyan: {
          telemetry: "#5ce1ff",
          dim: "#1a7a8f",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "monospace"],
        mono: ["var(--font-share-tech)", "ui-monospace", "monospace"],
        pixel: ["var(--font-vt323)", "monospace"],
      },
      boxShadow: {
        phosphor: "0 0 12px rgba(61, 255, 122, 0.35)",
        "phosphor-lg": "0 0 28px rgba(61, 255, 122, 0.25)",
        amber: "0 0 14px rgba(255, 184, 77, 0.3)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.85" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.9" },
        },
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "boot-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        scan: "scan 8s linear infinite",
        flicker: "flicker 4s linear infinite",
        "radar-sweep": "radar-sweep 6s linear infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        "boot-line": "boot-line 1.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
