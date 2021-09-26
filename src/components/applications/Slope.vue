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
            <Fishes @changePath="changePathHandler" @createTackle="createTackleHandler" @clearContextMenu="clearContextMenuHandler" @updateSelectedFishes="updateSelectedFishes" :selectedFishes="selectedFishes" :fishes="fishes.filter(fish => fish.path.includes(currentPath))" />
        </div>
        <div v-if="!application.options.navigation" style="width: 100%; height: 100%; display: flex; justify-content: center; position: relative; top: 0px; left: 0px; height: 450px; background-color: rgb(245, 245, 245);">
            {{ application.options.content }}
        </div>
    </div>
</template>

<script>
import Fishes from '@/components/Fishes.vue'
export default {
    name: 'Slope',
    data(){
        return {
            currentPath: 'SSD 1/',
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
        fetch(`http://localhost:4000/fishes/get/`, {
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
            this.fishes = JSON.parse(result).fishes
          }
        });
        
    },
    components: {
        Fishes
    },
    emits: [
        "clearContextMenu",
        "createTackle"
    ],
    methods: {
        changePathHandler(newPath){
            this.currentPath += `${newPath}/`
            console.log(`this.currentPath: ${this.currentPath}`)
        },
        createTackleHandler(fishId){
            this.$emit("createTackle", fishId)
        },
        clearContextMenuHandler(){
            console.log(`чищу slope contextmenu`)
            setTimeout(() => {
                if(this.contextMenu !== null){
                    this.contextMenu.remove()
                    this.contextMenu = null
                }
            }, 200)
        },
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
                    let newFishName = `${Math.floor(Math.random() * 1000)}`
                    fetch(`http://localhost:4000/fishes/create/?fishname=${newFishName}&fishpath=${this.currentPath}&preserve=true`, {
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
                            this.fishes.push({
                                name: newFishName,
                                isPreserve: true
                            })
                        }
                    });
                })
                createBtn.textContent = "Создать пресерв"
                this.contextMenu.appendChild(createBtn)

                createBtn = document.createElement("p")
                createBtn.style.cursor = "pointer"
                createBtn.addEventListener("click", (event) => {
                    console.log(`Создать фиш`)
                    let newFishName = `${Math.floor(Math.random() * 1000)}`
                    fetch(`http://localhost:4000/fishes/create/?fishname=${newFishName}&fishpath=${'SSD 1/'}&preserve=false`, {
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
                            this.fishes.push({
                                name: newFishName,
                                isPreserve: false
                            })
                        }
                    });
                })
                createBtn.textContent = "Создать фиш"
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