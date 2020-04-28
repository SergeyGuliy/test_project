<template>
  <v-card class="User">
    <div v-if="pageIsLoaded">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-card class="mx-auto" max-width="600">
        <v-img class="white--text align-end" :src="user.avatar">
          <v-card-title>{{ user.first_name }} {{ user.last_name }}</v-card-title>
        </v-img>

        <v-card-actions>
          <v-btn link :href="email" block>{{user.email}}</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-alert type="error" v-if="isError">
      Can't fetch user data.
    </v-alert>
  </v-card>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        user: null,
        allUsers: [],
        isError: false,
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
            to: '/users/?page=1',
          },
          {
            text: 'User',
            disabled: true,
            to: '/',
          },
        ],
      }
    },
    computed: {
      email(){
        return `mailto:${this.user.email}`
      }
    },
    async mounted() {
      try {
        const users1 = (await this.$axios.get(`https://reqres.in/api/users?page=1`)).data.data;
        const users2 = (await this.$axios.get(`https://reqres.in/api/users?page=2`)).data.data;
        this.allUsers.push(...users1)
        this.allUsers.push(...users2)
        this.user = this.allUsers.find(user => user.id == this.$route.params.id)
        this.pageIsLoaded =true
      } catch (e) {
        this.isError = true
      }
    }
  }
</script>

<style scoped lang='sass'>
.User
  width: 80%
  margin: 15px auto
  padding: 10px
  height: calc(100% - 30px)
  .v-card.mx-auto
    margin-top: 50px
    .v-card__actions
      padding: 0

</style>
