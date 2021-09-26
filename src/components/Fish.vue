<template>
    <p style="margin-top: 45px;" @click="selectFish($event)" @contextmenu.prevent="drawContextMenu($event, 'contextMenu')" >
        {{ this.name }}
    </p>
</template>

<script>
export default {
    name: 'Fish',
    data(){
        return {
            contextMenu: null,
            isSelected: false
        }
    },
    emits: [
        'createFish',
        'createTackle',
        'updateSelectedFishes',
        "clearContextMenu"
    ],
    props: [
        "id",
        "name",
        "isPreserve",
        "selectedFishes"
    ],
    methods: {
        selectFish(event){
            if(event.ctrlKey){
                this.isSelected = !this.isSelected
            } else if(!event.ctrlKey){
                this.isSelected = true
            }
            this.$emit("updateSelectedFishes", this.isSelected, this.id, event)
            
            if(this.isSelected && this.selectedFishes.length <= 0){
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
        createFish(){
            this.$emit("createFish")
        }
    }
}
</script>