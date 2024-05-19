import {Scene, Engine, Vector3, HemisphericLight, UniversalCamera, Mesh} from "@babylonjs/core";
import "@babylonjs/loaders";
import { UI } from "./ui";
import { Environement } from "./Environement";

export class Experience1 {

  scene: Scene;
  engine: Engine;
  private _ui: UI;
  private _environement: Environement;

  constructor(private canvas:HTMLCanvasElement){

    this.engine = new Engine(this.canvas);
    this.scene = this.CreateScene();

    //on charge l environnement
    const environement = new Environement(this.scene, this.engine);

    //on charge les autres interfaces
    const ui = new UI(this.scene);    

    this.engine.runRenderLoop(()=>{
      this.scene.render();
    })
  }

  CreateScene():Scene {
    const scene = new Scene(this.engine);
    
    const camera = new UniversalCamera("camera", new Vector3(2,3,-2.5), this.scene );
    // camera.rotation._z = -Math.PI/2.06;
    // camera.rotation._x = Math.PI/2.9;
    camera.speed = 0.5;
    camera.rotation._y = Math.PI/2;
    camera.rotation._x= Math.PI/14;


    console.log(camera.position.x, camera.position.y, camera.position.z, camera.rotation.x, camera.rotation.y, camera.rotation.z)
    camera.attachControl();
    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0), this.scene);
    hemiLight.intensity = 1;

    // const ground = MeshBuilder.CreateGround("ground",{width:5, height:5});
    return scene;
  }


 
}