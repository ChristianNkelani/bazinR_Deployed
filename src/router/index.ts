import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue';
import Categorie from '@/pages/Categorie.vue';
import Experience from '@/pages/Experience.vue'
import BabylonScene from '@/components/BabylonScene.vue';
import inertie from '@/components/inertie.vue';
import poids_corps from '@/components/poids_corps.vue';
import PFD from '@/components/PFD.vue';
<<<<<<< HEAD
import action_reaction from "@/components/action_reaction.vue";
=======
import element_base_cinematique from '@/components/element_base_cinematique.vue';
>>>>>>> 323a9c3796422c831f0884c0bcdaeb89caa371ff

const routes = [
  { path: '/', component: Home },
  { path: '/categorie', component: Categorie },
  { path: '/categorie/:tit/:cat', name : 'catDetail' , component: Experience, props:true },

  // Les experiences
  {path : '/3', component : BabylonScene},
  {path : '/5', component : inertie},
  {path : '/6', component : PFD},
<<<<<<< HEAD
  {path : '/7', component : action_reaction}
=======
  {path : '/4', component : poids_corps},
  {path : '/1', component : element_base_cinematique},

>>>>>>> 323a9c3796422c831f0884c0bcdaeb89caa371ff
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router;