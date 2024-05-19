import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader, UniversalCamera, Mesh} from "@babylonjs/core";
import "@babylonjs/loaders";
import { UI } from "./ui";
import { AdvancedDynamicTexture, Button, Control, Rectangle, StackPanel } from "babylonjs-gui";

export class Environement {

  scene: Scene;
  engine: Engine;
  private _ui: UI;

  constructor(scene:Scene, engine:Engine){
    this.scene = scene;
    this.engine = engine;

    this.importLaboratoire();
    this.createMateriels();

  }

  async importLaboratoire(){
    this.engine.displayLoadingUI();
    const labo = await SceneLoader.ImportMeshAsync("","./models/","laboratoire.glb", this.scene);
    this.engine.hideLoadingUI();
    return labo;
  }

  createMateriels(){
    const aimant1 = MeshBuilder.CreateBox("aimant", {width:0.5, height:0.08 , size: 1, depth:1}, this.scene);
    aimant1.position.x = 7.3
    aimant1.position.y = 2.5
    aimant1.position.z = -0.5

    const aimant2 = MeshBuilder.CreateBox("aimant", {width:0.5, height:0.08 , size: 1, depth:1}, this.scene);
    aimant2.position.x = 7.3
    aimant2.position.y = 2.5
    aimant2.position.z = -4.6

    const ball1 = MeshBuilder.CreateSphere("ball", {diameter: 0.25}, this.scene);
    ball1.position.y = 2.5;
    ball1.position.x = 7.2;
    ball1.position.z = -0.7

    const ball2 = MeshBuilder.CreateSphere("ball", {diameter: 0.25}, this.scene);
    ball2.position.y = 2.5;
    ball2.position.x = 7.2;
    ball2.position.z = -4.4

    return [aimant1,aimant2,ball1,ball2];
  }

}