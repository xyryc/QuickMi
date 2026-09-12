/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "sf-pro-regular": ["SF-Pro-Regular"],
        "sf-pro-medium": ["SF-Pro-Medium"],
        "sf-pro-semibold": ["SF-Pro-Semibold"],
        "sf-pro-bold": ["SF-Pro-Text-Bold"],
      },

      colors: {
        "custom-base": "#0F73F7",
        "custom-secondary": "#FDFDFD",
        "custom-gray": "#A2A2A2",

        "custom-black": "#111111",
        "custom-dark-gray": "#7A7A7A",
        "custom-soft-gray": "#E3E6F0",
        "custom-light-gray": "#EBEBEB",
        "custom-gray-dark": "#4D4D4D",

        // status
        "custom-light-yellow": "#FFF7D6",
        "custom-orange": "#F3934F",
        "custom-light-orange": "#FCE8D9",
        "custom-custom-red": "#F34F4F",
        "custom-light-red": "#FFF0EE",
        "custom-green": "#008364",
        "custom-light-green": "#E4F6E8",
        "custom-yellow": "#F1C400",

        // blue
        "custom-blue-100": "#CFE3FD",
        "custom-blue-200": "#9FC7FC",
        "custom-blue-300": "#6FABFA",
        "custom-blue-400": "#3F8FF9",
        "custom-blue-500": "#0F73F7",
        "custom-blue-600": "#0C5CC6",
        "custom-blue-700": "#094594",
        "custom-blue-800": "#062E63",
        "custom-blue-900": "#031731",
      },
    },
  },
  plugins: [],
};
