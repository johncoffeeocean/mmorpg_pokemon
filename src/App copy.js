import Phaser from 'phaser';
import { useEffect, useState } from "react";
import map from "./assets/Images/background.png";
import points from "./assets/Images/points.png";
import './App.css';
import mapData from './assets/mapInfo';
import PointObject from './components/PointsGroup';

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === "=" || event.key === "-")) {
    event.preventDefault();
  }
});
var startPoint = [-1, -1, -1]
var endPoint = [-1, -1]
function App() {
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
    console.log(startPoint)
    if (startPoint[0] === -1) {
      point.setFrame(1)
      startPoint = [...pointData[1], index]
      point.setFrame(1)
      return;
    }
    if (startPoint[0] !== -1) {
      let nodeList=findShortestPath(startPoint[2],index)
      console.log(nodeList)
      for(let i=0;i<pointList.length;i++){
         pointList[i].point.setFrame(0)
        
      }
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
            console.log(this.cameras.main.centerX, this.cameras.main.centerY)
            bg.setDisplaySize(1000, 1000);
            let mapPoint = mapData.point;
            for (let i = 1; i < mapPoint.length; i++) {
              const pointObject = new PointObject(i, mapPoint[i], this, buttonClickHandle);
              pointObject.create()
              pointList.push(pointObject)
            }
          }
        }
      });
    }
  }
    , []);

  return (
    <div className='relative w-full'>

      <div id="game-container" className='absolute'>
      </div>
      <div className='w-[1000px] mx-auto'>
        <button className='absolute w-5 h-5 bg-blue-500 rounded-md hover:bg-black' onClick={clearPath}></button>
      </div>
      {/* <PointsGroup mapData={mapData} /> */}
    </div>
  )
}

export default App;