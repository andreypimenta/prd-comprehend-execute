import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          electric: "hsl(var(--electric-blue))",
          navy: "hsl(220 30% 15%)",
          white: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          gold: "hsl(var(--gold-accent))",
          lightGray: "hsl(220 15% 96%)",
          mediumGray: "hsl(220 20% 88%)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          purple: "hsl(var(--purple-main))",
          purpleDark: "hsl(var(--purple-dark))",
          green: "hsl(var(--green-accent))",
          mintGreen: "hsl(158 64% 75%)",
          softBlue: "hsl(240 75% 85%)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        text: {
          darkGray: "hsl(var(--gray-dark))",
          mediumGray: "hsl(220 25% 45%)",
          lightGray: "hsl(var(--gray-light))",
        },
        status: {
          success: "#48BB78",
          warning: "#ED8936",
          error: "#F56565",
          info: "#4299E1",
        },
        evidence: {
          strong: "#48BB78",
          moderate: "#ED8936",
          limited: "#ECC94B",
          inconclusive: "#A0AEC0",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'Lato', 'Open Sans', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Oswald', 'system-ui', 'sans-serif'],
        geometric: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px - Body text (PRD)
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px - H4 (PRD)
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px - H3 range (PRD)
        '4xl': '2.25rem',   // 36px - H2 range (PRD)
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px - H1 min (PRD)
        '7xl': '7rem',      // 113px - H1 max (PRD)
      },
      spacing: {
        // 8px grid system from PRD
        '0.5': '0.125rem',  // 2px
        '1': '0.25rem',     // 4px
        '2': '0.5rem',      // 8px - Base unit
        '3': '0.75rem',     // 12px
        '4': '1rem',        // 16px
        '6': '1.5rem',      // 24px
        '8': '2rem',        // 32px
        '10': '2.5rem',     // 40px
        '12': '3rem',       // 48px
        '16': '4rem',       // 64px
        '20': '5rem',       // 80px
        '24': '6rem',       // 96px
        '32': '8rem',       // 128px
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
