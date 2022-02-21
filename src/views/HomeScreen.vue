<template>
  <div class="pa-10 d-flex flex-column align-center" style="background: #f5d9ff;height: 100%">
    <div class="d-flex justify-end align-self-end" style="width: 15%">
      <v-btn class="btn">login/sign up</v-btn>
    </div>
    <v-icon style="font-size: 3rem">mdi-home</v-icon>
    <span style="font-size: 2.5rem" class="mb-16">Welcome!</span>
    <div style="width: 25%;height: 100%" class="mt-16 d-flex flex-column justify-end">
      <v-btn class="btn" to="/devices/register">Register a cam</v-btn>
      <v-btn class="btn" to="/gallery/options">Find / Create shared gallery</v-btn>
      <v-btn class="btn">Identify cam</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeScreen"
}
</script>

<style scoped>
.btn{
  text-transform: capitalize;
  text-decoration: none;
  width: 100%;
  margin-bottom: 10px;
}
</style>
