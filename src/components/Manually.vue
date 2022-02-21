<template>
  <div class="d-flex flex-column align-center justify-center pa-10" style="height: 100%;width: 100%;">
    <div class="d-flex align-center justify-space-around mb-2" style="width: 100%">
      <div style="width: 23%" class="d-flex justify-end">
        <label >Device ID</label>
      </div>
      <div style="width: 70%">
        <TextField v-model="id" :readonly="readOnly"/>
      </div>
    </div>
    <div class="d-flex align-center justify-space-around" style="width: 100%">
      <div style="width: 23%" class="d-flex justify-end">
        <label >Device Code</label>
      </div>
      <div style="width: 70%">
        <TextField v-model="code" :readonly="readOnly"/>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "./TextField";
import {ref} from "vue";
export default {
  name: "Manually",
  components: {TextField},
  props:{
    device:Object,
  },

  setup(props){
    const readOnly=ref(false)
    const id=ref('')
    const code=ref('')

    if(props.device){
      readOnly.value=true
      id.value=props.device.device_id
      code.value=props.device.device_code
    }

    return{
      readOnly,
      id,
      code
    }
  }
}
</script>

<style scoped>

</style>
