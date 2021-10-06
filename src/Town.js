import Phaser from "phaser";

export default class Town extends Phaser.Physics.Matter.Image {
  constructor(scene, texture, frame) {
    super(scene, texture, frame);
    this.scene.add.existing(this)
  }

  static preload(scene) {
    scene.load.tilemapTiledJSON("map", "assets/tuxemon_town.json");
    scene.load.image("town", "assets/tilesets/tuxmon-sample-32px-extruded.png");
  }
}
