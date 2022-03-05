<template>
  <div class="d-flex flex-column mx-10">
    <span class="title align-self-center">My Photos</span>
    <ImagesWithDates :images="images"/>
  </div>
</template>

<script>
import ImagesWithDates from "../components/ImagesWithDates";
import {ImageService} from "../services/ImageService";

export default {
  name: 'MyPhotos',
  components: {
    ImagesWithDates,
  },
  async setup(){
    const service=new ImageService()
    const images=await service.getAll()


    return{
      images
    }
  }
};
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
