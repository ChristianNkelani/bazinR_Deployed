import {
    Scene, 
    Engine, 
    MeshBuilder, 
    SceneLoader, 
    StandardMaterial,
    Color3,
    Vector3,
    CannonJSPlugin,
    PhysicsImpostor,
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import * as GUI from '@babylonjs/gui/2D';
import { UI } from "./ui";


export class Environement {

scene: Scene;
engine : Engine;
ball1 : any;
ball2 : any;
cliquer=true;//variable pour activer impostor ou non
public _ui:UI;

constructor(
scene:Scene, engine:Engine,
private setLoaded: () => void,
private voirCard:()=> void

){
//la scene
this.scene = scene;

//on charge les autres interfaces
this._ui = new UI(this.scene);  


//the engine
this.engine = engine;

//creation des materiels
this.importLaboratoire();


}

async importLaboratoire(){
// this.engine.displayLoadingUI();
const labo = await SceneLoader.ImportMeshAsync("","./experience_action_reaction/","studio_test.glb", this.scene);
// this.engine.hideLoadingUI();
this.setLoaded();
this.voirCard();
return labo;
}
}

