/* eslint-disable camelcase */
interface Profile {
  nickname?: string | null
  role?: string | null
  picture?: string | null
}

interface PersonalInformation {
  first_name?: string | null
  last_name?: string | null
  email?: string | null
  country?: string | null
  street_address?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
}

interface generalPreferences {
  id?: string | null
  languageByLanguage?: {
    description?: string | null
    language?: string | null
  }
  dateFormatByDateFormat?: {
    description?: string | null
    date_format?: string | null
  }
  timeFormatByTimeFormat?: {
    description?: string | null
    time_format?: string | null
  }
}

export default interface UserProfileInterface {
  profile: Profile
  personalInformation: PersonalInformation
  generalPreferences: generalPreferences
}
