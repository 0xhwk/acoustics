import { soundVelocity } from "../tables/config";
import {
  findIntersectionOfLines,
  generateLineEquations,
} from "./calculateIntersection";
import { generateLineEquationsFromAngle } from "./calculateIntersection";
import { calculateDistanceBetween2Points } from "./disanceBetween2Points";
import { mirrorPointAcrossLine } from "./mirrorPoint";
export const calculateBlend = (topPointMatrix, sourcePoint, lineEquations) => {
  const twentyPathLength = soundVelocity * 0.02;
  const hundredPathLength = soundVelocity * 0.1;
  const tenPathLength = soundVelocity * 0.01;
  const angle = 10;
  if (!lineEquations || lineEquations.length < 3) return;
  const raysReachedSource = [];
  let currentIntersection = null;
  const lineEquationFromAngles = generateLineEquationsFromAngle(
    sourcePoint,
    angle
  );

  const findIntersection = (ray, lineEquations) => {
    for (let i = 0; i < lineEquations.length; i++) {
      const currentLine = lineEquations[i];
      const intersectPoint = findIntersectionOfLines(ray, currentLine);
      if (intersectPoint) {
        const rayLength = calculateDistanceBetween2Points(
          ray.firstPoint,
          intersectPoint
        );
        return {
          intersectedLineIndex: i,
          intersectPoint,
          rayLength,
          currentLine,
          angle: ray.angleDegrees,
        };
      }
    }
    return undefined;
  };

  //LOOP ANGLES AND CREATE RAYS
  for (let j = 0; j < angle; j++) {
    let cumulativeLength = 0;
    const lineEquationFromAngle = generateLineEquationsFromAngle(
      sourcePoint,
      angle
    );

    const intersection = findIntersection(lineEquationFromAngle, lineEquations);
    console.log(lineEquations);
    console.log(intersection);
    console.log(lineEquationFromAngle);

    if (intersection) {
      //MIRROR HERE
      const { firstPoint, secondPoint } = lineEquationFromAngle;
      const { rayLength, currentLine } = intersection;
      const normalVector = currentLine.normalVector;

      const normalLine = generateLineEquations([
        intersection.intersectPoint,
        normalVector,
      ]);
      console.log(normalLine);

      //   const mirrorFirst = mirrorPointAcrossLine(firstPoint);
    }
  }

  return [
    sourcePoint[0],
    sourcePoint[1],
    lineEquationFromAngles.secondPoint[0],
    lineEquationFromAngles.secondPoint[1],
  ];
};
