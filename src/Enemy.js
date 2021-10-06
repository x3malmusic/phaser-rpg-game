import Phaser from "phaser";

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, image) {
    super(scene, x, y, image, 0);

    this.scene.physics.world.enable(this, 0);
    this.scene.add.existing(this)
    this.scene.events.on('update', this.update, this)
  }

  static preload(scene) {
    scene.load.spritesheet('zombie', 'enemy_zombie.png', {
      frameWidth: 48,
      frameHeight: 64,
    })
  }

  createAnims() {
    const anims = this.anims

    this.setDepth(5)
    this.body.setSize(24, 64)

    this.body.setImmovable(true)

    anims.create({
      key: 'left',
      frames: anims.generateFrameNumbers('zombie', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key: 'down',
      frames: anims.generateFrameNumbers('zombie', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1,
    })
    anims.create({
      key: 'right',
      frames: anims.generateFrameNumbers('zombie', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key: 'up',
      frames: anims.generateFrameNumbers('zombie', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    })
  }

  update(args) {
    this.play("down", true)
  }
}
