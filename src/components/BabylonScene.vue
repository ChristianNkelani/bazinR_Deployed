<template>
  <main>
    <LoadingScreen :isLoaded="loaded" />
    <canvas></canvas>
  </main>
  <RouterLink to="/categorie">Retour</RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Experience1} from '../scenes/Experience1/App';
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
    new Experience1(canvas, this.setLoaded );
  },
  methods: {
    setLoaded() {
      this.loaded = true;
    },
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
