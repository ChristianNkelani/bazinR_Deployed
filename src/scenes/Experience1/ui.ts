import { Scene } from "@babylonjs/core";
import { MeshBuilder } from "babylonjs";
import { AdvancedDynamicTexture, Button, Control, Image, Rectangle, StackPanel, TextBlock } from "babylonjs-gui";

import * as GUI from '@babylonjs/gui/2D';

export class UI{
    public _scene:Scene;
    public _screenUI: any;
    public _materielMenu:any;
    public _startTime:number=0;
    public _stopTime:number=0;
    public _prevTime: number = 0;
    public time: number=0;
    public _sString = "00";
    public _mString = 11;
    public imageMaterial:any;

    constructor(scene: Scene){
        this._scene = scene;
        
        //importation du menu des materiels
        this.createMaterialMenu();
    }

    public createMaterialMenu(){
        //create the texture 
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        
        
        const button = GUI.Button.CreateSimpleButton("mybutton", 'Menu materiels');
        button.width = '200px';
        button.height = '40px';
        button.color = 'white';
        button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button.top = '20px';
        button.left = '10px';
        button.background = 'green';
        

        //create material menu
        const materialMenu = new GUI.StackPanel("stackPanel");
        materialMenu.width = "400px";
        materialMenu.height = "500px";
        materialMenu.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        materialMenu.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        materialMenu.left = "10px";
        materialMenu.top = "80px"
        materialMenu.background = "white";
        advancedTexture.addControl(materialMenu);
        
        //title of material Menu
        const title = new GUI.TextBlock("title","Menu matériels");
        title.top = "20px"
        title.width = "250px";
        title.height = "60px"
        title.fontSize = "30px"
        title.fontStyle = "bold"
        title.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        title.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        materialMenu.addControl(title);

        //creation of images
        this.imageMaterial = [];
        this.chargerMateriels(materialMenu, this.imageMaterial);

        this.imageMaterial[0].onPointerClickObservable.add(() =>{
            materialMenu.isVisible = false;
        })
        advancedTexture.addControl(button);
        button.onPointerClickObservable.add(() => {

            if(materialMenu.isVisible.valueOf() ==  true) {
                materialMenu.isVisible = false;
            }
            else{
                materialMenu.isVisible = true;
            }
        })
     
    }

    chargerMateriels(materialMenu, Image:Image){
        //button for hide and show menu materials
        const materiels = ["ball","ball1","chronometre", "thermo","generator","motor"];
        // const tab = [];
        //variable for placing element suivant x
        let positionX = 10;

        for (let i = 0; i <= materiels.length ; i++) {

            Image[i] = new GUI.Image("image","images/"+materiels[i]+".png");
            Image[i].width = '60px';
            Image[i].height = '60px';
            Image[i].top = '50px';
            Image[i].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            Image[i].left = "50px";
            Image[i].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            materialMenu.addControl(Image[i]);

        }

        // this.tab[7].onPointerClickObservable.add(this.activerModal)

    }

   
}