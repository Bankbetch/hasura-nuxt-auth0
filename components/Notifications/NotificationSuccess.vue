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
            width="24"
            height="24"
            viewBox="0 0 1792 1792"
            fill="#44C997"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
            />
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
      default: 'Successfully Saved!',
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
