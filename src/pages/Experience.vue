<template>

<div class="h-screen w-screen bg-cover bg-[url('@/assets/architecture2.jpg')] flex items-center justify-center flex-col px-16">
    <div class="w-full px-32 flex justify-between">
        <h1 class=" text-blue-500 font-bold text-3xl  uppercase">
            {{ tt }}
        </h1>
        <p><RouterLink to="/categorie">Retour</RouterLink></p>
    </div>
    <div class="flex gap-3 py-10">
            <div v-for="experience in filteredExperiences" :key="experience.cat" class="">
                <RouterLink :to="`/${experience.id}`">
                    <div class="bg-[url('@/assets/architecture2.jpg')] bg-cover border shadow-md w-48 h-48 rounded-full text-center flex items-center justify-center p-3">
                        {{ experience.nom }}
                    </div>
                </RouterLink>
            </div>
    </div>
    

    
</div>
</template>
<script>
export default {
    data(){
        return {
            experiences : [
                { id : '1', nom : 'Elements de base de la cinématique', cat : 1 , img : '',   },
                { id : "2", nom : 'MRU et MRUV', cat : 1 , img : ''  },
                { id : "3", nom : 'Chute libre des corps', cat : 1 , img : ''  },
                { id : "4", nom : 'Determination du poids d\'un corps ', cat : 1 , img : ''  },   
                { id : "5", nom : '1ère Loi de Newton : Inertie', cat : 2 , img : ''  },   
                { id : "6", nom : '2ème Loi de Newton : Principe fondamental de la Dynamique', cat : 2 , img : ''  },   
                { id : "7", nom : '3ème Loi de Newton : Action et réaction', cat : 2 , img : ''  },   
                { id : "8", nom : 'Travail mécanique d\'un corps en mouvement ', cat : 2 , img : ''  },   
                { id : "9", nom : 'Energie mecanique d\'un corps : energie cinetique et energie potentielle', cat : 3 , img : ''  },   
                { id : "0", nom : 'Puissance mecanique d\'un corps en mouvement', cat : 3 , img : ''  },   
            ],
            cat : this.$route.params.cat,
        }
    },
    computed: {
        filteredExperiences() {
            return this.experiences.filter(
                (experience) => experience.cat == this.$route.params.cat
            );
        },
        tt() {
            return this.$route.params.tit;
        }
        
    },
}
</script>