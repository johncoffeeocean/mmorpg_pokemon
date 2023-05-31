import Phaser from "phaser";
import { useEffect, useState } from "react";
import map from "./../../assets/images/map.jpeg";
import points from "./../../assets/images/points.png";
import locationImage from "./../../assets/images/location-default.png";
import locationImageClicked from "./../../assets/images/location-default-clicked.png";
import Point from "./Point";
import axios from "axios";

// import './App.css';
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "z") {
    if (tempList.length > 0) {
      let lastItem = tempList.pop();
      if (lastItem.pointObj) lastItem.pointObj.pointObj.setTexture("");
    }
  }
});
let game = null;
var resData;
var tempList = [];
var graphicList = [];
var thisGameWindow = null;
var globalLocalButtonFlag = false;
var globalPathFlag = false;
var globalStarPoint = -1;
var globalEndPoint = -1;
var mapWidth = 2333;
var mapHeight = 2232;
function MapEditor() {
  const [locationButtonFlag, setLocationButtonFlag] = useState(false);
  const [startPoint, setStartPoint] = useState(-1);
  const [endPoint, setEndPoint] = useState(-1);
  const [pathListData, setPathListData] = useState("");
  var pointObjClicked = (index) => {
    if (resData.length === 0) return;
    if (globalStarPoint === -1) {
      globalStarPoint = index;
      setStartPoint(index);
    } else if (globalStarPoint >= 0) {
      if (globalEndPoint === -1) {
        globalEndPoint = index;
        let graphic = thisGameWindow.add.graphics();
        graphicList.push(graphic);
        graphicList[graphicList.length - 1].clear();
        graphicList[graphicList.length - 1].lineStyle(4, 0xff0000);
        graphicList[graphicList.length - 1].beginPath();
        graphicList[graphicList.length - 1].moveTo(
          resData[globalStarPoint].pos[0],
          resData[globalStarPoint].pos[1]
        );
        graphicList[graphicList.length - 1].lineTo(
          resData[globalEndPoint].pos[0],
          resData[globalEndPoint].pos[1]
        );
        graphicList[graphicList.length - 1].strokePath();
        graphicList[graphicList.length - 1].setDepth(2);
        setEndPoint(index);
      }
    }
  };
  var onClearHandle = () => {
    let graphic = graphicList.pop();
    graphic.clear();
    tempList = [];
    setPathListData(JSON.stringify(tempList));
    setStartPoint(-1);
    setEndPoint(-1);
    globalStarPoint = -1;
    globalEndPoint = -1;
    globalPathFlag = false;
  };
  var onSetHandle = () => {
    if (resData.length === 0) return;
    if (tempList.length > 0) {
      let addLink = {
        id: globalEndPoint,
        path: tempList,
      };
      resData[startPoint].link.push(addLink);
      tempList = [];
      setStartPoint(-1);
      setEndPoint(-1);
      globalStarPoint = -1;
      globalEndPoint = -1;
      globalPathFlag = false;
      console.log(resData);
    }
  };
  var onSave = () => {
    const parentElement = document.getElementById("game-container");
    let width = parentElement.clientWidth;
    let height = parentElement.clientHeight;
    let sendData = resData.map((location) => {
      let linkData = location.link;
      linkData.map((linkNode) => {
        linkNode.path.map((eachNodePath) => {
          eachNodePath[0] = (eachNodePath[0] * mapWidth) / width;
          eachNodePath[1] = (eachNodePath[1] * mapHeight) / height;
        });
      });
      return {
        location_id: location.id,
        location_posX: (location.pos[0] * mapWidth) / width,
        location_posY: (location.pos[1] * mapHeight) / height,
        location_link: JSON.stringify(linkData),
      };
    });
    sendData = {
      node_num: "1",
      name: "123",
      description: "3333",
      posX: "10",
      posY: "10",
      link: "3333333",
    };
    let data = new FormData();
    data.append("node_num", sendData.node_num);
    data.append("name", sendData.name);
    data.append("description", sendData.description);
    data.append("posX", sendData.posX);
    data.append("posY", sendData.posY);
    data.append("link", sendData.link);
    axios.post("http://localhost:8000/api/maps/", data).then((res) => {
      console.log(res.data);
    });
  };
  useEffect(() => {
    if (locationButtonFlag === true) {
      thisGameWindow.cursorImage = thisGameWindow.add.image(
        -10,
        -10,
        "locationImage"
      );
      thisGameWindow.cursorImage.setDisplaySize(25, 25);
      thisGameWindow.cursorImage.setDepth(1);
      globalLocalButtonFlag = locationButtonFlag;
    } else {
      resData = tempList.map((item) => {
        return {
          id: item.id,
          pos: item.pos,
          link: item.link,
        };
      });
      tempList = [];
      globalLocalButtonFlag = locationButtonFlag;
    }
  }, [locationButtonFlag]);

  useEffect(() => {
    if (game === null) {
      const parentElement = document.getElementById("game-container");

      game = new Phaser.Game({
        title: "Game Title",
        type: Phaser.AUTO,
        width: parentElement.clientWidth,
        height: parentElement.clientHeight,
        parent: "game-container",
        scene: {
          preload: function () {
            this.load.image("background", map);
            this.load.spritesheet("locations", points, {
              frameWidth: 500,
              frameHeight: 500,
            });
            this.load.image("locationImage", locationImage);
            this.cursorImage = null;
            thisGameWindow = this;
          },

          create: function () {
            const bg = this.add.image(
              this.cameras.main.centerX,
              this.cameras.main.centerY,
              "background"
            );

            bg.setDisplaySize(
              this.cameras.main.width,
              this.cameras.main.height
            );
            this.input.on(
              "pointermove",
              (pointer) => {
                if (this.cursorImage) {
                  if (globalLocalButtonFlag === true) {
                    this.cursorImage.setPosition(pointer.x, pointer.y);
                  }
                }
              },
              this
            );
            this.input.on("pointerdown", (pointer) => {
              if (globalLocalButtonFlag === true) {
                let locationPointerObj = new Point(
                  tempList.length,
                  this,
                  { x: pointer.x, y: pointer.y },
                  "locationImage",
                  pointObjClicked
                );
                locationPointerObj.create();
                let pushData = {
                  id: tempList.length,
                  pos: [pointer.x, pointer.y],
                  pointObj: locationPointerObj,
                  link: [],
                };
                tempList.push(pushData);
              }
              if (globalPathFlag === true) {
                tempList.push([pointer.x, pointer.y]);
                let drawPath = [
                  resData[globalStarPoint].pos,
                  ...tempList,
                  resData[globalEndPoint].pos,
                ];
                graphicList[graphicList.length - 1].clear();
                graphicList[graphicList.length - 1].lineStyle(4, 0xff0000);
                graphicList[graphicList.length - 1].beginPath();
                graphicList[graphicList.length - 1].moveTo(
                  drawPath[0][0],
                  drawPath[0][1]
                );
                for (let i = 1; i < drawPath.length; i++) {
                  graphicList[graphicList.length - 1].lineTo(
                    drawPath[i][0],
                    drawPath[i][1]
                  );
                }
                graphicList[graphicList.length - 1].strokePath();
                graphicList[graphicList.length - 1].setDepth(2);
                setPathListData(JSON.stringify(tempList));
              }
              if (globalEndPoint !== -1) {
                globalPathFlag = true;
              }
            });
          },
        },
      });
    }
  }, []);

  return (
    <div className="flex w-full h-[90vh]">
      <div className="w-5/12 h-full">
        <div id="map_editor_building">
          <button
            id="location-button"
            onClick={() => setLocationButtonFlag(!locationButtonFlag)}
          >
            {locationButtonFlag === false ? (
              <img
                src={locationImage}
                alt=""
                width={25}
                height={25}
                className=""
              />
            ) : (
              <img
                src={locationImageClicked}
                alt=""
                width={25}
                height={25}
                className=""
              />
            )}
          </button>
        </div>
        <div className="pt-20">
          <div className="flex space-x-3">
            <div id="start-point" className="w-1/6 h-5">
              {startPoint > 0 && startPoint}
            </div>
            <div id="end-point" className="w-1/6 h-5">
              {endPoint > 0 && endPoint}
            </div>
            <button
              className="w-1/6 bg-blue-500 rounded-sm py-2"
              onClick={onSetHandle}
            >
              Set
            </button>
            <button
              className="w-1/6 bg-red-500 rounded-sm py-2"
              onClick={onClearHandle}
            >
              Clear
            </button>
          </div>
          <div id="path-list">{pathListData}</div>
          <div>
            <button className="w-10 h-7 bg-sky-300" onClick={onSave}>
              Save
            </button>
          </div>
        </div>
        <div id="map_editor_road"></div>
      </div>
      <div id="game-container" className="w-7/12 h-full"></div>
      {/* <PointsGroup mapData={mapData} /> */}
    </div>
  );
}

export default MapEditor;
