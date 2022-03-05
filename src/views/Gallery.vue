<template>
  <div class="d-flex flex-column align-center mx-10" style="height: 100%">
    <span class="title">{{ gallery.event_name }}</span>
    <span style="width: 25%" class="d-flex justify-center mb-2">{{date}}</span>
    <div class="align-self-center mb-10">
      <TabButton text="All Images" :selected="allImages" @click="handleClickAllImages"/>
      <TabButton :text="`Browse Cams(${gallery.cams.length})`" :selected="browseCams" @click="handleClickBrowseCams"/>
      <TabButton text="My Cams" :selected="myCams" @click="handleClickMyCams"/>
    </div>

    <div v-if="allImages" style="width: 20%" class="d-flex justify-center align-center">
      <Select v-if="gallery.time_filter.length>0" label="Filters" :options="gallery.time_filter" selected-default="All" v-model="timeFilter" style="width: 100%"/>
      <span v-else>All Time</span>
    </div>
    <ImageList style="width: 80%" v-if="allImages" :images="gallery.images"></ImageList>

    <div v-if="browseCams&&gallery.cams.length>0" v-for="(cam,i) in gallery.cams" :key="i" class="mb-2" style="width: 50%">
      <Devices v-if="gallery.cams.length>0" :device="cam" style="width: 100%"/>
    </div>
    <span v-else-if="browseCams&&gallery.cams.length===0" style="font-size: 1.5rem">No cameras to show for this gallery</span>

    <div v-if="myCams">
      <h1>Cams</h1>
    </div>
  </div>
</template>

<script>
import {GalleryService} from "../services/galleryService";
import {useRoute} from "vue-router";
import ImageList from "../components/ImageList";
import {ref} from "vue";
import Select from "../components/Select";
import TabButton from '../components/TabButton'
import Devices from '../components/Devices'

export default {
  name:'Gallery',
  components: {Select, ImageList, TabButton, Devices},
  async setup(){
    const gallery=ref({})
    const timeFilter=ref('')
    const allImages=ref(true)
    const browseCams=ref(false)
    const myCams=ref(false)



    const service=new GalleryService()
    const route=useRoute()
    gallery.value=await service.get(route.params.id)

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    console.log(gallery.value)
    let date = new Date(gallery.value.date)
    date = monthNames[date.getMonth()]+". " + date.getDate() + ", " + date.getFullYear()


    function handleClickAllImages(){
      allImages.value=true
      browseCams.value=false
      myCams.value=false
    }
    function handleClickBrowseCams(){
      allImages.value=false
      browseCams.value=true
      myCams.value=false
    }
    function handleClickMyCams(){
      allImages.value=false
      browseCams.value=false
      myCams.value=true
    }

    return{
      gallery,
      date,
      timeFilter,
      allImages,
      browseCams,
      myCams,
      handleClickAllImages,
      handleClickBrowseCams,
      handleClickMyCams,
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
