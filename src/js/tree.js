import { Actor, Vector, CollisionType, Timer } from "excalibur";
import { Resources } from './resources.js';
import { Cheese } from './cheese.js';

export class Tree extends Actor {
  direction;
  constructor(x, y, direction) {  // Accept direction as a parameter
    super({ x, y, width: Resources.Tree.width, height: Resources.Tree.height });
    this.body.collisionType = CollisionType.Fixed;
    this.direction = direction;  // Set the direction
  }

  onInitialize(engine) {
   
    this.graphics.use(Resources.Tree.toSprite());

    this.setInitialSpeed();

    // reset tree pos.
    this.on('exitviewport', () => this.resetPosition());

    // Add a cheese on the tree
    this.addCheese();
  }

  addCheese() {
    let cheese = new Cheese(0, -50);
    this.addChild(cheese);
  }

  setInitialSpeed() {
    let randomSpeed = Math.random() * 150 + 50; // random Speed
    if (this.direction === 'left') {
      this.vel = new Vector(-randomSpeed, 0);  // Move left
    } else {
      this.vel = new Vector(randomSpeed, 0);  // Move right
    }
  }

  increaseSpeed(increment) {
    this.vel = this.vel.scale(1 + increment / 150);
  }

  resetPosition() {
    const screenWidth = 800; 
    if (this.pos.x < 0 || this.pos.x > screenWidth) {
      if (this.vel.x > 0) {
        this.pos.x = -this.width / 2;
      } else {
        this.pos.x = screenWidth + this.width / 2;
      }
      // Reset speed 
      // this.setInitialSpeed();
    }
  }

  onPostUpdate(engine, delta) {
    super.onPostUpdate(engine, delta);
    if (this.pos.x < -this.width / 2 || this.pos.x > 800 + this.width / 2) {
      this.resetPosition();
    }
  }
}
