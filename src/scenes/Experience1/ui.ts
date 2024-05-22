import { Scene, MeshBuilder } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control, Image, Rectangle, StackPanel, TextBlock } from "babylonjs-gui";

import * as GUI from '@babylonjs/gui/2D';
import { Player } from "./Player";

export class UI {
    public _scene:Scene;
    public _screenUI: any;
    public _materielMenu:any;
   
    public imageMaterial:any
    public _buttons:GUI.Button;
    public _stackPanels:any=[];
    private _player:Player;

    constructor(scene: Scene){
        this._scene = scene;
        
        //creation du menu
        this.createMenu();
        //menu action
        this.createButtonActionMenu();
        //instance of player
        this._player = new Player();

        //create the texture 
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);        
    }
    public createMaterialMenu(advancedTexture){
       
        //create material menu
        const materialMenu = new GUI.StackPanel("stackPanel");
        materialMenu.width = "90px";
        materialMenu.height = "500px";
        materialMenu.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        materialMenu.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        materialMenu.left = "40px";
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
        // this._player.buttonAction(this.imageMaterial[1])

     
    }

    chargerMateriels(materialMenu, Image:Image){
        //button for hide and show menu materials
        const materiels = ["ball","ball1","chronometre", "thermo","generator","motor"];
        // const tab = [];
        //variable for placing element suivant x
        // let positionX = 10;

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


    }   

    
    public createMenu(){
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        const container = new GUI.Container();
    
        container.background = "white"
        container.width = "300px"
        container.height=0.5
    
        container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container.top = "20px"
        container.left = "10px"
    
        // creation du texte
        const text = new GUI.TextBlock();
        text.text = "Listes des Materiels"
        text.fontSize=30
        text.fontFamily="Montserrat Black"
        text.color ="deepskyblue"
        text.height="25px"
        text.top = "5px"
        text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container.addControl(text);
    
        // creation de la bille
        const bille = GUI.Checkbox.AddCheckBoxWithHeader('Bille ',(value)=>{
            console.log('bille');  
        })
        bille.children[1].color = 'black'
        bille.verticalAlignment=GUI.Control.VERTICAL_ALIGNMENT_TOP
        bille.top = 40
        container.addControl(bille);
    
        const textBille = new GUI.TextBlock();
        textBille.text = "Taille de la bille Jaune "
        textBille.height = "15px"
        textBille.top="80px"
        textBille.left = "-42px"
        textBille.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container.addControl(textBille)
    
        // gestionnaire de taille 
        const slider = new GUI.Slider();
        slider.minimum = 0.9;
        slider.maximum = 2
        slider.height = '20px'
        slider.width = '200px'
        slider.value = 1
        slider.top = "-120px"
        slider.left ="-7px"
        // ecouter un evenement au chanfement de la valeur
        
        slider.onValueChangedObservable.add((value)=>{
            // this.ball1.scaling.x = value;
            // this.ball1.scaling.y = value;
            // this.ball1.scaling.z = value        
        })
    
        container.addControl(slider)
    
        const textBille2 = new GUI.TextBlock();
        textBille2.text = "taille de la bille Rouge"
        textBille2.height ='15px'
        textBille2.top = "-90px"
        textBille2.left = "-25px"
        container.addControl(textBille2)
    
        const slider2 = new GUI.Slider();
        slider2.minimum = 0.9;
        slider2.maximum = 2
        slider2.height = '20px'
        slider2.width = '200px'
        slider2.value = 1
        slider2.top = "-70px"
        slider2.left ="-10px"
        slider2.onValueChangedObservable.add((value)=>{
            // this.ball2.scaling.x = value;
            // this.ball2.scaling.y = value;
            // this.ball2.scaling.z = value  
        })
        container.addControl(slider2)
    
        advancedTexture.addControl(container)
    }

    createButtonActionMenu(){
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        const panel = new GUI.StackPanel();
      
        //button play creation
        const b = GUI.Button.CreateImageButton("playButton","Play", "./images/sprites/play.png");
        b.width = "200px";
        b.height = "39px";
        b.background = 'white'
        b.color = "deepskyblue"
        b.onPointerUpObservable.add(()=>{
          //this.createImpostor();
        })
        panel.addControl(b)
      
        const restartButon = GUI.Button.CreateSimpleButton("restartButon", "Restart")
        restartButon.width = "200px";
        restartButon.height = "39px";
        restartButon.background = 'white'
        restartButon.color = "deepskyblue"
        restartButon.onPointerUpObservable.add(()=>{
          //this.toRestart();
        })
      
        panel.addControl(restartButon);
        panel.isVertical = false
        panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        panel.top = 10
        panel.height="40px"
      
      
        advancedTexture.addControl(panel)
      }
    

}