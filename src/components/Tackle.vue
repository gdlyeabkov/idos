<template>
    <div class="tackle" @click="selectTackle($event)" @mouseenter="tackleHover($event)" @mouseleave="tackleHover($event)">
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
            isSelected: false,
            hoverable: false,
        }
    },
    props: [
        "id",
        "title"
    ],
    methods: {
        tackleHover(event){
            this.hoverable = !this.hoverable
            if(this.hoverable && !this.isSelected){
                event.target.title = this.title
                event.target.style.backgroundColor = `rgba(215, 215, 215, 0.4)`
            } else if(!this.hoverable && !this.isSelected){
                event.target.style.backgroundColor = `transparent`
            }
        },
        selectTackle(event){
            this.isSelected = !this.isSelected
            console.log(`event.ctrlKey: ${event.ctrlKey}`)
            this.$emit("updateSelectedTackles", this.isSelected, this.id, event)
            
            if(this.isSelected){
                event.target.style = `
                    background-color: rgb(215, 215, 215);
                `
            } else if(!this.isSelected){
                event.target.style = `
                    background-color: transparent;
                `
            }
            
        }
    }
}
</script>