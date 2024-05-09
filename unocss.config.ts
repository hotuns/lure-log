import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetAttributify,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

import { readFile } from "node:fs/promises";

export default defineConfig({
  shortcuts: {
    // 绝对定位，水平居中
    "abs-center-x": "absolute left-1/2 -translate-x-1/2",
  },
  preflights: [
    {
      getCSS: () =>
        readFile("./node_modules/@unocss/reset/tailwind.css", "utf-8"),
      layer: "preflights",
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts(),
    presetRemToPx({
      baseFontSize: 4,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
