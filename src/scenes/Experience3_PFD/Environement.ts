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
    vitesse : object;
    taille : object;
    cliquer=true;//variable pour activer impostor ou non
    private _ui:UI;

constructor(
scene:Scene, engine:Engine,
private setLoaded: () => void,
private voirCard:()=>void,
private tailleR : string,
private tailleB : string

){
    //la scene
    this.scene = scene;

    //on charge les autres interfaces
    this._ui = new UI(this.scene);  

    //the engine
    this.engine = engine;
    this.importLaboratoire();


    this.vitesse = {
        'petite':50,
        'moyenne':40,
        'grosse':30
    };


}

async importLaboratoire(){
    const labo = await SceneLoader.ImportMeshAsync("","./experience3_PFD/","studio_test.glb", this.scene);
    this.setLoaded();
    this.voirCard();
    return labo;
}
createBalle(a:string, b:string){
    this.tailleB = a;
    this.tailleR = b
    const taille ={
        'petite':0.1,
        'moyenne':0.2,
        'grosse' :0.3,
    }

    
    this.ball1 = MeshBuilder.CreateSphere("ball1", {diameter : taille[a]});
    this.ball1.position.y = 0.38;
    this.ball1.position.x = -1.3;
    this.ball1.position.z = -2.15;
    this.ball1.material = this.changeMaterialColor(0,0,255);
    console.log(`la taille est ${taille[a]}`);
    
    this._ui._play.onPointerUpObservable.add(()=>{
        this.deplacer();
        this.deplacer2();
    })

    this._ui._restart.onPointerUpObservable.add(()=>{
        this.ball1.position.z = -2.15;
        this.ball2.position.z = -2.15;
    })

    this.ball2 = MeshBuilder.CreateSphere("ball2", {diameter : taille[b]})
    this.ball2.position.y= 0.38;
    this.ball2.position.x= -1.9;
    this.ball2.position.z = -2.15;
    this.ball2.diameter = taille[this.tailleR]
    this.ball2.material = this.changeMaterialColor(255,0,0);

    
}

public deplacer(){
    const startPosition = new Vector3(-1.3,0.38,-2.15);
    const endPosition = new Vector3(-1.3,0.38,-0.3);

    Animation.CreateAndStartAnimation(
        "anim", 
        this.ball1, 
        "position", 
        this.vitesse[this.tailleB],
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
        this.vitesse[this.tailleR],
        100,
        startPosition,
        endPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    )
}
public changeMaterialColor(x,y,z):StandardMaterial{
    const ballMat = new StandardMaterial("ballMat", this.scene);
    ballMat.diffuseColor = new Color3(x,y,z)
    return ballMat;
}







}

