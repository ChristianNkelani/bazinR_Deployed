import { Scene, MeshBuilder, Color3, PBRMaterial } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';

export class UI {
    public _scene:Scene;
    public _sliders:any;
    public _materials:any;
    public _buttonAction:any;
    public _textMasse:any;


    //Game Timer
    public time: number; //keep track to signal end game REAL TIME
    private _prevTime: number = 0;
    public _clockTime: any; //GAME TIME
    private _startTime: number;
    public _stopTimer: boolean;
    public _sString = "00";
    public _mString = 0;
    public gravitation: -9.8;

    public box :any;
    public textedynamique : string

    constructor(scene: Scene){
        this._scene = scene;
        
        //creation du menu
        this.createMenu();
        //menu action
        this.createButtonActionMenu();

        //create the texture 
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);        
        this.Chrono(advancedTexture);
    

        
        
    }
   
    createMenuCalculs(container){
       // creation du texte
       const text = new GUI.TextBlock();
       text.text = "Calculs"
       text.fontSize=30
       text.fontFamily="Montserrat Black"
       text.color ="deepskyblue"
       text.height="25px"
       text.top = "5px"
       text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
       container.addControl(text);
    }

    createMenuMats(container){
        // creation du texte
        const text = new GUI.TextBlock();
        text.text = "Materiels"
        text.fontSize=30
        text.fontFamily="Montserrat Black"
        text.color ="deepskyblue"
        text.height="25px"
        text.top = "5px"
        text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container.addControl(text);
    

        // creation de la bille
        const bille = GUI.Checkbox.AddCheckBoxWithHeader('Bille ',(value)=>{
            // console.log('bille');  
        })
        bille.children[1].color = 'black'
        bille.verticalAlignment=GUI.Control.VERTICAL_ALIGNMENT_TOP
        bille.top = 40
        // container.addControl(bille);
    
        //text boitier 1
        const textBille = new GUI.TextBlock();
        textBille.text = "Taille du boitier Jaune "
        textBille.height = "15px"
        textBille.top="55px"
        textBille.left = "-10px"
        textBille.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container.addControl(textBille)
        
        //define slider as an array
        this._sliders = [];
        
        this._sliders[0] = new GUI.Slider();
        this._sliders[0].minimum = 0.9;
        this._sliders[0].maximum = 2;
        this._sliders[0].height = '20px'
        this._sliders[0].width = '200px'
        this._sliders[0].value = 1;
        this._sliders[0].minimum = 0;
        this._sliders[0].maximum = 10;
        this._sliders[0].step = 1;
        this._sliders[0].displayValueBar = true
        this._sliders[0].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._sliders[0].top = "70x"
        this._sliders[0].left ="-10px"
        container.addControl(this._sliders[0])
        
        //text boitier2
        const textBille2 = new GUI.TextBlock();
        textBille2.text = "Taille du boitier Rouge"
        textBille2.height ='15px'
        textBille2.top = "103px"
        textBille2.left = "-10px"
        textBille2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        container.addControl(textBille2)
    
        //boitier2
        this._sliders[1] = new GUI.Slider();
        this._sliders[1].minimum = 0.9;
        this._sliders[1].maximum = 2;
        this._sliders[1].height = '20px';
        this._sliders[1].width = '200px';
        this._sliders[1].minimum = 0;
        this._sliders[1].maximum = 10;
        this._sliders[1].step = 1;
        this._sliders[1].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._sliders[1].value = 1;
        this._sliders[1].top = "120px"
        this._sliders[1].left ="-10px"

        this.textedynamique = 'Activer'

        container.addControl(this._sliders[1])

        //slider for gravitation
        this._sliders[2] = new GUI.Slider();
        this._sliders[2].minimum = 0.2;
        this._sliders[2].maximum = 9.8;
        this._sliders[2].height = '20px'
        this._sliders[2].width = '200px'
        this._sliders[2].top = "170px"
        this._sliders[2].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._sliders[2].left ="-10px"
       
        container.addControl(this._sliders[2])

        //text bille 2
        const textgravitation = new GUI.TextBlock();
        textgravitation.text = "Constante de gravitation"
        textgravitation.height ='15px'
        textgravitation.top = "153px"
        textgravitation.left = "-15px"
        textgravitation.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        container.addControl(textgravitation)
    
    }

    public createMenu(){
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        const container1 = new GUI.Container();
    
        container1.background = "white"
        container1.width = "300px"
        container1.height=0.4
    
        container1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        container1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container1.top = "20px"
        container1.left = "10px"
    
        advancedTexture.addControl(container1)

        const container2 = new GUI.Container();
    
        container2.background = "white"
        container2.width = "300px"
        container2.height=0.4
    
        container2.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        container2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container2.top = "300px"
        container2.left = "10px"
    
        advancedTexture.addControl(container2)

        this.createMenuMats(container1);
        this.createMenuCalculs(container2);
        this.textMassses(container2);
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

    public Chrono(advancedTexture){
        //Game timer text
        const clockTime = new GUI.TextBlock();
        clockTime.name = "clock";
        clockTime.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        clockTime.fontSize = "48px";
        clockTime.color = "white";
        clockTime.text = "00:00";
        clockTime.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        clockTime.resizeToFit = true;
        clockTime.height = "96px";
        clockTime.width = "220px";
        clockTime.fontFamily = "Viga";
        advancedTexture.addControl(clockTime);
        this._clockTime = clockTime;
        
    }

    //---- Game Timer ----
    public startTimer(): void {
        if(!this._stopTimer){

            this._startTime = new Date().getTime();
            this._stopTimer = false;
        }
    }
    public stopTimer(): void {
        this._stopTimer = true;
    }

    //format the time so that it is relative to 11:00 -- game time
    private _formatTime(time: number): string {
        let minsPassed = Math.floor(time / 60); //seconds in a min 
        let secPassed = time % 240; // goes back to 0 after 4mins/240sec
        //gameclock works like: 4 mins = 1 hr
        // 4sec = 1/15 = 1min game time        
            this._mString = Math.floor(minsPassed / 1) ;
            this._sString = (secPassed / 1 < 10 ? "0" : "") + secPassed / 1;
        
        let day = (this._mString == 11 ? " " : " ");
        
        return ("0"+this._mString + ":" + this._sString + day);
    }

    public updateHud(): void {
        if(!this._stopTimer && this._startTime != null ){
            let curTime = Math.floor((new Date().getTime() - this._startTime) / 10) + this._prevTime; // divide by 1000 to get seconds

            this.time = curTime; //keeps track of the total time elapsed in seconds
            this._clockTime.text = this._formatTime(curTime);
        }
            
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

    textMassses(container){
        this._textMasse = [];
        
        let posy = 95;
        const texts = ["m1", "m2","Données"]
        for (let i = 0; i <= 4; i++) {
            this._textMasse[i] = new GUI.TextBlock("m1");
            this._textMasse[i].width = "200px";
            this._textMasse[i].height = "20px";
            this._textMasse[i].top = posy;
            this._textMasse[i].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            this._textMasse[i].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
            if(i<3){
                this._textMasse[i].text = texts[i]+" = " +this._sliders[i].value+" kg";
            }
            this._textMasse[i].left = "-10px";
            container.addControl(this._textMasse[i]);
            posy += 20;
        }

        this._textMasse[2].top = 70;
        this._textMasse[2].text = "Données";
        this._textMasse[3].text = "m12 = "+(this._sliders[0].value+this._sliders[1].value)+" kg";
        this._textMasse[3].top = 140;
        this._textMasse[2].underline = true;
        

        //text for formules
        let posy1 = 70;
        let text:any;
        text = [];
        for (let i = 0; i <= 4; i++) {
            text[i] = new GUI.TextBlock("m1");
            text[i].width = "200px";
            text[i].height = "20px";
            text[i].top = posy1;
            text[i].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            text[i].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
            text[i].left = "120px";
            container.addControl(text[i]);
            posy1 += 25;
        }

        text[0].text = "Formules";
        text[0].underline = true;
        text[1].text = "P1 = m1xg";
        text[2].text = "P2 = m2xg";
        text[3].text = "P12 = (m12)xg";

        //application numérique
        text[4].text = "AN";
        text[4].underline = true;
        text[4].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        text[4].left = "45px";

        this._textMasse[4].text = "P1 = "+(this._sliders[0].value)+"x9.81"+" kg";
        this._textMasse[4].top = 190;

    }

  
    

}