<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="onSubmit">
      <ValidationProvider
        v-slot="{ errors }"
        name="E-mail"
        rules="required|email"
      >
        <input v-model="email" type="email" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        name="First Name"
        rules="required|alpha"
      >
        <input v-model="firstName" type="text" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        name="Last Name"
        rules="required|alpha"
      >
        <input v-model="lastName" type="text" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <button type="submit">Submit</button>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }

        alert('Form has been submitted!')

        // Resetting Values
        this.firstName = this.lastName = this.email = ''

        // Wait until the models are updated in the UI
        this.$nextTick(() => {
          this.$refs.form.reset()
        })
      })
    },
  },
}
</script>
