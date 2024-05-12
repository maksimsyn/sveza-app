<template lang="pug">
  nav.main-nav
    ul.main-nav__list
      li.main-nav__item
        nuxt-link(to='/profile').main-nav__link Анкета
      li.main-nav__item
        a(
          href='https://www.sveza.ru/career/vacancies/'
          target='_blank'
          rel='noopener noreferrer nofollow'
          ).main-nav__link Вакансии
      li.main-nav__item.main-nav__item_mobile-hidden
        a(href='tel:88005000710').main-nav__link
          svg-icon(
            name='icon-call'
            width='20'
            height='24'
          )
          | 8 800 500-07-10
</template>

<script>
  export default {
    name: 'AppNav',
  };
</script>

<style lang="sass">
  @import "AppNav"
</style>
