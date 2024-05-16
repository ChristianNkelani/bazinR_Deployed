<script lang="ts">
  import { defineComponent } from 'vue';
  // import BabylonScene from './components/BabylonScene.vue';
  import  Home  from './pages/Home.vue';
  
  export default defineComponent({
    name: 'App',
    components: {
      // BabylonScene
      // Home
    }
  });
</script>

<template>
  <!-- <div>
    <RouterLink to="/categorie">Go to Hhjjjjjjjjjjjjjjjjjjjjome</RouterLink>
  </div> -->
  <div>
    <RouterView/>
  </div>
  <!-- <BabylonScene/> -->
</template>


<style>

</style>
