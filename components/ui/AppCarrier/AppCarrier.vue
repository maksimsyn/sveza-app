<template lang="pug">
  section.carrier
    .carrier__container.container
      .carrier__inner(data-animation='fade-up' data-delay='800')
        h2.carrier__title.title.title_color_black Карьера #[br] в компании
        .carrier__row
          p.carrier__text Для нас, сотрудников компании, «Свеза» — большая дружная семья, объединяющая города и области России.
          .carrier__actions
            button(type='button').carrier__arrow.carrier__arrow_left
              svg-icon(
                name='icon-next'
                width='27'
                height='18'
              )
            span.carrier__counter {{currentSlide}} / {{totalSlides}}
            button(type='button' :disabled='currentSlide === 3').carrier__arrow.carrier__arrow_right
              svg-icon(
                name='icon-next'
                width='27'
                height='18'
              )
        .carrier__slider
          span.carrier__slider-counter {{currentSlide}} / {{totalSlides}}
          client-only
            swiper(
              ref='swiper'
              :options='swiperOptions'
              @slideChange='updateCounter'
              )
              swiper-slide(
                v-for='(slide, index) of 3'
                :key='`video-${index}`'
                ).carrier__slide
                .carrier__slide-inner
                  .carrier__media
                    .carrier__preview(
                      :ref='`preview${index}`'
                      )
                      button(
                        :ref='`play${index}`'
                        type='button'
                        @click='playVideo(index)'
                        aria-label='Включить видео'
                        ).carrier__play
                        svg-icon(
                          name='icon-play'
                          width='44'
                          height='44'
                        )
                      //figure.carrier__figure
                        picture.carrier__picture
                          v-lazy-image(src='http://img.youtube.com/vi/Tptly89BfUw/maxresdefault.jpg').carrier__img
                    //iframe(
                    //  :ref='`video${index}`'
                      src='https://www.youtube.com/embed/Tptly89BfUw?rel=0'
                      frameborder='0'
                      allowfullscreen
                      ).carrier__video
                    lazy-youtube-video(
                      :ref='`video${index}`'
                      src='https://www.youtube.com/embed/Tptly89BfUw?rel=0'
                      ).carrier__video
                  p.carrier__desc У нас вы можете построить своё развитие не только снизу вверх, но и по горизонтали, расширяя свои профессиональные навыки. Являясь частью крупного российского холдинга «Севергрупп»,мы также можем предложить вам профессиональный рост не только в «Свезе», но и в рамках группы компаний «Севергрупп».
              swiper-slide.carrier__slide
</template>

<script>
  export default {
    name: 'AppCarrier',
    data() {
      return {
        currentSlide: 1,
        swiperOptions: {
          speed: 1000,
          breakpointsInverse: true,
          navigation: {
            nextEl: '.carrier__arrow_right',
            prevEl: '.carrier__arrow_left'
          },
          breakpoints: {
            1024: {
              slidesPerView: 'auto',
              spaceBetween: 60,
            },
          },
        }
      };
    },
    computed: {
      totalSlides() {
        return [1, 2, 3].length;
      }
    },
    methods: {
      playVideo(index) {
        this.$refs[`preview${index}`][0].classList.add('carrier__preview_hidden');
        // this.$refs[`video${index}`][0].src += '&autoplay=1';
        this.$refs[`video${index}`][0].$el.click();
      },
      updateCounter() {
        const swiper = this.$refs.swiper.swiper;
        const activeIndex = swiper.realIndex;
        this.currentSlide = activeIndex + 1;
      }
    }
  };
</script>

<style lang="sass">
  @import "AppCarrier"
</style>
