/**
 * @schema 2.10
 * @input numPaths: number = 20
 * @input years: number = 30
 * @input startValue: number = 100000
 * @input annualReturn: number = 0.085
 * @input volatility: number = 0.152
 * @input annualContribution: number = 12000
 * @input accentColor: color = #A855F7
 * @input positiveColor: color = #22C55E
 * @input negativeColor: color = #EF4444
 * @input gridColor: color = #1E1E22
 */

const w = pencil.width;
const h = pencil.height;
const numPaths = Math.max(3, Math.floor(pencil.input.numPaths));
const years = Math.max(1, Math.floor(pencil.input.years));
const startVal = pencil.input.startValue;
const mu = pencil.input.annualReturn;
const sigma = pencil.input.volatility;
const contrib = pencil.input.annualContribution;

const accent = pencil.input.accentColor;
const positive = pencil.input.positiveColor;
const negative = pencil.input.negativeColor;
const gridCol = pencil.input.gridColor;

// Helper: set alpha on a color (handles #RRGGBB and #RRGGBBAA)
function withAlpha(hex, alpha) {
  const base = hex.replace(/^#/, '').substring(0, 6);
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return '#' + base + a;
}

// Generate simulation paths using geometric Brownian motion
const paths = [];
const stepsPerYear = 4;
const totalSteps = years * stepsPerYear;
const dt = 1 / stepsPerYear;

for (let p = 0; p < numPaths; p++) {
  const values = [startVal];
  let current = startVal;
  for (let t = 1; t <= totalSteps; t++) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(Math.max(u1, 0.0001))) * Math.cos(2 * Math.PI * u2);
    const drift = (mu - 0.5 * sigma * sigma) * dt;
    const diffusion = sigma * Math.sqrt(dt) * z;
    current = current * Math.exp(drift + diffusion);
    current += contrib * dt;
    values.push(current);
  }
  paths.push(values);
}

// Calculate percentile paths
function getPercentilePath(paths, percentile) {
  const result = [];
  const numSteps = paths[0].length;
  for (let t = 0; t < numSteps; t++) {
    const vals = paths.map(p => p[t]).sort((a, b) => a - b);
    const idx = Math.min(Math.floor(percentile * vals.length), vals.length - 1);
    result.push(vals[idx]);
  }
  return result;
}

const p5 = getPercentilePath(paths, 0.05);
const p25 = getPercentilePath(paths, 0.25);
const p50 = getPercentilePath(paths, 0.50);
const p75 = getPercentilePath(paths, 0.75);
const p95 = getPercentilePath(paths, 0.95);

// Find max value for scaling
const allMax = Math.max(...p95) * 1.1;
const pad = 4;

function toX(step) {
  return pad + (step / totalSteps) * (w - pad * 2);
}

function toY(value) {
  return h - pad - (value / allMax) * (h - pad * 2);
}

function pathToSVG(values) {
  let d = `M${toX(0).toFixed(1)},${toY(values[0]).toFixed(1)}`;
  for (let i = 1; i < values.length; i++) {
    d += ` L${toX(i).toFixed(1)},${toY(values[i]).toFixed(1)}`;
  }
  return d;
}

function bandToSVG(upper, lower) {
  let d = `M${toX(0).toFixed(1)},${toY(upper[0]).toFixed(1)}`;
  for (let i = 1; i < upper.length; i++) {
    d += ` L${toX(i).toFixed(1)},${toY(upper[i]).toFixed(1)}`;
  }
  for (let i = lower.length - 1; i >= 0; i--) {
    d += ` L${toX(i).toFixed(1)},${toY(lower[i]).toFixed(1)}`;
  }
  d += ' Z';
  return d;
}

const nodes = [];

// Grid lines
const gridSteps = 5;
for (let g = 1; g < gridSteps; g++) {
  const gy = pad + (g / gridSteps) * (h - pad * 2);
  nodes.push({
    type: "line",
    x: pad,
    y: gy,
    width: w - pad * 2,
    height: 0,
    stroke: { fill: gridCol, thickness: 1, align: "center" }
  });
}

// 95% confidence band (p5 to p95)
nodes.push({
  type: "path",
  x: 0, y: 0, width: w, height: h,
  viewBox: [0, 0, w, h],
  geometry: bandToSVG(p95, p5),
  fill: withAlpha(accent, 0.06)
});

// 50% confidence band (p25 to p75)
nodes.push({
  type: "path",
  x: 0, y: 0, width: w, height: h,
  viewBox: [0, 0, w, h],
  geometry: bandToSVG(p75, p25),
  fill: withAlpha(accent, 0.12)
});

// Individual sample paths (ghost trails)
const ghostCount = Math.min(numPaths, 12);
for (let p = 0; p < ghostCount; p++) {
  nodes.push({
    type: "path",
    x: 0, y: 0, width: w, height: h,
    viewBox: [0, 0, w, h],
    geometry: pathToSVG(paths[p]),
    fill: { type: "color", color: "#000000", enabled: false },
    stroke: { fill: withAlpha(accent, 0.08), thickness: 1, align: "center", cap: "round", join: "round" }
  });
}

// 5th percentile line
nodes.push({
  type: "path",
  x: 0, y: 0, width: w, height: h,
  viewBox: [0, 0, w, h],
  geometry: pathToSVG(p5),
  fill: { type: "color", color: "#000000", enabled: false },
  stroke: { fill: negative, thickness: 2, align: "center", cap: "round", join: "round" }
});

// Median line
nodes.push({
  type: "path",
  x: 0, y: 0, width: w, height: h,
  viewBox: [0, 0, w, h],
  geometry: pathToSVG(p50),
  fill: { type: "color", color: "#000000", enabled: false },
  stroke: { fill: accent, thickness: 2.5, align: "center", cap: "round", join: "round" }
});

// 95th percentile line
nodes.push({
  type: "path",
  x: 0, y: 0, width: w, height: h,
  viewBox: [0, 0, w, h],
  geometry: pathToSVG(p95),
  fill: { type: "color", color: "#000000", enabled: false },
  stroke: { fill: positive, thickness: 2, align: "center", cap: "round", join: "round" }
});

// End-point dots
const endPoints = [
  { values: p95, color: positive },
  { values: p50, color: accent },
  { values: p5, color: negative }
];

for (const ep of endPoints) {
  const ex = toX(totalSteps) - 4;
  const ey = toY(ep.values[ep.values.length - 1]) - 4;
  nodes.push({
    type: "ellipse",
    x: ex, y: ey, width: 8, height: 8,
    fill: ep.color
  });
}

return nodes;
