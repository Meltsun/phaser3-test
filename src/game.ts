import * as Phaser from 'phaser';
import {ChatWindow} from "./chatWindow"

export default class Demo extends Phaser.Scene
{
    playerNum = 6
    players:Phaser.GameObjects.Image[] = []
    private chatWindow: ChatWindow;

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
            this.players[i]=this.add.image(0, 0, '老金')//plane
            this.players[i].setCrop(0,0,this.players[i].width,this.players[i].height-750)
            this.players[i].setScale(playerWidth/this.players[i].width)
            this.players[i].setPosition(playerWidth*(i+0.5)+interval*i,this.players[i].displayHeight/2)
        }
        
        this.chatWindow = new ChatWindow(this)

        this.chatWindow.addMessage('好汉：欢迎来到聊天窗口！');
        this.chatWindow.addMessage('好汉：这是一条示例消息1。');
        this.chatWindow.addMessage('好汉：这是一条示例消息2。');
        this.chatWindow.addMessage('好汉：这是一条示例消息3。');
        this.chatWindow.addMessage('好汉：这是一条示例消息4。');
        this.chatWindow.addMessage('好汉：这是一条示例消息5。');
        this.chatWindow.addMessage('好汉：这是一条示例消息6。');
        this.chatWindow.addMessage('好汉：这是一条示例消息7。');
        this.chatWindow.addMessage('好汉：这是一条很长很长很长很长很长很长很长很长很长很长很长示例消息。');
        this.chatWindow.addMessage('好汉：这是一条示例消息8。');
        this.chatWindow.addMessage('好汉：这是一条示例消息9。');
        this.chatWindow.addMessage('好汉：这是一条很长很长很长很长很长很长很长很长很长很长很长示例消息。');
        
    }

    update(time: number, delta: number): void {
        
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 1760,
    height: 880,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
    }
};

const game = new Phaser.Game(config);
