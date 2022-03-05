<template>
  <div class="ma-5 pa-5 bg-transparent" v-for="obj in objArr" :key="obj">
    <h3>{{obj.date}}</h3>
    <ImageListForDates :images="obj.images" :original="images"/>

  </div>
</template>

<script>
import {ref} from "vue";
import TextField from "./TextField";
import ImageListForDates from "./ImageListForDates";


export default {
  name: "ImagesWithDates",
  components: {ImageListForDates, TextField},
  props:{
    images:Array
  },
  setup(props){
    const objArr=ref([])
    let checkDate = ''
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let index=-1
    props.images.forEach(element => {
      let date = new Date(element.createdAt)
      let imageDate = monthNames[date.getMonth()]+". " + date.getDate() + ", " + date.getFullYear()
      if (checkDate != imageDate) {
        let object = new Object
        object.date=imageDate
        object.images=[]
        object.images.push(element)
        checkDate = imageDate
        objArr.value.push(object)
        index++
        return
      }
      objArr.value[index].images.push(element)
    });

    return{
      objArr,
    }
  }
}
</script>

<style scoped>
img{
  width: 100%;
  cursor: pointer;
}
</style>
