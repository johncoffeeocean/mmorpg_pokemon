import Phaser from "phaser";
export default class Point extends Phaser.Scene {
  constructor(index,window,position,setImage,pointObjClicked) {
    super({ key: "Point" });
    this.index = index;
   
    this.window = window;
    this.buttonClickHandle = pointObjClicked;
    this.position=position
    this.pointObj=this.window.add.image(position.x,position.y,setImage)
   
  }
  preload() {}

  create() {
    this.pointObj.setDisplaySize(25,25)
    this.pointObj.setDepth(1)
    this.pointObj.setInteractive()
    this.pointObj.on("pointerdown",()=>{
      this.buttonClickHandle(this.index)
    },this)
  }
  
}
