<template>
    <div class="bg-white border shadow-md">
        <div>
            <img src="@/assets/architecture2.jpg" alt="" class="h-48 w-full">
        </div>
        <div class="p-2">
            <h2 class="text-2xl text-green-400">{{ titre }}</h2>
            <p class="text-justify text-gray-500">
                {{ description }}
                
            </p>
        </div>
    </div>
</template>
<script>
export default{
    props : ['titre', 'description', 'photo'],
    computed : {
        photos (){
            return `${this.props.photo}`
        }
    }

}

</script>