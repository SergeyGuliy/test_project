<template>
  <p>User {{ $route.params.id}}</p>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        user: null,
        loading: true
      }
    },
    async mounted() {
      this.user = (await this.$axios.get(`https://jsonplaceholder.typicode.com/users/${this.$route.params.id}`)).data
      console.log(this.user)
    }
  }
</script>

<style scoped lang='sass'></style>
