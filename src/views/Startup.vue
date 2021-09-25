<template>
  <div style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; background-color: rgb(215, 215, 215); display: flex; flex-direction: row; justify-content: space-around;">
      <div style="width: 100%; height: 100%; display: flex; flex-direction: row; justify-content: space-around;">
        <div style="align-self: center; display: flex; flex-direction: column; width: 40%; align-items: center;">
          <div style="width: 175px; height: 175px; border-radius: 100%; border: 5px inset rgb(0, 255, 0); background-image: url('https://www.blickpunkt-lateinamerika.de/fileadmin/user_upload/Blickpunkt_Lateinamerika/2019-1/BRA_Indigene.jpg'); background-size: cover; background-color: rgb(0, 0, 215);">

          </div>
          <input type="text" style="margin: 5px;" class="form-control w-50" placeholder="Введите имя туземца" />
          <input type="text" style="margin: 5px;" class="form-control w-50" placeholder="Введите пароль..." />
          <button @click="login()" class="btn btn-primary w-25">Войти</button>
          <p>{{ errors }}</p>
        </div>
        <div style="align-self: center; height: 90%; background-color: rgb(175, 175, 175); width: 5px;"></div>
        <div style="align-self: center; display: flex; flex-direction: column; width: 40%; align-items: center;">
          <input type="text" style="margin: 5px;" class="form-control w-75" placeholder="Введите имя туземца" />
          <input type="text" style="margin: 5px;" class="form-control w-75" placeholder="Введите пароль..." />
          <button class="btn btn-primary w-50" style="">Зарегестрировать туземца</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Startup',
  data(){
    return {
      errors: ""
    }
  },
  methods: {
    login(){
      fetch(`https://showbellow.herokuapp.com/users/groups/partisipants/delete?groupnamegroupdescription=${groupDescription}&groupaccess=${groupAccess}&imageurl=${groupImageUrl}&touser=${user}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
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
        console.log(JSON.parse(result))
        if(JSON.parse(result).status.includes("OK")){
          this.$router.push({ name: "Beach" })
        } else {
          this.errors = "Такого туземца не существует!"
        }
      });
    }
  }
}
</script>

<style>

</style>