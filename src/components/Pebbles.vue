<template>
    <div class="pebbles">
        <div v-for="pebble in pebbles" :key="pebble.title">
            <Pebble :title="pebble.title"/>
        </div>
    </div>
</template>

<script>
import Pebble from '@/components/Pebble.vue'

export default {
    name: 'Pebbles',
    props: [
        'pebbles'
    ],
    components: {
        Pebble
    }
}
</script>

<style>

</style>