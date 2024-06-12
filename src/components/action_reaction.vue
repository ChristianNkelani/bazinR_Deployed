<template>
    <main>
      <LoadingScreen :isLoaded="loaded" />
      <div id="card" class="w-1/3 h-96 bg-white absolute top-1/3 left-1/3 hidden">
        jhfdshjfds
  
        <button @click="cacherCard" class="bg-blue-600">Fermer</button>
      </div>
      <canvas></canvas>
    </main>
    <RouterLink to="/categorie">Retour</RouterLink>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Experience5 } from '../scenes/Experience_action_reaction/App';
  import  LoadingScreen  from "@/components/LoadingScreen.vue";
  
  export default defineComponent({
    name: 'BabylonScene',
    data() {
      return {
        loaded : false
      }
    },
    components : { LoadingScreen },
    mounted(){
      const canvas= document.querySelector('canvas') as HTMLCanvasElement;
      new Experience5(canvas, this.setLoaded, this.voirCard );
  
    },
    methods: {
      setLoaded() {
        this.loaded = true;
      },
      voirCard(){
        document.querySelector('#card').classList.remove('hidden');
      },
      cacherCard(){
        document.querySelector('#card').classList.add('hidden');
      }
    },
  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    canvas{
      width: 100%;
      height: 100%;
    }
  </style>
  