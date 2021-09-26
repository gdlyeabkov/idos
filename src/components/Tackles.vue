<template>
    <div>
        <div v-for="tackle in tackles" :key="tackle.id">
            <Tackle @updateSelectedTackles="updateSelectedTacklesHandler" :title="tackle.title" :id="tackle.id" />
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
    emits: [ "updateSelectedTackles" ],
    methods: {
        updateSelectedTacklesHandler(isSelected, tackleId, event){
           this.$emit("updateSelectedTackles", isSelected, tackleId, event)
        }
    },
    components: {
        Tackle
    }
}
</script>