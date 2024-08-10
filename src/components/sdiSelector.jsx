import { absorbtionTable } from "./tables/absorbtionTable";

export const SdiSelector = ({ sdi, setSdi }) => {
  const { SDI: SdiTable } = absorbtionTable;
  return (
    <div className="flex flex-col mb-4 px-2 gap-2 w-full">
      <h1 className="w-full text-center">SDI</h1>
      <div className="relative">
        <select
          className="secondary-box block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border focus:border-primary"
          onChange={(e) => setSdi(e.target.value)}
          value={sdi}
        >
          <option value="select" disabled>
            Select Diff. Index
          </option>
          {Object.keys(SdiTable).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute right-[5%] top-[27%] "> {`v`}</div>
      </div>
    </div>
  );
};
