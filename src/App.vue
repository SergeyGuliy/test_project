<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

      </div>
      <v-btn class="NavLink" to="/" outlined>Home</v-btn>
      <v-btn class="NavLink" to="/users" outlined>Users</v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style lang="sass">
.NavLink
  margin: 0 5px
  span
    font-size: 14px
    letter-spacing: 1px
    font-weight: 400
    width: 100%
</style>
