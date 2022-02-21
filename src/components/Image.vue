<template>
    <div class="ma-5 pa-5">
        <div v-for="(image, imageIndex) in images" :key="imageIndex">
            <h3 v-if="date" class="mt-8 mb-3">{{ image.date }}</h3>
            <v-row>
                <v-col
                v-for="(image, index) in image.preview"
                :key="index"
                class="d-flex child-flex "
                md="2"
                sm="3"
                >
                <img
                @click="openImage(index, imageIndex)"
                    :src="image"
                    :lazy-src="image"
                    class="grey lighten-2"
                >
                </v-col>
            </v-row>
        </div>
    </div>


  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >

      <v-card>
        <v-toolbar
        dark
        color="primary"
        class="d-flex top-bar"
        >
            <v-btn
                icon
                dark
                @click="dialog = edit = false, this.indexNumber = this.imageIndex = null"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="action-btn" icon><v-icon>mdi-delete</v-icon></v-btn>
            <v-btn @click="downloadFile" class="action-btn" icon><v-icon>mdi-cloud-download</v-icon></v-btn>
        </v-toolbar>
        <v-row class="mt-0">
            <v-col cols="9" class="d-flex image-div justify-center align-center py-10">
                <v-btn icon class="navigation-left" @click="prevImage(this.indexNumber-1, this.imageIndex)"><v-icon>mdi-chevron-left</v-icon></v-btn>
                
                <v-btn icon class="navigation-right" @click="nextImage(this.indexNumber+1, this.imageIndex)"><v-icon>mdi-chevron-right</v-icon></v-btn>
                <img class="large-image" :src="largeImage" alt="">
            </v-col>
            <v-col cols="3" class="side-bar d-flex justify-center">
                <form v-if="edit" class="mt-10" @submit.prevent="submitData">
                    <BaseInput label="Caption" v-model="form.text" />
                    <div class="d-flex justify-space-around">
                        <v-btn type="submit">Save</v-btn>
                        <v-btn type="button" @click="this.edit=false">Cancel</v-btn>
                    </div>
                </form>
                <v-btn v-if="!edit" type="button" @click="this.edit=true">Edit</v-btn>
            </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>


</template>

<script>
import BaseInput from '@/components/BaseInput'
import ImageService from '@/services/ImageService'

export default {
    name: 'Image',
    components:{
        BaseInput
    },
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        largeImage: '',
        indexNumber: null,
        imageIndex: null,
        edit:false,
        data: null,
        images: [],
        form: {
            text: ''
        }
      }
    },
    async beforeCreate(){
        let result = await ImageService.getData(this.dataURL)
        this.data = result.data
        let checkDate = ''
        let indexNumber = -1
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        // console.log(this.data)
        result.data.forEach(element => {
            let date = new Date(element.createdAt)
            let imageDate = monthNames[date.getMonth()]+". " + date.getDate() + ", " + date.getFullYear()
            if (checkDate != imageDate) {
                let object = new Object
                object.date=imageDate
                object.preview=[]
                object.preview.push(this.ImagesURL+element.name)
                this.images.push(object)
                checkDate = imageDate
                indexNumber++
            }
            else{
                this.images[indexNumber].preview.push(this.ImagesURL+element.name)
            }
        });
    },
    props:{
        dataURL:{
            type: String,
            required: true
        },
        ImagesURL:{
            type: String,
            required: true
        },
        actions: {
            type: String,
            default: false
        },
        date: {
            type: String,
            default: false
        }
    },
    methods:{
        
        openImage(index, imageIndex){
            if (this.actions) {
                if (index>=0 && index <= this.images[imageIndex].preview.length-1) {
                    this.indexNumber = index
                    this.imageIndex = imageIndex
                    this.dialog = true
                    this.largeImage = this.images[imageIndex].preview[index]
                    console.log('index',index)
                    console.log('image',imageIndex)
                }
                
                
                
            }
        },
        nextImage(index, imageIndex){
            // console.log('ghjk', index-1)
            if (imageIndex < this.images.length && index <= this.images[imageIndex].preview.length) {
                if (this.images[imageIndex].preview.length-1 === index-1) {
                    // console.log('hjk')
                    this.imageIndex++
                    this.indexNumber=0
                    imageIndex++
                    index=0
                    this.largeImage = this.images[imageIndex].preview[index]
                }
                else if(this.images[imageIndex].preview.length-1 === index){
                    this.largeImage = this.images[imageIndex].preview[index]
                    // console.log('hjk')
                    this.imageIndex++
                    this.indexNumber=0
                    imageIndex++
                    index=0
                }
                else{
                    this.indexNumber = index
                    this.imageIndex = imageIndex  
                    this.largeImage = this.images[imageIndex].preview[index]
                }
            }     
            // console.log('index',index)
            // console.log('image',imageIndex)
        },
        prevImage(index, imageIndex){
            // console.log('sdfghj')
            if ( index === -1 || index-1 === 0) {
                if (imageIndex-1 >= 0) {
                    this.imageIndex--
                    this.indexNumber=this.images[this.imageIndex].preview.length-1
                    imageIndex--
                    index=this.images[imageIndex].preview.length-1    
                    this.largeImage = this.images[imageIndex].preview[index]
                }
            }
            else{
                this.indexNumber = index
                this.imageIndex = imageIndex
                this.largeImage = this.images[imageIndex].preview[index]
            }            
            
            // console.log('index',index)
            // console.log('image',imageIndex)
        },
        submitData(){
            console.log(this.form.text)
        },
        async downloadFile(){
            // console.log(this.images[this.imageIndex].preview[this.indexNumber])
            const response = await ImageService.download(this.images[this.imageIndex].preview[this.indexNumber])
            const blob = new Blob([response.data], { type: "application/jpg" });
            const extension = blob.type.split('/').pop()
            // console.log(extension)
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = 'Image.'+ extension;
            link.click();
            URL.revokeObjectURL(link.href);
        }
    }
}
</script>

<style>
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