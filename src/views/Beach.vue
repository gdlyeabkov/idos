<template>
  <div>

    <div class="beach" @click="drawContextMenu($event, 'click')" @contextmenu.prevent="drawContextMenu($event, 'contextMenu')">
      
      <div style="background-color: rgb(235, 235, 235); width: 100%; height: 35px; display: flex; justify-content: space-around; ">
        <div @click="createSandboxHandler(1, 'Terminal', false)" style="cursor: pointer; width: 25px; height: 25px; background-color: transparent; background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Internet_Explorer_10%2B11_logo.svg/1200px-Internet_Explorer_10%2B11_logo.svg.png'); background-size: 100% 100%;"></div> 
        <div @click="createSandboxHandler(1, 'Slope', false)" style="cursor: pointer; width: 25px; height: 25px; background-color: transparent; background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Internet_Explorer_10%2B11_logo.svg/1200px-Internet_Explorer_10%2B11_logo.svg.png'); background-size: 100% 100%;"></div> 
      </div>

      <Tackles :fishes="fishes" :selectedTackles="selectedTackles" :tackles="tackles" @createSandbox="createSandboxHandler" @updateSelectedTackles="updateSelectedTacklesHandler" />
      
    </div>
    
    <Tide :pebbles="pebbles" />

    <!-- <Sandbox :application="{
      name: 'slope',
      options:{
        content: 'Эта папка пуста',
        navigation: true
      }
    }" /> -->

    <!-- <Sandbox :application="{
      name: 'Slope',
      options:{
        content: 'Эта папка пуста',
        navigation: true,
        width: 500,
        height: 500
      }
    }" /> -->

    <!-- <Sandbox :application="{
      name: 'Terminal',
      options:{
        width: 375,
        height: 200
      }
    }" /> -->

    <!-- <Sandbox v-for="sandbox in sandboxes" :key="sandbox.id"
    :application="
      title.includes('Terminal') ? {
        name: sandbox.title,
        options:{
          width: 375,
          height: 210
        }
      }
    :
      title.includes('Terminal') ? {
        name: sandbox.title,
        options:{
          width: 500,
          height: 500,
          navigation: true
        }
      }
    :
      {
        name: sandbox.title,
        options:{
          width: 500,
          height: 500,
          navigation: true
        }
      }
    " /> -->

    <Sandbox @createTackle="createTackleHandler" @clearContextMenu="clearContextMenuHandler" @closeSandbox="closeSandboxHandler" v-for="sandbox in sandboxes" :key="sandbox.id"
    :application="
      sandbox.title.includes('Terminal') ?
        {
          name: sandbox.title,
          options:{
            width: 375,
            height: 210,
            content: sandbox.forOpen ? sandbox.title : '',
            indigene: indigene.name
          }
        }
      : sandbox.title.includes('Slope') ?
        {
          name: sandbox.title,
          options:{
            width: 500,
            height: 500,
            navigation: true
          }
        }
      :
        {
          name: sandbox.title,
          options:{
            width: 500,
            height: 500,
            navigation: true
          }
        }
      " />

  </div>  
</template>

<script>
import Tide from '@/components/Tide.vue'
import Sandbox from '@/components/Sandbox.vue'
import Tackles from '@/components/Tackles.vue'

import * as jwt from 'jsonwebtoken'

export default {
  name: 'Beach',
  data(){
    return {
      indigene: '',
      sandboxes: [],
      selectedTackles: [],
      contextMenu: null,
      fishes: [],
      tackles: [
        {
          id: 1,
          title: "Terminal"
        },
        {
          id: 2,
          title: "Slope"
        }
      ],
      pebbles: [],
      token: window.localStorage.getItem("idostoken")
    }  
  },
  mounted(){
    jwt.verify(this.token, 'idossecret', (err, decoded) => {
      if (err) {
        this.$router.push({ name: "Startup" })
      } else {
        fetch(`http://localhost:4000/indigene/get/?indigenename=${decoded.indigene}`, {
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
            this.indigene = JSON.parse(result).indigene
            console.log(`this.indigene: ${this.indigene.name}`)
            this.tackles = JSON.parse(result).tackles
            this.fishes = JSON.parse(result).fishes
            console.log(`this.fishes: ${this.fishes}`)
          }
        });
      }
    })
  },
  methods: {
    createTackleHandler(fishId){
      console.log(`добавляю тэкл`)
      this.tackles.push({
        id: fishId,
        title: "terminal"
      })
    },
    clearContextMenuHandler(){
      if(this.contextMenu !== null){
        this.contextMenu.remove()
        this.contextMenu = null
      }
    },
    closeSandboxHandler(){
      this.sandboxes = this.sandboxes.filter((sandbox) => {
        if(1 !== sandbox.id){
          return true
        }
        return false
      })
      this.pebbles = this.pebbles.filter((pebble) => {
        if(1 !== pebble.id){
          return true
        }
        return false
      })
      console.log(`this.sandboxes: ${this.sandboxes.length}`)
    },
    createSandboxHandler(idOfSandboxAndTackle, title, forOpen){
      this.sandboxes.push({
        id: idOfSandboxAndTackle,
        title: title,
        forOpen: forOpen
      })
      this.pebbles.push({
        id: idOfSandboxAndTackle,
        title: title,
        forOpen: forOpen
      })
    },
    drawContextMenu(event, typeEvent){
      if(this.contextMenu === null && typeEvent.includes("contextMenu")){
        this.contextMenu = document.createElement("div")
        this.contextMenu.classList.add("scapula")
        this.contextMenu.style = `
          top: ${event.y}px;
          left: ${event.x}px;
        `
        document.body.appendChild(this.contextMenu)
        let createBtn = document.createElement("p")
        createBtn.textContent = "Создать"
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
        this.selectedTackles = []
        
      }

    },
    updateSelectedTacklesHandler(isSelected, tackleId, event){
      if(event.ctrlKey){
        if(isSelected){
          // event.target.style = `
          //     background-color: rgb(215, 215, 215);
          // `
            
          // event.target.style = `
          //     background-color: transparent;
          // `
            
          this.selectedTackles.push(tackleId)
        } else if(!isSelected){
          this.selectedTackles = this.selectedTackles.filter((id) => {
            if(tackleId !== id){
              return true
            }
            return false
          })
        }
      } else if(!event.ctrlKey){
        this.selectedTackles = []
        if(isSelected){
          this.selectedTackles.push(tackleId)
        }
        
      }
    }
  },
  components: {
    Tide,
    Sandbox,
    Tackles
    
  },
}
</script>