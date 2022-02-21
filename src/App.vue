<template>
  <Suspense>
    <template #default>
      <v-app>
        <v-main>
          <router-view/>
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

</style>
