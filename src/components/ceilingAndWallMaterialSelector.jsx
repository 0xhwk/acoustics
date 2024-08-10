import { absorbtionTable } from "./tables/absorbtionTable";

export const CeilingAndWallMaterialSelector = ({
  topPointMatrix,
  wallMaterial,
  setWallMaterial,
  floorMaterial,
  setFloorMaterial,
  ceilingMaterial,
  setCeilingMaterial,
}) => {
  const renderCeilAndFloorDropdown = () => {
    const { materials } = absorbtionTable;
    return (
      <div className="flex w-full ">
        <div className="flex flex-col mb-4 px-2 gap-2 w-full">
          <h1 className="w-full text-center">{`Ceiling`}</h1>
          <div className="relative">
            <select
              className="secondary-box block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border focus:border-primary"
              onChange={(e) => setCeilingMaterial(e.target.value)}
              value={ceilingMaterial}
            >
              <option value="select" disabled>
                Select a material
              </option>
              {Object.keys(materials).map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
            <div className="absolute right-[5%] top-[27%] "> {`v`}</div>
          </div>
        </div>
        <div className="flex flex-col mb-4 px-2 gap-2 w-full">
          <h1 className="w-full text-center">{`Floor`}</h1>
          <div className="relative">
            <select
              className="secondary-box block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border focus:border-primary"
              onChange={(e) => setFloorMaterial(e.target.value)}
              value={floorMaterial}
            >
              <option value="select" disabled>
                Select a material
              </option>
              {Object.keys(materials).map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
            <div className="absolute right-[5%] top-[27%] "> {`v`}</div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{renderCeilAndFloorDropdown()}</div>;
};
