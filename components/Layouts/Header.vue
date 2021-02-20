<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="fixed bg-gray-800 w-screen z-20">
    <div class="max-w-7xl mx-auto px-2">
      <div
        class="flex justify-between items-center py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <nuxt-link
            to="/"
            :exact-active-class="''"
            :exact="true"
            :active-class="''"
          >
            <span class="sr-only">Workflow</span>
            <img
              class="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt=""
            />
          </nuxt-link>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <button
            type="button"
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 mr-2"
            @click="openMenuMobile = !openMenuMobile"
          >
            <span class="sr-only">Open menu</span>
            <!-- Heroicon name: menu -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav class="hidden md:flex space-x-2">
          <div
            v-for="(items, index) of menus.items.filter(
              (x) => x.key !== 'profile'
            )"
            :key="index"
            class="relative"
          >
            <button
              v-if="items.children_menus.length > 0"
              :id="items.menu_name"
              class="group focus:bg-gray-900 hover:bg-gray-900 active:bg-gray-900 rounded-md p-2 text-gray-500 inline-flex items-center text-base font-medium hover:text-white active:text-white focus:text-white focus:outline-none"
              type="button"
              @click="closeAndOpenWithStatus(true, items.menu_name)"
            >
              <span :id="items.menu_name">{{ items.menu_name }}</span>
              <svg
                :id="items.menu_name"
                class="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <transition
              enter-active-class="ease-out duration-100"
              enter-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="items.children_menus.length > 0"
                v-show="items.status_toggle"
                :id="`menu-${index}`"
                class="z-20 absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
              >
                <div
                  class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                >
                  <div
                    v-for="(sub, idxSub) of items.children_menus"
                    :key="idxSub"
                    class="relative grid gap-6 hover:bg-gray-100 bg-white px-5 py-6 sm:gap-8 sm:p-8"
                  >
                    <a href="#" class="-m-3 p-3 flex items-start rounded-lg">
                      <!-- Heroicon name: chart-bar -->
                      <svg
                        class="flex-shrink-0 h-6 w-6 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">
                          {{ sub.children_menu_name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          Get a better understanding of where your traffic is
                          coming from.
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </transition>
            <a
              v-if="items.children_menus.length === 0"
              class="hover:bg-gray-900 active:bg-gray-900 rounded-md p-2 text-gray-500 inline-flex items-center text-base font-medium hover:text-white active:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ items.menu_name }}
            </a>
          </div>
        </nav>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <div class="ml-3 relative">
            <div>
              <button
                id="user-menu"
                class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-haspopup="true"
                @click="
                  closeAndOpenWithStatus(
                    true,
                    filterMenuByKey('profile').menu_name
                  )
                "
              >
                <span class="sr-only">Open user menu</span>
                <img
                  :id="filterMenuByKey('profile').menu_name"
                  class="h-8 w-8 rounded-full"
                  :src="userData.profile.picture"
                  alt="profile_image"
                />
              </button>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <!-- v-click-outside="closeDropdown('profile')" -->
              <!-- @mouseleave="
                  closeAndOpenWithStatus(
                    filterMenuByKey('profile').status_toggle,
                    filterMenuByKey('profile').menu_name
                  )
                " -->
              <div
                v-show="filterMenuByKey('profile').status_toggle"
                id="profile"
                v-click-outside="closeAllDropdown"
                class="z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <nuxt-link
                  v-for="(children, index) of menus.items.find(
                    (x) => x.key === 'profile'
                  ).children_menus"
                  :key="index"
                  :to="children.page"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                  @click.native="onClickMenu(children.page)"
                  >{{ children.children_menu_name }}</nuxt-link
                >
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <MobileMenu
        v-if="openMenuMobile"
        :get-open-menu-mobile="openMenuMobile"
        @close="openMenuMobile = false"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
// import _ from 'lodash'
import { MenuType } from '~/store/modules/menu/types'
import { UserType } from '~/store/modules/user/types'
// import ElementHelper from '~/utils/element'
// import MenuInterface from '~/types/Menu.interface'
export default Vue.extend({
  data() {
    return {
      open: false as Boolean,
      openMenuMobile: false as Boolean,
      openProfile: false as Boolean,
    }
  },
  computed: {
    ...mapState({
      menus: (state: any) => state.menu[MenuType.STATE_LIST_MENUS],
      userData: (state: any) => state.user[UserType.STATE_LIST_USER_BY_AUTH0ID],
    }),
  },
  methods: {
    closeAllDropdown(e: any) {
      // console.log(e.target.id)
      const index: Number = this.menus.items.findIndex(
        (x: any) => x.menu_name === e.target.id
      )
      if (index === -1) this.closeAndOpenWithStatus(false, null)
    },
    closeAndOpenWithStatus(status: Boolean, menuName: String | null): void {
      if (menuName) {
        const index: Number = this.menus.items.findIndex(
          (x: any) => x.menu_name === menuName
        )
        const data = {
          index: index as Number,
          status: status as Boolean,
        }
        this.$store.commit(MenuType.MUTATION_SET_CHANGE_STATUS_TOGGLE, data)
      } else {
        this.$store.commit(MenuType.MUTATION_SET_CHANGE_STATUS_TOGGLE, false)
      }
    },
    filterMenuByKey(key: string): Object {
      return this.menus.items.find((x: any) => x.key === key)
    },
    onClickMenu(value: string): void {
      if (value === 'login') this.$auth.logout()
      this.closeAndOpenWithStatus(false, null)
    },
  },
})
</script>

<style scoped></style>
