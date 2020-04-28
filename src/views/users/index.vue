<template>
  <div>
    <v-breadcrumbs :items="items"></v-breadcrumbs>
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
      <v-col cols="1" />

    </v-row>
    <v-simple-table
            v-if="listFiltered.length > 0"
    >
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
        <tr v-for="user in listPaginated[pageCurrent - 1]" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <Card v-else>Поиск не дал результата</Card>

    <v-pagination
            v-model="pageCurrent"
            :length="listPaginated.length"
     />
  </div>
</template>

<script>
  import { chunk } from 'lodash'

  export default {
    name: "index",
    data(){
      return {
        counts: [5,6,7,8,9,10,11,12],
        searchKey: null,
        pageSize: 6,
        allUsers: [],
        pageCurrent: null,
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
      this.pageCurrent = +(this.$route.query.page) || 1
      const users1 = (await this.$axios.get(`https://reqres.in/api/users?page=1`)).data.data;
      const users2 = (await this.$axios.get(`https://reqres.in/api/users?page=2`)).data.data;
      this.allUsers.push(...users1)
      this.allUsers.push(...users2)
    },
  }
</script>

<style scoped lang='sass'></style>
