import {
        Scene, 
        Engine, 
        Vector3, 
        HemisphericLight, 
        MeshBuilder, 
        PBRMaterial,
        Color3,
        UniversalCamera} from "@babylonjs/core";
import "@babylonjs/loaders";
import { UI } from "./ui";
import { Environement } from "./Environement";
import { Player } from "./Player";

export class Experience1 {

  scene: Scene;
  engine: Engine;

  private _ui: UI;
  private _environement: Environement;

  constructor(
    private canvas:HTMLCanvasElement,
    private setLoaded: () => void,
  ){

    this.engine = new Engine(this.canvas);

    //on cree la scene de base
    this.scene = this.CreateScene();

    //on charge l environnement
    this._environement = new Environement(this.scene, this.engine, this.setLoaded);

    this.engine.runRenderLoop(()=>{
      this.scene.render();
    })
  }

  CreateScene():Scene {
    const scene = new Scene(this.engine);
    
    const camera = new UniversalCamera("camera", new Vector3(0,3,-2.5), this.scene );
    camera.speed = 0.5;
    camera.rotation._y = Math.PI/2;
    camera.rotation._x= Math.PI/14;


    console.log(camera.position.x, camera.position.y, camera.position.z, camera.rotation.x, camera.rotation.y, camera.rotation.z)
    camera.attachControl();
    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0), this.scene);
    hemiLight.intensity = 1;


    return scene;
  }





  // creation de la chambre a vide

  chambreVide(){
    const box = MeshBuilder.CreateBox(
      "box", {
        width : 2.8,
        height : 5.9,
        size:5.5
      }, 
      this.scene
    );
    box.position.x = 6.5;
    box.position.z = -2.5;
    const glass = new PBRMaterial("glass", this.scene);
    glass.alpha = 0.5;
    glass.directIntensity = 0.0;
    glass.environmentIntensity = 0.7;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new Color3(0.95, 0.95, 0.95);
    box.material = glass
  }
}