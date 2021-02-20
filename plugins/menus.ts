import { Context } from '@nuxt/types'
import { MenuType } from '~/store/modules/menu/types'
export default async (context: Context) => {
  try {
    if (context.route.name !== 'login' && context.route.name !== 'callback')
      await context.store.dispatch(MenuType.ACTION_GET_MENUS)
    await context.app.$userData
  } catch (error) {}
}
