/** @resolution */
uniform vec2 u_resolution;

/** @time */
uniform float u_time;

/**
 * @label Cover Color
 * @color
 * @default #F7F5F0
 */
uniform vec3 u_cover;

/**
 * @label Cycle (s)
 * @range 1.0, 10.0
 * @default 3.0
 */
uniform float u_cycle;

/**
 * @label Reveal (s)
 * @range 0.1, 3.0
 * @default 0.6
 */
uniform float u_reveal;

/**
 * @label Edge Softness
 * @range 0.0, 0.3
 * @default 0.08
 */
uniform float u_soft;

void main() {
  float t = mod(u_time, u_cycle);
  float p = clamp(t / u_reveal, 0.0, 1.0);
  p = 1.0 - pow(1.0 - p, 3.0);
  float x = gl_FragCoord.x / u_resolution.x;
  float edge = p * (1.0 + 2.0 * u_soft) - u_soft;
  float a = smoothstep(edge, edge + u_soft, x);
  float resetFade = smoothstep(u_cycle - 0.25, u_cycle, t);
  a = max(a, resetFade);
  gl_FragColor = vec4(u_cover, a);
}
