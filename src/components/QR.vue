<template>
  <div class="d-flex align-center justify-space-around pa-10" style="height: 100%;width: 100%;">
    <div class="d-flex flex-column justify-center align-center">
      <v-btn icon class="bg-transparent" elevation="0" size="x-large" @click="handleOpenCamera"><v-icon size="xx-large">mdi-webcam</v-icon></v-btn>
      <p>Open Camera</p>
    </div>
    <span>OR</span>
    <div class="d-flex flex-column justify-center align-center">
      <v-btn icon class="bg-transparent" elevation="0" size="x-large"><v-icon size="xx-large">mdi-file-multiple</v-icon></v-btn>
      <p>Choose a file</p>
    </div>
  </div>

  <v-dialog v-model="showModal" class="d-flex">
    <Camera @cancelClicked="cancelCamera" @snapClicked="$emit('snapClicked'),showModal=false"/>
  </v-dialog>
</template>

<script>
import {ref} from "vue";
import Camera from "./Camera";
import Snap from "./Snap";

export default {
  name: "QR",
  components: {Snap, Camera},
  setup(){
    const showModal=ref(false)


    function handleOpenCamera(){
      showModal.value=true
    }

    function cancelCamera(){
      showModal.value=false
    }

    return{
      showModal,
      handleOpenCamera,
      cancelCamera,
    }
  }
}
</script>

<style scoped>

</style>
