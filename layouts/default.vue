<template lang="pug">
  #app
    AppHeader
    nuxt
    AppFooter(v-if='isFooterVisible')
</template>

<script>
  import throttle from 'lodash.throttle';
  import AppHeader from '@/components/partials/AppHeader/AppHeader';
  import AppFooter from '@/components/partials/AppFooter/AppFooter';

  export default {
    components: { AppFooter, AppHeader },
    computed: {
      isFooterVisible() {
        return this.$route.name !== 'profile';
      }
    },
    mounted() {
      let lastHeight = window.innerHeight;
      let vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty('--vh', `${vh}px`);

      window.addEventListener('resize', throttle(() => {
        if (window.innerWidth > window.innerHeight ||
          Math.abs(lastHeight - window.innerHeight) > 200) {
          vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
          lastHeight = window.innerHeight;
        }
      }, 300), { passive: true });
    }
  };
</script>
