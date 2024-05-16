import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue';
import Categorie from '@/pages/Categorie.vue';
import Experience from '@/pages/Experience.vue'
import BabylonScene from '@/components/BabylonScene.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/categorie', component: Categorie },
  { path: '/categorie/:tit/:cat', name : 'catDetail' , component: Experience, props:true },

  // Les experiences
  {path : '/3', component : BabylonScene}   
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router;