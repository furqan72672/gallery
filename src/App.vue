<template>
  <Suspense>
    <template #default>
      <v-app class="bg-gradient-global">
        <v-main>
          <router-view class="bg-transparent"/>
        </v-main>
      </v-app>
    </template>
    <template #fallback>
      <h1>Loading</h1>
    </template>
  </Suspense>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style>
.btn{
  color:lightblue;
}
</style>
