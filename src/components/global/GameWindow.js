import Phaser, { Game } from 'phaser';
import { useEffect, useState } from "react";
import map from "./../../assets/images/map.jpeg";
import CharacterImage from "./../../assets/images/character-image.png";
import points from "./../../assets/images/points.png";
// import './App.css';
import mapData from './../../assets/mapInfo';
import PointObject from './PointsGroup';
import locationImage from "./../../assets/images/location-1.png"
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === "=" || event.key === "-")) {
    event.preventDefault();
  }
});
var startNode = 23
var locationContainerText=null;
function GameWindow() {
  let game = null;
  let locationContainer = null;
  var pointList = []
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
    console.log(point)

    let nodeList = findShortestPath(startNode, index)
    console.log(pointList)
    for (let i = 0; i < pointList.length; i++) {
      pointList[i].point.setFrame(0)
    }
    pointList[nodeList[0] - 1].point.setFrame(1)
    for (let i = 1; i < nodeList.length - 1; i++) {

      if (nodeList[i] < 56) {
        pointList[nodeList[i] - 1].point.setFrame(3)
      }
    }

    point.setFrame(1)
    let showString="It will take "+(nodeList.length-1)+" hours to reach there"
    locationContainerText.setText(showString);
    return;

  }
  var clearPath = () => {
    for (let i = 0; i < pointList.length; i++) {
      pointList[i].point.setFrame(0)

    }
  }
  useEffect(() => {
    if (game === null) {
      const parentElement = document.getElementById("game-container");
      game = new Phaser.Game({
        title: "Game Title",
        type: Phaser.AUTO,
        parent: "game-container",
        
        width: parentElement.clientWidth,
        height: parentElement.clientHeight,
        scene: {
          preload: function () {
            this.load.image("background", map);
            this.load.spritesheet("pointList", points, {
              frameWidth: 500,
              frameHeight: 500
            });
            this.load.image("characterImage", CharacterImage)

          },

          create: function () {
            const bg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "background");
            console.log(this.cameras.main.centerX, this.cameras.main.centerY)
            bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
            this.cameras.main.zoom=2;
            let mapPoint = mapData.point;
            console.log(mapPoint[startNode][1])
            console.log(this.cameras.main.centerX)
            this.cameras.main.scrollX=mapPoint[startNode][1][0]*this.cameras.main.width/714-this.cameras.main.centerX
            this.cameras.main.scrollY=mapPoint[startNode][1][1]*this.cameras.main.height/720-this.cameras.main.centerY
            for (let i = 1; i < mapPoint.length; i++) {
              if (mapPoint[i][1][0] > 0) {
                const pointObject = new PointObject(i, mapPoint[i], this, buttonClickHandle);
                pointObject.create()
                pointList.push(pointObject)
              }

            }
            for (let i = 0; i < pointList.length; i++) {
              if(i===startNode-1){
                pointList[i].point.setTexture("characterImage")
                pointList[i].point.setFrame(0)
                pointList[i].point.setDisplaySize(50/this.cameras.main.zoom,50/this.cameras.main.zoom)
              }
              else
                pointList[i].point.setDisplaySize(25 / this.cameras.main.zoom, 25 / this.cameras.main.zoom)
            }
           
            
            this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {

              const center = new Phaser.Math.Vector2(window.innerWidth / 2, window.innerHeight / 2);
              const speed = 0.3;
              const maxZoomIn = 1;
              const maxZoomOut = 5;

              if (deltaY > 0 && this.cameras.main.zoom > maxZoomIn) {
                this.cameras.main.zoom -= speed;
              } else if (deltaY < 0 && this.cameras.main.zoom < maxZoomOut) {
                this.cameras.main.zoom += speed;
              }
              const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
              const diff = worldPoint.clone().subtract(center);
              for (let i = 0; i < pointList.length; i++) {
                if(i===startNode-1){
                  pointList[i].point.setTexture("characterImage")
                  pointList[i].point.setFrame(0)
                  pointList[i].point.setDisplaySize(50/this.cameras.main.zoom,50/this.cameras.main.zoom)
                }
                else
                  pointList[i].point.setDisplaySize(25 / this.cameras.main.zoom, 25 / this.cameras.main.zoom)
              }
            }, this);
            let pointerDown = false;
            let dragStartX = 0;
            let dragStartY = 0;
            this.input.on('pointerdown', function (pointer) {
              if (pointer.leftButtonDown()) {
                pointerDown = true;
                dragStartX = pointer.x;
                dragStartY = pointer.y;
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
                const diffX = pointer.x - dragStartX;
                const diffY = pointer.y - dragStartY;
                this.cameras.main.scrollX -= diffX / this.cameras.main.zoom;
                this.cameras.main.scrollY -= diffY / this.cameras.main.zoom;
                dragStartX = pointer.x
                dragStartY = pointer.y
              }
            }, this);
            this.input.on('gameout', function () {
              if (pointerDown) {
                pointerDown=false
              }
            }, this);
          }
        }
      });
    }
    if (locationContainer === null) {
      const parentElement = document.getElementById("location-container");
      var width,height;
      locationContainer = new Phaser.Game({
        title: "Location Title",
        type: Phaser.AUTO,
        width: parentElement.clientWidth,
        height: parentElement.clientHeight,
        parent: "location-container",
        scene: {
          preload: function () {
            this.load.image("location-image",locationImage)
            this.load.on("filecomplete", function(key, type, data) {
              if (key === "location-image") {
                width = data.width; // Image width in pixels
                height = data.height; // Image height in pixels
              }
            }, this);
          },

          create: function () {
            let locationImageObject=this.add.image(this.cameras.main.centerX,height*this.cameras.main.width/width/2,"location-image")
            locationImageObject.setDisplaySize(this.cameras.main.width,height*this.cameras.main.width/width)
            // locationContainer.colo
            locationContainerText = this.add.text(this.cameras.main.centerX*10/100,3*height*this.cameras.main.width/width/2, '', { font: '24px Arial', fill: '#ffffff' });
            
          }
        }
    });
    }
    
  }
    , []);

  return (
    <div className='relative flex w-full h-[100vh]'>
      <div className='w-2/12'>
        <button className='w-5 h-full bg-blue-500 rounded-md hover:bg-black ' onClick={clearPath}></button>
      </div>
      <div id="game-container" className='w-7/12 h-full'>
      </div>
      <div className='w-3/12 px-2'>
        <div id="location-container" className='w-full h-full'>
        </div>
      </div>
      
      {/* <PointsGroup mapData={mapData} /> */}
    </div>
  )
}

export default GameWindow;