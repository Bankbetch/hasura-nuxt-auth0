/* eslint-disable camelcase */
import _ from 'lodash'
import { UserType } from './types'
import UserInterface from '~/types/User.interface'
import { $api } from '~/plugins/graphql'
import UserProfileInterface from '~/types/UserProfile.interface'
import UserProfileModel from '~/Models/UserProfile'
import QueryUser from '~/query/query.user'
const state = () => ({
  [UserType.STATE_LIST_USERS]: [] as Array<UserInterface>,
})

const actions = {
  async [UserType.ACTION_GET_USER_DATA_BY_AUTH0ID]({ rootState, commit }: any) {
    const userModel = new UserProfileModel()
    try {
      const query = new QueryUser()[UserType.ACTION_GET_USER_DATA_BY_AUTH0ID](
        rootState.auth.user.sub
      )
      const { users } = await $api(query)
      const userSettings =
        users[0].user_settings.length > 0
          ? users[0].user_settings[0]
          : userModel.generalPreferences
      const map = {
        profile: {
          nickname: users[0].nickname,
          role: users[0].role,
          picture: users[0].picture,
        },
        personalInformation: {
          first_name: users[0].first_name,
          last_name: users[0].last_name,
          email: users[0].email,
          country: users[0].country,
          street_address: users[0].street_address,
          city: users[0].city,
          state: users[0].state,
          zip: users[0].zip,
        },
        generalPreferences: {
          id: userSettings.id,
          language: userSettings.languageByLanguage,
          dateFormatByDateFormat: userSettings.dateFormatByDateFormat,
          timeFormatByTimeFormat: userSettings.timeFormatByTimeFormat,
        },
      }
      commit(UserType.MUTATION_SET_USER_BY_AUTH0ID, map)
    } catch (error) {
      const map = userModel as UserProfileInterface
      commit(UserType.MUTATION_SET_USER_BY_AUTH0ID, map)
      throw error
    }
  },
  async [UserType.ACTION_GET_USERS]({ commit }: any) {
    try {
      const query = new QueryUser()[UserType.ACTION_GET_USERS]()
      const users = await $api(query)
      const map = {
        items: users.users_aggregate.nodes,
        count: users.users_aggregate.aggregate.count,
      }
      commit(UserType.MUTATION_SET_USERS, map)
    } catch (error) {
      const map = [{ count: 0, items: [] }] as Array<UserInterface>
      commit(UserType.MUTATION_SET_USERS, map)
      throw error
    }
  },
  async [UserType.ACTION_GET_USER_BY_AUTH0ID]({ commit, rootState }: any) {
    const userModel = new UserProfileModel()
    try {
      const query = new QueryUser()[UserType.ACTION_GET_USER_BY_AUTH0ID](
        rootState.auth.user.sub
      )
      const {
        users,
        countries,
        date_formats,
        languages,
        time_formats,
      } = await $api(query)

      const userSettings =
        users[0].user_settings.length > 0
          ? users[0].user_settings[0]
          : userModel.generalPreferences

      const map = {
        profile: {
          nickname: users[0].nickname,
          role: users[0].role,
          picture: users[0].picture,
        },
        personalInformation: {
          first_name: users[0].first_name,
          last_name: users[0].last_name,
          email: users[0].email,
          country: users[0].country,
          street_address: users[0].street_address,
          city: users[0].city,
          state: users[0].state,
          zip: users[0].zip,
        },
        generalPreferences: {
          id: userSettings.id,
          language: userSettings.languageByLanguage,
          dateFormatByDateFormat: userSettings.dateFormatByDateFormat,
          timeFormatByTimeFormat: userSettings.timeFormatByTimeFormat,
        },
      }

      commit(UserType.MUTATION_SET_USER_DEFAULT_CONFIG, {
        countries,
        date_formats,
        languages,
        time_formats,
      })
      commit(UserType.MUTATION_SET_USER_BY_AUTH0ID, map)
    } catch (error) {
      const map = userModel as UserProfileInterface
      commit(UserType.MUTATION_SET_USER_BY_AUTH0ID, map)
      throw error
    }
  },
  async [UserType.ACTION_GET_USER_DEFAULT_CONFIG]({ commit }: any) {
    try {
      const query = new QueryUser()[UserType.ACTION_GET_USER_DEFAULT_CONFIG]()
      const configs = await $api(query)
      commit(UserType.MUTATION_SET_USER_DEFAULT_CONFIG, configs)
    } catch (error) {
      commit([])
      throw error
    }
  },
  async [UserType.ACTION_UPDATE_USER_PROFILE]({ rootState }: any, value: any) {
    const clone = _.cloneDeep(value)
    delete clone.role
    // eslint-disable-next-line no-useless-catch
    try {
      const query = new QueryUser()[UserType.ACTION_UPDATE_USER_PROFILE](
        rootState.auth.user.sub
      )
      const returning = await $api(query, clone)
      return returning
    } catch (error) {
      throw error
    }
  },
  async [UserType.ACTION_UPDATE_USER_PERSONAL_INFORMATION](
    { rootState }: any,
    value: any
  ) {
    const clone = _.cloneDeep(value)
    delete clone.email
    clone.country = clone.country ? clone.country.id : null
    // eslint-disable-next-line no-useless-catch
    try {
      const query = new QueryUser()[
        UserType.ACTION_UPDATE_USER_PERSONAL_INFORMATION
      ](rootState.auth.user.sub)
      const returning = await $api(query, clone)
      return returning
    } catch (error) {
      throw error
    }
  },
  async [UserType.ACTION_UPDATE_USER_SETTINGS]({ _ }: any, value: any) {
    // eslint-disable-next-line no-useless-catch
    try {
      const mapValue = {
        id: value.id,
        time_format: value.timeFormatByTimeFormat.time_format,
        language: value.language.language,
        date_format: value.dateFormatByDateFormat.date_format,
      }
      const query = new QueryUser()[UserType.ACTION_UPDATE_USER_SETTINGS]()
      const returning = await $api(query, mapValue)
      return returning
    } catch (error) {
      throw error
    }
  },
}

const mutations = {
  [UserType.MUTATION_SET_USERS](state: any, data: Array<UserInterface>) {
    state[UserType.STATE_LIST_USERS] = data
  },
  [UserType.MUTATION_SET_USER_BY_AUTH0ID](
    state: any,
    data: UserProfileInterface
  ) {
    state[UserType.STATE_LIST_USER_BY_AUTH0ID] = data
  },
  [UserType.MUTATION_SET_USER_DEFAULT_CONFIG](state: any, data: any) {
    state[UserType.STATE_USER_DEFAULT_CONFIG] = data
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
