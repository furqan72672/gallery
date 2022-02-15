<template>
  <v-btn tile="tile" elevation="0" :class="[selected?'selected-btn':'btn']" @click="$emit('click')">{{text}}</v-btn>
</template>

<script>
export default {
  name: "TabButton",
  props:{
    text:String,
    selected:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
.btn{
  text-decoration: none;
  font-size: 95%;
  font-weight: normal;
  text-transform: capitalize;
  background: white;
  box-sizing: border-box;
}
.selected-btn{
  text-decoration: none;
  font-size: 95%;
  font-weight: normal;
  text-transform: capitalize;
  background: #e0e0e0;
}
</style>
