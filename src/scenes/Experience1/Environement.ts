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
        PBRMaterial,
        Sound,
        OimoJSPlugin,
        AmmoJSPlugin
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import { UI } from "./ui";
import { Interaction } from "./interaction";


export class Environement {

  scene: Scene;
  engine : Engine;
  ball1 : any;
  ball2 : any;
  physicEngine:any;
  private _Interaction: Interaction;


  gravZ:any;
  cliquer=true;//variable pour activer impostor ou non
  public _ui:UI;

  constructor(
    scene:Scene, engine:Engine,
    private setLoaded: () => void,
    private voirCard:()=> void

  ){
    //la scene
    this.scene = scene;

    //on charge les autres interfaces
    this._ui = new UI(this.scene);  

    this.scene.onBeforeRenderObservable.add(() => {
      // when the game isn't paused, update the timer
      this._ui.updateHud();
    });

    //enable physics
    this.createGravity();


    //create  
    this._Interaction = new Interaction();
    this._Interaction.Accueil(this.scene);

   
    //creation des materiels
    this.importLaboratoire();
    this.createMateriels();
    this.createground()
    this.createground2()

    //action des sliders
    this.actionButtonMenu();    

  }

  async importLaboratoire(){
    const labo = await SceneLoader.ImportMeshAsync("","./models/","laboratoire.glb", this.scene);
    this.setLoaded();
    this.voirCard();
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


  changeMaterialColor(x,y,z):StandardMaterial{
    const ballMat = new StandardMaterial("ballMat", this.scene);
    ballMat.diffuseColor = new Color3(x,y,z)
    return ballMat;
  }

  // Animation
  public createImpostor():void{
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
      { mass: 0, restitution: 0}
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
      { mass: 0, restitution: 0}
    )
    ground.isVisible = false
  }

  actionButtonMenu(){
    this._ui._sliders[0].onValueChangedObservable.add((value)=>{
      this.ball1.scaling.x = value;
      this.ball1.scaling.y = value;
      this.ball1.scaling.z = value        
    })

    this._ui._sliders[1].onValueChangedObservable.add((value)=>{
      this.ball2.scaling.x = value;
      this.ball2.scaling.y = value;
      this.ball2.scaling.z = value;
    })
    

    this._ui._buttonAction[0].onPointerUpObservable.add(()=>{
      if(this.cliquer == true){
        this._ui._stopTimer = false;
        this.createImpostor();
    
        this._ui.startTimer();
        this.cliquer = false;
       
      }
    })

    this._ui._sliders[2].onPointerUpObservable.add(() => {
      this.physicEngine.setGravity(new Vector3(0,-(this._ui._sliders[2].value),0))
    });

    this._ui._buttonAction[1].onPointerUpObservable.add(()=>{
      this.toRestart();
    })

    this.actionGroupSlider();
  }
  toRestart(){
    this.ball2.position.y = 2.5;
    this.ball2.position.x = 7.2;
    this.ball2.position.z = -4.4
    this.ball2.diameter = 0.25
    this.ball1.physicsImpostor.dispose();


    this.ball1.position.y = 2.5;
    this.ball1.position.x = 7.2;
    this.ball1.position.z = -0.7
    this.ball2.diameter = 0.25
    this.ball2.physicsImpostor.dispose();
    this.cliquer=true;
    this._ui._sString = "00";
    this._ui._mString = 0;
    this._ui.time = 0;
    // this._ui._stopTimer = false;
    this._ui._clockTime.text = "00:00";
    
  }

  async createGravity(){
    // const ammo = await Ammo()
    // let physics: AmmoJSPlugin = new AmmoJSPlugin(true, ammo)
    this.scene.enablePhysics(null, new CannonJSPlugin(true,10,CANNON));
    this.physicEngine = this.scene.getPhysicsEngine();

  }

  actionGroupSlider(){
    const displayValue = function(value){
      return Math.floor(value*100)/100;
    }

    const ball1 = this.ball1;
    const ball2 = this.ball2;

    const setBall1 = function(this: any,value){
      ball1.scaling.x = value;
      ball1.scaling.y = value;
      ball1.scaling.z = value;
    }

    const setBall2 = function(this: any,value){
      ball2.scaling.x = value;
      ball2.scaling.y = value;
      ball2.scaling.z = value;
    }


    const physicEngine = this.physicEngine;
    const setGravitaion = function(value){
      physicEngine.setGravity(new Vector3(0,-(value),0))
    }
    this._ui.groupSliders[0].addSlider("Gravitation",setGravitaion,"m/s2",0,15,9.81,displayValue);
    this._ui.groupSliders[0].addSlider("Masse balle jaune",setBall1,"Kg",1,2,1,displayValue);
    this._ui.groupSliders[0].addSlider("Masse balle rouge",setBall2,"Kg",1,2,1,displayValue);

    this._ui.groupSliders[1].addCheckbox("Chambre à vide")

    
  }
} 