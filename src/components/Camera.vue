<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-card min-width="50vw" min-height="70vh" class="d-flex justify-center align-center bg-transparent elevation-0">
      <v-progress-circular v-if="stream===null" indeterminate color="white" size="x-large"></v-progress-circular>
      <video v-show="stream!==null" style="height: 100%;width: 100%"></video>
    </v-card>
    <div class="d-flex">
      <v-btn v-show="stream!==null" class="align-self-center mr-2" @click="handleSnap">Snap</v-btn>
      <v-btn v-show="stream!==null" class="align-self-center" @click="handleCancel">Cancel</v-btn>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Camera",
  setup(props,{emit}){
    const stream=ref(null)

    async function init(){
      if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
        stream.value=await navigator.mediaDevices.getUserMedia({video:true})
        let player=document.querySelector('video')
        player.srcObject=stream.value
        await player.play()
      }
    }
    init()

    function handleSnap(){
      emit('snapClicked')
      stream.value.getTracks().forEach(track=>{
        track.stop()
      })
    }

    function handleCancel(){
      stream.value.getTracks().forEach(track=>{
        track.stop()
      })
      emit('cancelClicked')
    }

    return{
      stream,
      handleSnap,
      handleCancel
    }
  }
}
</script>

<style scoped>

</style>
