import { gql } from 'graphql-request'
import { MenuType } from './types'
import MenuInterface from '~/types/Menu.interface'
import { $api } from '~/plugins/graphql'
const state = () => ({
  [MenuType.STATE_LIST_MENUS]: [] as Array<MenuInterface>,
})

const actions = {
  async [MenuType.ACTION_GET_MENUS]({ commit }: any) {
    try {
      const query = gql`
        query menus {
          menus {
            menu_name
            menu_icon
            key
            status_toggle
            children_menus(
              where: {
                is_public: { _eq: true }
                _and: { is_public: { _eq: true } }
              }
              order_by: { sort: asc }
            ) {
              children_menu_name
              children_menu_icon
              page
            }
          }
        }
      `
      const menus = await $api(query)
      const map = {
        items: menus.menus,
      }
      commit(MenuType.MUTATION_SET_MENUS, map)
    } catch (error) {
      const map = [
        {
          items: [
            {
              menu_name: null,
              menu_icon: null,
              key: null,
              status_toggle: null,
              children_menus: [
                { children_menu_name: null, children_menu_icon: null },
              ],
            },
          ],
        },
      ] as Array<MenuInterface>
      commit(MenuType.MUTATION_SET_MENUS, map)
      throw error
    }
  },
}

const mutations = {
  [MenuType.MUTATION_SET_MENUS](state: any, data: any) {
    state[MenuType.STATE_LIST_MENUS] = data
  },
  [MenuType.MUTATION_SET_CHANGE_STATUS_TOGGLE](state: any, data: any) {
    const menus = state[MenuType.STATE_LIST_MENUS].items
    if (typeof data !== 'boolean') {
      menus.forEach((items: any, index: Number) => {
        if (index === data.index) return (items.status_toggle = data.status)
        else return (items.status_toggle = false)
      })
      state[MenuType.STATE_LIST_MENUS].items = menus
    } else {
      for (const items of menus) {
        items.status_toggle = false
      }
    }
  },
}
const getters = {}
export default {
  namespaced: false,
  state,
  actions,
  mutations,
  getters,
}
