<template>
    <div>
        <div v-for="tackle in tackles" :key="tackle.id">
            <Tackle :fishes="fishes" :style="selectedTackles.some((selectedTackle) => selectedTackle !== tackle.id) ? `background-color: rgb(215, 215, 215);` : `background-color: transparent;`" @closeSandbox="closeSandboxHandler" @createSandbox="createSandboxHandler" @updateSelectedTackles="updateSelectedTacklesHandler" :selectedTackles="selectedTackles" :title="tackle.fishId" :id="tackle._id" />
        </div>
    </div>
</template>

<script>
import Tackle from '@/components/Tackle.vue'
export default {
    name: "Tackles",
    props: [
        "fishes",
        "tackles",
        "selectedTackles"
    ],
    data(){
        return {
            selectedTackles: []
        }
    },
    emits: [
        "updateSelectedTackles",
        "createSandbox"
    ],
    methods: {
        closeSandboxHandler(){
            console.log("закрываю")
            this.$emit("closeSandbox")
        },
        createSandboxHandler(id, title){
            this.$emit("createSandbox", id, title)
        },
        updateSelectedTacklesHandler(isSelected, tackleId, event){
           this.$emit("updateSelectedTackles", isSelected, tackleId, event)
        }
    },
    components: {
        Tackle
    }
}
</script>