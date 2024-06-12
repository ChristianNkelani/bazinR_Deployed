import { Color3, Curve3, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';
import { Environement } from "./Environement";


export class UI {
    public _scene:Scene;
    public _environement : Environement
    public _images :  GUI.Image[]
    public advencedTexture : any;
    public _play : any;
    public _restart : any;

    //Game Timer
    public time: number; //keep track to signal end game REAL TIME
    private _prevTime = 0;
    public _clockTime: any; //GAME TIME
    private _startTime: number;
    public _stopTimer: boolean;
    public _sString = "00";
    public _mString = 0;

    constructor(scene:Scene){
        this._scene = scene;
        this.advencedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.createChrono(this.advencedTexture);
        this.createPlayRestart();

    }

    public createChrono(advancedTexture){
        //les variables 
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

    public createPlayRestart(){
        //create panel for play and restart button
        const panel = new GUI.StackPanel();
        panel.isVertical = false;
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.top = "20px";
        panel.left = "-20px";
        panel.height = "40px"

        //create play button
        this._play = GUI.Button.CreateSimpleButton('myBtn', 'Play');
        this._play.width = "200px";
        this._play.height = "40px";
        this._play.color = "white";
        this._play.background = "deepskyblue";

        //create restart button
        this._restart = GUI.Button.CreateSimpleButton('restart', 'Restart');
        this._restart.width = "200px";
        this._restart.height = "40px";
        this._restart.color = "white";
        this._restart.background = "deepskyblue"
        panel.addControl(this._play);
        panel.addControl(this._restart);
        this.advencedTexture.addControl(panel);
    }

    createLine(){
        
    }
}