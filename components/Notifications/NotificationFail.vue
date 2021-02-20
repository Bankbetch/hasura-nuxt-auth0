<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="isOn"
      class="bg-white rounded-lg border-gray-300 border p-3 shadow-lg fixed bottom-0 left-0 m-2"
    >
      <div class="flex flex-row">
        <div class="px-2">
          <svg
            class="w-6 h-6"
            fill="#ef4444"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="ml-2 mr-6">
          <span class="font-semibold">{{ title }}</span>
          <span class="block text-gray-500">{{ body }}</span>
        </div>
        <div>
          <svg
            class="w-6 h-6 cursor-pointer"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            @click="$emit('click')"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isOn: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Successfully Failed!',
    },
    body: {
      type: String,
      default: null,
    },
  },
  watch: {
    isOn() {
      setTimeout(() => {
        this.$emit('click')
      }, 2000)
    },
  },
})
</script>

<style scoped></style>
