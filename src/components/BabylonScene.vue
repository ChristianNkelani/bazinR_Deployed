<template>
  <main>
    <LoadingScreen :isLoaded="loaded" />
    <!-- <div id="card" class="w-1/3 h-96 bg-red-600 absolute top-1/3 left-1/3">
      jhfdshjfds
    </div> -->
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
    document.querySelector('#card')
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
