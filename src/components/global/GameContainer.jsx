import Phaser, { Game } from "phaser";
import { useEffect, useState } from "react";
import map from "./../../assets/images/map.jpeg";
import CharacterImage from "./../../assets/images/character-image.png";
import points from "./../../assets/images/points.png";
// import './App.css';
import mapData from "./../../assets/mapInfo";
import PointObject from "./PointsGroup";
import locationImage from "./../../assets/images/location-1.png";

var startNode = 23;
const GameContainer = ({ setPath }) => {
  let game = null;
  var pointList = [];
  var findShortestPath = (startNodeIndex, endNodeIndex) => {
    const visitedNodes = [];
    const nodesToVisit = [[startNodeIndex, []]];
    while (nodesToVisit.length > 0) {
      const [currentNodeIndex, currentPath] = nodesToVisit.shift();
      if (visitedNodes.includes(currentNodeIndex)) {
        continue;
      }
      if (currentNodeIndex === endNodeIndex) {
        return [...currentPath, endNodeIndex];
      }
      visitedNodes.push(currentNodeIndex);
      var relatedNodes = mapData.point[currentNodeIndex][2];
      for (const relatedNodeIndex of relatedNodes) {
        nodesToVisit.push([
          relatedNodeIndex,
          [...currentPath, currentNodeIndex],
        ]);
      }
    }
    return [];
  };
  var buttonClickHandle = (point, pointData, index) => {
    let nodeList = findShortestPath(startNode, index);
    console.log(pointList);
    for (let i = 0; i < pointList.length; i++) {
      pointList[i].point.setFrame(0);
    }
    pointList[nodeList[0] - 1].point.setFrame(1);
    for (let i = 1; i < nodeList.length - 1; i++) {
      if (nodeList[i] < 56) {
        pointList[nodeList[i] - 1].point.setFrame(3);
      }
    }

    point.setFrame(1);

    setPath(nodeList);
    return;
  };
  useEffect(() => {
    if (game === null) {
      const parentElement = document.getElementById("game-container");
      console.log(parentElement);
      game = new Phaser.Game({
        title: "Game Container",
        type: Phaser.AUTO,
        parent: "game-container",

        width: parentElement.clientWidth,
        height: parentElement.clientHeight,
        scene: {
          preload: function () {
            this.load.image("background", map);
            this.load.spritesheet("pointList", points, {
              frameWidth: 500,
              frameHeight: 500,
            });
            this.load.image("characterImage", CharacterImage);
          },

          create: function () {
            const bg = this.add.image(
              this.cameras.main.centerX,
              this.cameras.main.centerY,
              "background"
            );
            console.log(this.cameras.main.centerX, this.cameras.main.centerY);
            let showImageSize = {
              width: this.cameras.main.width,
              height: (bg.height * this.cameras.main.width) / bg.width,
            };
            bg.setDisplaySize(
              this.cameras.main.width,
              (bg.height * this.cameras.main.width) / bg.width
            );
            this.cameras.main.zoom = 2;
            let mapPoint = mapData.point;
            console.log(mapPoint[startNode][1]);
            console.log(this.cameras.main.centerX);
            this.cameras.main.scrollX =
              (mapPoint[startNode][1][0] * this.cameras.main.width) / 712 -
              this.cameras.main.centerX;
            this.cameras.main.scrollY =
              (mapPoint[startNode][1][1] * this.cameras.main.height) / 720 -
              this.cameras.main.centerY;
            for (let i = 1; i < mapPoint.length; i++) {
              if (mapPoint[i][1][0] > 0) {
                const pointObject = new PointObject(
                  i,
                  mapPoint[i],
                  this,
                  buttonClickHandle,
                  showImageSize
                );
                pointObject.create();
                pointList.push(pointObject);
              }
            }
            for (let i = 0; i < pointList.length; i++) {
              if (i === startNode - 1) {
                pointList[i].point.setTexture("characterImage");
                pointList[i].point.setFrame(0);
                pointList[i].point.setDisplaySize(
                  50 / this.cameras.main.zoom,
                  50 / this.cameras.main.zoom
                );
              } else
                pointList[i].point.setDisplaySize(
                  25 / this.cameras.main.zoom,
                  25 / this.cameras.main.zoom
                );
            }

            this.input.on(
              "wheel",
              function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
                const center = new Phaser.Math.Vector2(
                  window.innerWidth / 2,
                  window.innerHeight / 2
                );
                const speed = 0.1 * this.cameras.main.zoom;
                const maxZoomIn = 0.6;
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
                for (let i = 0; i < pointList.length; i++) {
                  if (i === startNode - 1) {
                    pointList[i].point.setTexture("characterImage");
                    pointList[i].point.setFrame(0);
                    pointList[i].point.setDisplaySize(
                      50 / this.cameras.main.zoom,
                      50 / this.cameras.main.zoom
                    );
                    pointList[i].pointText.setDisplaySize(
                      25 / this.cameras.main.zoom,
                      25 / this.cameras.main.zoom
                    );
                  } else {
                    pointList[i].point.setDisplaySize(
                      25 / this.cameras.main.zoom,
                      25 / this.cameras.main.zoom
                    );
                    pointList[i].pointText.setDisplaySize(
                      25 / this.cameras.main.zoom,
                      25 / this.cameras.main.zoom
                    );
                  }
                }
              },
              this
            );
            let pointerDown = false;
            let dragStartX = 0;
            let dragStartY = 0;
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
            this.input.on(
              "gameout",
              function () {
                if (pointerDown) {
                  pointerDown = false;
                }
              },
              this
            );
          },
        },
      });
    }
  }, []);
  return <div id="game-container" className="w-full h-full"></div>;
};

export default GameContainer;
