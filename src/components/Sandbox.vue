<template>
  <div ref="sandbox" class="sandbox" @click="cascadeSandbox()" @mousedown="isPressed = true" @mousemove.prevent="moveSandbox($event)" @mouseup="dropSandbox()">
    <div class="sandboxHeader">
        <div class="sandboxTitle">
            <p>{{ application.name }}</p>
        </div>
        <div class="sandboxHeaderBtns">
            <span class="material-icons">
                horizontal_rule
            </span>
            <span class="material-icons">
                crop_7_5
            </span>
            <span style="color: rgb(175, 0, 0);" class="material-icons">
                disabled_by_default
            </span>
        </div>
    </div>
    <Component :application="application" :is="application.name" />
</div>
</template>

<script>
import Slope from '@/components/applications/Slope.vue'
import Terminal from '@/components/applications/Terminal.vue'

export default {
    name: 'Sandbox',
    data(){
        return {
            isPressed: false
        }
    },
    props: [ 
        "application"
    ],
    mounted(){
        this.$refs.sandbox.style = `
            width: ${this.application.options.width}px;
            height: ${this.application.options.height}px;
        `
    },
    components: {
        Slope,
        Terminal
    },
    methods: {
        dropSandbox(event){
            this.isPressed = false

        },
        moveSandbox(event) {
            if(this.isPressed){
                this.$refs.sandbox.style = `
                    width: ${this.application.options.width}px;
                    height: ${this.application.options.height}px;
                    z-index: 255;
                    top: ${event.y - 15}px;
                    left: ${event.x - 15}px;
                `
            } else if(this.isPressed) {
                this.$refs.sandbox.style = `
                    position: relative;
                    top: ${event.y}px;
                    
                    left: ${event.x}px;
                `
            }
        },
        cascadeSandbox(event){
            this.isPressed = false
            this.$refs.sandbox.style = `
                width: ${this.application.options.width}px;
                height: ${this.application.options.height}px;
                z-index: 255;
                top: ${event.y}px;
                left: ${event.x}px;
            `
        }
    }
}
</script>

<style>

</style>