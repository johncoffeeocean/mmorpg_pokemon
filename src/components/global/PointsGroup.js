import Phaser from "phaser";
export default class PointObject extends Phaser.Scene {
  constructor(index, pointData, window, buttonClickHandle, showImageSize) {
    super({ key: "PointObject" });
    this.index = index;
    this.pointData = pointData;
    this.window = window;
    this.buttonClickHandle = buttonClickHandle;
    this.width = showImageSize.width;
    this.height = showImageSize.height;
    this.pointText = null;
    if (this.pointData[1][0] > 0)
      this.point = this.window.add.sprite(
        this.window.cameras.main.centerX -
          showImageSize.width / 2 +
          ((this.pointData[1][0] + 7) * showImageSize.width) / 714,
        this.window.cameras.main.centerY -
          showImageSize.height / 2 +
          ((this.pointData[1][1] + 7) * showImageSize.height) / 720,
        "pointList"
      );
    else this.point = null;
  }
  preload() {}

  create() {
    if (this.pointData[1][0] > 0) {
      this.point.setFrame(0);
      this.point.setDisplaySize(25, 25);
      this.point.setDepth(1); // set depth to make sure the image is on top of the background image
      this.pointText = this.window.add.text(
        this.window.cameras.main.centerX -
          this.width / 2 +
          ((this.pointData[1][0] + 7) * this.width) / 714 -
          5,
        this.window.cameras.main.centerY -
          this.height / 2 +
          ((this.pointData[1][1] + 7) * this.height) / 720 +
          10,
        this.index,
        { font: "24px Arial", fill: "#ff0000" }
      );
      this.pointText.setDisplaySize(
        25 / this.window.cameras.main.zoom,
        25 / this.window.cameras.main.zoom
      );
      // pointText.setDepth(2)
      if (
        this.window.cameras.main.worldView.contains(this.point.x, this.point.y)
      ) {
        this.point.setInteractive();
        this.point.on("pointerdown", () => {
          this.buttonClickHandle(this.point, this.pointData, this.index);
        });
      }
    }
    //  const point = this.add.image(this.cameras.main.centerX - 500 + item[1][0]*1000/714, this.cameras.main.centerY - 500 + item[1][1]*1000/720, "pointList");
  }
}
