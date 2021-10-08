import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, image) {
    super(scene.matter.world, x, y, image, 0);

    // this.scene.physics.world.enable(this, 0);
    this.scene.add.existing(this)

    const { Body, Bodies } = Phaser.Physics.Matter.Matter
    const playerCollider = Bodies.rectangle(x, y, 24, 46, { isSensor: false, label: "playerCollider" })
    const compoundBody = Body.create({ parts: [playerCollider], frictionAir: 0.35 })

    this.setExistingBody(compoundBody)
    this.setOrigin(0.5, 0.63)
    this.setFixedRotation()
    this.body.immovable = true
    this.body.moves = false

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
