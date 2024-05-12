<template lang="pug">
  section.contacts
    .contacts__container.container
      .contacts__inner(data-animation='fade-up' data-delay='800')
        .contacts__col.contacts__col_left
          h2.contacts__title.title.title_color_black Контакты
          p.contacts__text Запись на собеседование #[br] на рабочие вакансии
          a(href='tel:8 800 500-07-10').contacts__link 8 800 500-07-10
          p.contacts__desc Круглосуточно, #[br] бесплатно по России
        .contacts__col.contacts__col_right
          .contacts__map
            .contacts__map-wrapper
              button(
                v-for='(dot, index) of 8'
                type='button'
                @click='activeIndex = index'
                :class='{"contacts__dot_active" : activeIndex === index}'
                aria-label='Показать контакты'
                ).contacts__dot
              v-lazy-image(src='/img/contacts-map.svg' alt='Карта России').contacts__img
          .contacts__addresses(:class='{"contacts__addresses_active" : activeIndex !== null}')
            h3.contacts__subtitle “Свеза Верхняя Синячиха”
            p.contacts__address Свердловская обл., Алапаевский р-н, пос. Верхняя Синячиха, ул. Кедровая, д. 1
            a(href='tel:+7 34346 9-73-18').contacts__address-link +7 34346 9-73-18

</template>

<script>
  export default {
    name: 'AppContacts',
    data() {
      return {
        activeIndex: null,
      };
    }
  };
</script>

<style lang="sass">
  @import "AppContacts"
</style>
