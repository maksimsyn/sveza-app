<template lang="pug">
  .intro
    .intro__container.container.container_big
      .intro__inner
        .intro__col.intro__col_left
          h1.intro__title.title.title_color_white Стань #[br] частью #[br] «Свезы»
          h2.intro__subtitle Мировой лидер по производству березовой фанеры
        .intro__col.intro__col_right
          nuxt-link(to='/profile').btn.btn_color_white.intro__btn.intro__btn_white Заполнить анкету
          a(
            href='https://www.sveza.ru/career/vacancies/'
            target='_blank'
            rel='noopener noreferrer nofollow'
            ).btn.btn_color_transparent.intro__btn.intro__btn_transparent Вакансии
      button(
        type='button'
        v-scroll-to='{el: "#about", duration: 1000, offset: -78}'
        ).intro__more
        svg-icon(
          name='icon-more'
          width='16'
          height='35'
        )
        | Узнать больше
</template>

<script>
  export default {
    name: 'AppIntro',
  };
</script>

<style lang="sass">
  @import "AppIntro"
</style>
