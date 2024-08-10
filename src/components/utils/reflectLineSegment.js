export const reflectLineSegment = (
  sourcePoint,
  endPoint,
  intersectionPoint,
  lineEquation
) => {
  const { unitNormalVector } = lineEquation;

  // Function to reflect a point across the normal vector
  const reflectPoint = (point) => {
    const [px, py] = point;
    const [ix, iy] = intersectionPoint;

    // Translate point to the origin (intersection point)
    const tx = px - ix;
    const ty = py - iy;

    // Reflect the point across the normal
    const dotProduct = tx * unitNormalVector[0] + ty * unitNormalVector[1];
    const reflectedTx = tx - 2 * dotProduct * unitNormalVector[0];
    const reflectedTy = ty - 2 * dotProduct * unitNormalVector[1];

    // Translate back to the original position
    return [ix + reflectedTx, iy + reflectedTy];
  };

  // Reflect both endpoints of the line segment
  const reflectedSourcePoint = reflectPoint(sourcePoint);
  const reflectedEndPoint = reflectPoint(endPoint);

  return {
    originalLine: { start: sourcePoint, end: endPoint },
    reflectedLine: { start: reflectedSourcePoint, end: reflectedEndPoint },
  };
};
