<template>
  <div class="pa-10 d-flex flex-column align-center" style="height: 100%">
    <span class="title">Shared Galleries</span>
    <div style="width: 25%;height: 100%" class="d-flex flex-column justify-end">
      <v-btn class="btn btn-global" to="/gallery/join">Join Gallery</v-btn>
      <v-btn class="btn btn-global" to="/gallery/manage" color="green">Create Gallery</v-btn>
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
  width: 80%;
  margin-bottom: 20px;
  text-align: center;
}

.title{
  font-size: 2.5rem;
  font-family: Century;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
