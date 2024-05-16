<template>
    <div  class="h-screen w-screen bg-cover bg-[url('@/assets/architecture2.jpg')] flex items-center justify-center px-16">
        <div>
            <div class="px-32 py-16 flex justify-between">
                <h1 class=" text-blue-500 font-bold text-3xl  uppercase">Categories</h1>
                <p><RouterLink to="/">Retour</RouterLink></p>
            </div>
            <div class="grid grid-cols-3 gap-3">
                <RouterLink :to="{name : 'catDetail', params : {cat : 2, tit:'Dynamique'}}">
                    <card 
                    class="" 
                    titre="Dynamique" 
                    description="La dynamique est la branche de la mécanique qui étudie les forces et leur effet sur le mouvement des objets. Notre simulation interactive vous permet..." 
                    photo="architecture2"
                    />
                </RouterLink>

                <RouterLink :to="{name: 'catDetail', params : {cat : 3, tit : 'Cinematique'} }">
                    <card 
                    class="" 
                    titre="Cinematique" 
                    description="La chute libre est un phénomène fondamental en physique, où un objet tombe sous l'influence de la gravité seule, sans résistance de l'air ou autres forces..." 
                    photo="@/assets/architecture2.jpg"
                    />
                </RouterLink>

                <RouterLink :to="{name:'catDetail', params : {cat : 1, tit : 'Energie Mecanique'}}">
                    <card 
                    class="" 
                    titre="Energie Mecanique" 
                    description="La chute libre est un phénomène fondamental en physique, où un objet tombe sous l'influence de la gravité seule, sans résistance de l'air ou autres forces..." 
                    photo="@/assets/architecture2.jpg"
                    />
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script>
    import card from '@/components/card.vue'
    import { RouterLink } from 'vue-router';
    export default{
        components : {
            card
        },
        
    }

</script>