import {
    Scene, 
    Engine, 
    SceneLoader,
    MeshBuilder ,
    Vector3,
    Animation,
    StandardMaterial,
    Color3
} from "@babylonjs/core";

import "@babylonjs/loaders";
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

    //the engine
    this.engine = engine;
    this.importLaboratoire();

    this.createBalle();
    // this.chrono(0);


}

async importLaboratoire(){
    // this.engine.displayLoadingUI();
    const labo = await SceneLoader.ImportMeshAsync("","./experience3_PFD/","studio.glb", this.scene);
    // this.engine.hideLoadingUI();
    this.setLoaded();

    // labo.meshes[1].isVisible = false;
    labo.meshes[1].position.y = 0.8;
    labo.meshes[1].position.x = -7;
    labo.meshes[2].isVisible = false;
    
    return labo;
}
public createBalle(){
    this.ball1 = MeshBuilder.CreateSphere("ball1",{diameter:0.5});
    this.ball1.position.y = 0.95;
    this.ball1.position.x = 7;
    this.ball1.position.z = -0.8;
    this.ball1.material = this.changeMaterialColor(255,0,0);

    this._ui._play.onPointerUpObservable.add(()=>{
        this.deplacer();
    })

    this._ui._restart.onPointerUpObservable.add(()=>{
        this.ball1.position.z = -0.8;
    })




    
}

public deplacer(){
    const startPosition = new Vector3(7,0.95,-0.8);
    const endPosition = new Vector3(7,0.95,-4);

    Animation.CreateAndStartAnimation(
        "anim", 
        this.ball1, 
        "position", 
        30,
        200,
        startPosition,
        endPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    )
}


changeMaterialColor(x,y,z):StandardMaterial{
    const ballMat = new StandardMaterial("ballMat", this.scene);
    ballMat.diffuseColor = new Color3(x,y,z)
    return ballMat;
  }
}

