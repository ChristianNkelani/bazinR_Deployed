import {
    Scene, 
    Engine, 
    MeshBuilder, 
    SceneLoader, 
    StandardMaterial,
    Color3,
    Vector3,
    PhysicsImpostor,
    CannonJSPlugin
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import * as Ammo from "ammojs-typed"
import * as GUI from '@babylonjs/gui/2D';
import { UI } from "./ui";

export class Environement {

  public scene: Scene;
  engine : Engine;
  boitiers: any;
  cliquer=true;//variable pour activer impostor ou non
  public _ui:UI;

  constructor(
  scene:Scene, engine:Engine,
  private setLoaded: () => void,

  ){
  //la scene
  this.scene = scene;

  //on charge les autres interfaces
  this._ui = new UI(this.scene);  
  // this._ui.startTimer();
  this.scene.onBeforeRenderObservable.add(() => {
    // when the game isn't paused, update the timer
    
        this._ui.updateHud();
        console.log(this.boitiers[0].position._y);
  });

  this.scene.enablePhysics(
    new Vector3(0,-9.81, 0), 
    new CannonJSPlugin(true,10,CANNON)
  );


  //the engine
  this.engine = engine;

  //creation des materiels
  this.importLaboratoire();
  this.createMateriels();
  this.createground();
  this.createground2();
  this.createMotor();

  //action des sliders
  this.actionButtonMenu();  



  }

  async importLaboratoire(){
  const labo = await SceneLoader.ImportMeshAsync("","./models/","laboratoire.glb", this.scene);
  this.setLoaded();

  return labo;
  }

  createMateriels(){

  //on dit que c'est un tableau
  this.boitiers = [];
  this.boitiers[0] = MeshBuilder.CreateBox("ball", {width: 0.25, height:0.25, size:0.25}, this.scene);
  this.boitiers[0].position.y = 0.7;
  this.boitiers[0].position.x = 6.5;
  this.boitiers[0].position.z = -0.7
  this.boitiers[0].material = this.changeMaterialColor(170,255,0)

  this.boitiers[1] = MeshBuilder.CreateBox("ball", {width: 0.25, height: 0.25, size: 0.25}, this.scene);
  this.boitiers[1].position.y = 0.7;
  this.boitiers[1].position.x = 7.7;
  this.boitiers[1].position.z = -0.7
  this.boitiers[1].material = this.changeMaterialColor(255,0,0)

  return [this.boitiers[0],this.boitiers[1]];
  }


  changeMaterialColor(x,y,z):StandardMaterial{
  const ballMat = new StandardMaterial("ballMat", this.scene);
  ballMat.diffuseColor = new Color3(x,y,z)
  return ballMat;
  }

  // Animation
  public createImpostor():void{
  this.boitiers[0].physicsImpostor = new PhysicsImpostor(
    this.boitiers[0], 
    PhysicsImpostor.BoxImpostor,
    { mass: 1, restitution : 0.75 }
  )

  this.boitiers[0].physicsImpostor = new PhysicsImpostor(
    this.boitiers[0],
    PhysicsImpostor.BoxImpostor,
    {mass : 1 , restitution : 0.75}
  )
  }

  createground(){
  const ground = MeshBuilder.CreateGround('ground', {width:2.5, height:5.2})
  ground.position.y = 0.6
  ground.position.x = 7.2
  ground.position.z = -2.5

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

  actionButtonMenu(){
  this._ui._sliders[0].onValueChangedObservable.add((value)=>{
    this.boitiers[0].scaling.x = value;
    this.boitiers[0].scaling.y = value;
    this.boitiers[0].scaling.z = value;
    this._ui._textMasse[0].text = "m1 = " +this._ui._sliders[0].value+" kg";
    this._ui._textMasse[3].text = "m12 = "+(this._ui._sliders[0].value+this._ui._sliders[1].value)+" kg";

  })

  this._ui._sliders[1].onValueChangedObservable.add((value)=>{
    this.boitiers[1].scaling.x = value;
    this.boitiers[1].scaling.y = value;
    this.boitiers[1].scaling.z = value.toPrecision(1);
    this._ui._textMasse[1].text = "m2 = " +this._ui._sliders[1].value+" kg";
    this._ui._textMasse[3].text = "m12 = "+(this._ui._sliders[0].value+this._ui._sliders[1].value)+" kg";

  })


  this._ui._buttonAction[0].onPointerUpObservable.add(()=>{
    if(this.cliquer == true){
      this.createImpulse();
      this._ui._stopTimer = false;

      this._ui.startTimer();
      this.cliquer = false;
    
    }
  })
  this._ui._buttonAction[1].onPointerUpObservable.add(()=>{
    this.toRestart();
  })
  }
  toRestart(){
  this.boitiers[1].position.y = 0.7;
  this.boitiers[1].position.x = 7.7;
  this.boitiers[1].position.z = -0.7
  this.boitiers[0].physicsImpostor.dispose();


  this.boitiers[0].position.y = 0.7;
  this.boitiers[0].position.x = 6.5;
  this.boitiers[0].position.z = -0.7
  this.boitiers[1].physicsImpostor.dispose();
  this.cliquer=true;
  this._ui._sString = "00";
  this._ui._mString = 0;
  this._ui.time = 0;
  // this._ui._stopTimer = false;
  this._ui._clockTime.text = "00:00";

  }

  createImpulse(){
    this.boitiers[0].physicsImpostor = new PhysicsImpostor(
      this.boitiers[0],
      PhysicsImpostor.BoxImpostor,
      {mass: 10, friction: 0.04}
    );

    this.boitiers[1].physicsImpostor = new PhysicsImpostor(
      this.boitiers[1],
      PhysicsImpostor.BoxImpostor,
      {mass: 10, friction: 0.04}
    );


    const bouger = () =>{
      this.boitiers[0].physicsImpostor.setLinearVelocity(new Vector3(0,0,-1));
      this.boitiers[1].physicsImpostor.setLinearVelocity(new Vector3(0,0,-1));
    }

    this.scene.registerBeforeRender(bouger);

  }


  createLines(){
    // const line1 = MeshBuilder.CreateLines('l1',{points: })
  }

  createMotor(){

    //poteau1
    const poteau1 = MeshBuilder.CreateBox("p1",{width: 0.1, height:0.8, size: 0.1}, this.scene);
    poteau1.position.y = 1;
    poteau1.position.x = 6.7;
    poteau1.position.z = -5;

    //poteau2
    const poteau2 = MeshBuilder.CreateBox("p1",{width: 0.1, height:0.8, size: 0.1}, this.scene);
    poteau2.position.y = 1;
    poteau2.position.x = 7.5;
    poteau2.position.z = -5;

    //create cylinder
    const cylinder = MeshBuilder.CreateCylinder("c1",{height:1.5, diameter:0.1}, this.scene);
    cylinder.position.y = 1;
    cylinder.position.x = 7.1;
    cylinder.position.z = -5;
    cylinder.rotation.z = Math.PI/2;

    //create cylinder
    const cylinder1 = MeshBuilder.CreateCylinder("c2",{height:0.1, diameter:0.3}, this.scene);
    cylinder1.position.y = 1;
    cylinder1.position.x = 7.1;
    cylinder1.position.z = -5;
    cylinder1.rotation.z = Math.PI/2;
    cylinder1.material = this.changeMaterialColor(155,0,0);

    cylinder1.physicsImpostor = new PhysicsImpostor(
      cylinder1,
      PhysicsImpostor.CylinderImpostor,
      {mass: 1, friction: 0}
    );


    const bouger = () =>{
      // cylinder1.physicsImpostor?.setDeltaRotation
      cylinder1.physicsImpostor?.setAngularVelocity(new Vector3(3,0,0));
    }

    this.scene.registerBeforeRender(bouger);

  }


} 