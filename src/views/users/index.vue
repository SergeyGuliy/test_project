<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <v-row align="center">
      <v-col cols="6" >
        <v-select
                :items="counts"
                v-model="userCount"
                filled
                label="Users on page"
                outlined
         />
      </v-col>
      <v-col cols="6" >
        <v-text-field
                v-model="searchKey"
                :counter="10"
                label="First name"
                outlined

        />
      </v-col>
      <v-col cols="1" />

    </v-row>
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
        counts: [5,6,7,8,9,10],
        searchKey: null,
        userCount: 6,
        users: null,
        allUsers: [],
        loading: true,
        page: null,
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
      this.page = +(this.$route.query.page) || 1
      const users1 = (await this.$axios.get(`https://reqres.in/api/users?page=${this.page}`)).data.data;
      const users2 = (await this.$axios.get(`https://reqres.in/api/users?page=${this.page}`)).data.data;
      this.allUsers.push(...users1)
      this.allUsers.push(...users2)
      this.users = (await this.$axios.get(`https://reqres.in/api/users?page=${this.page}`)).data.data;
    },
    async updated() {
      this.users = (await this.$axios.get(`https://reqres.in/api/users?page=${this.page}`)).data.data;
    }
  }
</script>

<style scoped lang='sass'></style>
