import { MeshBuilder, Scene } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';
import { Environement } from "./Environement";
// import { PlanePanel } from "babylonjs-gui";


export class UI {
    public _scene:Scene;
    public _environement : Environement
    public _images :  GUI.Image[]
    public advencedTexture : any;
    public _play : any;
    public _restart : any;

    constructor(scene:Scene){
        this._scene = scene;
        this.advencedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        this.createChrono();
        this.createPlayRestart();
    }

    public createChrono(){
        //les variables 


        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const container1 = new GUI.Rectangle();
            container1.background = "white";
            container1.width = "300px";
            container1.height = "100px"
            container1.top = "20px";
            container1.left = "20px"; 
            container1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            container1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        advancedTexture.addControl(container1);
        const text1 = new GUI.TextBlock();
            text1.text = "Chrono balle blue";
            text1.fontSize = "10px";
            text1.height = "20px";
            text1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        const text2 = new GUI.TextBlock("","00:00");
            text2.fontSize = "45px";
        container1.addControl(text2);
        container1.addControl(text1);


        const container2 = new GUI.Rectangle();
            container2.background = "white";
            container2.width = "300px";
            container2.height = "100px";
            container2.top = "20px";
            container2.left = "-20px";
            container2.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            container2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        const text3 = new GUI.TextBlock("","Chrono balle rouge");
            text3.fontSize = "10px";
            text3.height = "20px";
            text3.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP

        const text4 = new GUI.TextBlock("","00:00");
            text4.fontSize = "45px";

                
        container2.addControl(text3);
        container2.addControl(text4);            

        advancedTexture.addControl(container2);
    }

    public createPlayRestart(){
        const panel = new GUI.StackPanel();
        panel.isVertical = false;
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        panel.top = "-20px"
        panel.height = "40px"
        this._play = GUI.Button.CreateSimpleButton('myBtn', 'Play');
        this._play.width = "200px";
        this._play.height = "40px";
        this._play.color = "white";
        this._play.background = "deepskyblue";

        


        this._restart = GUI.Button.CreateSimpleButton('restart', 'Restart');
        this._restart.width = "200px";
        this._restart.height = "40px";
        this._restart.color = "white";
        this._restart.background = "deepskyblue"
        panel.addControl(this._play);
        panel.addControl(this._restart);
        this.advencedTexture.addControl(panel);
    }
}