<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-card class="user_info" v-if="pageIsLoaded">
      <p>User {{ user.id }}</p>
        <v-img
                class="white--text align-end"
                height="400px"
                :src="user.avatar"
        >
          <v-card-title>{{ user.first_name }} {{ user.last_name }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">User id in base {{user.id}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ user.email }}</div>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        user: null,
        allUsers: [],
        users1: null,
        users2: null,
        pageIsLoaded: false,
        items: [
          {
            text: 'Home Page',
            disabled: false,
            to: '/',
          },
          {
            text: 'Users List',
            disabled: false,
            href: "/users",
          },
          {
            text: 'User',
            disabled: true,
            to: '/',
          },
        ],
      }
    },
    async mounted() {
      const users1 = (await this.$axios.get(`https://reqres.in/api/users?page=${this.page}`)).data.data;
      const users2 = (await this.$axios.get(`https://reqres.in/api/users?page=${this.page}`)).data.data;
      this.allUsers.push(...users1)
      this.allUsers.push(...users2)
      this.user = this.allUsers.find(user => user.id == this.$route.params.id)
      this.pageIsLoaded =true
      console.log(this.user)

    }
  }
</script>

<style scoped lang='sass'>
.user_info
  width: 80%
  margin: 0 auto
</style>
