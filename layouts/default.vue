<template>
  <div class="flex flex-col">
    <Header />
    <Breadcrumb />
    <main class="max-w-7xl mx-auto flex-1 h-screen w-full mt-32">
      <div class="rounded-lg h-layout p-8">
        <Nuxt />
      </div>
    </main>
    <client-only>
      <notifications group="showMsg" position="bottom left" :width="'100%'">
        <template slot="body" slot-scope="props">
          <div :class="['vue-notification max-w-sm w-full', props.item.type]">
            <div
              class="flex max-w-sm w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div
                class="flex justify-center items-center w-12"
                :class="
                  props.item.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                "
              >
                <svg
                  v-show="props.item.type == 'success'"
                  class="h-6 w-6 fill-current text-white"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
                  ></path>
                </svg>
                <svg
                  v-show="props.item.type == 'error'"
                  src="~assets/image/icons/fail.svg"
                  class="h-6 w-6 fill-current text-white"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
                  ></path>
                </svg>
              </div>

              <div class="-mx-3 py-2 px-4 w-full relative">
                <div class="mx-3">
                  <span
                    class="font-semibold"
                    :class="
                      props.item.type === 'success'
                        ? 'text-green-500'
                        : 'text-red-500'
                    "
                    >{{ props.item.type }}</span
                  >
                  <p class="text-gray-600 text-sm">{{ props.item.title }}</p>
                </div>
                <div class="absolute top-1 right-4 text-gray-800">
                  <svg
                    class="w-6 h-6 cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    @click="props.close"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </template>
      </notifications>
    </client-only>
  </div>
</template>
