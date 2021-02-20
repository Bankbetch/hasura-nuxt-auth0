<template>
  <label
    :for="id"
    class="ml-5 cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <span>Change</span>
    <input
      :id="id"
      :name="id"
      type="file"
      class="sr-only"
      @input="$emit('input', $event.target.files[0])"
    />
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: {
      type: String,
      default: 'file-upload',
    },
  },
})
</script>

<style scoped></style>
