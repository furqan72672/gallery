<template>
  <div class="pa-10 d-flex flex-column align-center" style="height: 100%">
    <v-icon style="font-size: 3rem" class="mt-10">mdi-lock</v-icon>
    <span class="title">PRIVATE SHARED GALLERY</span>
    <p>This is a private shared gallery. You need a password to access this.</p>
    <div style="width: 50%;height: 100%" class="d-flex flex-column justify-center">
      <div class="d-flex justify-space-between align-center">
        <label>Enter Password:</label>
        <TextField style="width: 50%" type="password"/>
        <v-btn class="btn-global">Enter</v-btn>
      </div>
      <v-btn class="mt-8 align-self-center text-center btn-global" style="width: 45%" to="/gallery/join">Request access from admin</v-btn>
    </div>
  </div>
</template>

<script>
import TextField from "../components/TextField";

export default {
  name: "SharedGalleryCreate",
  components:{TextField}
}
</script>

<style scoped>
.title{
  font-size: 2.5rem;
  font-family: Century;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
