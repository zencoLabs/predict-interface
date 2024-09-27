import { defineConfig, presetUno } from "unocss";
import transformerDirective from "@unocss/transformer-directives";
import transformerCompileClass from "@unocss/transformer-compile-class";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { handler } from "@unocss/preset-mini/utils";

export default defineConfig({
  rules: [
    [
      /^bg-gradient-(?:repeating-)?linear-(.+)$/,
      ([, s]) => ({
        "background-image": `linear-gradient${handler.bracket(s)}`,
      }),
    ],
  ],
  shortcuts: {
    "bg-linear-blue":
      "bg-gradient-linear-[(90deg,rgb(131,200,252)0%,rgb(120,241,231)100%)]",
    "bg-linear-blue-hover":
      "bg-gradient-linear-[(90deg,rgb(168,218,255)0%,rgb(182,255,249)100%)]",
    "text-linear-blue": "bg-clip-text bg-linear-blue text-transparent",
    "flex-vertical-center": "flex items-center",
    "flex-horizontal-center": "flex justify-center",
    "flex-center": "flex justify-center items-center",
    "inline-flex-vertical-center": "inline-flex items-center flex-shrink-0",
    "inline-flex-horizontal-center": "inline-flex justify-center",
    "inline-flex-center":
      "inline-flex justify-center items-center flex-shrink-0",
    "absolute-center":
      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  theme: {
    breakpoints: {
      web: "520px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    colors: {
      black: {
        normal: "#000000",
      },
      white: {
        normal: "#FFFFFF",
      },
      yellow: {
        100: "#FAE62F",
      },
      gray: {
        100: "#191818",
        90: "#262525",
        80: "#A3A3A3",
        60: "#D1D1D1",
      },
    },
    boxShadow: {
      normal: "0px 6px 16px 0px #00000014",
    },
  },
  presets: [presetUno()],
  transformers: [
    transformerVariantGroup(),
    transformerCompileClass(),
    transformerDirective(),
  ],
});
