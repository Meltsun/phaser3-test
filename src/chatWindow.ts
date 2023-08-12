import * as Phaser from 'phaser';

interface chatMessageTextObject extends Phaser.GameObjects.Text{
    addText:(y:number,text:string)=>number,
    removeText:()=>void
}

export class ChatWindow {
    scene: Phaser.Scene;
    width= 600
    fullHeight = 880
    height = 250
    maxLines=100//
    messages: string[];
    x = 0+this.width/2+10
    y = 880-this.fullHeight/2-10
    textGroup : Phaser.GameObjects.Group

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.messages = [];
        
        const textMaskGraphics = this.scene.make.graphics();
        textMaskGraphics.fillStyle(0xffffff);
        textMaskGraphics.fillRect(this.x-this.width/2,this.y-this.fullHeight/2,this.width,this.fullHeight-this.height)
        const textMask=textMaskGraphics.createGeometryMask()
        textMask.invertAlpha=true

        const maskContainer = this.scene.add.container()
        maskContainer.setMask(textMask)

        const chatWindow = this;
        
        let textGroup = scene.add.group(
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
                            maskContainer.add(this)
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
                maxSize : this.maxLines,
            })

        this.textGroup = textGroup

        const rectangle = scene.add.rectangle(this.x, this.y, this.width, this.fullHeight, 0x000000);
        maskContainer.add(rectangle)
        rectangle.setInteractive()
        rectangle.on('pointerout',
            function (){
                maskContainer.setMask(textMask)
            }
        )

        rectangle.on('pointerover',
            function (){
                maskContainer.clearMask()
            }
        )
    }

    addMessage(message: string) {
        this.messages.unshift(message);
        for(const object of this.textGroup.getChildren()){
            let textObject = object as chatMessageTextObject
            textObject.removeText()
        }
        {
            let startY=this.y+this.fullHeight/2-10
            for(let i=0;startY>=this.y-this.fullHeight/2+10 && i<this.messages.length;i++){
                let textObject = this.textGroup.get() as chatMessageTextObject
                startY=textObject.addText(startY,this.messages[i])-10
            }
        }
    }
}
