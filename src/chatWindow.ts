import * as Phaser from 'phaser';

interface chatMessageTextObject extends Phaser.GameObjects.Text{
    addText:(y:number,text:string)=>number,
    removeText:()=>void
}

export class ChatWindow {
    scene: Phaser.Scene;
    width= 600
    height = 250
    maxLines=10//
    messages: string[];
    x = 0+this.width/2
    y = 880-this.height/2
    textGroup : Phaser.GameObjects.Group

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.messages = [];
        scene.add.rectangle(this.x, this.y, this.width, this.height, 0x000000);

        const chatWindow = this;

        const textMaskGraphics = this.scene.make.graphics();
        textMaskGraphics.fillStyle(0xffffff);
        textMaskGraphics.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height)
        const textMask=textMaskGraphics.createGeometryMask()

        this.textGroup = scene.add.group(
            {
                classType:
                    class _ extends Phaser.GameObjects.Text implements chatMessageTextObject {
                        constructor(){
                            super(scene,chatWindow.x-chatWindow.width/2+10,0,'',{
                                font: '20px Arial',
                                color: '#ffffff',
                                wordWrap: { width: chatWindow.width - 20 ,useAdvancedWrap:true}
                            })
                            this.setOrigin(0, 1);
                            this.setMask(textMask)
                        }
                        addText(y:number,text:string):number{
                            this.setText(text)
                            this.setY(y)
                            this.setActive(true);
                            this.setVisible(true);
                            return this.y-this.displayHeight
                        }
            
                        removeText(){
                            this.setActive(false);
                            this.setVisible(false);
                        }
                    },
                maxSize : 10,
            })
    }

    addMessage(message: string) {
        this.messages.unshift(message);
        for(const object of this.textGroup.getChildren()){
            let textObject = object as chatMessageTextObject
            textObject.removeText()
        }
        {
            let startY=this.y+this.height/2-10
            for(let i=0;startY>=this.y-this.height/2+10 && i<this.messages.length;i++){
                let textObject = this.textGroup.get() as chatMessageTextObject
                startY=textObject.addText(startY,message)-10
            }
        }
    }
}
