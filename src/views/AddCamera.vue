<template>
  <div class="d-flex flex-column justify-center align-center">
    <div class="d-flex justify-center align-center align-content-center" style="height: 100vh">
      <v-card class="d-flex flex-column align-center" width="45vw" height="60vh" elevation="0">
        <span class="title mb-10">Register Camera</span>
        <div class="d-flex justify-center align-center align-self-start" style="width: 100%">
          <span class="mr-4" style="font-size: 17px;font-weight: bold">Register Device:</span>
          <TabButton text="Manually" :selected="manually" @click="handleClickManual"/>
          <TabButton text="QR Code" :selected="qr" @click="handleClickQR"/>
        </div>
        <v-card class="bg-grey-lighten-2" height="100%" width="100%" elevation="0">
          <Manually v-if="manually"/>

          <QR v-if="qr"/>
        </v-card>
        <v-btn class="align-self-end mt-2" elevation="10" border color="#e0e0e0">Add Camera</v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
import TabButton from "../components/TabButton";
import {ref} from "vue";
import TextField from "../components/TextField";
import Manually from "../components/Manually";
import QR from "../components/QR";

export default {
  name: 'AddCamera',
  components: { QR, Manually, TextField, TabButton},
  setup(){
    const manually=ref(true)
    const qr=ref(false)


    function handleClickManual(){
      manually.value=true
      qr.value=false
    }

    function handleClickQR(){
      manually.value=false
      qr.value=true
    }


    return{
      manually,
      qr,
      handleClickQR,
      handleClickManual,
    }
  }
}
</script>

<style>
.title{
  font-size: 2.5rem;
}
</style>
