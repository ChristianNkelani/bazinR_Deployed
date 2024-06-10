import { 
    Scene, 
} from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';
import { Environement } from "./Environement";


export class UI {
    public _scene:Scene;
    public _environement : Environement
    public _images :  GUI.Image[]

    constructor(scene:Scene){
        this._scene = scene
        this.createTexte();
    }
    public createTexte(){
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI',undefined);
        const texte = new GUI.TextBlock();
        texte.width = "350px"
        texte.height = "39px"
        texte.color = "white"
        texte.text = "Première loi de Newton: Principe d'inertie"
        texte.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        texte.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(texte);

        // images for materials
        const tableau_image = [
            "dynamometre.png",
            "barre_statif.png",
            "pied_statif.png",
            "masse.png"
        ];
        this.createImage(tableau_image,advancedTexture);

        

        // advancedTexture.addControl(container);
        const panel = new GUI.StackPanel();
        advancedTexture.addControl(panel);


        // const mat1 = GUI.Button.CreateImageButton('mybtn','klkl','dynamometre.png');
        // panel.addControl(mat1)
    }
    public createImage(tableau_image:string[],advancedTexture:GUI.AdvancedDynamicTexture){
        const panel = new GUI.StackPanel();
        this._images = [];
        for (let index = 0; index < tableau_image.length; index++) {
            this._images[index] = new GUI.Image(index.toString(), tableau_image[index]);
            this._images[index].width = "100px";
            this._images[index].height = "200px";
            this._images[index].color  =  "white"
            this._images[index].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
            
            panel.addControl(this._images[index]);        
        }
        panel.width= "500px";
        panel.height= "250px";

        panel.isVertical = false;
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(panel);
    }
}