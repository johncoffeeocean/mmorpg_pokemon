import Phaser from 'phaser';
import { useCallback, useEffect, useRef, useState } from "react";
import map from "./assets/Images/background.png";
import points from "./assets/Images/points.png";
import './App.css';
import mapData from './assets/mapInfo';
import PointObject from './components/PointsGroup';


var startPoint = [-1, -1, -1]
var endPoint = [-1, -1]
function App() {
  let game = null;
  var pointList = []
  var ref = useRef(null);
  const [width, setWidth] = useState(window.outerWidth * 60 / 100)
  const [height, setHeight] = useState(window.innerHeight);
  function findShortestPath(startNodeIndex, endNodeIndex) {
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
        nodesToVisit.push([relatedNodeIndex, [...currentPath, currentNodeIndex]]);
      }
    }
    return [];
  }
  var buttonClickHandle = (point, pointData, index) => {
    console.log(startPoint)
    if (startPoint[0] === -1) {
      point.setFrame(1)
      startPoint = [...pointData[1], index]
      point.setFrame(1)
      return;
    }
    if (startPoint[0] !== -1) {
      let nodeList = findShortestPath(startPoint[2], index)
      console.log(nodeList)
      console.log(pointList.length)
      for (let i = 0; i < pointList.length; i++) {
        // console.log(i)
        pointList[i].point.setFrame(0)

      }
      pointList[nodeList[0] - 1].point.setFrame(1)
      for (let i = 1; i < nodeList.length - 1; i++) {

        if (nodeList[i] < 56) {
          pointList[nodeList[i] - 1].point.setFrame(3)
        }
      }

      point.setFrame(1)
      return;
    }

  }
  var clearPath = () => {
    startPoint = [-1, -1, -1]
    endPoint = [-1, -1, -1]
    for (let i = 0; i < pointList.length; i++) {
      pointList[i].point.setFrame(0)

    }
  }
  useEffect(() => {

    console.log(width)
    if (game === null) {
      game = new Phaser.Game({
        title: "Game Title",
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: "game-container",
        scene: {
          preload: function () {
            this.load.image("background", map);
            this.load.spritesheet("pointList", points, {
              frameWidth: 500,
              frameHeight: 500
            });
          },

          create: function () {
            const bg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "background");
            bg.setDisplaySize(width, height);
            let mapPoint = mapData.point;
            for (let i = 1; i < mapPoint.length; i++) {
              if (mapPoint[i][1][0] < 0) {
                continue
              }
              const pointObject = new PointObject(i, mapPoint[i], this, buttonClickHandle, { width, height });
              pointObject.create()
              pointList.push(pointObject)
            }

            this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
              const center = new Phaser.Math.Vector2(window.innerWidth / 2, window.innerHeight / 2);
              const speed = 0.3;
              const maxZoomIn = 1;
              const maxZoomOut = 4;


              if (deltaY > 0 && this.cameras.main.zoom > maxZoomIn) {
                // if (  this.cameras.main.scrollX= -width * (this.cameras.main.zoom - 1) / 2 / this.cameras.main.zoom)
                
                 this.cameras.main.zoom -= speed;
              } else if (deltaY < 0 && this.cameras.main.zoom < maxZoomOut) {
                this.cameras.main.zoom += speed;
              }
              const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
              const diff = worldPoint.clone().subtract(center);
              // this.cameras.main.scrollX -= diff.x * 0.0025;
              // this.cameras.main.scrollY -= diff.y * 0.0025;
              pointList.map(point => {
                point.point.setDisplaySize(Math.floor(25 / this.cameras.main.zoom), Math.floor(25 / this.cameras.main.zoom))
              })
            }, this);
            let pointerDown = false;
            let dragStartX = 0;
            let dragStartY = 0;
            let previewX = 0;
            let previewY = 0;
            this.input.on('pointerdown', function (pointer) {
              if (pointer.leftButtonDown() && this.cameras.main.zoom > 1) {
                pointerDown = true;
                dragStartX = pointer.x;
                dragStartY = pointer.y;
                previewX = pointer.x;
                previewY = pointer.y;
                this.input.setDefaultCursor('grab');
              }
            }, this);

            this.input.on('pointerup', function (pointer) {
              if (pointer.leftButtonReleased()) {
                pointerDown = false;
                this.input.setDefaultCursor('default');
              }
            }, this);

            this.input.on('pointermove', function (pointer) {
              if (pointerDown) {
                const diffX = pointer.x - previewX;
                const diffY = pointer.y - previewY;
                if (
                  this.cameras.main.scrollX - diffX / this.cameras.main.zoom >= -width * (this.cameras.main.zoom - 1) / 2 / this.cameras.main.zoom &&
                  this.cameras.main.scrollX - diffX / this.cameras.main.zoom <= width * (this.cameras.main.zoom - 1) / 2 / this.cameras.main.zoom &&
                  this.cameras.main.scrollY - diffY / this.cameras.main.zoom >= -height * (this.cameras.main.zoom - 1) / 2 / this.cameras.main.zoom &&
                  this.cameras.main.scrollY - diffY / this.cameras.main.zoom <= height * (this.cameras.main.zoom - 1) / 2 / this.cameras.main.zoom
                ) {

                  this.cameras.main.scrollX -= diffX / this.cameras.main.zoom;
                  this.cameras.main.scrollY -= diffY / this.cameras.main.zoom;

                  previewX = pointer.x
                  previewY = pointer.y
                }
                else
                  pointerDown=false
              }
            }, this);
          }
        }
      });
    }
  }
    , []);
  return (
    <div className='relative w-full h-fit' ref={ref}>

      <div className='absolute w-1/5 h-full left-0 m-0'>
        <button className='w-full h-full bg-blue-500 hover:bg-black' onClick={clearPath}/>
      </div>
      <div className='absolute w-1/5 h-full right-0 m-0'>
        <button className='w-full h-full bg-blue-500 hover:bg-black' />
      </div>
      <div id="game-container" className=''>
      </div>
      {/* <PointsGroup mapData={mapData} /> */}
    </div>
  )
}

export default App;