<template>
    <div id="card" class="w-1/3 h-96 bg-white absolute z-40 top-1/3 left-1/3 hidden">
        <div class="h-full w-full flex flex-col justify-around items-center border" v-if="card==1">
            <h2 class="text-blue-500 text-2xl font-bold text-center">PRINCIPE FONDAMENTALE DE LA DYNAMIQUE</h2>
            <p class="text-gray-500 w-96">Cette experience est une exploration captivante des lois fondamentales qui gouvernent le mouvement des objets dans notre univers.</p>
            <button @click="card++" class="bg-blue-500 w-64 text-md py-2 px-3 text-white">Commencer</button>
        </div>
        <div v-if="card==2" class="flex flex-col">
            <div class="grid grid-cols-2 pt-16">
                <div class="flex flex-col items-center h-64">
                    <div class="h-16">
                        <div class="bg-blue-800 rounded-full" :class="{'w-5 h-5':tailleB=='petite','w-10 h-10':tailleB=='moyenne','w-16 h-16':tailleB=='grosse'}"></div>
                    </div>
                    <span>Taille de la bille</span>
                    <select name="" id="" v-model="tailleB" class="w-32 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800">
                        <option value="petite">Petite</option>
                        <option value="moyenne">Moyenne</option>
                        <option value="grosse">Grosse</option>
                    </select>
                </div>
                <div>
                    <div class="flex flex-col items-center">
                        <div class="h-16">
                            <div class="bg-red-800 rounded-full" :class="{'w-5 h-5':tailleR=='petite','w-10 h-10':tailleR=='moyenne','w-16 h-16':tailleR=='grosse'}"></div>
                        </div>
                        <span>Taille de la bille</span>
                        <select name="" id="" v-model="tailleR" class="w-32 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800">
                            <option value="petite">Petite</option>
                            <option value="moyenne">Moyenne</option>
                            <option value="grosse">Grosse</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex justify-center">
                <button @click="cacherCard" class="bg-blue-500 w-64 text-md py-2 px-3 text-white">Continuer</button>
            </div>
        </div>
    </div>
    <RouterLink to="/categorie" class="absolute z-40 right-0 bottom-5 w-32 h-32">
        <img class="w-24 h-24 bg-blue-500 rounded-full" src="../assets/retour.png" alt="">
    </RouterLink>
    <main :class="{'blur-sm': flou == true}">
        <LoadingScreen :isLoaded="loaded"/>
        <canvas></canvas>
    </main>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import LoadingScreen from "@/components/LoadingScreen.vue";
    import { Experience3 } from '@/scenes/Experience3_PFD/App';

    export default defineComponent({
        name: 'Inertie',
        data(){
            return {
                loaded : false,
                flou : false,
                card : 1,
                tailleR : 'moyenne',
                tailleB : 'moyenne'
            }
        },
        components : {LoadingScreen},
        mounted(){
            const canvas = document.querySelector('canvas') as HTMLCanvasElement;
            new Experience3(canvas, this.setLoaded,this.voirCard,this.tailleR,this.tailleB);
        },
        methods: {
            setLoaded(){
                this.loaded = true;
                // gestion des foues 
                this.flou = true
            },
            voirCard(){
                document.querySelector('#card').classList.remove('hidden');
            },
            cacherCard(){
                document.querySelector('#card').classList.add('hidden');

                // gestion des flous
                this.flou = false
            }
        },
    })
</script>
<style scoped>
  canvas{
    width: 100%;
    height: 100%;
  }
</style>