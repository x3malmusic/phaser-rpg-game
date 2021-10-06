import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, image) {
    super(scene, x, y, image, 4);

    this.inputKeys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })

    this.scene.physics.world.enable(this, 0);
    this.scene.add.existing(this)
    this.scene.events.on('update', this.update, this)
  }

  static preload(scene) {
    scene.load.spritesheet('dude', 'main_character.png', {
      frameWidth: 48,
      frameHeight: 64,
    })
  }

  createAnims() {
    const anims = this.anims
    this.setDepth(5)

    this.body.setSize(24, 64)

    anims.create({
      key: 'left',
      frames: anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key: 'down',
      frames: anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key: 'right',
      frames: anims.generateFrameNumbers('dude', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    })
    anims.create({
      key: 'up',
      frames: anims.generateFrameNumbers('dude', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    })
  }

  update(args) {
    const speed = 175

    if (!this.body) return

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    if (this.inputKeys.left.isDown) {
      this.body.setVelocityX(-speed)
    } else if (this.inputKeys.right.isDown) {
      this.body.setVelocityX(speed)
    } else if (this.inputKeys.up.isDown) {
      this.body.setVelocityY(-speed)
    } else if (this.inputKeys.down.isDown) {
      this.body.setVelocityY(speed)
    }


    if (this.inputKeys.left.isDown) {
      this.play("left", true);
    } else if (this.inputKeys.right.isDown) {
      this.play("right", true);
    } else if (this.inputKeys.up.isDown) {
      this.play("up", true);
    } else if (this.inputKeys.down.isDown) {
      this.play("down", true);
    } else {
      this.play("down", true)
    }
  }
}
