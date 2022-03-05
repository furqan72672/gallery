<template>
    <div class="d-flex align-center justify-start" v-bind="$attrs">
      <input :disabled="readOnly" :id="id" class="mr-2" type="radio" :checked="modelValue === value" :value="value" @change="$emit('update:modelValue', value)"/>
      <label v-if="label">{{label}}</label>
    </div>
</template>

<script>
export default {
  name: "RadioButton",
  props:{
    id:String,
    label:String,
    readOnly:{
      type:Boolean,
      default:false,
    },
    modelValue:{
      type:[String,Number],
      default:''
    },
    value:{
      type:[String,Number],
      default:''
    },
  }
}
</script>

<style scoped>
input[type='radio']:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

input[type='radio']:checked:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #ffa500;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
</style>
