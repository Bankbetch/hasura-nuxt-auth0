import { RootType } from './types'
const state = () => ({
  [RootType.STATE_BREADCRUMB]: null as string | null,
})

const actions = {}

const mutations = {
  [RootType.MUTATION_SET_BREADCRUMB](state: any, data: any) {
    state[RootType.STATE_BREADCRUMB] = data
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
