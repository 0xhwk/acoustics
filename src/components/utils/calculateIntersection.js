// File path: src/utils/lineEquations.js
// if (pointMatrix.length < 2) {
//   console.log("Less than 2 points");
//   return;
// }
// File path: src/utils/lineEquations.js

export const generateLineEquations = (pointMatrix) => {
  const equations = [];
  const n = pointMatrix.length;

  for (let i = 0; i < n; i++) {
    const [x1, y1] = pointMatrix[i];
    const [x2, y2] = pointMatrix[(i + 1) % n]; // Use modulo to wrap around to the first point

    // Calculate slope
    const slope = x2 - x1 !== 0 ? (y2 - y1) / (x2 - x1) : Infinity; // Handle vertical lines

    // Calculate length
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    // Calculate midpoint
    const midpoint = [Math.round((x1 + x2) / 2), Math.round((y1 + y2) / 2)];

    // Calculate the direction vector
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Calculate the normal vector (perpendicular to the direction vector)
    const normalVector = [-dy, dx];

    // Normalize the normal vector
    const normalLength = Math.sqrt(normalVector[0] ** 2 + normalVector[1] ** 2);
    const unitNormalVector = [
      normalVector[0] / normalLength,
      normalVector[1] / normalLength,
    ];

    equations.push({
      slope,
      length,
      midpoint,
      firstPoint: [x1, y1], // Starting point of the line
      secondPoint: [x2, y2], // End point of the line
      normalVector,
      unitNormalVector,
    });
  }

  return equations;
};

export const generateLineEquationsFromAngle = (sourcePoint, angleDegrees) => {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  const slope = Math.tan(angleRadians);
  console.log(Math.tan(1));
  const magnitude = Math.sqrt(1 + slope ** 2);
  const length = 100000;
  const normalizedDirectionVector = [1 / magnitude, slope / magnitude];

  const displacement = [
    length * normalizedDirectionVector[0],
    length * normalizedDirectionVector[1],
  ];

  let secondPoint = [
    sourcePoint[0] + displacement[0],
    sourcePoint[1] + displacement[1],
  ];
  if (angleDegrees < 90 && angleDegrees >= 270) {
    secondPoint = [-secondPoint[0], -secondPoint[1]];
  }

  return {
    slope,
    firstPoint: [sourcePoint[0], sourcePoint[1]],
    secondPoint,
    angleDegrees,
    angleRadians,
  };
};

//--------------------------------------------

// Function to calculate intersection of two lines
export function findIntersectionOfLines(line1, line2) {
  const { firstPoint: fp1, secondPoint: sp1 } = line1;
  const { firstPoint: fp2, secondPoint: sp2 } = line2;

  const [x1, y1] = fp1;
  const [x2, y2] = sp1;
  const [x3, y3] = fp2;
  const [x4, y4] = sp2;

  function isBetween(a, b, c) {
    return a <= Math.max(b, c) && a >= Math.min(b, c);
  }

  function crossProduct(x1, y1, x2, y2) {
    return x1 * y2 - y1 * x2;
  }

  // Check if line1 is vertical
  const isLine1Vertical = x1 === x2;
  // Check if line2 is vertical
  const isLine2Vertical = x3 === x4;
  // Check if line1 is horizontal
  const isLine1Horizontal = y1 === y2;
  // Check if line2 is horizontal
  const isLine2Horizontal = y3 === y4;

  // Handle cases where one line is vertical
  if (isLine1Vertical && isLine2Vertical) {
    if (x1 === x3) return null; // Both lines are vertical and coincident
    return null; // Parallel vertical lines
  } else if (isLine1Vertical) {
    const x = x1;
    const y = isLine2Horizontal ? y3 : ((x - x3) * (y4 - y3)) / (x4 - x3) + y3;
    if (isLine2Horizontal) {
      return [x, y];
    } else if (isBetween(y, y1, y2) && isBetween(y, y3, y4)) {
      return [x, y];
    }
  } else if (isLine2Vertical) {
    const x = x3;
    const y = isLine1Horizontal ? y1 : ((x - x1) * (y2 - y1)) / (x2 - x1) + y1;
    if (isLine1Horizontal) {
      return [x, y];
    } else if (isBetween(y, y1, y2) && isBetween(y, y3, y4)) {
      return [x, y];
    }
  }

  // Handle cases where neither line is vertical
  const denom = crossProduct(x1 - x2, y1 - y2, x3 - x4, y3 - y4);
  if (denom === 0) return null; // Lines are parallel or coincident

  const x =
    crossProduct(
      crossProduct(x1, y1, x2, y2),
      x1 - x2,
      crossProduct(x3, y3, x4, y4),
      x3 - x4
    ) / denom;
  const y =
    crossProduct(
      crossProduct(x1, y1, x2, y2),
      y1 - y2,
      crossProduct(x3, y3, x4, y4),
      y3 - y4
    ) / denom;

  // Check if the intersection point is within both line segments
  if (
    isBetween(x, x1, x2) &&
    isBetween(x, x3, x4) &&
    isBetween(y, y1, y2) &&
    isBetween(y, y3, y4)
  ) {
    return [x, y];
  }

  return null;
}

//--------------------------------------------
export const findIntersection = (pointMatrix, newPoint, excludePoint) => {
  if (pointMatrix.length < 3) return;
  const [newX, newY] = newPoint;
  const [xExclude, yExclude] = excludePoint;

  for (let i = 0; i < pointMatrix.length - 1; i++) {
    const [x1, y1] = pointMatrix[i];
    const [x2, y2] = pointMatrix[i + 1];

    if (
      (x1 === xExclude && y1 === yExclude) ||
      (x2 === xExclude && y2 === yExclude)
    ) {
      continue; // Skip lines involving the excluded point
    }

    // Line equation for the existing segment
    const slope1 = (y2 - y1) / (x2 - x1);
    const intercept1 = y1 - slope1 * x1;

    // Line equation for the new segment
    const slope2 = (newY - yExclude) / (newX - xExclude);
    const intercept2 = yExclude - slope2 * xExclude;

    // Find the intersection point
    const intersectX = (intercept2 - intercept1) / (slope1 - slope2);
    const intersectY = slope1 * intersectX + intercept1;

    // Check if the intersection point is within the bounds of the segments
    if (
      intersectX >= Math.min(x1, x2) &&
      intersectX <= Math.max(x1, x2) &&
      intersectY >= Math.min(y1, y2) &&
      intersectY <= Math.max(y1, y2) &&
      intersectX >= Math.min(xExclude, newX) &&
      intersectX <= Math.max(xExclude, newX) &&
      intersectY >= Math.min(yExclude, newY) &&
      intersectY <= Math.max(yExclude, newY)
    ) {
      return { index: i, intersection: [intersectX, intersectY] };
    }
  }
  return null;
};
