import { Scene, Label, Font, FontUnit, Color, Actor, vec } from "excalibur";
import { Resources } from '../resources.js';  // Adjust the path as needed

export class GameOver extends Scene {
  constructor(score = 0) {
    super();
    this.score = score;  
  }

  onInitialize(engine) {
    // Game Over text
    const gameOverLabel = new Label({
      text: 'Game Over, Loser!',
      pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 - 150),
      font: new Font({
        family: 'impact',
        size: 50,
        unit: FontUnit.Px,
        color: Color.Red,
        textAlign: 'center'
      })
    });
    gameOverLabel.anchor.setTo(0.5, 0.5);
    this.add(gameOverLabel);

    // show score
    const scoreLabel = new Label({
      text: `End score: ${this.score}`,
      pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 - 80),
      font: new Font({
        family: 'impact',
        size: 30,
        unit: FontUnit.Px,
        color: Color.Black,
        textAlign: 'center'
        
      })
    });
    scoreLabel.anchor.setTo(0.5, 0.5);
    this.add(scoreLabel);

    // button
    const restartButton = new Actor({
      pos: vec(engine.drawWidth / 2, engine.drawHeight / 2),
      width: 250,
      height: 80,
      color: Color.Yellow
    });
    restartButton.anchor.setTo(0.5, 0.5);
    this.add(restartButton);

    // Button text
    const buttonText = new Label({
      text: 'Restart',
      pos: vec(engine.drawWidth / 2, engine.drawHeight / 2.05),
      font: new Font({
        family: 'impact',
        size: 30,
        unit: FontUnit.Px,
        color: Color.Gray,
        textAlign: 'center'
      })
    });
    buttonText.anchor.setTo(0.5, 0.5);
    this.add(buttonText);

    // scene switch
    restartButton.on('pointerup', () => {
      engine.goToScene('startgame');
    });

    // interactiviteit in button
    restartButton.enableCapturePointer = true;
    restartButton.pointer.useGraphicsBounds = true;
  }
}
