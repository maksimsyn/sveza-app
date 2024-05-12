<template lang="pug">
  .checkbox
    strong(v-if='legend').checkbox__legend {{ legend }}
    ul.checkbox__list
      li(v-for='(option, index) of options').checkbox__group
        input(
          :true-value='option'
          :type='type'
          :id='`${id}-${index}`'
          :aria-label='option'
          :name='name'
          @input='onInput(option)'
          :value='value'
          :checked='option === value'
          aria-describedby='form-group__error'
        ).checkbox__input.visually-hidden
        label(
          :for='`${id}-${index}`'
        ).checkbox__label {{ option }}
        .form-group__errors
          span(
            v-for='(error, index) in activeErrorMessages'
            :key='`${error}-${index}`'
          ).form-group__error {{ error }}
</template>

<script>
  import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';
  import nanoid from 'nanoid';

  export default {
    name: 'AppCheckbox',
    mixins: [singleErrorExtractorMixin],
    props: {
      type: {
        type: String,
        default: 'checkbox',
      },
      legend: {
        type: String,
        default: '',
      },
      value: {
        type: [String, Number],
        default: '',
        required: true,
      },
      name: {
        type: String,
        default: '',
      },
      options: {
        type: Array,
        default: () => [],
        required: true,
      }
    },
    data() {
      return {
        id: this.legend,
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.id = `id-${nanoid()}`;
      });
    },
    methods: {
      onInput(value) {
        this.$emit('input', value);
      },
      onBlur() {
        this.$emit('blur');
      },
    }
  };
</script>

<style lang="sass">
  @import "AppCheckbox"
</style>
