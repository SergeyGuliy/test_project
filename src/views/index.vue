<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <router-link to="/users">List of users</router-link>
    <router-link :to="{ name: 'Users', query: {page: 1}}">List of users (page 1)</router-link>
    <router-link :to="{ name: 'Users', query: {page: 2}}">List of users (page 2)</router-link>


  </div>
</template>

<script>
  export default {
    name: "index",
    data: () => ({
      items: [
        {
          text: 'Home Page',
          disabled: false,
          to: '/',
        },
      ],
    }),
  }
</script>

<style scoped lang='sass'></style>
