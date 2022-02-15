<template>
  <div class="d-flex align-center justify-center pa-10" style="height: 100%;width: 100%;">
    <div class="d-flex flex-column align-end mr-4">
      <label class="mt-4">Device ID</label>
      <label class="mt-4">Device Code</label>
    </div>
    <div style="width: 70%">
      <TextField class="mt-2"/>
      <TextField class="mt-2"/>
    </div>
  </div>
</template>

<script>
import TextField from "./TextField";
export default {
  name: "Manually",
  components: {TextField}
}
</script>

<style scoped>

</style>
