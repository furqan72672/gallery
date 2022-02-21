<template>
  <div>
    <Image :actions="true" :date="true" dataURL="images/by-user-id/620b48272e81c7e598577487" ImagesURL="http://192.168.100.212:3000/uploads/"/>
  </div>
</template>

<script>
import Image from '../components/Image.vue';

export default {
  name: 'Home',
  data(){
    return {
     
    }
  },
  components: {
    Image,
  },
};
</script>
