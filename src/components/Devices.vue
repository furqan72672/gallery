<template>
  <v-card width="50vw" tile border class="d-flex align-self-center align-content-center align-center px-16 py-5">
    <div>
      <img :src="src" style="width: 75px;height: 100px"/>
    </div>
    <div>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle>{{ type }}</v-card-subtitle>
    </div>
    <v-spacer></v-spacer>
    <div>
      <v-btn size="small">Settings</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Devices",
  props:{
    name:String,
    type:String,
    src:String,
  }
}
</script>

<style scoped>

</style>
