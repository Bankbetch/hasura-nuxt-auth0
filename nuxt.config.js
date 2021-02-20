export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-hasura',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['vue-multiselect/dist/vue-multiselect.min.css'],
  loading: { color: '#f7fafc' },
  router: {
    middleware: ['auth', 'init'],
    linkActiveClass: 'bg-gray-100',
    linkExactActiveClass: 'bg-gray-100',
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/graphql.ts', ssr: true },
    { src: '~/utils/clickaway.js', ssr: false },
    { src: '~/utils/validateState.ts', ssr: true },
    { src: '~/plugins/layouts.ts', ssr: true },
    { src: `~/plugins/validate.ts`, ssr: false },
    { src: `~/plugins/notification.ts`, ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-graphql-request',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',

    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGE_ING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        },
        services: {
          storage: true,
        },
      },
    ],
    'nuxt-i18n',
  ],
  i18n: {
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'us',
        iso: 'us-US',
        name: 'US',
        isCatchallLocale: true,
      },
      {
        code: 'th',
        iso: 'th-TH',
        name: 'TH',
        isCatchallLocale: true,
      },
    ],
    defaultLocale: 'us',
    defaultLocaleRouteNameSuffix: 'default',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        th: require('./lang/th.json'),
        us: require('./lang/en.json'),
      },
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    minimize: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(scss|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  },
  loaders: {
    vue: {
      prettify: false,
    },
  },
  terser: {
    extractComments: true,
    sourceMap: true,
    parallel: true,
    cache: true,
    terserOptions: {
      extractComments: 'all',
      compress: {
        drop_console: true,
        drop_debugger: true,
        // pure_funcs: ['console.info', 'console.debug', 'console.warn', 'console.log']
      },
    },
  },
  extend(config, ctx) {
    if (ctx.isDev) {
      config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
    }
  },
  babel: {
    compact: false,
  },
  privateRuntimeConfig: {
    API_URL: process.env.API_URL,
    DOMAIN: process.env.DOMAIN,
    CLIENT_ID: process.env.CLIENT_ID,
    AUDUENCE: process.env.AUDUENCE,
    RESPONSE_TYPE: process.env.RESPONSE_TYPE,
    GRANT_TYPE: process.env.GRANT_TYPE,
    CODECHALLENGE_METHOD: process.env.CODECHALLENGE_METHOD,
    JWKS_URI: process.env.JWKS_URI,
    ISSURE: process.env.ISSURE,
    PORT: 3001,
  },

  graphql: {
    /**
     * Your GraphQL endpoint
     */
    endpoint: process.env.API_URL,

    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
     */
    options: {},

    /**
     * Optional
     * default: true (this includes cross-fetch/polyfill before creating the graphql client)
     */
    useFetchPolyfill: true,

    /**
     * Optional
     * default: false (this includes graphql-tag for node_modules folder)
     */
    includeNodeModules: true,
  },
  auth: {
    useRefreshTokens: true,
    plugins: ['~/plugins/menus.ts'],
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        maxAge: 60 * 60,
      },
    },
    refreshToken: {
      property: 'token.refresh_token',
      data: 'refresh_token',
      maxAge: 60 * 60,
    },
    localStorage: false,
    redirect: {
      login: '/login', // redirect user when not connected
      callback: '/callback',
    },
    home: '/',
    globalToken: false,
    strategies: {
      auth0: {
        domain: process.env.DOMAIN,
        clientId: process.env.CLIENT_ID,
        scope: ['openid', 'profile', 'email', 'offline_access'],
        audience: process.env.AUDUENCE,
        responseType: process.env.RESPONSE_TYPE,
        grantType: process.env.GRANT_TYPE,
        codeChallengeMethod: process.env.CODECHALLENGE_METHOD,
      },
    },
  },
  server: {
    port: process.env.PORT,
  },
}
