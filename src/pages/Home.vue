<script>
import { RouterLink } from 'vue-router';
export default {
  name : 'Home',
  


  
}
</script>
<template>
    <div class="h-screen w-screen bg-cover bg-[url('@/assets/architecture2.jpg')] flex items-center justify-center">
        <div class="w-1/2">
            <p class="uppercase text-7xl text-gray-500">Bienvenue sur <span class="text-blue-400">BAZIN-R</span></p>
            <!-- <p class="text-3xl text-gray-500">SIMULATEUR DE PHYSIQUE</p> -->
            <p class="text-gray-500 pt-8 text-justify">Découvrez un univers fascinant où la physique prend vie grâce à nos simulations interactives. Que vous soyez étudiant, enseignant, ou simplement passionné par les sciences, notre plateforme vous offre une expérience immersive et éducative</p>
            <div class="mt-4 bg-blue-500 w-32 py-2 px-3 text-xl rounded-md text-white">
              <RouterLink to="/categorie">Commencer</RouterLink>
            </div>
        </div>
    </div>
</template>