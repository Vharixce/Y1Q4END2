import { Actor, Engine, Vector, Sprite, CollisionType} from "excalibur"
import { Resources } from './resources.js'

export class Cheese extends Actor {
    sprite
    speedx
    constructor(x,y) {
        super({x,y, width: Resources.Cheese.width, height: Resources.Cheese.height })
        
        // this.body.collisionType = CollisionType.Active;
    }
    onInitialize(engine) {
        this.sprite = Resources.Cheese.toSprite()
        this.graphics.use(this.sprite)
    
        this.vel = new Vector(-100, 0)
    

     
    }
    onPostUpdate(){
        if (this.pos.x < -150){
            this.vel.x = 100
        }
        if (this.pos.x > 150){
            this.vel.x = -100
        }

    }

}