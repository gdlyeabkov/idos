<template>
    <div>
        <div v-for="tackle in tackles" :key="tackle.id">
            <Tackle @updateSelectedTackles="updateSelectedTacklesHandler()" :title="tackle.title" :id="tackle.id" />
        </div>
    </div>
</template>

<script>
import Tackle from '@/components/Tackle.vue'
export default {
    name: "Tackles",
    props: [
        "tackles"
    ],
    data(){
        return {
            selectedTackles: []
        }
    },
    methods: {
        updateSelectedTacklesHandler(isSelected, tackleId){
           this.selectedTackles.push(tackleId)
           console.log(`обновляю: ${this.selectedTackles}`)
        }
    },
    components: {
        Tackle
    }
}
</script>