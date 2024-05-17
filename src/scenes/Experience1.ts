import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, UniversalCamera} from "@babylonjs/core";
import "@babylonjs/loaders";
export class Experience1 {

  scene: Scene;
  engine: Engine;

  constructor(private canvas:HTMLCanvasElement){

    this.engine = new Engine(this.canvas);
    this.scene = this.CreateScene();
    this.importLaboratoire();

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
    camera.rotation._x= Math.PI/16;


    console.log(camera.position.x, camera.position.y, camera.position.z, camera.rotation.x, camera.rotation.y, camera.rotation.z)
    camera.attachControl();
    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0), this.scene);
    hemiLight.intensity = 0.5;

    // const ground = MeshBuilder.CreateGround("ground",{width:5, height:5});
    return scene;
  }

  async importLaboratoire(){
    this.engine.displayLoadingUI();
    const labo = await SceneLoader.ImportMeshAsync("","./models/","laboratoire.glb", this.scene);
    this.engine.hideLoadingUI();

    return labo;
  }
}