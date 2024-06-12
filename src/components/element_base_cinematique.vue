<template>
    <main>
        <LoadingScreen :isLoaded="loaded"/>
        <canvas></canvas>
    </main>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import LoadingScreen from "@/components/LoadingScreen.vue";
    import { Experience3 } from '@/scenes/Element_base_cinematique/App';

    export default defineComponent({
        name: 'Inertie',
        data(){
            return {
                loaded : false
            }
        },
        components : {LoadingScreen},
        mounted(){
            const canvas = document.querySelector('canvas') as HTMLCanvasElement;
            new Experience3(canvas, this.setLoaded);
        },
        methods: {
            setLoaded(){
                this.loaded = true;
            },
        },
    })
</script>
<style scoped>
  canvas{
    width: 100%;
    height: 100%;
  }
</style>