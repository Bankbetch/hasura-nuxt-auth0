<template>
  <header class="bg-white shadow mt-20 fixed w-screen z-10">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">{{ name }}</h1>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { RootType } from '~/store/modules/root/types'
export default Vue.extend({
  computed: {
    ...mapState({
      name: (state: any) => state.root[RootType.STATE_BREADCRUMB],
    }),
  },
})
</script>

<style scoped></style>
