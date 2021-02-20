import { extend } from 'vee-validate'
import {
  required,
  email,
  max,
  numeric,
  min,
  regex,
  confirmed,
  between,
  // eslint-disable-next-line camelcase
  min_value,
  // eslint-disable-next-line camelcase
  max_value,
} from 'vee-validate/dist/rules'

export default ({ _ }: any) => {
  extend('integer', {
    ...required,
    message: 'required',
  })
  extend('required', {
    ...required,
    message: 'required',
  })

  extend('confirmed', {
    ...confirmed,
    message: 'required',
  })

  extend('numeric', {
    ...numeric,
    message: 'required',
  })

  extend('min_value', {
    // eslint-disable-next-line camelcase
    ...min_value,
    message: 'required',
  })

  extend('max_value', {
    // eslint-disable-next-line camelcase
    ...max_value,
    message: 'required',
  })

  extend('between', {
    ...between,
    message: 'required',
  })

  extend('max', {
    ...max,
    message: 'required',
  })

  extend('min', {
    ...min,
    message: 'required',
  })

  extend('regex', {
    ...regex,
    message: 'required',
  })

  extend('email', {
    ...email,
    message: 'required',
  })
}
