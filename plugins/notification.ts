import { Context } from '@nuxt/types'
import Vue from 'vue'
import Notifications from 'vue-notification'
Vue.use(Notifications)

// eslint-disable-next-line import/no-mutable-exports
let $showToast: any
declare module 'vue/types/vue' {
  interface Vue {
    $showToast: any
  }
}

declare module '@nuxt/types' {
  interface Context {
    $showToast: any
  }
}

export default (_: Context, inject: any) => {
  const showNotification = function (status: Number, message: string) {
    switch (status) {
      case 200:
        showNotification.success(message)
        break
      case 400:
        showNotification.warn(message)
        break
      case 500:
        showNotification.fail(message)
        break
    }
  }

  showNotification.success = function (message: string) {
    notificationSend('success', message)
  }

  showNotification.fail = function (message: string) {
    notificationSend('error', message)
  }

  showNotification.warn = function (message: string) {
    notificationSend('warn', message)
  }

  function notificationSend(type: string, message: string) {
    Vue.notify({
      group: 'showMsg',
      title: message,
      type,
      duration: 2000,
    })
  }

  inject('showToast', showNotification)
  $showToast = showNotification
}

export { $showToast }
