import {
    Scene, 
    Engine, 
    MeshBuilder, 
    SceneLoader, 
    Vector3,
    CannonJSPlugin,
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import * as GUI from '@babylonjs/gui/2D';
import { Animation } from "babylonjs";
import { UI } from "./ui";


export class Environement {

scene: Scene;
engine : Engine;
ball1 : any;
ball2 : any;
cliquer=true;//variable pour activer impostor ou non
private _ui:UI;

constructor(
scene:Scene, engine:Engine,
private setLoaded: () => void,

){
//la scene
this.scene = scene;

//on charge les autres interfaces
this._ui = new UI(this.scene);  

this.scene.enablePhysics(
  new Vector3(0,-9.81, 0), 
  new CannonJSPlugin(true,10,CANNON)
);

//the engine
this.engine = engine;

//creation des materiels
this.importLaboratoire();
// this.createMateriels();

//action des sliders

}

async importLaboratoire(){
// this.engine.displayLoadingUI();
const labo = await SceneLoader.ImportMeshAsync("","./experience2_Inertie/","studio.glb", this.scene);
for (let index = 1; index < 10 ; index++) {
  labo.meshes[index].isVisible = false ;
}
// this.engine.hideLoadingUI();
this.setLoaded();

// afficher ou pas un mateirel au click
for(let i = 0 ; i < this._ui._images.length; i++){
  if(i == 0){
    this._ui._images[i].onPointerUpObservable.add(function(){
      labo.meshes[1].isVisible = labo.meshes[1].isVisible == false ? true : false; 
      labo.meshes[2].isVisible = labo.meshes[2].isVisible == false ? true : false; 
      labo.meshes[3].isVisible = labo.meshes[3].isVisible == false ? true : false; 

    })
 
  }
  if (i == 1){
    this._ui._images[i].onPointerUpObservable.add(function(){
      labo.meshes[8].isVisible = labo.meshes[8].isVisible == false ? true : false; 
      labo.meshes[9].isVisible = labo.meshes[9].isVisible == false ? true : false; 
    })
  }
  if(i==2){
    this._ui._images[i].onPointerUpObservable.add(function(){
      labo.meshes[6].isVisible = labo.meshes[6].isVisible == false ? true : false; 
      labo.meshes[7].isVisible = labo.meshes[7].isVisible == false ? true : false;
    })
  }
  if(i==3){
    this._ui._images[i].onPointerUpObservable.add(function(){
      labo.meshes[4].isVisible = labo.meshes[4].isVisible == false ? true : false; 
      labo.meshes[5].isVisible = labo.meshes[5].isVisible == false ? true : false; 
    });

  }

}


return labo;
}

// createMateriels(){

// }

}

