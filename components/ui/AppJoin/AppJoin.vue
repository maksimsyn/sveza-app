<template lang="pug">
  section.join
    .join__container.container
      .join__inner(data-animation='fade-up' data-delay='800')
        .join__col.join__col_left
          h2.join__title.title.title_color_black Присоединяйтесь #[br] к «Свезе»!
          p.join__text Мы обеспечиваем всех сотрудников достойной заработной платой, ценным опытом и большими перспективами.
          ul.join__list
            li.join__item Интересные возможности для развития
            li.join__item Уверенность в завтрашнем дне
            li.join__item Забота о сотрудниках и их здоровье
          nuxt-link(to='/profile').join__btn.btn.btn_color_green Заполнить анкету
            svg-icon(
              name='icon-arrow-left'
              widht='5'
              height='10'
            )
        .join__col.join__col_right
          h2.join__title.join__title_mobile.title.title_color_black Присоединяйтесь #[br] к «Свезе»!
          figure.join__figure
            picture.join__pic
              v-lazy-image(src='/img/join-bg-desktop.jpg' width='500' height='750' alt='Мужчина').join__img
</template>

<script>
  export default {
    name: 'AppJoin',
  };
</script>

<style lang="sass">
  @import "AppJoin"
</style>
