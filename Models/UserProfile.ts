/* eslint-disable camelcase */
import UserProfileInterface from '~/types/UserProfile.interface'

export default class UserProfileModel implements UserProfileInterface {
  profile = {}
  personalInformation = {}
  generalPreferences = {}

  constructor() {
    this.profile = {
      nickname: null,
      role: null,
      picture: null,
    }
    this.personalInformation = {
      first_name: null,
      last_name: null,
      email: null,
      country: null,
      street_address: null,
      city: null,
      state: null,
      zip: null,
    }
    this.generalPreferences = {
      id: null,
      language: { description: null, language: null },
      dateFormatByDateFormat: {
        description: null,
        date_format: null,
      },
      timeFormatByTimeFormat: {
        description: null,
        time_format: null,
      },
    }
    return this
  }
}
