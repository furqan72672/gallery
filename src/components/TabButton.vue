<template>
  <v-btn tile elevation="0" :class="[selected?'selected-btn':'btn']" @click="$emit('click')">{{text}}</v-btn>
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
  background: #e0e0e0;
  box-sizing: border-box;
}
.selected-btn{
  text-decoration: none;
  font-size: 95%;
  font-weight: normal;
  text-transform: capitalize;
  background: #eee;
  box-sizing: border-box;
  border-bottom: 3px solid darkorange;
  color: darkorange;
  font-weight: bold;
}
</style>
