<template>
  <div style="color: rgb(255, 255, 255); background-color: rgb(0, 0, 0); height: 100%;">
    <p>Боб@idOsHost ~</p>
    <div style="display: flex; height: 25px;">
        <p>$</p>
        <input type="text" class="form-control" style="color: rgb(255, 255, 255); background-color: transparent; border-width: 0px;">
    </div>
  </div>
</template>

<script>
export default {
    name: 'Terminal',
    props: [
        "application"
    ]
}
</script>