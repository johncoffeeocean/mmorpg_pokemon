import Phaser, { Game } from 'phaser';
import { useEffect, useState } from "react";
import map from "./../../assets/images/map.jpeg";
import CharacterImage from "./../../assets/images/character-image.png";
import points from "./../../assets/images/points.png";
// import './App.css';
import mapData from './../../assets/mapInfo';
import PointObject from './PointsGroup';
import locationImage from "./../../assets/images/location-1.png"
var durationTextObject=null
var LocationContainer = ({path}) => {
  var locationContainer=null;
  useEffect(()=>{
    if(durationTextObject!==null){

      let showString="It will take "+(path.length-1)+" hours to reach there\n"+path.join('\n')
      durationTextObject.setText(showString)
    }
  }
    ,[path])
  useEffect(() => {
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
            durationTextObject=this.add.text(this.cameras.main.centerX*10/100,height*this.cameras.main.width/width+50, "", { font: '24px Arial', fill: '#ffffff' });
            
          }
        }
    });
    }
    
  }
    , []);

  return (

        <div id="location-container" className='w-full h-full'>
          
        </div>
  )
}

export default LocationContainer;