<template>
    <input @blur="createFishWithNewName($event)" :value="name" :readonly="!newFish ? true : false" @dblclick="openPreserve()" @click="selectFish($event)" style="text-align: center; width: 35px; height: 15px; margin-top: 55px;" @contextmenu.prevent="drawContextMenu($event, 'contextMenu')" >
</template>

<script>
export default {
    name: 'Fish',
    data(){
        return {
            fishName: '',
            contextMenu: null,
            isSelected: false
        }
    },
    emits: [
        'createFish',
        'createTackle',
        'updateSelectedFishes',
        "clearContextMenu",
        "changePath",
        "disableEdittedFish"
    ],
    props: [
        "id",
        "name",
        "isPreserve",
        "selectedFishes",
        "newFish",
        "path"
    ],
    mounted(){
        document.body.addEventListener("keyup", (e) => {
            if(e.code.includes("Enter") && this.isSelected && this.isPreserve){
                console.log(`открваем пресерв: ${this.path}${this.name}/`)
                // this.$emit("changePath", this.title)
                this.$emit("changePath", `${this.path}${this.name}/`)
            }
        })
    },
    methods: {
        createFishWithNewName(event){
            let newFishName = event.target.value
            console.log(`добавлен фиш ${newFishName}`)
            fetch(`http://localhost:4000/fishes/create/?fishname=${newFishName}&fishpath=${this.path}${this.name}/&preserve=false`, {
                mode: 'cors',
                method: 'GET'
            }).then(response => response.body).then(rb  => {
                const reader = rb.getReader()
                return new ReadableStream({
                    start(controller) {
                    function push() {
                        reader.read().then( ({done, value}) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        push();
                        })
                    }
                    push();
                    }
                });
                }).then(stream => {
                return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
                })
                .then(result => {
                if(JSON.parse(result).status.includes("OK")){
                    // event.target.disabled = true
                    // event.target.disabled = true
                    console.log("добавлен фиш")
                    this.$emit("disableEdittedFish")
                }
            })
        },
        openPreserve(){
            console.log(`открваем пресерв`)
            this.$emit("changePath", this.title)
        },
        selectFish(event){
            if(event.ctrlKey){
                this.isSelected = !this.isSelected
            } else if(!event.ctrlKey){
                this.isSelected = true
            }
            this.$emit("updateSelectedFishes", this.isSelected, this.id, event)
            
            if(this.isSelected){
                event.target.style = `
                    background-color: rgb(215, 215, 215);
                `
            } else if(!this.isSelected){
                event.target.style = `
                    background-color: transparent;
                `
            }
            
        },
        drawContextMenu(event, typeEvent){
            this.$emit("clearContextMenu")
            if(this.contextMenu === null && typeEvent.includes("contextMenu")){
                this.contextMenu = document.createElement("div")
                this.contextMenu.classList.add("scapula")
                this.contextMenu.style = `
                    top: ${event.y}px;
                    left: ${event.x}px;
                `
                document.body.appendChild(this.contextMenu)
                let createBtn = document.createElement("p")
                createBtn.style.cursor = "pointer"
                createBtn.addEventListener("click", (event) => {
                    fetch(`http://localhost:4000/tackles/create/?fishid=${this.id}`, {
                        mode: 'cors',
                        method: 'GET'
                    }).then(response => response.body).then(rb  => {
                        const reader = rb.getReader()
                        return new ReadableStream({
                            start(controller) {
                            function push() {
                                reader.read().then( ({done, value}) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                controller.enqueue(value);
                                push();
                                })
                            }
                            push();
                            }
                        });
                    }).then(stream => {
                        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
                    })
                    .then(result => {
                        console.log(JSON.parse(result))
                        if(JSON.parse(result).status.includes("OK")){
                            console.log(`Создать тэкл`)
                            this.$emit("createTackle", this.id)
                        }
                    });
                })
                createBtn.textContent = "Создать тэкл"
                this.contextMenu.appendChild(createBtn)
                
                let hrLine = document.createElement("hr")
                this.contextMenu.appendChild(hrLine)
                let viewBtn = document.createElement("p")
                viewBtn.textContent = "Вид"
                this.contextMenu.appendChild(viewBtn)
                hrLine = document.createElement("hr")
                this.contextMenu.appendChild(hrLine)
            } else if(this.contextMenu !== null){
                this.contextMenu.remove()
                this.contextMenu = null
                
                if(typeEvent.includes("contextMenu")){
                this.drawContextMenu(event, "contextMenu")
                }

            }

            if(typeEvent.includes("click")){
                this.selectedFishes = []
            }
        },
        createFish(fishName){
            this.$emit("createFish", fishName)
        }
    }
}
</script>