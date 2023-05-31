import { useState, useEffect } from "react";
import GameContainer from "./GameContainer";
import LocationContainer from "./LocationContainer";
import { Animate } from "react-simple-animate";
import config from "../../config";
import socket from "../socketConfig";
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === "=" || event.key === "-")) {
    event.preventDefault();
  }
});

function GameWindow() {
  const [path, setPath] = useState([]);
  const [leftBoardHidePlay, setLeftBoardHidePlay] = useState(false);
  const [rightBoardHidePlay, setRightBoardHidePlay] = useState(false);

  useEffect(() => {
    console.log("join_online");
    socket.emit("join_online", config.getUserInfo(), function (id_oline) {
      if (id_oline) {
        const socketInfo = {
          joined: true,
          id_oline: id_oline,
        };

        config.setSocketInfo(socketInfo);
      }
    });
  });

  return config.getUserInfo() ? (
    <div id="game-window" className="relative">
      {/* <div className='w-2/12 mt-24'>
        <button className='w-5 h-full bg-blue-500 rounded-md hover:bg-black '></button>
      </div> */}
      <div className="fixed w-full h-[100vh] mt-[-10vh]">
        <GameContainer setPath={setPath} />
      </div>
      <div id="menu-board" className="flex w-full justify-betweeaan">
        <div
          play={leftBoardHidePlay}
          duration={0.2}
          start={{ transform: "translateX(0px)" }}
          end={{ transform: "translateX(-20vw)" }}
        >
          <div className="flex h-[90vh] z-10">
            <div className=" bg-white w-[20vw]"></div>
            <div className="w-4 h-full flex  items-center">
              <button
                className="w-full h-14 bg-blue-500 rounded-r-md"
                onClick={() => {
                  setLeftBoardHidePlay(!leftBoardHidePlay);
                }}
              ></button>
            </div>
          </div>
        </div>
        <div className="  w-[20vw] h-full bg-white">
          <LocationContainer path={path} />
        </div>
        <div
          play={rightBoardHidePlay}
          duration={0.2}
          start={{ transform: "translateX(0px)" }}
          end={{ transform: "translateX(20vw)" }}
        >
          <div className="flex h-[90vh] right-0 z-10 w-fit">
            <div className="w-4 h-full flex  items-center">
              <button
                className="w-full h-14 bg-blue-500 rounded-l-md"
                onClick={() => {
                  setRightBoardHidePlay(!rightBoardHidePlay);
                }}
              ></button>
            </div>
          </div>
        </div>
      </div>

      {/* <PointsGroup mapData={mapData} /> */}
    </div>
  ) : (
    "Please login first"
  );
}

export default GameWindow;
