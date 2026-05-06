/**
 * @schema 2.10
 * @input lineColor: color = #3B82F6
 * @input fillColor: color = #3B82F620
 * @input gridColor: color = #E5E7EB
 * @input labelColor: color = #6B7280
 * @input axisColor: color = #D1D5DB
 * @input dotColor: color = #2563EB
 * @input showDots: boolean = true
 * @input showGrid: boolean = true
 * @input showFill: boolean = true
 */

// Apple (AAPL) stock prices - last 30 trading days (approximate data March-April 2026)
const stockData = [
  { date: "Mar 5", price: 192.45 },
  { date: "Mar 6", price: 191.80 },
  { date: "Mar 7", price: 193.20 },
  { date: "Mar 10", price: 190.50 },
  { date: "Mar 11", price: 189.75 },
  { date: "Mar 12", price: 191.30 },
  { date: "Mar 13", price: 192.80 },
  { date: "Mar 14", price: 194.10 },
  { date: "Mar 17", price: 193.50 },
  { date: "Mar 18", price: 195.20 },
  { date: "Mar 19", price: 196.80 },
  { date: "Mar 20", price: 195.40 },
  { date: "Mar 21", price: 194.60 },
  { date: "Mar 24", price: 193.80 },
  { date: "Mar 25", price: 195.90 },
  { date: "Mar 26", price: 197.30 },
  { date: "Mar 27", price: 196.50 },
  { date: "Mar 28", price: 198.10 },
  { date: "Mar 31", price: 197.40 },
  { date: "Apr 1", price: 196.20 },
  { date: "Apr 2", price: 194.80 },
  { date: "Apr 3", price: 195.60 },
  { date: "Apr 4", price: 196.90 },
  { date: "Apr 7", price: 197.50 },
  { date: "Apr 8", price: 196.10 },
  { date: "Apr 9", price: 195.30 },
  { date: "Apr 10", price: 196.80 },
  { date: "Apr 11", price: 197.90 },
  { date: "Apr 14", price: 198.20 },
  { date: "Apr 15", price: 198.52 },
];

const W = pencil.width;
const H = pencil.height;

const paddingLeft = 50;
const paddingRight = 16;
const paddingTop = 12;
const paddingBottom = 32;

const chartW = W - paddingLeft - paddingRight;
const chartH = H - paddingTop - paddingBottom;

const prices = stockData.map((d) => d.price);
const minPrice = Math.floor(Math.min(...prices) - 1);
const maxPrice = Math.ceil(Math.max(...prices) + 1);
const priceRange = maxPrice - minPrice;

function xPos(i) {
  return paddingLeft + (i / (stockData.length - 1)) * chartW;
}

function yPos(price) {
  return paddingTop + (1 - (price - minPrice) / priceRange) * chartH;
}

const nodes = [];

// Horizontal grid lines
if (pencil.input.showGrid) {
  const gridSteps = 5;
  for (let i = 0; i < gridSteps; i++) {
    const price = minPrice + (priceRange / gridSteps) * i;
    const y = yPos(price);
    nodes.push({
      type: "line",
      x: paddingLeft,
      y: y,
      width: chartW,
      height: 0,
      stroke: { fill: pencil.input.gridColor, thickness: 1, align: "center" },
    });
    // Y-axis labels
    nodes.push({
      type: "text",
      x: 0,
      y: y - 7,
      content: "$" + price.toFixed(0),
      fontSize: 10,
      fontFamily: "Inter",
      fill: pencil.input.labelColor,
    });
  }
}

// Build the SVG path for the line
let linePath = "";
for (let i = 0; i < stockData.length; i++) {
  const x = xPos(i) ;
  const y = yPos(stockData[i].price);
  if (i === 0) {
    linePath += `M ${x} ${y}`;
  } else {
    // Smooth curve using cubic bezier
    const prevX = xPos(i - 1);
    const prevY = yPos(stockData[i - 1].price);
    const cpOffset = (x - prevX) * 0.35;
    linePath += ` C ${prevX + cpOffset} ${prevY}, ${x - cpOffset} ${y}, ${x} ${y}`;
  }
}

// Area fill under the line
if (pencil.input.showFill) {
  const areaPath =
    linePath +
    ` L ${xPos(stockData.length - 1)} ${paddingTop + chartH}` +
    ` L ${xPos(0)} ${paddingTop + chartH} Z`;

  nodes.push({
    type: "path",
    x: 0,
    y: 0,
    width: W,
    height: H,
    viewBox: [0, 0, W, H],
    geometry: areaPath,
    fill: {
      type: "gradient",
      gradientType: "linear",
      rotation: 180,
      colors: [
        { color: pencil.input.lineColor + "40", position: 0 },
        { color: pencil.input.lineColor + "05", position: 1 },
      ],
    },
  });
}

// The main line
nodes.push({
  type: "path",
  x: 0,
  y: 0,
  width: W,
  height: H,
  viewBox: [0, 0, W, H],
  geometry: linePath,
  stroke: {
    fill: pencil.input.lineColor,
    thickness: 2.5,
    align: "center",
    cap: "round",
    join: "round",
  },
});

// Data point dots
if (pencil.input.showDots) {
  // Show dots at key intervals (every 5th point + last point)
  for (let i = 0; i < stockData.length; i++) {
    if (i % 5 === 0 || i === stockData.length - 1) {
      const cx = xPos(i);
      const cy = yPos(stockData[i].price);
      nodes.push({
        type: "ellipse",
        x: cx - 4,
        y: cy - 4,
        width: 8,
        height: 8,
        fill: "#FFFFFF",
        stroke: {
          fill: pencil.input.dotColor,
          thickness: 2,
          align: "center",
        },
      });
    }
  }
}

// X-axis date labels (show every 5th label to avoid overlap)
for (let i = 0; i < stockData.length; i++) {
  if (i % 7 === 0 || i === stockData.length - 1) {
    const x = xPos(i);
    nodes.push({
      type: "text",
      x: x - 16,
      y: paddingTop + chartH + 8,
      content: stockData[i].date,
      fontSize: 10,
      fontFamily: "Inter",
      fill: pencil.input.labelColor,
    });
  }
}

// Bottom axis line
nodes.push({
  type: "line",
  x: paddingLeft,
  y: paddingTop + chartH,
  width: chartW,
  height: 0,
  stroke: { fill: pencil.input.axisColor, thickness: 1, align: "center" },
});

// Left axis line
nodes.push({
  type: "line",
  x: paddingLeft,
  y: paddingTop,
  width: 0,
  height: chartH,
  stroke: { fill: pencil.input.axisColor, thickness: 1, align: "center" },
});

return nodes;
