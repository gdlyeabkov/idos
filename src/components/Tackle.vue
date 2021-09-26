<template>
    <div class="tackle" @click="selectTackle($event)" @mouseenter="tackleHover($event)" @mouseleave="tackleHover($event)">
        <p class="tackleTitle">
            {{
                fishes.filter(fish => fish._id === title)[0].name
            }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'Tackle',
    mounted(){
        document.body.addEventListener("keyup", (e) => {
            if(e.code.includes("Enter") && this.isSelected){
                this.$emit("createSandbox", this.id, this.fishes.filter(fish => fish._id === this.title)[0].ext.includes("exe") ? "Terminal" : "Slope", true)
            }
        })
    },
    emits: [
        "updateSelectedTackles",
        "createSandbox"
    ],
    data(){
        return {
            isSelected: false,
            hoverable: false,
        }
    },
    props: [
        "id",
        "title",
        "selectedTackles",
        "fishes",
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
            if(event.ctrlKey){
                this.isSelected = !this.isSelected
            } else if(!event.ctrlKey){
                this.isSelected = true
            }
            this.$emit("updateSelectedTackles", this.isSelected, this.id, event)
            
            if(this.isSelected && this.selectedTackles.length <= 0){
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