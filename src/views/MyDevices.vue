<template>
  <div class="d-flex flex-column justify-center align-center" style="height: 100%; width: 100%" >
    <span class="title">My Devices</span>
    <div class="mb-10 d-flex flex-wrap align-center justify-center">
      <v-btn border class="mr-1 btn-global">Manage Devices</v-btn>
      <v-btn border class="ml-1 btn-global" to="/devices/register">Link New Device</v-btn>
    </div>
    <div class="mt-10" v-for="(device,i) in devices" :key="i">
      <Devices :device="device"/>
    </div>
  </div>
</template>

<script>
import Devices from "../components/Devices";
import {ref} from "vue";
import {DeviceService} from "../services/deviceService";
export default {
  name: "MyDevices",
  components: {Devices},
  async setup(){
    const devices=ref([])
    const service=new DeviceService()

    devices.value=await service.getAll("620b48272e81c7e598577487")

    return{
      devices
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
