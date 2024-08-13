import { calculateReverbTime } from "./utils/findReverbTime";
import { calculateG } from "./utils/calculateSoundStregthG";
import findEarliestReflection from "./utils/findEarliestReflection";
import { findClarityIndex } from "./utils/findClarityIndex";
import { useState } from "react";
import { Report } from "./report";
import { calculateBlend } from "./utils/calculateBlend";
import { calculateIntensityRatio } from "./utils/calculateIntensityRatio";
export const ResultTable = ({
  topPointMatrix,
  lineEquations,
  listenerPoint,
  sourcePoint,
  wallMaterial,
  floorMaterial,
  ceilingMaterial,
  ceilingHeight,
  sdi,
}) => {
  const [results, setResults] = useState(undefined);
  const calculate = () => {
    const revtime = calculateReverbTime(
      topPointMatrix,
      ceilingHeight,
      lineEquations,
      wallMaterial,
      ceilingMaterial,
      floorMaterial
    );
    const earliest = findEarliestReflection(
      lineEquations,
      sourcePoint,
      listenerPoint
    );
    const Gvals = calculateG(sourcePoint, listenerPoint, revtime);
    const Cindex = findClarityIndex(revtime, sourcePoint, listenerPoint);

    // const blend = calculateBlend(topPointMatrix, sourcePoint, lineEquations);
    const intensityRatio = calculateIntensityRatio(sourcePoint, listenerPoint);

    console.log("intensityPercent ", intensityRatio);

    // console.log("blend", blend);
    console.log("revtime:", revtime);
    console.log("Gvalues:", Gvals);
    console.log("cindex", Cindex);
    console.log("earliestRef:", earliest);
    console.log("lineEquations", lineEquations);
    setResults({ revtime, earliest, Gvals, Cindex, intensityRatio });
  };
  const styles = {
    table: "w-full divide-y divide-content4 secondary-box",
    thead: "bg-content3",
    th: "px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-center",
    tbody: "secondary-box divide-content4 divide-y ",
    td: "px-6 py-4 whitespace-nowrap text-sm border-r border-content4 ",
    tdLabel:
      " bg-content3 px-6 py-4 whitespace-nowrap text-sm font-medium text-white border-r border-content4",
  };

  const prepareTable = () => {
    if (!results) return null;

    const freqTable = (results) => {
      const { revtime, Gvals, Cindex, intensityRatio } = results;
      const frequencies = Object.keys(revtime.SeValues);

      const metrics = [
        { label: "Se (m2)", data: revtime.SeValues },
        { label: "RT60(s)", data: revtime.RT60 },
        { label: "RT60 Avg Absorption(s)", data: revtime.RT60AvgAbsorbtion },
        { label: "aAvg (m2)", data: revtime.aAvg },
        { label: "G (db)", data: Gvals.GList },
        { label: "C80", data: Cindex.C80 },
        { label: "Eearly (db)", data: Cindex.Eearly },
        { label: "Ereverberant (db)", data: Cindex.Ereverberant },
      ];

      return (
        <div className="secondary-box overflow-x-auto">
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Metric</th>
                {frequencies.map((freq) => (
                  <th key={freq} className={styles.th}>
                    {freq} Hz
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {metrics.map(({ label, data }) => (
                <tr key={label}>
                  <td className={styles.tdLabel}>{label}</td>
                  {frequencies.map((freq) => (
                    <td key={`${label}-${freq}`} className={styles.td}>
                      {data[freq]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    const valueTable = (results) => {
      if (
        !results ||
        !results.revtime ||
        !results.Gvals ||
        !results.Cindex ||
        !results.earliest
      ) {
        console.error("Invalid results object");
        return null;
      }

      const { revtime, Gvals, Cindex, earliest, intensityRatio } = results;

      const metrics = [
        {
          label: "Total Absorption Coef. (m2)",
          data: revtime.totalAbsorbtionCoefficient,
        },
        { label: "Total Area (m2)", data: revtime.totalArea },
        { label: "Volume of Hall (m3)", data: revtime.volume },
        { label: "Gmin (db)", data: Gvals.Gmin },
        { label: "Direct Distance S-L (m)", data: earliest.directDistance },
        { label: "Direct Sound", data: earliest.directLine.toString() },
        { label: "Direct Sound Time (s)", data: earliest.directTime },
        {
          label: "Earliest Reflection Time (s)",
          data: earliest.earliestReflectionTime,
        },
        { label: "ITD (s)", data: earliest.initialTimeDiff.toString() },
        {
          label: "Earliest Reflection Distance (m)",
          data: earliest.reflectionDistance,
        },
        { label: "Intensity Percent (%)", data: intensityRatio },
      ];

      return (
        <div className="secondary-box overflow-x-auto">
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Metric</th>
                <th className={styles.th}>Value</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {metrics.map(({ label, data }) => (
                <tr key={label}>
                  <td className={styles.tdLabel}>{label}</td>
                  <td className={styles.td}>
                    {data !== undefined
                      ? typeof data === "number"
                        ? data.toFixed(2)
                        : data
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    return (
      <div className="w-full flex flex-col gap-5">
        {freqTable(results)}
        {valueTable(results)}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col secondary-box h-full p-2 gap-2 ">
      <button
        onClick={() => {
          const results = calculate();
        }}
        className="w-full primary-button"
      >
        Calculate
      </button>
      <div>{prepareTable()}</div>
      <Report results={results} sdi={sdi} />
    </div>
  );
};
