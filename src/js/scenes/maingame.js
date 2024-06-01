import { Actor, Vector, Label, FontUnit, Font, Scene, Color, BoundingBox, Timer } from "excalibur";
import { Resources } from '../resources.js';  
import { Tree } from '../tree.js';
import { Rat } from '../rat.js';
import { Cheese } from '../cheese.js';
import { GameOver } from './gameover.js';  

export class Maingame extends Scene {
    score = 0;
    mylabel;
    rat;
    cheeseCount = 0;
    totalCheese = 3; // hoeveel cheese er is
    treeSpeedIncrement = 1; // elke seconden iets sneller
  
    treeSpeed = 1; // Initial tree speed

    onInitialize(engine) {
        this.startGame(engine);

        // timer voor accelleratie van trees
        const speedIncreaseTimer = new Timer({
            fcn: () => this.increaseTreeSpeed(),
            interval: 1000,
            repeats: true
        });

        this.add(speedIncreaseTimer);
        speedIncreaseTimer.start();
    }

    startGame(engine) {
        this.score = 0;

        const bg = new Actor();
        bg.graphics.use(Resources.BG.toSprite());
        bg.pos = new Vector(400, 300);
        this.add(bg);

        this.spawnRat(engine);

        // locked camera on rat
        this.camera.strategy.lockToActor(this.rat);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, -500, 800, 800));

        Resources.ThemeSong.play(0.4);

        // trees met direction
        const tree1 = new Tree(300, 180, 'left');  
        const tree2 = new Tree(600, 330, 'right'); 
        const tree3 = new Tree(900, 480, 'left');  

        this.add(tree1);
        this.add(tree2);
        this.add(tree3);

        this.mylabel = new Label({
            text: `Score: ${this.score}`,
            pos: new Vector(100, 10),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

       
        this.add(this.mylabel);

    }

    updateScore() {
        this.score++;
        this.cheeseCount++;
        this.mylabel.text = `Score: ${this.score}`;

        // Check of alle cheese is opgepakt
        if (this.cheeseCount >= this.totalCheese) {
            this.respawnCheese();
        }
    }

    spawnRat(engine) {
        this.rat = new Rat();
        this.add(this.rat);
    }

    increaseTreeSpeed() {
        this.treeSpeed += this.treeSpeedIncrement;

        // tree accelleratie
        this.actors.forEach(actor => {
            if (actor instanceof Tree) {
                actor.increaseSpeed(this.treeSpeed);
            }
        });
    }

    respawnCheese() {
        // Reset cheese aantal
        this.cheeseCount = 0;

        // Respawn cheese op trees
        this.actors.forEach(actor => {
            if (actor instanceof Tree) {
                const cheese = new Cheese(0, -50);
                actor.addChild(cheese);
            }
        });
    }

    onPostUpdate(engine, delta) {
        super.onPostUpdate(engine, delta);

        // label volgt camera
        const cameraPos = this.camera.pos;
        this.mylabel.pos = cameraPos.add(new Vector(-engine.drawWidth / 2 + 10, -engine.drawHeight / 2 + 10));

        // rat death
        const screenHeight = engine.drawHeight;
        if (this.rat.pos.y > screenHeight) {
            engine.addScene('gameover', new GameOver(this.score)); // geeef score aan gameover scene
            engine.goToScene('gameover'); // Switch to the GameOver scene
        }
    }
}
