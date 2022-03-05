<template>
  <div class="pa-10 d-flex flex-column align-center" style="height: 100%">
    <span class="title">My Galleries</span>
    <div class="d-flex justify-space-between mb-10" style="width: 40%">
      <v-btn class="btn-global" width="30%" to="/gallery/manage">Create Gallery</v-btn>
      <v-btn class="btn-global" width="30%">Invite</v-btn>
      <v-btn class="btn-global" width="30%" to="/gallery/join">Join Gallery</v-btn>
    </div>
    <div class="mt-4" v-for="(gallery,i) in galleries" :key="i">
      <GalleryComponent :gallery="gallery"/>
    </div>
  </div>
</template>

<script>
import GalleryComponent from "../components/GalleryComponent";
import {GalleryService} from "../services/galleryService";
import {ref} from "vue";
export default {
  name: "SharedGalleryList",
  components: {GalleryComponent},
  async setup(){
    const galleries=ref([])
    const service=new GalleryService()
    galleries.value=await service.getAll()

    return{
      galleries
    }
  }
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

.title{
  font-size: 2.5rem;
  font-family: Century;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
