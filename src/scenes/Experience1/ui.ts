import { Scene } from "@babylonjs/core";
import { MeshBuilder } from "babylonjs";
import { AdvancedDynamicTexture, Button, Control, Image, Rectangle, StackPanel, TextBlock } from "babylonjs-gui";

import * as GUI from '@babylonjs/gui/2D';
import { Player } from "./Player";

export class UI{
    public _scene:Scene;
    public _screenUI: any;
    public _materielMenu:any;
   
    public imageMaterial:any
    public _buttons:GUI.Button;
    public _stackPanels:any=[];
    private _player:Player;
    public b:any;

    constructor(scene: Scene){
        this._scene = scene;
        
        //instance of player
        this._player = new Player();

        //create the texture 
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        
        //importation du menu des materiels
        this.createMaterialMenu(advancedTexture);
        this.createButtonActionMenu(advancedTexture);

      
    }

    public createMaterialMenu(advancedTexture){
       
        //create material menu
        const materialMenu = new GUI.StackPanel("stackPanel");
        materialMenu.width = "90px";
        materialMenu.height = "500px";
        materialMenu.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        materialMenu.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        materialMenu.left = "10px";
        materialMenu.top = "10px"
        materialMenu.onPointerMoveObservable.add(()=>{
            materialMenu.background = "green";
        })
        materialMenu.onPointerOutObservable.add(()=>{
            materialMenu.background = "white";
        })
        materialMenu.background = "white";
        advancedTexture.addControl(materialMenu);

        //append to this._stackPanel
        // this._stackPanels.push(materialMenu);
        
        // //title of material Menu
        // const title = new GUI.TextBlock("title","Menu matériels");
        // title.top = "20px"
        // title.width = "250px";
        // title.height = "60px"
        // title.fontSize = "10px"
        // title.fontStyle = "bold"
        // title.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        // title.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        // materialMenu.addControl(title);

        //creation of images
        this.imageMaterial = [];
        this.chargerMateriels(materialMenu, this.imageMaterial);

        //on teste la fonction dans la classe player
        this._player.buttonAction(this.imageMaterial[1])

     
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
            Image[i].top = '0px';
            Image[i].onPointerOutObservable.add(()=>{
                Image[i].color = "white";
            })
            Image[i].onPointerMoveObservable.add(()=>{
                Image[i].color = "green";
            })    
            materialMenu.addControl(Image[i]);

        }

        // this.tab[7].onPointerClickObservable.add(this.activerModal)

    }

    createButtonActionMenu(advancedTexture){
        //create material menu
        const materialMenu = new GUI.StackPanel("stackPanel");
        materialMenu.width = "300px";
        materialMenu.height = "50px";
        materialMenu.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        materialMenu.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        materialMenu.left = "-10px";
        materialMenu.top = "10px"
        materialMenu.background = "white";
        advancedTexture.addControl(materialMenu);

        //button play
        this.b = GUI.Button.CreateImageOnlyButton("playButton", "./images/sprites/play.png");
        this.b.width = "40px";
        this.b.height = "40px";
        // this.b.top = "14px";
        this.b.thickness = 0;
        this.b.left="-230px";
        this.b.onPointerMoveObservable.add(()=>{this.b.width = "50px"; this.b.height="50px";})
        this.b.onPointerOutObservable.add(()=>{
            this.b.width = "40px";
            this.b.height = "40px";
        })
        this.b.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.b.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        materialMenu.addControl(this.b);


    }

   
}