<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <!-- <div v-show="getIsOpen" class="fixed z-10 inset-0 overflow-y-auto"> -->
  <div
    class="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0 absolute left-1/2"
  >
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="getIsOpen"
        class="fixed inset-0 transition-opacity"
        aria-hidden="true"
      >
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>
    <!-- This element is to trick the browser into centering the modal contents. -->
    <span
      class="hidden sm:inline-block sm:align-middle sm:h-screen"
      aria-hidden="true"
      >&#8203;</span
    >
    <transition
      enter-active-class="ease-out duration-300"
      enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    ></transition>
    <div
      v-show="getIsOpen"
      class="mr-8 sm:mr-0 sm:-translate-x-2/4 sm:-translate-y-2/4 fixed top-1/2 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full translate-x-0 translate-y-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
            :class="colorBgIcon"
          >
            <!-- Heroicon name: outline/exclamation -->
            <svg
              class="h-6 w-6"
              :class="colorIcon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              id="modal-headline"
              class="text-lg leading-6 font-medium text-gray-900"
            >
              {{ title }}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                {{ body }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <ButtonPrimary
          :label="submit"
          :div-class="'ml-2'"
          @click="$emit('submit', true)"
        />

        <ButtonOutlineNone
          v-if="hideBtnCancel"
          :label="cancel"
          @click="$emit('close', false)"
        />
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    colorIcon: {
      type: String,
      default: 'text-indigo-600',
    },
    colorBgIcon: {
      type: String,
      default: 'bg-indigo-100',
    },
    title: {
      type: String,
      default: '',
    },
    body: {
      type: String,
      default: '',
    },
    submit: {
      type: String,
      default: 'Submit',
    },
    cancel: {
      type: String,
      default: 'Cancel',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    hideBtnCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      getIsOpen: this.isOpen,
    }
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isOpen(n, o) {
      this.getIsOpen = n
    },
  },
})
</script>
