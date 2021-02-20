<template>
  <div class="p-4">
    <CardInsert
      :ref-attr="'observerProfile'"
      :title="'Profile'"
      :description="' This information will be displayed publicly so be careful what you share.'"
      :loading="loadingButton"
      @click="submitProfile"
    >
      <template #body>
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <InputTextNormal
              v-model="form.profile.nickname"
              :label="'Display Name'"
              :rules="'required'"
              :required="true"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <div>
              <InputTextNormal
                v-model="form.profile.role"
                :label="'Role'"
                :disabled="true"
              />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-6">
            <label class="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <div class="mt-2 flex items-center">
              <span
                class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  v-if="!form.profile.picture"
                  class="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <img v-else :src="form.profile.picture" alt="profile" />
              </span>
              <InputUploadFile :id="'upload-image'" @input="changeImage" />
            </div>
          </div>
        </div>
      </template>
    </CardInsert>

    <CardHr />
    <CardInsert
      :ref-attr="'observerInformation'"
      :title="'Personal Information'"
      :description="'Use a permanent address where you can receive mail.'"
      @click="submitPersonalInformation"
    >
      <template #body>
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <InputTextNormal
              v-model="form.personalInformation.first_name"
              :label="'First Name'"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <InputTextNormal
              v-model="form.personalInformation.last_name"
              :label="'Last Name'"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <InputTextNormal
              v-model="form.personalInformation.email"
              :disabled="true"
              :label="'Email address'"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <InputTextSelect
              v-model="form.personalInformation.country"
              :label="'Country'"
              :options="config.countries"
              :track="'id'"
              :label-option="'country_name'"
              @input="form.personalInformation.country = $event"
            />
          </div>
          <div class="col-span-6">
            <InputTextNormal
              v-model="form.personalInformation.street_address"
              :div-class="'col-span-6'"
              :label="'Street address'"
            />
          </div>
          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <InputTextNormal
              v-model="form.personalInformation.city"
              :div-class="'col-span-6'"
              :label="'City'"
            />
          </div>
          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <InputTextNormal
              v-model="form.personalInformation.state"
              :label="'State'"
            />
          </div>
          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
            <InputTextNormal
              v-model="form.personalInformation.zip"
              :label="'Zip'"
            />
          </div>
        </div>
      </template>
    </CardInsert>
    <CardHr />

    <CardInsert
      :ref-attr="'observerGeneralPreferences'"
      :title="'General Preferences'"
      :description="' This information will be displayed publicly so be careful what you share.'"
      @click="submitgeneralPreferences"
    >
      <template #body>
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <InputTextSelect
              v-model="form.generalPreferences.language"
              :label="'Language'"
              :options="config.languages"
              :track="'language'"
              :label-option="'description'"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <InputTextSelect
              v-model="form.generalPreferences.dateFormatByDateFormat"
              :label="'Date Format'"
              :options="config.date_formats"
              :track="'date_format'"
              :label-option="'description'"
            />
          </div>
          <div class="col-span-6 sm:col-span-3">
            <InputTextSelect
              v-model="form.generalPreferences.timeFormatByTimeFormat"
              :label="'Time Format'"
              :options="config.time_formats"
              :track="'time_format'"
              :label-option="'description'"
            />
          </div>
        </div>
      </template>
    </CardInsert>

    <CardHr />
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Notifications
            </h3>
            <p class="mt-1 text-sm text-gray-600">
              Decide which communications you'd like to receive and how.
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <fieldset>
                  <legend class="text-base font-medium text-gray-900">
                    By Email
                  </legend>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="comments" class="font-medium text-gray-700"
                          >Comments</label
                        >
                        <p class="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="candidates"
                          class="font-medium text-gray-700"
                          >Candidates</label
                        >
                        <p class="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="offers" class="font-medium text-gray-700"
                          >Offers</label
                        >
                        <p class="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <div>
                    <legend class="text-base font-medium text-gray-900">
                      Push Notifications
                    </legend>
                    <p class="text-sm text-gray-500">
                      These are delivered via SMS to your mobile phone.
                    </p>
                  </div>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-center">
                      <input
                        id="push_everything"
                        name="push_notifications"
                        type="radio"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        for="push_everything"
                        class="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Everything
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="push_email"
                        name="push_notifications"
                        type="radio"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        for="push_email"
                        class="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Same as email
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="push_nothing"
                        name="push_notifications"
                        type="radio"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        for="push_nothing"
                        class="ml-3 block text-sm font-medium text-gray-700"
                      >
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ConfirmDialog
      :title="'Alert'"
      :body="'Supports jpeg, pdf, jpg, png The maximum allowed file size is 25 MB.'"
      :is-open="isOpenModal"
      :hide-btn-cancel="false"
      :submit="'Close'"
      @submit="isOpenModal = false"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import { mapState } from 'vuex'
import { toBase64 } from '~/utils/file'
import UserProfileModel from '~/Models/UserProfile'
import { RootType } from '~/store/modules/root/types'
import { UserType } from '~/store/modules/user/types'

export default Vue.extend({
  asyncData({ store }): any {
    let setForm: any
    try {
      store.commit(RootType.MUTATION_SET_BREADCRUMB, 'Profile')
      setForm = _.cloneDeep(
        store.state.user[UserType.STATE_LIST_USER_BY_AUTH0ID]
      )
      setForm.personalInformation.country = store.state.user[
        UserType.STATE_USER_DEFAULT_CONFIG
      ].countries.find((x: any) => x.id === setForm.personalInformation.country)
    } catch (error) {
      console.log(error)
      setForm = new UserProfileModel()
    }
    return {
      form: setForm,
    }
  },
  data() {
    return {
      isOpenModal: false as boolean,
      form: new UserProfileModel() as any,
      fileUplaod: undefined as any,
      bodyNotifyFail: '' as String,
      aPictureOld: '' as string,
      loadingButton: false as boolean,
    }
  },
  computed: {
    ...mapState({
      config: (state: any) => state.user[UserType.STATE_USER_DEFAULT_CONFIG],
    }),
  },
  methods: {
    async changeImage(file: File) {
      if (file) {
        const spf = file.name.split('.')[file.name.split('.').length - 1]
        const checkType = file
          ? spf === 'png' || spf === 'jpg' || spf === 'jpeg'
          : undefined

        if (checkType) {
          this.aPictureOld = this.form.profile.picture
          this.form.profile.picture = await toBase64(file)
          this.fileUplaod = file
        } else {
          this.isOpenModal = true
        }
      }
    },
    async submitPersonalInformation() {
      try {
        await this.$store.dispatch(
          UserType.ACTION_UPDATE_USER_PERSONAL_INFORMATION,
          this.form.personalInformation
        )
        this.$userData()
        this.$showToast(200, 'Successfully Saved!')
      } catch (error) {
        this.$showToast(500, error.message)
      }
    },
    async updateUserProfile(flag: Boolean) {
      if (flag) {
        await this.$store.dispatch(
          UserType.ACTION_UPDATE_USER_PROFILE,
          this.form.profile
        )
        this.aPictureOld = ''
        this.fileUplaod = undefined
        this.$userData()
        this.$showToast(200, 'Successfully Saved!')
        this.loadingButton = false
      }
    },
    async submitProfile(flag: boolean) {
      try {
        if (this.fileUplaod) {
          const storageRef = this.$fire.storage.ref(
            `images/${this.fileUplaod.name}`
          )
          try {
            this.loadingButton = true
            const snapshot = await storageRef.put(this.fileUplaod)
            snapshot.ref.getDownloadURL().then((downloadURL: any) => {
              this.$fire.storage.refFromURL(this.aPictureOld).delete()
              this.form.profile.picture = downloadURL
              this.updateUserProfile(flag)
            })
          } catch (e) {
            this.$showToast(500, e.message)
            this.loadingButton = false
          }
        } else {
          this.updateUserProfile(flag)
        }
      } catch (error) {
        this.loadingButton = false
        this.$showToast(500, error.message)
      }
    },
    async submitgeneralPreferences(flag: Boolean) {
      try {
        if (flag) {
          await this.$store.dispatch(
            UserType.ACTION_UPDATE_USER_SETTINGS,
            this.form.generalPreferences
          )
        }
        this.$userData()
        this.$showToast(200, 'Successfully Saved!')
      } catch (error) {
        this.$showToast(500, error.message)
      }
    },
  },
})
</script>

<style scoped></style>
