/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 기본(primary) 테마: CSS 변수로 동적 테마 지원
        primary: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // 보조(secondary) 테마
        secondary: {
          100: "var(--bg-secondary-100)",
          200: "var(--bg-secondary-200)",
          300: "var(--bg-secondary-300)",
          400: "var(--bg-secondary-400)",
          500: "var(--bg-secondary-500)",
          600: "var(--bg-secondary-600)",
          700: "var(--bg-secondary-700)",
          800: "var(--bg-secondary-800)",
        },
        // 성공(success) 테마
        success: {
          100: "#ecfdf5",
          500: "#10b981",
          600: "#047857",
        },
        // 경고(warning) 테마
        warning: {
          100: "#fffbeb",
          500: "#f59e0b",
          600: "#d97706",
        },
        // 위험(danger) 테마
        danger: {
          100: "#fef2f2",
          500: "#ef4444",
          600: "#b91c1c",
        },
        // 정보(info) 테마
        info: {
          100: "#eff6ff",
          500: "#3b82f6",
          600: "#1e3a8a",
        },
        error: {
          100: "var(--color-error-100)",
          500: "var(--color-error-500)",
          600: "var(--color-error-600)",
        },
      },
    },
  },
  plugins: [],
};
