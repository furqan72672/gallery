<template>
  <div class="d-flex flex-column justify-center align-center" style="height: 100vh">
    <div class="d-flex flex-column justify-center align-center align-content-center" style="width: 100vh">
      <v-card class="d-flex flex-column align-center bg-transparent" width="45vw" height="60vh" elevation="0">
        <span class="title mb-10 ">Register Camera</span>
        <div class="d-flex align-self-start" style="width: 100%">
          <span class="justify-start" style="font-size: 22px">Register Device:</span>
          <v-spacer></v-spacer>
          <TabButton text="Manually" :selected="manually" @click="handleClickManual"/>
          <TabButton text="QR Code" :selected="qr" @click="handleClickQR"/>
        </div>
        <v-card rounded class="bg-grey-lighten-3" height="100%" width="100%" elevation="0">
          <Manually v-if="manually"/>
          <QR v-if="qr"/>
        </v-card>
      </v-card>
      <v-btn class="mt-2 btn-global align-self-end">Add Camera</v-btn>
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
  font-family: Century;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
