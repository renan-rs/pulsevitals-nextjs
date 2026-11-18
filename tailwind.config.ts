import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    bg: "#05050A",
                    surface: "#0B0B14",
                    border: "#1F1F38",
                    cyan: "#00F0FF",
                    magenta: "#FF007F",
                    neonGreen: "#00FF66",
                },
            },
            boxShadow: {
                'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.3)',
                'neon-magenta': '0 0 20px rgba(255, 0, 127, 0.3)',
                'neon-green': '0 0 20px rgba(0, 255, 102, 0.3)',
            },
        },
    },
    plugins: [],
};
export default config;