import { useState, useEffect } from "react";
import { TopView } from "./components/topView";
import { Controls } from "./components/controls";
import { PointInput } from "./components/pointInput";
import { AbsorbtionDropdown } from "./components/absorbtionDropdown";
import { absorbtionTable } from "./components/tables/absorbtionTable";
import { generateLineEquations } from "./components/utils/calculateIntersection";
import { mirrorPointAcrossLine } from "./components/utils/mirrorPoint";
import findEarliestReflection from "./components/utils/findEarliestReflection";
import { calculateReverbTime } from "./components/utils/findReverbTime";
import { calculateG } from "./components/utils/calculateSoundStregthG";
import { findClarityIndex } from "./components/utils/findClarityIndex";
import { useRef } from "react";
import { ResultTable } from "./components/resultTable";
function App() {
  const [activeTab, setActiveTab] = useState("add");
  //POINT STATE
  const [scale, setScale] = useState(10);
  const [topPointMatrix, setTopPointMatrix] = useState([]);
  const [ceilingHeight, setCeilingHeight] = useState(10);
  const [listenerPoint, setListenerPoint] = useState([scale, 0, 0]);
  const [sourcePoint, setSourcePoint] = useState([-scale, 0, 0]);
  const [lineEquations, setLineEquations] = useState([]);

  //MATERIAL STATE
  const { materials } = absorbtionTable;
  const defaultMaterial = Object.keys(materials)[0];
  const defaultMaterialArray = new Array(topPointMatrix.length).fill(
    Object.keys(materials)[0]
  );
  const [wallMaterial, setWallMaterial] = useState(defaultMaterialArray);
  const [ceilingMaterial, setCeilingMaterial] = useState(defaultMaterial);
  const [floorMaterial, setFloorMaterial] = useState(defaultMaterial);
  const [sdi, setSdi] = useState(0.5);
  //TOP VIEW STATE
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const drawingWidth = Math.round(containerWidth / 1.2);
  const drawingHeight = Math.round(containerHeight / 1.2);

  const boundaryCoordY = Math.round(drawingHeight / 2);
  const boundaryCoordX = Math.round(drawingWidth / 2);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setContainerWidth(offsetWidth);
      setContainerHeight(offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setContainerWidth(offsetWidth);
        setContainerHeight(offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //CHANGE INDIVIDUAL POINT COORDINATES
  const changePointCoordinates = (newPoint, index) => {
    const newPointX = Number(newPoint[0]);
    const newPointY = Number(newPoint[1]);

    if (
      (!newPointX && newPointX !== 0) ||
      (!newPointY && newPointY !== 0) ||
      (!index && index !== 0)
    ) {
      console.log("Cannot set new point!");
      return;
    }

    const updatedPoint = [newPointX, newPointY];
    const newMatrix = [...topPointMatrix];
    newMatrix[index] = updatedPoint;

    setTopPointMatrix(newMatrix);
  };

  //UPDATE WALL MATERIAL AND LINE EQUATIONS IF POINT COUNT CHANGES
  useEffect(() => {
    //UPDATE WALL MATERIAL
    setWallMaterial(
      new Array(topPointMatrix.length).fill(Object.keys(materials)[0])
    );

    //UPDATE LINE EQUATIONS
    setLineEquations(generateLineEquations(topPointMatrix));
  }, [topPointMatrix, materials]);

  return (
    <div className=" w-screen  flex flex-col bg-content3 p-8">
      <div className="flex h-[80%] ">
        <div
          ref={containerRef}
          className="flex w-full h-full min-h-[600px] flex-col gap-5 justify-center items-center secondary-box p-4"
        >
          <Controls
            scale={scale}
            setScale={setScale}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setTopPointMatrix={setTopPointMatrix}
          />
          <TopView
            scale={scale}
            setScale={setScale}
            lineEquations={lineEquations}
            wallMaterial={wallMaterial}
            setWallMaterial={setWallMaterial}
            listenerPoint={listenerPoint}
            setListenerPoint={setListenerPoint}
            setSourcePoint={setSourcePoint}
            sourcePoint={sourcePoint}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            setContainerWidth={setContainerWidth}
            setContainerHeight={setContainerHeight}
            drawingWidth={drawingWidth}
            drawingHeight={drawingHeight}
            boundaryCoordX={boundaryCoordX}
            boundaryCoordY={boundaryCoordY}
            activeTab={activeTab}
            topPointMatrix={topPointMatrix}
            setTopPointMatrix={setTopPointMatrix}
          />
        </div>

        <PointInput
          wallMaterial={wallMaterial}
          setWallMaterial={setWallMaterial}
          ceilingHeight={ceilingHeight}
          setCeilingHeight={setCeilingHeight}
          boundaryCoordX={boundaryCoordX}
          boundaryCoordY={boundaryCoordY}
          topPointMatrix={topPointMatrix}
          setTopPointMatrix={setTopPointMatrix}
          changePointCoordinates={changePointCoordinates}
          floorMaterial={floorMaterial}
          setFloorMaterial={setFloorMaterial}
          ceilingMaterial={ceilingMaterial}
          setCeilingMaterial={setCeilingMaterial}
          sdi={sdi}
          setSdi={setSdi}
        />
      </div>

      <ResultTable
        topPointMatrix={topPointMatrix}
        lineEquations={lineEquations}
        listenerPoint={listenerPoint}
        sourcePoint={sourcePoint}
        wallMaterial={wallMaterial}
        floorMaterial={floorMaterial}
        ceilingMaterial={ceilingMaterial}
        ceilingHeight={ceilingHeight}
      />
    </div>
  );
}

export default App;
