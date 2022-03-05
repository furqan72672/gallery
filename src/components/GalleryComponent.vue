<template>
  <v-card width="40vw" min-height="20vh" rounded class="pa-5 bg-grey-lighten-3">
    <div class="d-flex align-center">
      <p>{{gallery.public!==true?'private':''}}</p>
      <v-spacer></v-spacer>
      <v-btn icon class="elevation-0 bg-transparent" size="small" @click="$router.push(`/gallery/manage/${gallery._id}`)"><v-icon size="small" color="green">mdi-pencil</v-icon></v-btn>
    </div>
    <div class="d-flex" @click="$router.push(`/gallery/${gallery._id}`)">
      <div class="d-flex flex-column align-start" style="width: 50%">
        <p class="title">{{gallery.event_name}}</p>
        <p class="sub-title">{{moment(gallery.date).format('MMMM DD, YYYY')}}</p>
      </div>
      <div class="d-flex flex-column align-end justify-center" style="width:50%">
        <p class="end-text">{{gallery.cams.length}} Cams</p>
        <p class="end-text">{{gallery.images.length}} Photos</p>
      </div>
    </div>
    <div class="d-flex align-center">
      <input class="mr-2" type="checkbox" v-model="gallery.my_photos" @click="handleChecked"/>
      <label>include in my photos</label>
    </div>
  </v-card>
</template>

<script>
import {ref} from "vue";
import moment from "moment";
import {GalleryService} from "../services/galleryService";

export default {
  name: "GalleryComponent",
  props:{
    gallery:Object
  },
  setup(props){
    const service=new GalleryService()
    moment()

    async function handleChecked(){
      const obj={
        my_photos:!props.gallery.my_photos
      }
      // console.log(obj)
      let res=await service.patch(props.gallery._id,obj)
      console.log(res)
    }


    return{
      moment,
      handleChecked
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 1.5rem;
  font-family: Century;
  font-weight: bold;
}
.sub-title{
  font-size: 1rem;
}
.end-text{
  font-size: 1.2rem;
}
input{
  height: 15px;
  width: 15px;
}

</style>
