import { Scene, MeshBuilder, Color3, PBRMaterial } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';
// import { Player } from "./Player";
import { Rectangle } from "babylonjs-gui";

export class UI {
    // private _player:Player;
    public _scene:Scene;
    public _sliders:any;
    public _buttonAction:any;


    public box :any;
    public textedynamique : string

    constructor(scene: Scene){
        this._scene = scene;        
    }
}