import { Context } from '@nuxt/types'
import { UserType } from '~/store/modules/user/types'

// eslint-disable-next-line import/no-mutable-exports
let $userData: any
declare module 'vue/types/vue' {
  interface Vue {
    $userData: any
  }
}

declare module '@nuxt/types' {
  interface Context {
    $userData: any
  }
}
export default (context: Context, inject: any) => {
  async function userData(): Promise<void> {
    await context.store.dispatch(UserType.ACTION_GET_USER_DATA_BY_AUTH0ID)
  }
  inject('userData', userData)
  $userData = userData
}
export { $userData }
