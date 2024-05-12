<template lang="pug">
  .select(
    v-click-outside='closeDropdown'
    )
    span(
      @click='toggleDropdown'
    ).select__legend {{ label }}
    .select__inner
      button(
        type='button'
        @click='toggleDropdown'
        :class='{"select__btn_focus" : isDropdownVisible, "select__btn_invalid" : isInvalid}'
        ).select__btn
        span.select__content {{ value }}
        svg-icon(
          name='icon-select-arrow'
          width='13'
          height='8'
        )
      transition(name='slide-fade')
        .select__dropdown(
          v-if='isDropdownVisible'
        )
          input(
            v-if='filterable'
            type='text'
            placeholder='Поиск'
            v-model='searchQuery'
            ).select__filter
          ul.select__list
            li(
              v-for='(option, index) of getOptions'
            ).select__item
              input(
                type='radio'
                :id='`${id}-${index}`'
                :value='option.title'
                v-model='currentValue'
              ).select__radio.visually-hidden
              label(
                :for='`${id}-${index}`'
              ).select__label
                strong.select__name {{option.title}}
                span(v-if='option.desc').select__desc {{option.desc}}
    .errors
      span(
        v-for='(error, index) in activeErrorMessages'
        :key='`${error}-${index}`'
      ).errors__error {{ error }}
</template>

<script>
  import nanoid from 'nanoid';
  import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';

  export default {
    name: 'AppSelect',
    mixins: [singleErrorExtractorMixin],
    props: {
      label: {
        type: String,
        default: '',
      },
      options: {
        type: Array,
        default: () => [],
        required: true
      },
      filterable: {
        type: Boolean,
        default: true,
      },
      value: {
        type: [String, Number],
        default: '',
      }
    },
    data() {
      return {
        currentValue: '',
        searchQuery: '',
        id: this.label,
        isDropdownVisible: false,
        isDirty: false,
      };
    },
    computed: {
      isInvalid() {
        return this.activeErrorMessages.length > 0;
      },
      getOptions() {
        if (this.searchQuery) {
          return this.options.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }

        return this.options;
      }
    },
    watch: {
      currentValue(newValue) {
        if (newValue) {
          this.isDropdownVisible = false;
          this.$emit('input', newValue);
        }
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.id = `id-${nanoid()}`;
      });
    },
    methods: {
      toggleDropdown() {
        this.isDirty = true;
        this.isDropdownVisible = !this.isDropdownVisible;
      },
      closeDropdown() {
        this.isDropdownVisible = false;
        if (this.isDirty) {
          this.$emit('blur');
        }
      }
    }
  };
</script>

<style lang="sass">
  @import "AppSelect"
</style>
