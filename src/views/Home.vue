<template>
  <div class="pa-10 d-flex flex-column align-center" style="height: 100%">
    <div class="d-flex justify-end align-self-end" style="width: 15%">
      <v-btn class="btn-global" color="green">login/sign up</v-btn>
    </div>
    <span class="title">Welcome!</span>
    <div style="width: 25%;height: 100%" class="mt-16 d-flex flex-column justify-end">
      <v-btn class="btn btn-global" to="/devices/register">Register Camera</v-btn>
      <v-btn class="btn btn-global" to="/gallery/options">Shared Gallery</v-btn>
      <v-btn class="btn btn-global">Identify cam</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeScreen"
}
</script>

<style scoped>
.btn{
  width: 80%;
  margin-bottom: 20px;
}
.title{
  font-size: 2.5rem;
  font-family: Century;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
