import {
    Scene, 
    Engine, 
    SceneLoader,
    MeshBuilder ,
    Vector3,
    Animation
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
    labo.meshes[1].position.y = 1.5
    labo.meshes[2].position.y = 1.5

    console.log(
        labo.meshes[2].position.y, 
        labo.meshes[2].position.x, 
        labo.meshes[2].position.z 
    );
    
    return labo;
}
public createBalle(){
    this.ball1 = MeshBuilder.CreateSphere("ball1",{diameter:0.5});
    this.ball1.position.y = 1.6;
    this.ball1.position.x = 6.2;
    this.ball1.position.z = -0.7;
    // ball1.position.z = -2.92;

    this._ui._play.onPointerUpObservable.add(()=>{
        this.deplacer();
        this.deplacer2();
    })

    this._ui._restart.onPointerUpObservable.add(()=>{
        this.ball1.position.z = -0.7;
        this.ball2.position.z = -0.8;
    })

    this.ball2 = MeshBuilder.CreateSphere("ball2",{diameter : 0.5})
    this.ball2.position.y= 1.68;
    this.ball2.position.x= 5;
    this.ball2.position.z = -0.8



    
}

public deplacer(){
    const startPosition = new Vector3(6.2,1.6,-0.7);
    const endPosition = new Vector3(6.2,1.6,-4);

    Animation.CreateAndStartAnimation(
        "anim", 
        this.ball1, 
        "position", 
        30,
        100,
        startPosition,
        endPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    )
}

public deplacer2(){
    const startPosition = new Vector3(5,1.68,-0.8);
    const endPosition = new Vector3(5,1.68,-4);
    Animation.CreateAndStartAnimation(
        "anim", 
        this.ball2, 
        "position", 
        30,
        100,
        startPosition,
        endPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    )
}
}

