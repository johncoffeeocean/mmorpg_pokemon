import { useEffect, useState } from "react";
import GameContainer from "./GameContainer";
import LocationContainer from "./LocationContainer";
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === "=" || event.key === "-")) {
    event.preventDefault();
  }
});
document.addEventListener("wheel", (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
});
function GameWindow() {
  const [path, setPath] = useState([]);
  const [leftboardWidth, setLeftboardWidth] = useState("20vw");
  const [rightboardWidth, setRightboardWidth] = useState("20vw");
  var rightBoardHide = () => {
    setRightboardWidth(rightboardWidth === "20vw" ? "0px" : "20vw");
  };
  var leftBoardHide = () => {
    setLeftboardWidth(leftboardWidth === "20vw" ? "0px" : "20vw");
  };
  return (
    <div id="game-window" className="relative">
      {/* <div className='w-2/12 mt-24'>
        <button className='w-5 h-full bg-blue-500 rounded-md hover:bg-black '></button>
      </div> */}
      <div className="fixed w-full h-[100vh] mt-[-10vh]">
        <GameContainer setPath={setPath} />
      </div>
      <div id="menu-board" className="flex w-full justify-between">
        <div className="flex h-[90vh] z-10">
          <div className=" bg-white" style={{ width: leftboardWidth }}></div>
          <div className="w-4 h-full flex  items-center">
            <button
              className="w-full h-14 bg-blue-500 rounded-r-md"
              onClick={leftBoardHide}
            ></button>
          </div>
        </div>

        <div className="flex h-[90vh] right-0 z-10 w-fit">
          <div className="w-4 h-full flex  items-center">
            <button
              className="w-full h-14 bg-blue-500 rounded-l-md"
              onClick={rightBoardHide}
            ></button>
          </div>
          <div
            className=" w-11/12 h-full bg-white"
            style={{ width: rightboardWidth }}
          >
            <LocationContainer path={path} />
          </div>
        </div>
      </div>

      {/* <PointsGroup mapData={mapData} /> */}
    </div>
  );
}

export default GameWindow;
