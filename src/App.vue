<script lang="ts">
  import { defineComponent } from 'vue';
  // import BabylonScene from './components/BabylonScene.vue';
  import  Home  from './pages/Home.vue';

  window.addEventListener("load",()=>{
    console.log('jjjjjk');
  })
  
  export default defineComponent({
    name: 'App',
    components: {
      // BabylonScene
      // Home
    },
  });
</script>

<template>
  <div>
    <RouterView/>
  </div>
</template>


<style>

</style>
