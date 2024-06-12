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
private voirCard:()=>void

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
    const labo = await SceneLoader.ImportMeshAsync("","./experience3_PFD/","studio_test.glb", this.scene);
    // this.engine.hideLoadingUI();
    this.setLoaded();
    this.voirCard();

    // labo.meshes[1].isVisible = false;
    // labo.meshes[1].position.y = 1.5
    // labo.meshes[2].position.y = 1.5

    // console.log(
    //     labo.meshes[2].position.y, 
    //     labo.meshes[2].position.x, 
    //     labo.meshes[2].position.z 
    // );
    
    return labo;
}
public createBalle(){
    this.ball1 = MeshBuilder.CreateSphere("ball1",{diameter:0.2});
    this.ball1.position.y = 0.38;
    this.ball1.position.x = -1.3;
    this.ball1.position.z = -2.15;
    // ball1.position.z = -2.92;

    this._ui._play.onPointerUpObservable.add(()=>{
        this.deplacer();
        this.deplacer2();
    })

    this._ui._restart.onPointerUpObservable.add(()=>{
        this.ball1.position.z = -2.15;
        this.ball2.position.z = -2.15;
    })

    this.ball2 = MeshBuilder.CreateSphere("ball2",{diameter : 0.2})
    this.ball2.position.y= 0.38;
    this.ball2.position.x= -1.9;
    this.ball2.position.z = -2.15
    
}

public deplacer(){
    const startPosition = new Vector3(-1.3,0.38,-2.15);
    const endPosition = new Vector3(-1.3,0.38,-0.3);

    Animation.CreateAndStartAnimation(
        "anim", 
        this.ball1, 
        "position", 
        50,
        100,
        startPosition,
        endPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    )
}

public deplacer2(){
    const startPosition = new Vector3(-1.9,0.38,-2.15);
    const endPosition = new Vector3(-1.9,0.38,-0.3);
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

