<template>
  <div class="tide">      
      <Pebbles :pebbles="pebbles"/>
      <div class="boat">
        <div class="equipment">EN</div>
        <span class="material-icons">
          arrow_drop_up
        </span>
        <div class="equipment">
          <span class="material-icons">
            flag
          </span>
        </div>
        <div style="equipment">
          <span class="material-icons">
            battery_full
          </span>
        </div>
        <div class="equipment">
          <span class="material-icons">
            signal_cellular_alt
          </span>
        </div>
        <div class="equipment">
          <span class="material-icons">
            volume_off
          </span>
        </div>
        <div class="notches">
          <p class="notch">
            19:44
          </p>
          <p class="notch">
            25.09.2021
          </p>
        </div>
      </div>
    </div>
</template>

<script>
import Pebbles from '@/components/Pebbles.vue'
export default {
    name: 'Tide',
    props: [
      'pebbles'
    ],
    components: {
      Pebbles
    }
}
</script>

<style>

</style>