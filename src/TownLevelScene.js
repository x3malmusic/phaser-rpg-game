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
    this.dialogs = this.cache.json.get('dialogs');

    const spawnPoint = map.findObject("characters", obj => obj.name === "player");
    const spawnPoint_2 = map.findObject("characters", obj => obj.name === "zombie");

    this.player = new Player(this, spawnPoint.x, spawnPoint.y, "dude", 4)
    this.player.createAnims();

    this.enemy = new Enemy(this, spawnPoint_2.x, spawnPoint_2.y, "zombie", 0)
    this.enemy.createAnims();

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("tileset", "town", 32, 32, 0, 0);

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    map.createLayer("background", tileset, 0, 0);
    const worldLayer = map.createLayer("building", tileset, 0, 0);
    map.createLayer("building_decorations", tileset, 0, 0);
    const aboveLayer = map.createLayer("overhead", tileset, 0, 0);
    const aboveLayer_2 = map.createLayer("overhead_top", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(worldLayer)

    aboveLayer.setDepth(10);
    aboveLayer_2.setDepth(15);

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Extract objects from the object layer
    const objectLayer = map.getObjectLayer('interactive');
    // Convert object layer objects to Phaser game objects
    if (objectLayer && objectLayer.objects) {
      objectLayer.objects.forEach(
        (object) => {
          const objectX = object.x + (object.width / 2)
          const objectY = object.y + (object.height / 2)

          let tmp = this.matter.add.rectangle(objectX, objectY, object.width, object.height, { label: object.name, isStatic: true });
          tmp.properties = object.properties.reduce((obj, item) => Object.assign(obj, { [item.name]: item.value }), {});

          this.matterCollision.addOnCollideStart({
            objectA: this.player,
            objectB: tmp,
            callback: eventData => {
              const { bodyB } = eventData;
              this.gameDialog.setText(this.dialogs[bodyB.label]);
            }
          });
        }
      );
    }
  }
}