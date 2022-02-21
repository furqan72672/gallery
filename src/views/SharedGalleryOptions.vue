<template>
  <div class="pa-10 d-flex flex-column align-center" style="height: 100%">
    <v-icon style="font-size: 3rem" class="mt-10">mdi-image-multiple</v-icon>
    <span style="font-size: 2.5rem">Shared Galleries</span>
    <div style="width: 25%;height: 100%" class="d-flex flex-column justify-end">
      <v-btn class="btn" to="/gallery/create">I have cams</v-btn>
      <v-btn class="btn" to="/gallery/join">Join / View existing shared gallery</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "SharedGalleryOptions"
}
</script>

<style scoped>
.btn{
  text-transform: capitalize;
  text-decoration: none;
  width: 100%;
  /*min-height: 10%;*/
  margin-bottom: 20px;
  text-align: center;
}
</style>
