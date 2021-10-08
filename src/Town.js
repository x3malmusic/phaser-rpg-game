import Phaser from "phaser";

export default class Town extends Phaser.Physics.Matter.Image {
  constructor(scene, texture, frame) {
    super(scene, texture, frame);
    this.scene.add.existing(this)
  }

  static preload(scene) {
    scene.load.json("dialogs", "assets/interactibles/world.json");
    scene.load.tilemapTiledJSON("map", "assets/map.json");
    scene.load.image("town", "assets/tilesets/tileset.png");
  }
}
