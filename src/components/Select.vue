<template>
  <div class="d-flex align-baseline">
    <label v-if="label" class="mr-4">{{ label }}</label>
    <select
        :disabled="disabled"
        class="text-center"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" class="text-center">{{ selectedDefault }}</option>
      <option
          class="text-center"
          v-for="(option,i) in options"
          :value="option._id||option"
          :key="option._id||i"
          :selected="option._id === modelValue||option===modelValue"
          style="color: black"
      >{{ option.name||option }}</option>
    </select>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name:'select',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: Array,
    selectedDefault:String,
  },

  setup(props){
    const disabled=ref(false)
    disabled.value=props.options.length===0

    return{disabled}
  }
}
</script>

<style scoped>
p{
  text-align: start;
  color: red;
  font-size: 80%;
}

label{
  width: 25%;
}

select{
  background: transparent;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 3px;
  /*background: lightgrey;*/
  width: 100%;
  height: 5vh;
  padding:5px;
}
</style>
