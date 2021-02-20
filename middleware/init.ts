import { MenuType } from '~/store/modules/menu/types'
import { UserType } from '~/store/modules/user/types'

export default async ({ app, route }: any) => {
  if (
    !app.store.state.user[UserType.STATE_LIST_USER_BY_AUTH0ID] &&
    route.name !== 'login' &&
    route.name !== 'callback'
  ) {
    await app.store.dispatch(MenuType.ACTION_GET_MENUS)
    await app.store.dispatch(
      UserType.ACTION_GET_USER_BY_AUTH0ID,
      app.store.state.auth.user.sub
    )
  }
}
