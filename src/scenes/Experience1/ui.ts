import { Scene, MeshBuilder, Color3, PBRMaterial } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';
import { Player } from "./Player";

export class UI {
    private _player:Player;
    public _scene:Scene;
    public _sliders:any;
    public _buttonAction:any;

    public box :any;
    public textedynamique : string

    constructor(scene: Scene){
        this._scene = scene;
        
        //creation du menu
        this.createMenu();
        //menu action
        this.createButtonActionMenu();
        //instance of player
        this._player = new Player();

        // creation de la chambre vide
        this.chambreVide()

        //create the texture 
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);        
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
        text.text = "Listes de Materiels"
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
        // container.addControl(bille);
    
        const textBille = new GUI.TextBlock();
        textBille.text = "Taille de la bille Jaune "
        textBille.height = "15px"
        textBille.top="80px"
        textBille.left = "-42px"
        textBille.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container.addControl(textBille)
        
        this._sliders = [];
        // gestionnaire de taille 
        this._sliders[0] = new GUI.Slider();
        this._sliders[0].minimum = 0.9;
        this._sliders[0].maximum = 2
        this._sliders[0].height = '20px'
        this._sliders[0].width = '200px'
        this._sliders[0].value = 1
        this._sliders[0].top = "-120px"
        this._sliders[0].left ="-7px"
        // ecouter un evenement au chanfement de la valeur
        
        
    
        container.addControl(this._sliders[0])
    
        const textBille2 = new GUI.TextBlock();
        textBille2.text = "Taille de la bille Rouge"
        textBille2.height ='15px'
        textBille2.top = "-90px"
        textBille2.left = "-42px"
        container.addControl(textBille2)
    
        this._sliders[1] = new GUI.Slider();
        this._sliders[1].minimum = 0.9;
        this._sliders[1].maximum = 2;
        this._sliders[1].height = '20px'
        this._sliders[1].width = '200px'
        this._sliders[1].value = 1;
        this._sliders[1].top = "-70px"
        this._sliders[1].left ="-10px"

        this.textedynamique = 'Activer'

        const chambrevide = GUI.Checkbox.AddCheckBoxWithHeader('chambre vide',(value)=>{
            this.box.isVisible = value;
            
        });
        chambrevide.children[1].color = 'black';
        chambrevide.left = '-25px';
        container.addControl(chambrevide);


       
        container.addControl(this._sliders[1])
    
        advancedTexture.addControl(container)
    }

    createButtonActionMenu(){
        //on defini la variable de classe comme tableau
        this._buttonAction = [];
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        const panel = new GUI.StackPanel();
      
        //button play creation
        this._buttonAction[0] = GUI.Button.CreateImageButton("playButton","Play", "./images/sprites/play.png");
        this._buttonAction[0].width = "200px";
        this._buttonAction[0].height = "39px";
        this._buttonAction[0].background = 'white';
        this._buttonAction[0].color = "deepskyblue";
        
        panel.addControl(this._buttonAction[0]);
      
        this._buttonAction[1] = GUI.Button.CreateSimpleButton("restartButon", "Restart");
        this._buttonAction[1].width = "200px";
        this._buttonAction[1].height = "39px";
        this._buttonAction[1].background = 'white';
        this._buttonAction[1].color = "deepskyblue";
        
      
        panel.addControl(this._buttonAction[1]);

        panel.isVertical = false;
        panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panel.top = 10;
        panel.height="40px";
      
      
        advancedTexture.addControl(panel);
    }

      // creation de la chambre a vide

  chambreVide(){
    this.box = MeshBuilder.CreateBox(
      "box", {
        width : 2.8,
        height : 5.9,
        size:5.5
      }, 
      this._scene
    );
    this.box.position.x = 6.5;
    this.box.position.z = -2.5;
    const glass = new PBRMaterial("glass", this._scene);
    glass.alpha = 0.5;
    glass.directIntensity = 0.0;
    glass.environmentIntensity = 0.7;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new Color3(0.95, 0.95, 0.95);
    this.box.material = glass
  }
    

}