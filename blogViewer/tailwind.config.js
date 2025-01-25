/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        "primary": "var(--primary)",
        "darkprimary": "var(--darkprimary)",
        "lightprimary": "var(--lightprimary)",
        "secondary": "var(--secondary)",
        "lightsecondary": "var(--lightsecondary)",
        "red": "var(--red)",
        "grey": "var(--grey)",
        "light": "var(--light)",
        "warning": "var(--warning)",
        
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
}