<template>
  <div
    v-click-outside="onCloseSelected"
    class="col-span-6 sm:col-span-3 lg:col-span-2"
  >
    <validation-provider v-slot="validationContext" :rules="rules">
      <label id="listbox-label" class="block text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <div class="mt-1 relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          class="relative focus:border-2 w-full bg-white rounded-md shadow-sm pl-3 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm"
          :class="
            validationContext.errors[0]
              ? 'focus:ring-red-500 focus:border-red-500 border-red-500'
              : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
          "
          @click="isOn = !isOn"
        >
          <input
            :state="getValidationState(validationContext)"
            type="text"
            :name="label"
            :class="[
              value.image ? 'pl-12' : 'pl-3',
              validationContext.errors[0]
                ? 'focus:ring-red-500 focus:border-red-500 border-red-500'
                : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300',
            ]"
            class="cursor-default focus:border-2 block ab shadow-sm sm:text-sm rounded-md top-0 left-0 absolute h-full w-full"
            :value="value[labelOption]"
            :placeholder="!value[labelOption] ? 'Please choose...' : ''"
            readonly
          />

          <span v-if="value[labelOption]" class="flex items-center">
            <img
              v-if="value.image"
              :src="value.image"
              alt=""
              class="flex-shrink-0 h-6 w-6 rounded-full absolute"
            />
            <span class="ml-3 block truncate h-6"> </span>
          </span>
          <span v-else class="flex items-center h-6">
            <span class="ml-3 block truncate"> Select </span>
          </span>
          <span
            class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </button>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="isOn"
            class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-5"
          >
            <ul
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
              <li
                v-for="(items, index) of options"
                id="listbox-item-0"
                :key="index"
                role="option"
                class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                @click=";(isOn = false), $emit('input', items)"
              >
                <div class="flex items-center">
                  <img
                    v-if="items.image"
                    :src="items.image"
                    alt=""
                    class="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                  <span
                    class="ml-3 block font-normal truncate"
                    :class="
                      items[labelOption] === value[labelOption]
                        ? 'font-semibold'
                        : 'font-normal'
                    "
                  >
                    {{ items[labelOption] }}
                  </span>
                </div>

                <!--
            Checkmark, only display for selected option.

            Highlighted: "text-white", Not Highlighted: "text-indigo-600"
          -->
                <span
                  v-if="items[labelOption] === value[labelOption]"
                  class="absolute inset-y-0 right-0 flex items-center pr-4"
                >
                  <!-- Heroicon name: check -->
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </validation-provider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: [Array, Object, String],
      default() {
        return {}
      },
    },
    label: {
      type: String,
      default: '',
    },
    options: {
      type: [Object, Array],
      default: [] as Array<any>,
    },
    track: {
      type: String,
      required: true,
    },
    labelOption: {
      type: String,
      default: 'name',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: undefined,
      // eslint-disable-next-line vue/require-valid-default-prop
      default() {
        return { required: false }
      },
    },
  },
  data() {
    return { isOn: false }
  },
  computed: {
    selectedOptions(): any {
      return this.value
        ? this.options.filter(
            (x: any) => x[this.track] === this.value[this.track]
          )
        : []
    },
    valueInput(): any {
      return this.value[this.labelOption]
    },
  },
  methods: {
    onSelectionChanged($event: any) {
      this.$emit('input', $event)
    },
    onCloseSelected() {
      this.isOn = false
    },
  },
})
</script>

<style></style>
