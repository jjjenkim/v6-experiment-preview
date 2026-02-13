/** @type {import('tailwindcss').Config} */
export default {
      content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
            extend: {
                  colors: {
                        'korea-red': {
                              DEFAULT: '#C60C30',
                              dark: '#A00A28',
                              light: '#E61B3F',
                        },
                        'korea-blue': {
                              DEFAULT: '#003478',
                              dark: '#002456',
                              light: '#004A9F',
                        },
                        'gold': {
                              DEFAULT: '#FFD700',
                              dark: '#E6C200',
                        },
                        'silver': {
                              DEFAULT: '#C0C0C0',
                              dark: '#A8A8A8',
                        },
                        'bronze': {
                              DEFAULT: '#CD7F32',
                              dark: '#B5702C',
                        },
                        gray: {
                              950: '#0a0a0b', // Deep background
                        }
                  },
                  fontFamily: {
                        sans: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
                        body: ['Pretendard', '-apple-system', 'sans-serif'],
                        display: ['Pretendard Variable', 'sans-serif'],
                        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
                  },
                  backgroundImage: {
                        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #003478 0deg, #0a0a0b 180deg, #C60C30 360deg)',
                        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  },
            },
      },
      plugins: [],
}
