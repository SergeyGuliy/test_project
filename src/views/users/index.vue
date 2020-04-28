<template>
  <v-card class="Users">
    <div  v-if="pageIsLoaded">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-row align="center">
        <v-col cols="6" >
          <v-select
                  :items="counts"
                  v-model="pageSize"
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
      </v-row>
      <div class="table">
        <v-simple-table v-if="listFiltered.length > 0">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">First name</th>
              <th class="text-left">Last name</th>
              <th class="text-left">E-mail</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in listPaginated[pageCurrent - 1]" :key="user.id" @click='$router.push(`/users/${user.id}`)'>
              <td>{{ user.id }}</td>
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.email }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <Card v-else>Поиск не дал результата</Card>
        <v-pagination v-model="pageCurrent" :length="listPaginated.length" />
      </div>
    </div>
    <v-alert type="error" v-if="isError">
      Can't fetch users list.
    </v-alert>
  </v-card>
</template>

<script>
  import { chunk } from 'lodash'

  export default {
    name: "index",
    data(){
      return {
        counts: [5,6,7,8,9,10,11,12],
        isError: false,
        searchKey: null,
        pageSize: 6,
        allUsers: [],
        pageCurrent: null,
        pageIsLoaded: false,
        items: [
          {
            text: 'Home Page',
            disabled: false,
            to: '/',
          },
          {
            text: 'Users List',
            disabled: true,
            to: '',
          },
        ],
      }
    },
    computed: {
      listPaginated() {
        return chunk(this.listFiltered, this.pageSize)
      },
      listFiltered(){
        if (this.searchKey) {
          console.log(this.allUsers.filter(user => user.first_name === this.searchKey))
          return this.allUsers.filter(value => value.first_name.toLowerCase().includes(this.searchKey.toLowerCase())
          )
        }
        else {
          return this.allUsers
        }
      }
    },
    watch: {
      searchKey() {
        this.pageCurrent = 1
      },
    },
    async mounted() {
      try {
        const users1 = (await this.$axios.get(`https://reqres.in/api/users?page=1`)).data.data;
        const users2 = (await this.$axios.get(`https://reqres.in/api/users?page=2`)).data.data;
        this.allUsers.push(...users1)
        this.allUsers.push(...users2)
        if (+(this.$route.query.page) > this.listPaginated.length) {
          this.pageCurrent = this.listPaginated.length
        } else {
          this.pageCurrent = +(this.$route.query.page) || 1
        }
        this.pageIsLoaded =true
      } catch (e) {
        this.isError = true
      }
    },
  }
</script>

<style scoped lang='sass'>
.Users
  width: 80%
  margin: 15px auto
  padding: 10px
  height: calc(100% - 30px)
  .table
    display: flex
    flex-direction: column
    .v-data-table th
      width: 25%
</style>
