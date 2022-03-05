<template>
  <div class="ma-5 pa-5 bg-transparent">
    <v-row>
      <v-col v-for="(image, i) in images" :key="i" class="d-flex child-flex bg-transparent" md="2" sm="3" style="height: 150px;width: 120px">
        <img :src="`${baseUrl}/${image.name}`" class="bg-transparent" @click="openImage">
      </v-col>
    </v-row>
  </div>


  <v-row justify="center">
    <v-dialog id="dialog" v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">

      <v-card>
        <v-toolbar dark color="primary" class="d-flex top-bar">
          <v-btn icon dark @click="dialog = edit = false" class="bg-transparent elevation-0">
            <v-icon style="color: darkred" size="x-large">mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon class="bg-transparent elevation-0" v-if="!edit" type="button" @click="this.edit=true" size="small"><v-icon color="blue">mdi-pencil</v-icon></v-btn>
          <v-btn icon class="bg-transparent elevation-0" size="small"><v-icon color="red">mdi-delete</v-icon></v-btn>
          <v-btn icon @click="downloadFile" class="bg-transparent elevation-0" size="small"><v-icon color="green">mdi-cloud-download</v-icon></v-btn>
          <a id="a" :href="enlargedImageSrc" download="download.png" class="d-none"></a>
        </v-toolbar>

        <v-row class="mt-0">
          <v-col cols="9" class="d-flex image-div justify-center align-center py-10">
            <v-btn id="backward" v-if="showBackward" icon class="navigation-left" @click="handleBackward"><v-icon>mdi-chevron-left</v-icon></v-btn>

            <v-btn id="forward" v-if="showForward" icon class="navigation-right" @click="handleForward"><v-icon>mdi-chevron-right</v-icon></v-btn>
            <img class="large-image" :src="enlargedImage" alt="">
          </v-col>
          <v-col cols="3" class="side-bar d-flex justify-center">
            <form v-if="edit" class="mt-10" @submit.prevent="submitData">
              <TextField label="Caption" v-model="caption"/>
              <div class="d-flex justify-space-around mt-2">
                <v-btn type="submit" class="btn-global" size="small" color="green">Save</v-btn>
                <v-btn type="button" class="btn-global" size="small" @click="this.edit=false">Cancel</v-btn>
              </div>
            </form>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {ref} from "vue";
import TextField from "./TextField";

export default {
  name: "ImageListForDates",
  components: {TextField},
  props:{
    images:Array,
    original:Array,
    showForward:{
      type:Boolean,
      default:true
    },
    showBackward:{
      type:Boolean,
      default:true
    },
  },
  setup(props, {emit}){
    const dialog=ref(false)
    const edit=ref(false)
    const showForward=ref(props.showForward)
    const showBackward=ref(props.showBackward)
    const enlargedImage=ref('')
    const enlargedImageSrc=ref('')
    const baseUrl='http://10.20.20.108:4000/uploads'
    // const baseUrl='http://192.168.12.90:4000/uploads'
    const caption=ref('')
    const i=ref(0)


    function toDataURL(url) {
      return fetch(url).then((response) => {
        return response.blob();
      }).then(blob => {
        return URL.createObjectURL(blob);
      });
    }


    async function openImage(e){
      showForward.value=true
      showBackward.value=true
      dialog.value=true
      enlargedImage.value=e.target.currentSrc
      enlargedImageSrc.value=await toDataURL(enlargedImage.value)
      let obj=props.original.filter(n=>n.name===e.target.currentSrc.split('/')[e.target.currentSrc.split('/').length-1])[0]
      i.value=props.original.indexOf(obj)
      if(i.value===0){
        showBackward.value=false
      }
      if(i.value===props.original.length-1){
        showForward.value=false
      }
    }

    async function handleForward(){
      showBackward.value=true
      i.value++
      enlargedImage.value= `${baseUrl}/${props.original[i.value].name}`
      enlargedImageSrc.value=await toDataURL(enlargedImage.value)
      if(!props.original[i.value+1]){
        showForward.value=false
      }
    }
    async function handleBackward(){
      showForward.value=true
      i.value--
      enlargedImage.value= `${baseUrl}/${props.original[i.value].name}`
      enlargedImageSrc.value=await toDataURL(enlargedImage.value)
      if(!props.original[i.value-1]){
        showBackward.value=false
      }
    }

    function keyFunction(e){
      if(dialog.value){
        if(e.keyCode===37&&showBackward.value){
          document.getElementById('backward').click()
        }
        if(e.keyCode===39&&showForward.value){
          document.getElementById('forward').click()
        }
      }
    }
    window.addEventListener('keyup', keyFunction)

    function downloadFile() {
      document.getElementById('a').click()
    }


    return{
      dialog,
      enlargedImage,
      caption,
      baseUrl,
      showForward,
      showBackward,
      edit,
      enlargedImageSrc,
      openImage,
      handleBackward,
      handleForward,
      downloadFile
    }
  }
}
</script>

<style scoped>
img{
  width: 100%;
  cursor: pointer;
}
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
.large-image{
  width: 80%;
  max-height: 80vh;
}
.navigation-left{
  position:absolute;
  left: 30px;
}
.navigation-right{
  position:absolute;
  right: 30px;
}
.image-div{
  position: relative;
  background: #ECECEC;
  padding: 10px;
  min-height: 90vh;
}
.action-btn{
  margin-right: 10px;
}
.top-bar,.side-bar{
  background: #E1E1E1;
  padding: 10px;
}
form{
  width: 90%;
}
</style>
