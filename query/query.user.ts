import { gql } from 'graphql-request'
import { UserType } from '~/store/modules/user/types'

export default class QueryUser {
  [UserType.ACTION_UPDATE_USER_SETTINGS](): String {
    return gql`
      mutation update_user_settings(
        $id: uuid!
        $date_format: date_formats_enum
        $time_format: time_formats_enum
        $language: languages_enum
      ) {
        update_user_settings_by_pk(
          pk_columns: { id: $id }
          _set: {
            language: $language
            time_format: $time_format
            date_format: $date_format
          }
        ) {
          id
        }
      }
    `
  }

  [UserType.ACTION_UPDATE_USER_PERSONAL_INFORMATION](sub: string): String {
    return gql`
    mutation update_user_personal_information(
        $country: uuid!
        $first_name: String!
        $last_name: String!
        $street_address: String!
        $city: String!
        $state: String!
        $zip: String!
      ) {
        update_users(
          where: { auth0_id: { _eq: "${sub}" } }
          _set: {
            first_name: $first_name
            last_name: $last_name
            country: $country
            street_address: $street_address
            city: $city
            state: $state
            zip: $zip
          }
        ) {
          affected_rows
        }
      }
    `
  }

  [UserType.ACTION_UPDATE_USER_PROFILE](sub: string): String {
    return gql`
    mutation update_user_profile($nickname: String!, $picture: String!) {
      update_users(
        where: { auth0_id: { _eq: "${sub}" } }
        _set: { nickname: $nickname, picture: $picture }
      ) {
        affected_rows
      }
    }
  `
  }

  [UserType.ACTION_GET_USER_DEFAULT_CONFIG](): String {
    return gql`
      query default_config_user {
        countries {
          id
          country_name
          description
          image
        }
        date_formats {
          date_format
          description
        }
        languages {
          description
          language
        }
        time_formats {
          description
          time_format
        }
      }
    `
  }

  [UserType.ACTION_GET_USER_BY_AUTH0ID](sub: string): String {
    return gql`
    query user_by_auth0_id {
      users(
        where: { auth0_id: { _eq: "${sub}" } }
      ) {
        email
        nickname
        role
        first_name
        last_name
        country
        street_address
        city
        state
        zip
        picture
        user_settings {
          languageByLanguage {
            description
            language
          }
          dateFormatByDateFormat {
            description
            date_format
          }
          timeFormatByTimeFormat {
            description
            time_format
          }
          id
        }
      }
      countries {
        id
        country_name
        description
        image
      }
      date_formats {
        date_format
        description
      }
      languages {
        description
        language
      }
      time_formats {
        description
        time_format
      }
    }
  `
  }

  [UserType.ACTION_GET_USER_DATA_BY_AUTH0ID](sub: string): String {
    return gql`
    query user_by_auth0_id {
      users(
        where: { auth0_id: { _eq: "${sub}" } }
      ) {
        email
        nickname
        role
        first_name
        last_name
        country
        street_address
        city
        state
        zip
        picture
        user_settings {
          languageByLanguage {
            description
            language
          }
          dateFormatByDateFormat {
            description
            date_format
          }
          timeFormatByTimeFormat {
            description
            time_format
          }
          id
        }
      }
    }
  `
  }

  [UserType.ACTION_GET_USERS](): String {
    return gql`
      query users {
        users_aggregate {
          aggregate {
            count
          }
          nodes {
            id
            email
            name
            nickname
            role
          }
        }
      }
    `
  }
}
