import Phaser from "phaser";

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super("battle");
  }

  preload() {
    this.load.image("sky", "sky.jpeg")
  }

  create() {
    this.add.sprite(0, 0,"sky").setOrigin(0, 0)
  }

  update() {
  }
}