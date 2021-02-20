/* eslint-disable camelcase */

interface ChildrenMenus {
  children_menu_name?: string | null
  children_menu_icon?: string | null
  page?: string | null
}

export default interface MenuInterface {
  items: Array<{
    menu_name?: String | null
    menu_icon?: String | null
    key?: String | null
    status_toggle?: string | null
    children_menus?: Array<ChildrenMenus> | null
  }>
}
