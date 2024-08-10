import { absorbtionTable } from "./tables/absorbtionTable";

export const AbsorbtionDropdown = ({
  topPointMatrix,
  wallMaterial,
  setWallMaterial,
  floorMaterial,
  setFloorMaterial,
  ceilingMaterial,
  setCeilingMaterial,
}) => {
  const { materials } = absorbtionTable;

  const handleChange = (index) => (event) => {
    const selectedMaterial = event.target.value;
    const newAbsorbtionCoef = [...wallMaterial];
    newAbsorbtionCoef[index] = selectedMaterial;
    setWallMaterial(newAbsorbtionCoef);
  };

  const getNextIndex = (i) => {
    return (i + 1) % topPointMatrix.length;
  };

  const renderDropdowns = () => {
    return topPointMatrix.map((_, index) => {
      const nextIndex = getNextIndex(index);

      return (
        <div
          key={index}
          className="flex flex-col px-2 gap-2 h-[90px] justify-center"
        >
          <h1 className="w-full  ">{`Line ${index}-${nextIndex}`}</h1>
          <div className="relative">
            <select
              className="secondary-box block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border focus:border-primary"
              onChange={handleChange(index)}
              value={wallMaterial[index] || ""}
            >
              <option value="" disabled>
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
      );
    });
  };

  return <div className="flex flex-col  min-h-[90px]">{renderDropdowns()}</div>;
};
