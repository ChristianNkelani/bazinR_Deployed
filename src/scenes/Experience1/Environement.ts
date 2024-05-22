import {
        Scene, 
        Engine, 
        MeshBuilder, 
        SceneLoader, 
        StandardMaterial,
        Color3,
        Vector3,
        CannonJSPlugin,
        PhysicsImpostor,
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import { AdvancedDynamicTexture, Button, Control, Image, Rectangle, StackPanel, TextBlock } from "babylonjs-gui";
import * as GUI from '@babylonjs/gui/2D';
import {  } from "babylonjs";


export class Environement {

  scene: Scene;
  engine: Engine;
  ball1 : any;
  ball2 : any;

  constructor(
    scene:Scene, engine:Engine,
    private setLoaded: () => void,

  ){
    this.scene = scene;

    this.scene.enablePhysics(
      new Vector3(0,-9.81, 0), 
      new CannonJSPlugin(true,10,CANNON)
    );
    this.engine = engine;

    this.importLaboratoire();
    this.createMateriels();
    this.createMenu();
    this.createground()
    this.createground2()
    this.createButtonActionMenu()
    

  }

  async importLaboratoire(){
    // this.engine.displayLoadingUI();
    const labo = await SceneLoader.ImportMeshAsync("","./models/","laboratoire.glb", this.scene);
    // this.engine.hideLoadingUI();
    this.setLoaded();
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

    this.ball1 = MeshBuilder.CreateSphere("ball", {diameter: 0.25}, this.scene);
    this.ball1.position.y = 2.5;
    this.ball1.position.x = 7.2;
    this.ball1.position.z = -0.7
    this.ball1.material = this.changeMaterialColor(170,255,0)

    this.ball2 = MeshBuilder.CreateSphere("ball", {diameter: 0.25}, this.scene);
    this.ball2.position.y = 2.5;
    this.ball2.position.x = 7.2;
    this.ball2.position.z = -4.4
    this.ball2.material = this.changeMaterialColor(255,0,0)

    return [aimant1,aimant2,this.ball1,this.ball2];
  }
  public createMenu(){
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
    const container = new GUI.Container();

    container.background = "white"
    container.width = "300px"
    container.height=0.5

    container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    container.top = "20px"
    container.left = "10px"

    // creation du texte
    const text = new GUI.TextBlock();
    text.text = "Listes des Materiels"
    text.fontSize=30
    text.fontFamily="Montserrat Black"
    text.color ="deepskyblue"
    text.height="25px"
    text.top = "5px"
    text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    container.addControl(text);

    // creation de la bille

    const bille = GUI.Checkbox.AddCheckBoxWithHeader('Bille ',(value)=>{
        console.log('bille');  
    })
    bille.children[1].color = 'black'
    bille.verticalAlignment=GUI.Control.VERTICAL_ALIGNMENT_TOP
    bille.top = 40
    container.addControl(bille);

    const textBille = new GUI.TextBlock();
    textBille.text = "Taille de la bille Jaune "
    textBille.height = "15px"
    textBille.top="80px"
    textBille.left = "-42px"
    textBille.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    container.addControl(textBille)

    // gestionnaire de taille 
    const slider = new GUI.Slider();
    slider.minimum = 0.9;
    slider.maximum = 2
    slider.height = '20px'
    slider.width = '200px'
    slider.value = 1
    slider.top = "-120px"
    slider.left ="-7px"
    // ecouter un evenement au chanfement de la valeur
    
    slider.onValueChangedObservable.add((value)=>{
        this.ball1.scaling.x = value;
        this.ball1.scaling.y = value;
        this.ball1.scaling.z = value        
    })

    container.addControl(slider)

    const textBille2 = new GUI.TextBlock();
    textBille2.text = "taille de la bille Rouge"
    textBille2.height ='15px'
    textBille2.top = "-90px"
    textBille2.left = "-25px"
    container.addControl(textBille2)

    const slider2 = new GUI.Slider();
    slider2.minimum = 0.9;
    slider2.maximum = 2
    slider2.height = '20px'
    slider2.width = '200px'
    slider2.value = 1
    slider2.top = "-70px"
    slider2.left ="-10px"
    slider2.onValueChangedObservable.add((value)=>{
        this.ball2.scaling.x = value;
        this.ball2.scaling.y = value;
        this.ball2.scaling.z = value  
    })
    container.addControl(slider2)

    advancedTexture.addControl(container)
}



changeMaterialColor(x,y,z):StandardMaterial{
  const ballMat = new StandardMaterial("ballMat", this.scene);
  ballMat.diffuseColor = new Color3(x,y,z)
  return ballMat;
}
// Animation

createImpostor():void{
  this.ball1.physicsImpostor = new PhysicsImpostor(
    this.ball1, 
    PhysicsImpostor.BoxImpostor,
    { mass: 1, restitution : 0.75 }
  )

  this.ball2.physicsImpostor = new PhysicsImpostor(
    this.ball2,
    PhysicsImpostor.BoxImpostor,
    {mass : 1 , restitution : 0.75}
  )
}

createground(){
  const ground = MeshBuilder.CreateGround('ground', {})
  ground.position.y = 0.7
  ground.position.x = 7
  ground.position.z = -0.5

  ground.physicsImpostor = new PhysicsImpostor(
    ground,
    PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.5}
  )
  ground.isVisible = false
}
createground2(){
  const ground = MeshBuilder.CreateGround('ground', {})
  ground.position.y = 0.7
  ground.position.x = 7
  ground.position.z = -4.5

  ground.physicsImpostor = new PhysicsImpostor(
    ground,
    PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.5}
  )
  ground.isVisible = false
}

createButtonActionMenu(){
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
  const panel = new GUI.StackPanel();

  //button play creation
  const b = GUI.Button.CreateImageButton("playButton","Play", "./images/sprites/play.png");
  b.width = "200px";
  b.height = "39px";
  b.background = 'white'
  b.color = "deepskyblue"
  b.onPointerUpObservable.add(()=>{
    this.createImpostor();
  })
  panel.addControl(b)

  const restartButon = GUI.Button.CreateSimpleButton("restartButon", "Restart")
  restartButon.width = "200px";
  restartButon.height = "39px";
  restartButon.background = 'white'
  restartButon.color = "deepskyblue"
  restartButon.onPointerUpObservable.add(()=>{
    this.toRestart();
  })

  panel.addControl(restartButon);
  panel.isVertical = false
  panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
  panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
  panel.top = 10
  panel.height="40px"


  advancedTexture.addControl(panel)
}
toRestart(){
  this.ball2.position.y = 2.5;
  this.ball2.position.x = 7.2;
  this.ball2.position.z = -4.4
  this.ball2.diameter = 0.25

  this.ball1.position.y = 2.5;
  this.ball1.position.x = 7.2;
  this.ball1.position.z = -0.7
  this.ball2.diameter = 0.25
  
}
} 