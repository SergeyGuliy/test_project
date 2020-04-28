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
            to: '',
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
      this.user = (await this.$axios.get(`https://jsonplaceholder.typicode.com/users/${this.$route.params.id}`)).data
      console.log(this.user)
    }
  }
</script>

<style scoped lang='sass'></style>
