import { Actor, Vector, Keys, CollisionType } from "excalibur";
import { Resources } from './resources.js';
import { Tree } from './tree.js';
import { Cheese } from './cheese.js';

export class Rat extends Actor {
  grounded = false;
  jumpCount = 0;
  currentTree = null; // current tree van rat

  constructor() {
    super({ width: Resources.Rat.width - 50, height: Resources.Rat.height - 350 });
    this.body.collisionType = CollisionType.Active;
  }

  onInitialize(engine) {
    this.graphics.use(Resources.Rat.toSprite());
    this.pos = new Vector(600, 200);
    this.scale = new Vector(0.1, 0.1);
    this.vel = new Vector(0, 0);
    this.z = 1;
    this.body.mass = 9;
    this.body.bounciness = 0;

    this.on('collisionstart', (event) => {
      if (event.other instanceof Tree) {
        this.grounded = true;
        this.currentTree = event.other; // Track the tree
        console.log('Grounded: ', this.grounded); // Debug log
      } else if (event.other instanceof Cheese) {
        this.scorePlus();
        event.other.kill(); // EAT CHEESE nom nom nom
      }
    });

    this.on('collisionend', (event) => {
      if (event.other instanceof Tree) {
        this.grounded = false;
        this.currentTree = null; // Stop tracking the tree
        console.log('Grounded: ', this.grounded); // Debug log
      }
    });
  }

  scorePlus() {
    
    const maingame = this.scene;
    if (maingame && typeof maingame.updateScore === 'function') {
      maingame.updateScore();
    }
  }

  onPreUpdate(engine, delta) {
    let xspeed = 0;
    let yspeed = this.vel.y; // Maintain the current y-speed

    //if grounded, move rat with tree
    if (this.grounded && this.currentTree) {
      this.pos.x += this.currentTree.vel.x * delta / 3000;
    }

    if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
      xspeed = 330;
    }

    if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
      xspeed = -330;
    }

   

    this.vel = new Vector(xspeed, yspeed);

    // Jump function
    if (this.grounded && engine.input.keyboard.wasPressed(Keys.Space)) {
      console.log('Jump!'); // Debug log
      this.jumpCount++;
      this.body.applyLinearImpulse(new Vector(0, -6500)); //jump
    }

    this.graphics.flipHorizontal = (this.vel.x < 0);
  }

  onPostUpdate(engine, delta) {
    // side walls
    const screenWidth = engine.drawWidth;
    const halfWidth = this.width / 2;

    if (this.pos.x < halfWidth) {
      this.pos.x = halfWidth +1;
      this.vel.x = 0; // Stop horizontale movement
    } else if (this.pos.x > screenWidth - halfWidth) {
      this.pos.x = screenWidth - halfWidth -1;
      this.vel.x = 0; // Stop horizontale movement
    }

    // rat death 
    const screenHeight = engine.drawHeight;
    if (this.pos.y > screenHeight) {
      engine.goToScene('gameover'); //  GameOver scene
    }
  }
}
