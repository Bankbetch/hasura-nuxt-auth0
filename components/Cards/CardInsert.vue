<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ title }}
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            {{ description }}
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <validation-observer :ref="refAttr">
          <form @submit.prevent>
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <slot name="body" />
              </div>
              <ButtonPrimary :loading="loading" @click="submit" />
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    description: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    refAttr: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    form(): Vue & { validate: () => Promise<boolean> } {
      return this.$refs[this.refAttr] as Vue & {
        validate: () => Promise<boolean>
      }
    },
  },
  methods: {
    async submit(): Promise<void> {
      this.$emit('click', await this.form.validate())
    },
  },
})
</script>
