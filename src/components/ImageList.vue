<template>
  <div class="ma-5 pa-5 bg-transparent">
    <v-row justify="center">
      <v-col v-for="(image, i) in images" :key="i" class="d-flex child-flex bg-transparent" md="2" sm="3">
        <img :src="`${baseUrl}/${image.name}`" class="bg-transparent" @click="openImage(i)">
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
            <form v-if="edit" class="mt-10" @submit="submit">
              <TextField :error="errors.caption" label="Caption" v-model="caption"/>
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
import {useField,useForm} from "vee-validate";
import {required} from "../utils/validators";
import {ImageService} from "../services/ImageService";

export default {
  name: "ImageList",
  components: {TextField},
  props:{
    images:Array
  },
  setup(props){
    const dialog=ref(false)
    const edit=ref(false)
    const showForward=ref(true)
    const showBackward=ref(true)
    const enlargedImage=ref('')
    const enlargedImageSrc=ref('')
    const baseUrl='http://10.20.20.108:4000/uploads'
    // const caption=ref('')
    const openedIndex=ref(0)
    const service=new ImageService()

    const schema={
      caption:required
    }

    const{handleSubmit,errors}=useForm({validationSchema:schema})
    const{value:caption}=useField('caption')




    function toDataURL(url) {
      return fetch(url).then((response) => {
        return response.blob();
      }).then(blob => {
        return URL.createObjectURL(blob);
      });
    }

    async function openImage(i){
      caption.value=''
      showForward.value=true
      showBackward.value=true
      if(!props.images[i+1]){
        showForward.value=false
      }
      if(!props.images[i-1]){
        showBackward.value=false
      }
      dialog.value=true
      console.log(props.images[i])
      enlargedImage.value=`${baseUrl}/${props.images[i].name}`
      caption.value=props.images[i].caption?props.images[i].caption:''
      enlargedImageSrc.value=await toDataURL(enlargedImage.value)
      openedIndex.value=i
      caption.value=props.images[openedIndex.value].caption||''
      console.log(caption.value)
    }

    async function handleForward(){
      caption.value=''
      showBackward.value=true
      showForward.value=true
      if(props.images[openedIndex.value+1]){
        openedIndex.value++
        console.log("to",openedIndex.value)
        enlargedImage.value=`${baseUrl}/${props.images[openedIndex.value].name}`
        enlargedImageSrc.value=await toDataURL(enlargedImage.value)
        caption.value=props.images[openedIndex.value].caption||''
        console.log(caption.value)
      }
      if(!props.images[openedIndex.value+1]){
        showForward.value=false
      }
    }
    async function handleBackward(){
      caption.value=''
      showBackward.value=true
      showForward.value=true
      if(props.images[openedIndex.value-1]){
        openedIndex.value--
        console.log("to",openedIndex.value)
        enlargedImage.value=`${baseUrl}/${props.images[openedIndex.value].name}`
        enlargedImageSrc.value=await toDataURL(enlargedImage.value)
        caption.value=props.images[openedIndex.value].caption||''
        console.log(caption.value)
      }
      if(!props.images[openedIndex.value-1]){
        showBackward.value=false
      }
    }

    const submit=handleSubmit(async values => {
      //ssfd;jkldfjlsadj;lfj;ladjfasdhfkljahf;klasj;fkljas
      const{_id}=props.images.filter(n=>n.name===enlargedImage.value.split('/')[enlargedImage.value.split('/').length-1])[0]
      console.log(_id)
      let res=await service.caption(_id,{caption:caption.value})
      console.log(res)
      edit.value=false
    })

    async function downloadFile() {
      document.getElementById('a').click()
    }

    function keyFunction(e){
      if(dialog.value){
        if(e.keyCode===37&&showBackward.value){
          console.log("Left")
          document.getElementById('backward').click()
        }
        if(e.keyCode===39&&showForward.value){
          console.log("Right")
          document.getElementById('forward').click()
        }
      }
    }
    window.addEventListener('keyup', keyFunction)


    return{
      dialog,
      enlargedImage,
      caption,
      baseUrl,
      showForward,
      showBackward,
      edit,
      openImage,
      handleBackward,
      handleForward,
      downloadFile,
      enlargedImageSrc,
      submit,
      errors
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
