export const Report = ({ results, sdi }) => {
  if (!results) return null;
  const { revtime, Gvals, Cindex, earliest } = results;
  const styles = {
    table: "w-full divide-y divide-content4 secondary-box",
    thead: "bg-content3",
    th: "px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-center",
    tbody: "secondary-box divide-content4 divide-y ",
    td: "px-6 py-4 whitespace-nowrap text-sm border-r border-content4 ",
    tdLabel:
      " bg-content3 px-6 py-4 whitespace-nowrap text-sm font-medium text-white border-r border-content4",
  };

  const idealValues = {
    Liveness: {
      low: 1.9,
      high: 1.9,
    },
    Intimacy: {
      low: 0.01,
      high: 0.02,
    },
    Warmth: {
      low: 1.2,
      high: 1.25,
    },
    LoudnessofDirectSound: {
      low: 19,
      high: 21,
    },
    LoudnessofReverberantSound: {
      low: 2.8,
      high: 3.2,
    },
    Diffusion: {
      low: 0.49,
      high: 0.94,
    },
  };
  function removeSpaces(str) {
    return str.replace(/\s+/g, "");
  }
  function formatsdi(str) {
    return str.replace(/[^105.]/g, "");
  }
  const compare = (value, field) => {
    const low = idealValues[removeSpaces(field)].low;
    const high = idealValues[removeSpaces(field)].high;

    if (value <= high && value >= low) return "ideal";
    if (value <= low) return "low";
    if (value >= high) return "high";
  };
  console.log(
    (revtime.RT60["500"] +
      revtime.RT60["250"] +
      revtime.RT60["1000"] +
      revtime.RT60["4000"]) /
      4 /
      revtime.volume
  );
  const metrics = [
    {
      label: "Liveness",
      data:
        (revtime.RT60["500"] +
          revtime.RT60["250"] +
          revtime.RT60["1000"] +
          revtime.RT60["4000"]) /
        4,
      text: {
        low: "Liveness is low. Higher frequencies(>350hz) might sound dry.",
        high: "Liveness might be too high. Higher frequencies(>350hz) might reverberate too much.",
        ideal: "Liveness is ideal.",
      },
    },
    {
      label: "Intimacy",
      data: earliest.initialTimeDiff,
      text: {
        low: "Room is intimate but might be too small. Reverberation time might be too short.",
        high: "Intimacy is low, listener may be too far away from musicians or walls.",
        ideal: "Room feels intimate.",
      },
    },
    {
      label: "Warmth",
      data: (revtime.RT60["125"] + revtime.RT60["250"]) / 2,
      text: {
        low: "Warmth is low. Lower frequencies might sound dry or may be heard lower than expected.",
        high: "Warmth might be too high. Lower frequencies(<500hz) might reverberate too much.",
        ideal:
          "Warmth is ideal. Lower frequency reverberation creates a sense of warmth.",
      },
    },
    {
      label: "Loudness of Direct Sound",
      data: earliest.directDistance,
      text: {
        low: "Loudness of direct sound is high. Listener might be overwhelmed by sound level.",
        high: " Loudness of direct sound is low. Listener-source distance is too long. Source might sound too quiet in listener position.",
        ideal: "Loudness of direct sound is ideal.",
      },
    },
    {
      label: "Loudness of Reverberant Sound",
      data:
        (revtime.RT60["500"] +
          revtime.RT60["250"] +
          revtime.RT60["1000"] +
          revtime.RT60["4000"]) /
        4 /
        revtime.volume,
      text: {
        low: "Loudness of reverberant sound is low. Room might sound dry/dead. Sense of envelopment and warmth might be low. Clarity and definition might be low.  ",
        high: "Loudness of reverberant sound is high. Room Might sound too wet. Clarity and definition might be low.",
        ideal: "Loudness of reverberant sound is ideal.",
      },
    },
    {
      label: "Diffusion",
      data: Number(formatsdi(sdi)),
      text: {
        low: "Diffusivity is low. Surfaces might focus reflections or might cause uneven reverberation across the room.",
        high: "Diffusivity is high. Reverberation across the room is even.Unwanted reflections and focusing is low.",
        ideal:
          "Diffusivity is moderate. Surfaces might focus reflections or might cause uneven reverberation across the room. Architecture might cause unwanted dead fields.",
      },
    },
  ];

  return (
    <div className="secondary-box overflow-x-auto">
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Metric</th>
            <th className={styles.th}>Description</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {metrics.map(({ label, data, text }) => {
            return (
              <tr key={label}>
                <td className={styles.tdLabel}>{label}</td>

                <td key={`${label}`} className={styles.td}>
                  {text[compare(data, label)]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
