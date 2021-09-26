<template>
  <div class="terminal">
    <p>{{ 'Боб' }}@idOsHost ~ {{ "SSD 1" }}</p>
    <div class="terminalPrompt">
        <p>$</p>
        <input type="text" style="align-self: center; color: rgb(255, 255, 255); background-color: transparent; border-width: 0px; height: 15px; font-size: 12px;" class="form-control">
    </div>
  </div>
</template>

<script>
export default {
    name: 'Terminal',
    // props: [
    //   "application"
    // ]
    props: {
      application: {
        type: Object,
        required: false,
        default: {
          title: "Terminal",
          options: {
            width: 375,
            height: 200,
          }
        }
      }
    }
}
</script>