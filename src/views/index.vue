<template>
  <v-card class="HomePage">
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>    <router-link to="/users">List of users</router-link>
    <br>
    <router-link :to="{ name: 'Users', query: {page: 1}}">List of users (page 1)</router-link>
    <br>
    <router-link :to="{ name: 'Users', query: {page: 2}}">List of users (page 2)</router-link>
    <br>
    <router-link :to="{ name: 'Users', query: {page: 3}}">List of users (page 3)</router-link>
    <br>
    <router-link :to="{ name: 'Users', query: {page: 4}}">List of users (page 4)</router-link>
    <br>
    <router-link :to="{ name: 'Users', query: {page: 5}}">List of users (page 5)</router-link>
    <br>
  </v-card>
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

<style scoped lang='sass'>
.HomePage
  width: 80%
  margin: 15px auto
  padding: 10px
  height: calc(100% - 30px)
</style>
