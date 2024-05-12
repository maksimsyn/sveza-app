const pollyfils = [
  'Object.entries',
  'CustomEvent',
  'Array.from',
  'IntersectionObserver',
  'IntersectionObserverEntry',
  'Element.prototype.closest',
  'NodeList.prototype.forEach',
  'Array.prototype.forEach',
  'Node.prototype.contains',
].join('%2C');

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  generate: {
    dir: 'dist',
    routes: ['/', '/profile'],
  },
  head: {
    htmlAttrs: {
      lang: 'ru',
      dir: 'ltr',
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'format-detection', content: 'date=no' },
      { name: 'format-detection', content: 'address=no' },
      { name: 'format-detection', content: 'email=no' },
      { name: 'google', content: 'notranslate' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: `https://polyfill.io/v3/polyfill.min.js?features=${pollyfils}`, body: true },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~assets/sass/main',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  styleResources: {
    sass: [
      './assets/sass/dev.sass'
    ]
  },

  plugins: [
    { src: '~/plugins/libs/picturefill.js', ssr: false },
    { src: '~/plugins/libs/svg4everybody.js', ssr: false },
    { src: '~/plugins/libs/swiper.js', ssr: false },
    { src: '~/plugins/libs/vuelidate.js', ssr: true },
    { src: '~/plugins/libs/whatInput.js', ssr: true },
    { src: '~/plugins/libs/v-lazy-image.js', ssr: true },
    { src: '~/plugins/libs/lazy-yt.js', ssr: true },
    { src: '~/plugins/libs/sal.js', ssr: false },
    { src: '~/plugins/libs/scrollto.js', ssr: false },
    { src: '~/plugins/libs/tel-input.js', ssr: false },
    { src: '~/plugins/click-outside.js', ssr: false },
    { src: '~/plugins/libs/datepicker.js', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    ['@nuxtjs/router', { path: 'router', DefaultRouter: true }]
  ],
  /*
   ** Build configuration
   */
  build: {
    transpile: [
      'vue-lazy-youtube-video',
    ],
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    // postcss: {
    //   plugins: {
    //     'postcss-initial': {},
    //     'postcss-momentum-scrolling': [
    //       'scroll',
    //       'auto'
    //     ],
    //     'postcss-object-fit-images': {},
    //     'postcss-focus': {},
    //     'autoprefixer': {
    //       grid: true,
    //       supports: false
    //     }
    //   }
    // }
  }
};
