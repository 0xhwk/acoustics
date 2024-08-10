export const Report = ({ results }) => {
  if (!results) return null;
  const { revtime, Gvals, Cindex, Earliest } = results;
  const styles = {
    table: "w-full divide-y divide-content4 secondary-box",
    thead: "bg-content3",
    th: "px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-center",
    tbody: "secondary-box divide-content4 divide-y ",
    td: "px-6 py-4 whitespace-nowrap text-sm border-r border-content4 ",
    tdLabel:
      " bg-content3 px-6 py-4 whitespace-nowrap text-sm font-medium text-white border-r border-content4",
  };

  const references = {
    intimacy: {
      low: 0.001,
      high: 0.004,
    },
    liveness: {
      min: 0.3,
      low: 1,
      mid: 1.5,
      high: 1.8,
      max: 2.2,
    },
    warmth: {
      low: 1.2,
      high: 1.25,
    },
    warmthG: {},
    loudnessDirect: 20,
    loudnessRev: 3,
  };
  const intimacy = (value) => {
    if (value > references.intimacy.low) {
    }
  };

  const metrics = [
    { label: "Intimacy", data: revtime.SeValues },
    { label: "Liveness", data: revtime.RT60 },
    { label: "Warmth", data: revtime.RT60AvgAbsorbtion },
    { label: "Loudness of Direct Sound", data: revtime.aAvg },
    { label: "Loudness of Reverberant Sound", data: Gvals.GList },
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
            123
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {metrics.map(({ label, data }) => (
            <tr key={label}>
              <td className={styles.tdLabel}>{label}</td>

              <td key={`${label}`} className={styles.td}>
                {/* {data} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
