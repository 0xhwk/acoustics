// File path: src/components/TopView.js

import React, { useState, useEffect } from "react";
import { findIntersection } from "./utils/calculateIntersection";
import { calculateBlend } from "./utils/calculateBlend";

export const TopView = ({
  lineEquations,
  listenerPoint,
  setListenerPoint,
  setSourcePoint,
  sourcePoint,
  containerWidth,
  containerHeight,
  setContainerWidth,
  setContainerHeight,
  drawingWidth,
  drawingHeight,
  boundaryCoordX,
  boundaryCoordY,
  topPointMatrix,
  setTopPointMatrix,
  activeTab,
  setWallMaterial,
  wallMaterial,
  scale,
  setScale,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragged, setDragged] = useState(false);

  const [popoverOpen, setPopoverOpen] = useState(true);

  //   console.log({
  //     drawingWidth,
  //     drawingHeight,
  //     boundaryCoordX,
  //     boundaryCoordY,
  //     containerWidth,
  //     containerHeight,
  //   });
  const popover = (i, x, y, z = "0") => {
    return (
      <div
        className={`${
          popoverOpen && "!hidden"
        }  flex !flex-row text-nowrap p-2 secondary-box w-min translate-x-[10px] translate-y-[10px] !text-[10px]`}
      >
        <div>{`${i}:(${x / scale},${y / scale})`}</div>
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth / 2);
      setContainerHeight(window.innerHeight / 2);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = Math.max(
      -boundaryCoordX,
      Math.min(boundaryCoordX, Math.round(event.clientX - rect.left - centerX))
    );
    const y = Math.max(
      -boundaryCoordY,
      Math.min(
        boundaryCoordY,
        Math.round(-(event.clientY - rect.top - centerY))
      )
    );
    let coordinates = { x: Math.round(x / scale), y: Math.round(y / scale) };

    setMousePosition(coordinates);
    if (draggingIndex == "source") {
      setSourcePoint([coordinates.x, coordinates.y]);
    }

    if (draggingIndex == "listener") {
      setListenerPoint([coordinates.x, coordinates.y]);
    }

    // Update position if dragging
    if (
      draggingIndex !== null &&
      draggingIndex !== "source" &&
      draggingIndex !== "listener"
    ) {
      const newTopPointMatrix = [...topPointMatrix];
      newTopPointMatrix[draggingIndex] = [coordinates.x, coordinates.y];
      setTopPointMatrix(newTopPointMatrix);
    }
  };

  const handleMouseDown = (index) => {
    setDraggingIndex(index);
    setDragged(true);
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  const createPoint = () => {
    if (activeTab == "remove") return;
    if (dragged) {
      setDragged(false);
      return;
    }
    const newPoint = [mousePosition.x, mousePosition.y];

    // 1. Check for intersections with lines excluding the starting point
    const intersectionResultStart = findIntersection(
      topPointMatrix,
      newPoint,
      topPointMatrix[0]
    );

    if (intersectionResultStart) {
      const { index } = intersectionResultStart;
      const newPointMatrix = [
        ...topPointMatrix.slice(0, index + 1),
        newPoint,
        ...topPointMatrix.slice(index + 1),
      ];
      setTopPointMatrix(newPointMatrix);
    } else {
      // 2. Check for intersections with lines excluding the ending point
      const intersectionResultEnd = findIntersection(
        topPointMatrix,
        newPoint,
        topPointMatrix[topPointMatrix.length - 1]
      );

      if (intersectionResultEnd) {
        const { index } = intersectionResultEnd;
        const newPointMatrix = [
          ...topPointMatrix.slice(0, index + 1),
          newPoint,
          ...topPointMatrix.slice(index + 1),
        ];
        setTopPointMatrix(newPointMatrix);
      } else {
        const newPointMatrix = [...topPointMatrix, newPoint];
        setTopPointMatrix(newPointMatrix);
      }
    }
  };

  const renderSourcePoint = () => {
    const [x, y] = sourcePoint;
    const left = `${boundaryCoordX + x * scale}px`;
    const top = `${boundaryCoordY - y * scale}px`; // Ensure to invert Y-axis here
    const dotSize = 8;
    const halfDotSize = dotSize / 2;
    const leftNudged = left - halfDotSize;
    const topNudged = top - halfDotSize;
    return (
      <div
        key={"source"}
        className={`absolute z-50 bg-purple-500 rounded-full cursor-pointer`}
        style={{
          width: dotSize,
          height: dotSize,
          left: `calc(${left} - ${halfDotSize}px)`,
          top: `calc(${top} - ${halfDotSize}px)`,
        }}
        onMouseDown={() => {
          if (activeTab === "remove") return;
          handleMouseDown("source");
        }}
      >
        {popover("source", x * scale, y * scale, "0", topNudged, leftNudged)}
      </div>
    );
  };

  const renderTestPoint = () => {
    const points = calculateBlend(topPointMatrix, sourcePoint, lineEquations);
    console.log(points);
    if (!points || points.length != 4) return null;
    const [x1, y1, x2, y2] = points;

    return (
      <svg
        className="absolute top-0 left-0 w-full h-full fill-yellow-200 z-50"
        style={{ pointerEvents: "none" }}
      >
        <line
          x1={boundaryCoordX + x1 * scale}
          y1={boundaryCoordY - y1 * scale}
          x2={x2}
          y2={y2}
          stroke="red"
          strokeWidth="1"
          fill=""
        />
      </svg>
    );
  };
  const renderListenerPoint = () => {
    const [x, y, z] = listenerPoint;
    const left = `${boundaryCoordX + x * scale}px`;
    const top = `${boundaryCoordY - y * scale}px`;
    const dotSize = 8;
    const halfDotSize = dotSize / 2;
    const leftNudged = left - halfDotSize;
    const topNudged = top - halfDotSize;
    return (
      <div
        key={"listener"}
        className={`absolute z-50 bg-green-500 rounded-full cursor-pointer`}
        style={{
          width: dotSize,
          height: dotSize,
          left: `calc(${left} - ${halfDotSize}px)`,
          top: `calc(${top} - ${halfDotSize}px)`,
        }}
        onMouseDown={() => {
          if (activeTab === "remove") return;
          handleMouseDown("listener");
        }}
      >
        {popover(
          "listenerPoint",
          x * scale,
          y * scale,
          z,
          "0",
          topNudged,
          leftNudged
        )}
      </div>
    );
  };
  const renderExistingPoints = () => {
    return topPointMatrix.map((point, index) => {
      const [x, y] = point;
      const left = `${boundaryCoordX + x * scale}px`;
      const top = `${boundaryCoordY - y * scale}px`; // Invert secondary
      const dotSize = 8;
      const halfDotSize = dotSize / 2;
      const leftNudged = left - halfDotSize;
      const topNudged = top - halfDotSize;

      return (
        <React.Fragment key={index}>
          <div
            key={index}
            className={`absolute bg-blue-500 rounded-full cursor-pointer`}
            style={{
              width: dotSize,
              height: dotSize,
              left: `calc(${left} - ${halfDotSize}px)`,
              top: `calc(${top} - ${halfDotSize}px)`,
            }}
            onClick={() => {
              if (activeTab !== "remove") return;
              const newMatrix = topPointMatrix.filter((_, i) => i !== index);
              setTopPointMatrix(newMatrix);
            }}
            onMouseDown={() => {
              if (activeTab === "remove") return;
              handleMouseDown(index);
            }}
          >
            {popover(index, x * scale, y * scale, "0", topNudged, leftNudged)}
          </div>
        </React.Fragment>
      );
    });
  };

  const renderLineLengths = () => {
    return lineEquations.map((line, index) => {
      return (
        <div
          key={index}
          className="p-1 !text-[10px] absolute z-40 bg-purple-500 secondary-box"
          style={{
            left: `${boundaryCoordX + line.midpoint[0] * scale - 12}px`,
            top: `${boundaryCoordY - line.midpoint[1] * scale - 12}px`,
          }}
        >
          {Math.round(line.length)}
        </div>
      );
    });
  };

  const renderPolygon = () => {
    const points = topPointMatrix
      .map(
        ([x, y]) =>
          `${boundaryCoordX + x * scale},${boundaryCoordY - y * scale}`
      ) //Invert secondary
      .join(" ");

    return (
      <svg
        className="absolute top-0 left-0 w-full h-full fill-yellow-200 opacity-40"
        style={{ pointerEvents: "none" }}
      >
        <polygon points={points} stroke="blue" strokeWidth="1" fill="" />
      </svg>
    );
  };

  return (
    <div
      className={`secondary-box flex items-center justify-center relative no-select`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={createPoint}
      onMouseEnter={() => setPopoverOpen(true)}
      onMouseLeave={() => setPopoverOpen(false)}
    >
      <div
        className={`bg-content4`}
        style={{
          width: drawingWidth,
          height: drawingHeight,
          position: "relative",
        }}
      >
        {/* {renderTestPoint()} */}
        {renderListenerPoint()}
        {renderSourcePoint()}
        {renderLineLengths()}
        {renderPolygon()}
        {renderExistingPoints()}
      </div>
      <div className="absolute top-0 left-0 m-2 text-white">
        Mouse Position: {`X: ${mousePosition.x}, Y: ${mousePosition.y}`}
      </div>
    </div>
  );
};
