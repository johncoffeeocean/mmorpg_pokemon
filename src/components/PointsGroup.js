import Phaser from 'phaser';
export default class PointObject extends Phaser.Scene {
  constructor(index,pointData,window,buttonClickHandle) {
    super({ key: "PointObject" });
    this.index=index
    this.pointData = pointData
    this.window=window
    this.buttonClickHandle=buttonClickHandle
    this.point = this.window.add.sprite(this.window.cameras.main.centerX - 495 + this.pointData[1][0] * 1000 / 714, this.window.cameras.main.centerY - 493 + this.pointData[1][1] * 1000 / 720, "pointList")
    
  }
  preload() {
  }

  create() {

    //  const point = this.add.image(this.cameras.main.centerX - 500 + item[1][0]*1000/714, this.cameras.main.centerY - 500 + item[1][1]*1000/720, "pointList");
    this.point.setFrame(0)
    this.point.setDisplaySize(25, 25)
    this.point.setDepth(1); // set depth to make sure the image is on top of the background image
    if (this.window.cameras.main.worldView.contains(this.point.x, this.point.y)) {
      this.point.setInteractive();
      this.point.on("pointerdown", () => {
        this.buttonClickHandle(this.point,this.pointData,this.index)
      });
    }
  }
}