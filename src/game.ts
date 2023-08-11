import * as Phaser from 'phaser';

export default class Demo extends Phaser.Scene
{
    playerNum = 6
    players:Phaser.GameObjects.Image[] = []
    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.image('老金', 'assets/character/老金.jpg')
    }

    create ()
    {
        let interval = 40
        let playerWidth = (config.width-(this.playerNum-1)*interval)/this.playerNum
        console.log(playerWidth)
        for(let i=0;i<this.playerNum;i++){
            this.players[i]=this.add.image(0, 0, '老金')
            this.players[i].setCrop(0,0,this.players[i].width,this.players[i].height-750)
            this.players[i].setScale(playerWidth/this.players[i].width)
            this.players[i].setPosition(playerWidth*(i+0.5)+interval*i,this.players[i].displayHeight/2)
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 1760,
    height: 880,
    scene: Demo
};

const game = new Phaser.Game(config);
