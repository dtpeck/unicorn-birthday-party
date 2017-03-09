import Phaser from 'phaser';

class Player extends Phaser.Sprite {

  constructor(game, x, y, asset) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);

    // We need to enable physics on the player
    game.physics.arcade.enable(this);

    // Player physics properties
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 1000;
    this.body.maxVelocity.y = 500;
    this.body.setSize(20, 32, 5, 16);

    // Player animations
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('turn', [4], 20, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    
    // Our controls
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.facing = 'left';
    this.jumpTimer = 0;
    
    // Saving the variable for use in update()
    this.game = game;
  }

  update() {
    // Reset the players velocity (movement)
    this.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -150;

      if (this.facing != 'left') {
        this.animations.play('left');
        this.facing = 'left';
      }
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = 150;

      if (this.facing != 'right') {
        this.animations.play('right');
        this.facing = 'right';
      }
    } else {
      if (this.facing != 'idle') {
        this.animations.stop();

        if (this.facing == 'left') {
          this.frame = 0;
        } else {
          this.frame = 5;
        }
        this.facing = 'idle';
      }
    }
    
    if (this.jumpButton.isDown && this.body.touching.down && this.game.time.now > this.jumpTimer) {
      this.body.velocity.y = -500;
      this.jumpTimer = this.game.time.now + 750;
    }
  }

}

export default Player;
