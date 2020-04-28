<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <ol>
      <li v-for="user in users" :key="user.id">
        <router-link :to="{ name: 'User', params: {id: user.id}}">{{ user.first_name }}</router-link>
      </li>
    </ol>
    <v-pagination
            v-model="page"
            :length="2"
     />
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        users: null,
        loading: true,
        page: 1,
        items: [
          {
            text: 'Home Page',
            disabled: false,
            to: '/',
          },
          {
            text: 'Users List',
            disabled: false,
            to: '/users',
          },
        ],
      }
    },
    async mounted() {
      this.page = this.$route.query.page || 1
      this.users = (await this.$axios.get(`https://reqres.in/api/users?page=${this.page}`)).data.data;
      console.log(this.users)
    },
    async updated() {
      this.users = (await this.$axios.get(`https://reqres.in/api/users?page=${this.page}`)).data.data;
    }
  }
</script>

<style scoped lang='sass'></style>
