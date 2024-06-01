import { Scene, Label, Font, FontUnit, Color, Actor, vec } from "excalibur";
import { Resources } from '../resources.js';

export class StartGame extends Scene {
    onInitialize(engine) {
        // Game Over text
        const gameStartLabel = new Label({
            text: 'PLAY \n RAT TOWER!',
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2 - 150),
            font: new Font({
                family: 'impact',
                size: 50,
                unit: FontUnit.Px,
                color: Color.Red,
                textAlign: 'center'
            })
        });
        gameStartLabel.anchor.setTo(0.5, 0.5);
        this.add(gameStartLabel);

        // start button
        const startButton = new Actor({
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2),
            width: 250,
            height: 80,
            color: Color.Yellow
        });
        startButton.anchor.setTo(0.5, 0.5);
        this.add(startButton);

        // knop text
        const buttonText = new Label({
            text: 'Start gaming',
            pos: vec(engine.drawWidth / 2, engine.drawHeight / 2.05),
            font: new Font({
                family: 'impact',
                size: 30,
                unit: FontUnit.Px,
                color: Color.Gray,
                textAlign: 'center'
            })
        });
        buttonText.anchor.setTo(0.5, .5);
        this.add(buttonText);

        // ga naar main scene
        startButton.on('pointerup', () => {
            engine.goToScene('maingame');
        });

        // interactieve button
        startButton.enableCapturePointer = true;
        startButton.pointer.useGraphicsBounds = true;
    }
}
