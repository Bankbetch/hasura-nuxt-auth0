<template>
  <div :class="divClass">
    <validation-provider v-slot="validationContext" :rules="rules">
      <label :for="label" class="block text-sm font-medium text-gray-700"
        >{{ label }}
      </label>
      <input
        type="number"
        :name="label"
        :class="
          validationContext.errors[0]
            ? 'focus:ring-red-500 focus:border-red-500 border-red-500'
            : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
        "
        class="mt-1 focus:border-2 block w-full shadow-sm sm:text-sm rounded-md"
        :disabled="disabled"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
    </validation-provider>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    label: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: undefined,
      default: undefined,
    },
    divClass: {
      type: String,
      default: 'col-span-6 sm:col-span-3 lg:col-span-2',
    },
    rules: {
      type: undefined,
      // eslint-disable-next-line vue/require-valid-default-prop
      default() {
        return { required: false }
      },
    },
  },
})
</script>

<style scoped></style>
