export const clamp = (v: number, min = 0, max = 1) =>
  v < min ? min : v > max ? max : v;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const invLerp = (a: number, b: number, v: number) =>
  clamp((v - a) / (b - a || 1));

export const remap = (v: number, a: number, b: number, c: number, d: number) =>
  lerp(c, d, invLerp(a, b, v));

export const smoothstep = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

export const smootherstep = (t: number) => {
  const x = clamp(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
};

export type RGB = [number, number, number];

export function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function mixRgb(a: RGB, b: RGB, t: number): RGB {
  const x = clamp(t);
  return [
    Math.round(lerp(a[0], b[0], x)),
    Math.round(lerp(a[1], b[1], x)),
    Math.round(lerp(a[2], b[2], x)),
  ];
}

export function rgbCss(c: RGB, alpha = 1) {
  return alpha >= 1
    ? `rgb(${c[0]} ${c[1]} ${c[2]})`
    : `rgb(${c[0]} ${c[1]} ${c[2]} / ${alpha})`;
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}