<template>
  <div>
    
    <div class="beach" @click="drawContextMenu($event, 'click')" @contextmenu.prevent="drawContextMenu($event, 'contextMenu')">
      
      <Tackles :tackles="tackles" @updateSelectedTackles="updateSelectedTacklesHandler" />
      
    </div>
    
    <Tide :pebbles="pebbles" />

    <!-- <Sandbox :application="{
      name: 'slope',
      options:{
        content: 'Эта папка пуста',
        navigation: true
      }
    }" /> -->

    <Sandbox :application="{
      name: 'Slope',
      options:{
        content: 'Эта папка пуста',
        navigation: true,
        width: 500,
        height: 500
      }
    }" />

    <Sandbox :application="{
      name: 'Terminal',
      options:{
        width: 375,
        height: 200
      }
    }" />

  </div>  
</template>

<script>
import Tide from '@/components/Tide.vue'
import Sandbox from '@/components/Sandbox.vue'
import Tackles from '@/components/Tackles.vue'

export default {
  name: 'Beach',
  data(){
    return {
      selectedTackles: [],
      contextMenu: null,
      tackles: [
        {
          id: 1,
          title: "Internet Explorer"
        },
        {
          id: 2,
          title: "MS Word"
        },
        {
          id: 3,
          title: "MS XL"
        },
        {
          id: 4,
          title: "MS Access"
        },
        {
          id: 5,
          title: "MS PowerPoint"
        },
        {
          id: 6,
          title: "MS SQl Server"
        },
        {
          id: 7,
          title: "Micro Soft Publisher"
        },
        {
          id: 8,
          title: "mail client"
        },
        {
          id: 9,
          title: "Adobe Character"
        },
        {
          id: 10,
          title: "Adobe Lightroom"
        },
        {
          id: 11,
          title: "Adobe Illustrator"
        },
        {
          id: 12,
          title: "Adobe Acrobat Reader"
        },
        {
          id: 13,
          title: "Adobe Premiere Pro"
        },
        {
          id: 14,
          title: "Adobe Photoshop"
        },
        {
          id: 15,
          title: "Z Brush"
        },
        {
          id: 16,
          title: "Blender"
        },
        {
          id: 17,
          title: "Autodesk 3dsMax"
        },
        {
          id: 18,
          title: "Autodesk Maya"
        },
        {
          id: 19,
          title: "Mozzilla Firebug"
        },
        {
          id: 20,
          title: "Mozzilla Thunderbird"
        }
      ],
      pebbles: [
        {
          id: 1,
          title: "Blender"
        },
        {
          id: 2,
          title: "Autodesk 3dsMax"
        },
        {
          id: 3,
          title: "Autodesk Maya"
        },
        {
          id: 4,
          title: "Mozzilla Firebug"
        },
        {
          id: 5,
          title: "Mozzilla Thunderbird"
        }
      ]
    }  
  },
  methods: {
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
        console.log(`this.selectedTackles: ${this.selectedTackles}`)
      }

    },
    updateSelectedTacklesHandler(isSelected, tackleId, event){
      if(this.selectedTackles.length <= 0 || event.ctrlKey){
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
      }
    }
  },
  components: {
    Tide,
    Sandbox,
    Tackles,
    
  },
}
</script>