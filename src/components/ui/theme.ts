import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

export const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        navy: {
          400: { value: "#406286" },
          500: { value: "#002E5D" },
          600: { value: "#00254a" },
        },
        blue: {
          5: {
            value: "#F5F8FA",
          },
          500: { value: "#256BA2" },
        },
        gray: {
          100: { value: "#F4F4F5" },
          200: { value: "#E4E4E7" },
          400: {
            value: "#A1A1AA",
          },
          600: {
            value: "#52525B",
          },
          800: {
            value: "#27272A",
          },
        },
        red: {
          value: "#C80000",
        },
        gold: {
          500: {
            value: "#CCA15C",
          },
        },
      },
      fonts: {
        heading: {
          value: "var(--font-roboto)",
        },
        body: {
          value: "var(--font-roboto)",
        },
      },
    },
    semanticTokens: {
      colors: {
        fg: {
          DEFAULT: { value: "{colors.gray.800}" },
          black: { value: "{colors.black}" },
          blue: {
            value: "{colors.blue.500}",
          },
          navy: {
            value: "{colors.navy.500}",
          },
          inverted: { value: "{colors.white}" },
          muted: { value: "{colors.gray.600}" },
          subtle: { value: "{colors.gray.400}" },
        },
        border: {
          DEFAULT: { value: "{colors.gray.200}" },
        },
        bg: {
          blue: {
            value: "{colors.blue.5}",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
