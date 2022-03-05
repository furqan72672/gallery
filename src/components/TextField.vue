<template>
  <div>
    <label v-if="showLabel" :class="{errorLabel:(error.length>0)}">{{label}}</label>
    <input :readonly="readOnly" :type="type" :value="modelValue" :placeholder="placeholder" @input="$emit('update:modelValue',$event.target.value)" :class="{error:(error.length>0)}"/>
    <p v-if="error.length>0">{{error}}</p>
  </div>
</template>

<script>


export default {
  name: "TextField",
  props:{
    type:String,
    label:String,
    error:{
      type:String,
      default:''
    },
    modelValue:{
      type:[String,Number],
      default:''
    },
    showLabel:{
      type:Boolean,
      default:true
    },
    readOnly:{
      type:Boolean,
      default:false
    },
    placeholder:{
      type:String,
      default:''
    }
  },
}
</script>

<style scoped>
p{
  text-align: start;
  color: red;
  font-size: 80%;
}

input{
  box-sizing: border-box;
  border: 1px solid black;
  /*border-radius: 5px;*/
  background: white;
  width: 100%;
  height: 100%;
  /*height: 5vh;*/
  padding:5px;
}

.error{
  border: 1px solid red;
}

.errorLabel{
  color: darkred;
}

</style>
