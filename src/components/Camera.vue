<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-progress-circular v-if="loading" indeterminate color="white" size="x-large"></v-progress-circular>
    <QrStream :camera="camera" @decode="handleQR" @init="handleInit"/>
    <div class="d-flex mt-2">
      <v-btn class="align-self-center" @click="handleCancel">Cancel</v-btn>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {QrStream} from 'vue3-qr-reader'


export default {
  name: "Camera",
  components:{
    QrStream
  },
  setup(props,{emit}){
    const loading=ref(true)
    const camera=ref('auto')
    const error=ref('')


    async function handleInit(promise){
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          error.value = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          error.value = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          error.value = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          error.value = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          error.value = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          error.value = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          error.value = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          error.value = `ERROR: Camera error (${error.name})`;
        }
      }
      loading.value=false
    }

    function handleCancel(){
      emit('cancelClicked')
    }

    function handleQR(res){
      camera.value='off'
      emit('gotQR',res)
    }

    return{
      loading,
      camera,
      error,
      handleCancel,
      handleQR,
      handleInit,
    }
  }
}
</script>

<style scoped>

</style>
