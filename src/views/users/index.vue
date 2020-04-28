<template>
  <div>
    <p>HHHH</p>
    <ol>
      <li v-for="user in users" :key="user.id">
        <router-link :to="{ name: 'User', params: {id: user.id}}">{{ user.name }}</router-link>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return {
        users: null,
        loading: true
      }
    },
    async mounted() {
      this.users = (await this.$axios.get("https://jsonplaceholder.typicode.com/users")).data
      console.log(this.users)
    }
  }
</script>

<style scoped lang='sass'></style>
