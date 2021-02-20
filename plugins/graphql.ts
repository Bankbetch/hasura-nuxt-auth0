import { Context } from '@nuxt/types'
import ErrorHandleInterface from '~/types/ErrorHandle.interface'

// eslint-disable-next-line import/no-mutable-exports
let $api: any
declare module 'vue/types/vue' {
  interface Vue {
    $api: any
  }
}

declare module '@nuxt/types' {
  interface Context {
    $api: any
  }
}

export default (context: Context, inject: any) => {
  context.app.$graphql.setHeaders({
    credentials: 'include',
    mode: 'cors',
  })
  context.app.$graphql.setHeader('credentials', 'include')
  context.app.$graphql.setHeader('mode', 'cors')
  context.app.$graphql.setHeaders({
    authorization: context.app.$cookies.get('auth._token.auth0'),
  })
  async function api(query: Array<any>, value: any): Promise<any> {
    try {
      const data = await context.app.$graphql.request(query, value)
      return data
    } catch (error) {
      if (error.response.errors[0].extensions.code === 'invalid-jwt') {
        await context.app.$auth
          .refreshTokens()
          .then()
          .catch((_) => context.app.$auth.logout())
        try {
          await context.app.$graphql.setHeaders({
            authorization: context.app.$cookies.get('auth._token.auth0'),
          })
          const data = await context.app.$graphql.request(query, value)
          return data
        } catch (error) {
          const map: ErrorHandleInterface = {
            code: error.response.errors[0].extensions.code,
            message: error.response.errors[0].message,
          }
          throw map
        }
      } else {
        const map: ErrorHandleInterface = {
          code: error.response.errors[0].extensions.code,
          message: error.response.errors[0].message,
        }
        throw map
      }
    }
  }
  inject('api', api)
  $api = api
}
export { $api }
// export default initialization
