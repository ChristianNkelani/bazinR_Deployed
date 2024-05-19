<template>
  <canvas></canvas>
  <RouterLink to="/categorie">Retour</RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Experience1 } from '../scenes/Experience1/App';

export default defineComponent({
  name: 'BabylonScene',
  
  mounted(){
    const canvas= document.querySelector('canvas')!;
    new Experience1(canvas);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  canvas{
    width: 100%;
    height: 100%;
  }
</style>
