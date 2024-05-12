<template lang="pug">
  section.features
    .features__container.container
      .features__inner(data-animation='fade-up' data-delay='800')
        h2.features__title.title.title_color_black Преимущества #[br] работы
        p.features__text Для нас, сотрудников компании, «Свеза» — большая дружная семья, объединяющая города и области России.
        ul.features__list
          li(v-for='item of features').features__item
            figure.features__figure
              v-lazy-image(
                :src='item.icon'
                alt='График'
              ).features__img
            strong.features__feature {{item.title}}
</template>

<script>
  export default {
    name: 'AppFeatures',
    data() {
      return {
        features: [
          {
            icon: '/img/icons/icon-feature-1.svg',
            title: 'Стабильность'
          },
          {
            icon: '/img/icons/icon-feature-2.svg',
            title: 'Обучение и развитие'
          },
          {
            icon: '/img/icons/icon-feature-3.svg',
            title: 'Оформление по ТК РФ'
          },
          {
            icon: '/img/icons/icon-feature-4.svg',
            title: 'Медицинское обслуживание'
          },
          {
            icon: '/img/icons/icon-feature-5.svg',
            title: 'Сменный график'
          },
          {
            icon: '/img/icons/icon-feature-6.svg',
            title: 'Развозка'
          },
        ],
      };
    }
  };
</script>

<style lang="sass">
  @import "AppFeatures"
</style>
