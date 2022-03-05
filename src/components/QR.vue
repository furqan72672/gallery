<template>
  <div class="d-flex align-center justify-space-around pa-10" v-if="!showForm" style="height: 100%;width: 100%;">
    <div class="d-flex flex-column justify-center align-center">
      <v-btn icon class="bg-transparent" elevation="0" size="x-large" @click="handleOpenCamera"><v-icon size="xx-large" style="color:darkslategrey">mdi-webcam</v-icon></v-btn>
      <p>Open Camera</p>
    </div>
    <span>OR</span>
    <div class="d-flex flex-column justify-center align-center">
      <v-btn icon class="bg-transparent" elevation="0" size="x-large" @click="handleChooseFile"><v-icon size="x-large" style="color:darkslategrey">mdi-file-multiple</v-icon></v-btn>
      <p>Choose a file</p>
      <QrCapture id="reader" class="d-none" @decode="handleQR"/>
    </div>
  </div>



  <div v-else>
    <Manually :device="device" style="padding-bottom: 0 !important;"/>
    <div class="d-flex justify-center">
      <v-btn class="ma-2 btn-global" plain append-icon="mdi-reload" @click="handleRetry">Retry</v-btn>
    </div>
  </div>

  <v-dialog v-model="showModal" class="d-flex">
    <Camera @cancelClicked="cancelCamera" @gotQR="handleQR"/>
  </v-dialog>

  <v-dialog class="d-flex justify-center align-center" v-model="showLoading">
    <v-progress-circular indeterminate size="x-large" color="white"></v-progress-circular>
  </v-dialog>


</template>

<script>
import {ref} from "vue";
import Camera from "./Camera";
import {QrCapture} from 'vue3-qr-reader'
import {DeviceService} from "../services/deviceService";
import Manually from "./Manually";

export default {
  name: "QR",
  components: {Manually, Camera, QrCapture},
  setup(props,{emit}){
    const showModal=ref(false)
    const showForm=ref(false)
    const showLoading=ref(false)
    const device=ref({})
    const service=new DeviceService()


    function handleOpenCamera(){
      showModal.value=true
    }

    function cancelCamera(){
      showModal.value=false
    }

    async function handleQR(e){
      showModal.value=false
      showLoading.value=true
      device.value=await service.getByQR(e)
      showForm.value=true
      // console.log(device.value)
      showLoading.value=false
      emit('device',device.value)
    }

    function handleChooseFile(){
      document.getElementById('reader').click()
    }

    function handleRetry(){
      device.value={}
      showForm.value=false
    }


    return{
      showModal,
      device,
      showForm,
      showLoading,
      handleOpenCamera,
      cancelCamera,
      handleQR,
      handleChooseFile,
      handleRetry
    }
  }
}
</script>

<style scoped>

</style>
