<template>
  <div @click="drawContextMenu($event, 'click')" @contextmenu.prevent="drawContextMenu($event, 'contextMenu')" style="display: flex; justify-content: space-between;">
    <div v-if="application.options.navigation" style="width: 20%; height: 100%; display: flex; justify-content: center; flex-direction: column;">
        <div style="width: 100%;">
            SSD_1
            <div style="margin-left: 15px; display: flex; align-items: center; height: 50px; flex-direction: column;">
                <div style="width: 100%;">
                    idos
                </div>
                <div style="width: 100%;">
                    indigenes
                </div>
            </div>
        </div>
        <div style="width: 100%;">
            SSD_2
            <div style="margin-left: 15px; display: flex; align-items: center; height: 50px; flex-direction: column;">
                <div style="width: 100%;">
                idos
                </div>
                <div style="width: 100%;">
                indigenes
                </div>
            </div>
        </div>
        <div style="width: 100%;">
            HDD_1
        </div>
        <div style="margin-left: 15px; display: flex; align-items: center; height: 50px; flex-direction: column;">
            <div style="width: 100%;">
                idos
            </div>
                <div style="width: 100%;">
                    indigenes
                </div>
            </div>
        </div>
        <div v-if="application.options.navigation" style="overflow-y: scroll; width: 75%; height: 100%; display: flex; justify-content: center; position: relative; top: 0px; left: 0px; height: 450px; background-color: rgb(245, 245, 245);">
            <!-- {{ application.options.content }} -->
            <div v-if="fishes.length >= 1" style="width: 100%; height: 100%; text-align: center;">
                
                <div v-for="fish in fishes" style="background-size: 100% 100%; background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Internet_Explorer_10%2B11_logo.svg/1200px-Internet_Explorer_10%2B11_logo.svg.png'); width: 45px; height: 45px; float: left; margin: 15px; font-size: 10px;" :key="fish.name">
                    <p style="margin-top: 45px;">
                        {{ fish.name }}
                    </p>
                </div>
                
            </div>
            <div v-else>
                {{ application.options.content }}
            </div>
        </div>
        <div v-if="!application.options.navigation" style="width: 100%; height: 100%; display: flex; justify-content: center; position: relative; top: 0px; left: 0px; height: 450px; background-color: rgb(245, 245, 245);">
            {{ application.options.content }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Slope',
    data(){
        return {
            selectedFishes: [],
            contextMenu: null,
            fishes: [
                {
                    name: 'abc'
                },
                {
                    name: 'def'
                },
                {
                    name: 'ghj'
                },
                {
                    name: 'klm'
                },
                {
                    name: 'nop'
                },
                {
                    name: 'rst'
                },
                {
                    name: 'uvw'
                },
                {
                    name: 'xyz'
                }
            ]
        }
    },
    // props: [
    //     "application"
    // ],
    props: {
        application: {
            type: Object,
            required: false,
            default: {
                title: "Slope",
                options: {
                    navigation: true,
                    width: 500,
                    height: 500,
                }
            }
        }
    },
    mounted(){
        // запрос на получение fishes
    },
    emits: [
        "clearContextMenu"
    ],
    methods: {
        updateSelectedFishes(isSelected, fishId, event){
            if(event.ctrlKey){
                if(isSelected){
                    this.selectedFishes.push(fishId)
                    } else if(!isSelected){
                    this.selectedFishes = this.selectedFishes.filter((id) => {
                        if(fishId !== id){
                        return true
                        }
                        return false
                    })
                }
            } else if(!event.ctrlKey){
                this.selectedFishes = []
                if(isSelected){
                this.selectedFishes.push(fishId)
                }
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
                    console.log(`Создать пресерв`)
                    this.fishes.push({
                        name: Math.floor(Math.random() * 1000000)
                    })
                })
                createBtn.textContent = "Создать пресерв"
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
        }
    }
}
</script>