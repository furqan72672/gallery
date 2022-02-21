<template>
  <div class="pa-10 d-flex flex-column align-center bg-gradient" style="height: 100%">
    <v-icon style="font-size: 3rem" class="mt-10">mdi-lock</v-icon>
    <span style="font-size: 2.5rem">PRIVATE SHARED GALLERY</span>
    <p>This is a private shared gallery. You need a password to access this.</p>
    <div style="width: 50%;height: 100%" class="d-flex flex-column justify-center">
      <div class="d-flex justify-space-between align-center">
        <label>Enter Password:</label>
        <TextField style="width: 50%" type="password"/>
        <v-btn class="btn">Enter</v-btn>
      </div>
      <v-btn class="mt-8 align-self-center text-center" style="width: 45%" to="/gallery/join">Request access from admin</v-btn>
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
.btn{
  text-transform: capitalize;
  text-decoration: none;
  width: 20%;
  background: #e0e0e0;
  /*min-height: 10%;*/
  text-align: center;
  align-self: center;
}

.bg-gradient{
  background-image: linear-gradient(to bottom right, rgba(0,185,127,1) 0%, rgba(3,75,89,1) 100%);
}
</style>
