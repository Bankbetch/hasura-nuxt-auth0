<template>
  <div>
    <h1 class="title">nuxt-hasura</h1>
    <div class="links">
      <a
        href="https://nuxtjs.org/"
        target="_blank"
        rel="noopener noreferrer"
        class="button--green"
      >
        Documentation
      </a>
      <a
        href="https://github.com/nuxt/nuxt.js"
        target="_blank"
        rel="noopener noreferrer"
        class="button--grey"
      >
        GitHub
      </a>
    </div>
    <button @click="click">aaa</button>
    <button @click="$auth.logout()">logout</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootType } from '~/store/modules/root/types'
import { UserType } from '~/store/modules/user/types'
export default Vue.extend({
  asyncData({ store }) {
    store.commit(RootType.MUTATION_SET_BREADCRUMB, 'Dashboard')
  },
  data() {
    return {}
  },

  methods: {
    async click() {
      try {
        await this.$store.dispatch(UserType.ACTION_GET_USERS)
        console.log(this.$store.state.user[UserType.STATE_LIST_USERS])
      } catch (error) {
        console.log(error)
      }
    },
  },
})
</script>
