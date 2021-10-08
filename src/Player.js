import Phaser from "phaser";

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, image) {
    super(scene.matter.world, x, y, image, 4);

    this.speed = 3
    this.direction = "down"

    this.inputKeys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })

    this.scene.add.existing(this)

    const { Body, Bodies } = Phaser.Physics.Matter.Matter
    const playerCollider = Bodies.rectangle(x, y, 24, 16, { isSensor: false, label: "playerCollider" })
    const compoundBody = Body.create({ parts: [playerCollider], frictionAir: 0.35 })

    this.setExistingBody(compoundBody)
    this.setOrigin(0.5, 0.83)
    this.setFixedRotation()

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

    anims.create({
      key: 'idle-left',
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 1,
      repeat: -1,
    })
    anims.create({
      key: 'idle-down',
      frames: [{ key: "dude", frame: 0 }],
      frameRate: 1,
      repeat: -1,
    })
    anims.create({
      key: 'idle-right',
      frames: [{ key: "dude", frame: 8 }],
      frameRate: 1,
      repeat: -1,
    })
    anims.create({
      key: 'idle-up',
      frames: [{ key: "dude", frame: 12 }],
      frameRate: 1,
      repeat: -1,
    })
  }

  update(args) {
    if (this.scene.gameDialog.visible) return
    if (!this.body) return

    this.setVelocityX(0)
    this.setVelocityY(0)

    if (this.inputKeys.left.isDown) {
      this.setVelocityX(-this.speed)
      this.direction = "left";
    } else if (this.inputKeys.right.isDown) {
      this.setVelocityX(this.speed)
      this.direction = "right";
    } else if (this.inputKeys.up.isDown) {
      this.setVelocityY(-this.speed)
      this.direction = "up";
    } else if (this.inputKeys.down.isDown) {
      this.setVelocityY(this.speed)
      this.direction = "down";
    }


    if (this.inputKeys.left.isDown) {
      this.play("left", true);
    } else if (this.inputKeys.right.isDown) {
      this.play("right", true);
    } else if (this.inputKeys.up.isDown) {
      this.play("up", true);
    } else if (this.inputKeys.down.isDown) {
      this.play("down", true);
    } else if(this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      this.play(`idle-${this.direction}`, false)
    }
  }
}
