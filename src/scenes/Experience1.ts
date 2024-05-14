import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder} from "@babylonjs/core";

export class Experience1 {

  scene: Scene;
  engine: Engine;

  constructor(private canvas:HTMLCanvasElement){
    this.engine = new Engine(this.canvas);
    this.scene = this.CreateScene();

    this.engine.runRenderLoop(()=>{
      this.scene.render();
    })
  }

  CreateScene():Scene {
    const scene = new Scene(this.engine);
    
    const camera = new FreeCamera("camera", new Vector3(0,1,0), this.scene );
    camera.attachControl();
    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0), this.scene);
    hemiLight.intensity = 0.5;

    const ground = MeshBuilder.CreateGround("ground",{width:5, height:5});
    return scene;
  }
}