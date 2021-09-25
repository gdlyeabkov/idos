<template>
  <div>
    
    <div class="beach">
      
      <Tackles :tackles="tackles" />
      
    </div>
    
    <Tide :pebbles="pebbles" />

    <!-- <Sandbox :content="'Эта папка пуста'" :title="'Slope'" :navigation="true" /> -->

    <!-- <Sandbox :content="'Эта папка пуста'" :title="'Nexus'" :navigation="false" /> -->

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
    updateSelectedTacklesHandler(){
      console.log(`обновляю`)
    }
  },
  components: {
    Tide,
    Sandbox,
    Tackles,
    
  },
}
</script>