<template lang="pug">
  header.page-header
    .page-header__container.container.container_big
      nuxt-link(to='/').page-header__home
        picture.page-header__pic
          img(
            src='/img/logo.svg'
            width='108'
            height='46'
            alt='СВЕЗА'
          ).page-header__img
      AppNav
</template>

<script>
  import AppNav from '@/components/partials/AppNav/AppNav';

  export default {
    name: 'AppHeader',
    components: { AppNav },
  };
</script>

<style lang="sass">
  @import "AppHeader"
</style>
