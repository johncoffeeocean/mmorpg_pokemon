import Phaser, { Game } from 'phaser';
import { useEffect, useState } from "react";
import map from "./../../assets/images/map.jpeg";
import points from "./../../assets/images/points.png";
// import './App.css';
import mapData from './../../assets/mapInfo';
import PointObject from './../PointsGroup';

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === "=" || event.key === "-")) {
    event.preventDefault();
  }
});
var startPoint = [-1, -1, -1]
var endPoint = [-1, -1]
function GameWindow() {
  let game = null;
  var pointList=[]
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
    if (startPoint[0] === -1) {
      point.setFrame(1)
      startPoint = [...pointData[1], index]
      return;
    }
    if (startPoint[0] !== -1) {
      let nodeList=findShortestPath(startPoint[2],index)
      console.log(pointList)
      for(let i=0;i<pointList.length;i++){
         pointList[i].point.setFrame(0)
      }
      console.log('asdfasdf')
      pointList[nodeList[0]-1].point.setFrame(1)
      for(let i=1;i<nodeList.length-1;i++){
        
        if(nodeList[i]<56){
          pointList[nodeList[i]-1].point.setFrame(3)
        }
      }
      
      point.setFrame(1)
      return;
    }

  }
  var clearPath = () =>{
    startPoint=[-1,-1,-1]
    endPoint=[-1,-1,-1]
    for(let i=0;i<pointList.length;i++){
      pointList[i].point.setFrame(0)
     
   }
  }
  useEffect(() => {
    if (game === null) {
      game = new Phaser.Game({
        title: "Game Title",
        type: Phaser.AUTO,
        width: window.innerWidth*7/12,
        height: window.innerHeight  ,
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
            console.log(this.cameras.main.centerX, this.cameras.main.centerY)
            bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
            let mapPoint = mapData.point;
            for (let i = 1; i < mapPoint.length; i++) {
              if(mapPoint[i][1][0]>0){
                const pointObject = new PointObject(i, mapPoint[i], this, buttonClickHandle);
                pointObject.create()
                pointList.push(pointObject)
              }
              
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
              for(let i=0;i<pointList.length;i++){
                pointList[i].point.setDisplaySize(25/this.cameras.main.zoom,25/this.cameras.main.zoom)
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
                this.cameras.main.scrollX -= diffX/this.cameras.main.zoom;
                this.cameras.main.scrollY -= diffY/this.cameras.main.zoom;
                dragStartX=pointer.x
                dragStartY=pointer.y
              }
            }, this);
          }
        }
      });
    }
  }
    , []);

  return (
    <div className='flex w-full h-fit'>
      <div className='w-5/12'>
        <button className='w-5 h-5 bg-blue-500 rounded-md hover:bg-black' onClick={clearPath}></button>
      </div>
      <div id="game-container" className='w-7/12 h-full'>
      </div>
      
      {/* <PointsGroup mapData={mapData} /> */}
    </div>
  )
}

export default GameWindow;