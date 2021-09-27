<template>
    
            <!-- <p style="margin-top: 45px;">
                {{ fish.name }}
            </p>
        </div>    
    </div> -->
    <div>
        <div v-if="fishes.length >= 1" style="width: 100%; height: 100%; text-align: center;">      
            <div v-for="fish in fishes" :style="`${fish.isPreserve ? `opacity: 0.5;` : `opacity: 1.0;`} background-size: 100% 100%; background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Internet_Explorer_10%2B11_logo.svg/1200px-Internet_Explorer_10%2B11_logo.svg.png'); width: 45px; height: 45px; float: left; margin: 15px; font-size: 10px;`" :key="fish.name">
                <Fish @disableEdittedFish="disableEdittedFishHandler" @changePath="changePathHandler" @createTackle="createTackleHandler" @clearContextMenu="clearContextMenuHandler" @updateSelectedFishes="updateSelectedFishesHandler" :id="`${fish._id}`" :selectedFishes="selectedFishes" :name="fish.name" :isPreserve="fish.isPreserve" :newFish="fish.hasOwnProperty('newFish')" :path="path" />
            </div>
        </div>
        <div v-else>
            {{ application.options.content }}
        </div>
    </div>
</template>

<script>
import Fish from '@/components/Fish.vue'

export default {
    name: 'Fishes',
    components: {
        Fish
    },
    props: [
        "fishes",
        "selectedFishes",
        "path"
    ],
    data(){
        return {
            pathFishes: 'SSD 1/'
        }
    },
    emits: [
        'updateSelectedFishes',
        "clearContextMenu",
        "createTackle",
        "changePath"
    ],
    methods: {
        disableEdittedFishHandler(){
            console.log(`отменяем редактирование`)
            delete this.fishes[this.fishes.length - 1].newFish
        },
        changePathHandler(newPath){
            // this.fishes = this.fishes.filter(fish => fish.path.includes(this.currentPath))
            // console.log(`this.currentPath: ${this.currentPath}, this.fishes.length: ${this.fishes.length}`)
            this.pathFishes = newPath
            this.$emit("changePath", newPath)
        },
        createTackleHandler(fishId){
            this.$emit('createTackle', fishId)
        },
        clearContextMenuHandler(){
            this.$emit("clearContextMenu")
        },
        updateSelectedFishesHandler(isSelected, tackleId, event){
            this.$emit('updateSelectedFishes')
        }
    }
}
</script>