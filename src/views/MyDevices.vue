<template>
  <div class="d-flex flex-column justify-center align-center my-10" style="height: 100%; width: 100%" >
    <span class="title mb-2">My Devices</span>
    <div class="mb-10 d-flex justify-space-between" style="width: 20vw">
      <v-btn border size="small">Manage Devices</v-btn>
      <v-btn border size="small">Link New Device</v-btn>
    </div>
    <div class="mt-4" v-for="i in 5" :key="i">
      <Devices :name="`Device # ${i}`" src="https://picsum.photos/200/300" type="Personal Cam"/>
    </div>
  </div>
</template>

<script>
import Devices from "../components/Devices";
export default {
  name: "MyDevices",
  components: {Devices}
}
</script>

<style>

</style>
