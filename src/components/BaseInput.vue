.<template>
  <div>
    <v-text-field
      :label="label"
      @change="this.$emit('update:modelValue',$event.target.value)"
      hide-details="auto"
    ></v-text-field>
  </div>
</template>

<script>
export default {
    name: 'BaseInput',
    props:{
        label: {
            type: String,
            required: true
        },
        modelValue:{
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>