import Phaser from "phaser";
import Town from "./Town";
import Player from "./Player";
import Enemy from "./Enemy";

export default class TownLevelScene extends Phaser.Scene {
  constructor() {
    super("main");
    this.player = null;
  }

  preload() {
    Town.preload(this)
    Player.preload(this)
    Enemy.preload(this)
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    this.player = new Player(this, spawnPoint.x, spawnPoint.y, "dude", 4)
    this.player.createAnims();

    this.enemy = new Enemy(this, spawnPoint.x + 100, spawnPoint.y - 100, "zombie", 0)
    this.enemy.createAnims();



    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "town");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    map.createLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });

    aboveLayer.setDepth(10);

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Watch the player and worldLayer for collisions, for the duration of the scene:
    this.physics.add.collider(this.player, worldLayer);
    this.physics.add.collider(this.player, this.enemy, () => {
      // this.player.setActive(false);
      // this.player.setVisible(false);
      // this.player.body.enable = false;

      // const x = this.player.x
      // const y = this.player.y - 100

      // this.player = null
      // this.add.text(x, y, "You are dead!", { font: "40px san-serif", fill: "#ff0000" })
      this.gameDialog.setText("This zombie looks dangerous");
      // this.scene.start("battle")
    });
  }
}