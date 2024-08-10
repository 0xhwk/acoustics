import { calculateDistanceBetween2Points } from "./disanceBetween2Points";

export const calculateIntensityRatio = (sourcePoint, listenerPoint) => {
  const distance = calculateDistanceBetween2Points(sourcePoint, listenerPoint);
  const unitPower = 1; //watts
  const unitDistance = 1; //meters
  const I0 = 1 * 10 ** -12;

  const Iunit = 1 / (4 * Math.PI * unitDistance);
  const dbUnit = 10 * Math.log10(Iunit / I0);

  const Isl = 1 / (4 * Math.PI * distance ** 2);
  const dbSl = 10 * Math.log10(Isl / Iunit);

  const diff = dbUnit - Math.abs(dbSl);

  const ratioPercent = (diff / dbUnit) * 100;

  return ratioPercent;
};
