<template>
  <v-card min-width="40vw" min-height="20vh" rounded class="d-flex align-self-center align-center pa-5 bg-grey-lighten-3">
    <div>
      <img :src="src" style="width: 85px;height: 75px"/>
    </div>
    <div>
      <v-card-title>{{ device.name }}</v-card-title>
      <v-card-subtitle>{{ device.device_type }}</v-card-subtitle>
    </div>
    <v-spacer></v-spacer>
    <v-btn class="btn-global" size="small" @click="showModal=true">Settings</v-btn>
  </v-card>

  <v-overlay v-model="showModal">
    <div class="d-flex justify-center align-center" style="width: 100vw;height: 100vh">
      <v-card class="pa-4 d-flex flex-column justify-space-around align-center bg-grey-lighten-3" rounded min-width="40vw" min-height="50vh">

        <v-card-title class="mb-4" style="font-size: 2rem">Settings</v-card-title>

        <div class="d-flex align-center justify-space-around mt-2" style="width: 100%">
          <div style="width: 23%" class="d-flex justify-end">
            <label >Device ID</label>
          </div>
          <div style="width: 70%">
            <TextField v-model="id" readonly/>
          </div>
        </div>

        <div class="d-flex align-center justify-space-around mt-2" style="width: 100%">
          <div style="width: 23%" class="d-flex justify-end">
            <label >Device Code</label>
          </div>
          <div style="width: 70%">
            <TextField v-model="code" readonly/>
          </div>
        </div>

        <div class="d-flex align-center justify-space-around mt-2" style="width: 100%">
          <div style="width: 23%" class="d-flex justify-end">
            <label >Device Name</label>
          </div>
          <div style="width: 70%">
            <TextField v-model="name" readonly/>
          </div>
        </div>

        <div class="d-flex align-center justify-space-around mt-2" style="width: 100%">
          <div style="width: 23%" class="d-flex justify-end">
            <label>Device Type</label>
          </div>
          <div style="width: 70%">
            <TextField v-model="type" readonly/>
          </div>
        </div>

        <div class="d-flex align-center justify-space-around mt-2" style="width: 100%">
          <div style="width: 23%" class="d-flex justify-end">
            <label>QR Code</label>
          </div>
          <div style="width: 70%">
            <TextField v-model="QR" readonly/>
          </div>
        </div>

        <div class="d-flex align-center justify-end mt-6" style="width: 100%">
          <v-btn class="btn-global" size="small" @click="showModal=false">Cancel</v-btn>
          <v-btn class="ml-2 btn-global" size="small" @click="showModal=false" disabled>Submit</v-btn>
        </div>

      </v-card>
    </div>
  </v-overlay>

</template>

<script>
import TextField from "./TextField";
import {ref} from "vue";
export default {
  name: "Devices",
  components: {TextField},
  props:{
    device:Object,
  },
  setup(props){
    const showModal=ref(false)
    const src=require('../assets/logo.png')
    const id=ref('')
    const code=ref('')
    const name=ref('')
    const type=ref('')
    const QR=ref('')

    id.value=props.device.device_id
    code.value=props.device.device_code
    name.value=props.device.name
    type.value=props.device.device_type
    QR.value=props.device.qr_code



    return{
      showModal,
      src,
      id,
      QR,
      code,
      type,
      name
    }
  }
}
</script>

<style scoped>

</style>
