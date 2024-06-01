import '../css/style.css';
import { Engine, Color, Vector, SolverStrategy } from "excalibur";
import { ResourceLoader } from './resources.js';
import { StartGame } from './scenes/startgame.js';
import { Maingame } from './scenes/maingame.js';
import { GameOver } from './scenes/gameover.js';

const options = { 
    width: 800, height: 800, 
    backgroundColor: Color.White,
    physics: {
        solver: SolverStrategy.Arcade,
        gravity: new Vector(0, 1000),
    }
};

export class Game extends Engine {
    constructor() {
        super(options);
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        this.add('startgame', new StartGame());
        this.add('maingame', new Maingame());
        this.add('gameover', new GameOver());
        this.goToScene('startgame');
    }
}

new Game();
