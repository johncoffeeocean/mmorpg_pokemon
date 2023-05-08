import Phaser, { Game } from "phaser";
import { useEffect, useState } from "react";
import map from "./../../assets/images/map.jpeg";
import points from "./../../assets/images/points.png";
// import './App.css';
import mapData from "../../assets/mapInfo";
import PointObject from "../PointsGroup";

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === "=" || event.key === "-")) {
    event.preventDefault();
  }
});

var startPoint = [-1, -1, -1];
var endPoint = [-1, -1];
function MapEditor() {
  let game = null;
  var locations = [];

  useEffect(() => {
    if (game === null) {
      game = new Phaser.Game({
        title: "Game Title",
        type: Phaser.AUTO,
        width: (window.innerWidth * 7) / 12,
        height: window.innerHeight,
        parent: "game-container",
        scene: {
          preload: function () {
            this.load.image("background", map);
            this.load.spritesheet("locations", points, {
              frameWidth: 500,
              frameHeight: 500,
            });
          },

          create: function () {
            const bg = this.add.image(
              this.cameras.main.centerX,
              this.cameras.main.centerY,
              "background"
            );

            console.log(this.cameras.main.centerX, this.cameras.main.centerY);

            bg.setDisplaySize(
              this.cameras.main.width,
              this.cameras.main.height
            );

            // let mapPoint = mapData.point;
            // for (let i = 1; i < mapPoint.length; i++) {
            //   if (mapPoint[i][1][0] > 0) {
            //     const pointObject = new PointObject(
            //       i,
            //       mapPoint[i],
            //       this,
            //       buttonClickHandle
            //     );
            //     pointObject.create();
            //     locations.push(pointObject);
            //   }
            // }

            this.input.on(
              "wheel",
              function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
                const center = new Phaser.Math.Vector2(
                  window.innerWidth / 2,
                  window.innerHeight / 2
                );
                const speed = 0.3;
                const maxZoomIn = 1;
                const maxZoomOut = 5;

                if (deltaY > 0 && this.cameras.main.zoom > maxZoomIn) {
                  this.cameras.main.zoom -= speed;
                } else if (deltaY < 0 && this.cameras.main.zoom < maxZoomOut) {
                  this.cameras.main.zoom += speed;
                }

                const worldPoint = this.input.activePointer.positionToCamera(
                  this.cameras.main
                );
                const diff = worldPoint.clone().subtract(center);
                for (let i = 0; i < locations.length; i++) {
                  locations[i].point.setDisplaySize(
                    25 / this.cameras.main.zoom,
                    25 / this.cameras.main.zoom
                  );
                }
              },
              this
            );

            let pointerDown = false;
            let dragStartX = 0;
            let dragStartY = 0;

            let flag = "normal";
            this.input.on(
              "pointerdown",
              function (pointer) {
                if (pointer.leftButtonDown()) {
                  pointerDown = true;
                  dragStartX = pointer.x;
                  dragStartY = pointer.y;
                  this.input.setDefaultCursor("grab");
                }
              },
              this
            );

            this.input.on(
              "pointerup",
              function (pointer) {
                if (pointer.leftButtonReleased()) {
                  pointerDown = false;
                  this.input.setDefaultCursor("default");
                }
              },
              this
            );

            this.input.on(
              "pointermove",
              function (pointer) {
                if (pointerDown) {
                  const diffX = pointer.x - dragStartX;
                  const diffY = pointer.y - dragStartY;
                  this.cameras.main.scrollX -= diffX / this.cameras.main.zoom;
                  this.cameras.main.scrollY -= diffY / this.cameras.main.zoom;
                  dragStartX = pointer.x;
                  dragStartY = pointer.y;
                }
              },
              this
            );
          },
        },
      });
    }
  }, []);

  const [isResizing, setIsResizing] = useState(false);
  const [resizingCircleType, setResizingCircleType] = useState(null);
  const [resizingCircleSize, setResizingCircleSize] = useState(null);

  function handleCircleMouseDown(circleType) {
    setIsResizing(true);
    setResizingCircleType(circleType);
  }

  function handleMouseUp() {
    setIsResizing(false);
    setResizingCircleType(null);
    setResizingCircleSize(null);
  }

  function handleMouseMove(e) {
    if (isResizing) {
      // Get the new size for the circle based on the mouse position
      const newSize = 10;

      // Update the size of the appropriate circle
      if (resizingCircleType === "building") {
        setResizingCircleSize(newSize);
      } else if (resizingCircleType === "road") {
        setResizingCircleSize(newSize);
      }
    }
  }

  function onBuilding() {
    var customCursor =
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="8" cy="8" r="6" fill="black"/></svg>';
    document.getElementById("game-container").style.cursor =
      "url(" + customCursor + ") 8 8, auto";
  }
  return (
    <div className="flex w-full h-fit">
      <div className="w-1/12">
        <div id="map_editor_building" onClick={onBuilding}>
          Building
        </div>
        <div id="map_editor_road">Road</div>
      </div>
      <div id="game-container" className="w-8/12 h-full"></div>
      <div className="w-2/12"></div>
      {/* <PointsGroup mapData={mapData} /> */}
    </div>
  );
}

export default MapEditor;
