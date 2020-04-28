<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <p>User {{ $route.params.id}}</p>
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
        loading: true,
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

    }
  }
</script>

<style scoped lang='sass'></style>
