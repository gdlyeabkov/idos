<template>
    <div class="tackle" @click="selectTackle($event)" @mouseenter="showTitle($event)">
        <p class="tackleTitle">
            {{ title }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'Tackle',
    emits: [ "updateSelectedTackles" ],
    data(){
        return {
            isSelected: false
        }
    },
    props: [
        "id",
        "title"
    ],
    methods: {
        showTitle(event){
            event.target.title = this.title
        },
        selectTackle(event){
            this.isSelected = !this.isSelected
            this.$emit("updateSelectedTackles", this.isSelected, this.id)
            if(this.isSelected){
                event.target.style = `
                    background-color: rgb(215, 215, 215);
                `
            } else if(!this.isSelected){
                event.target.style = `
                    background-color: transparent;
                `
            }
            console.log(`выделяю tackle ${this.title}`)
        }
    }
}
</script>