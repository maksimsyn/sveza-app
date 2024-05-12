<template lang="pug">
  .form-group
    label(
      v-if='label'
      :for='id'
    ).form-group__label.label {{ label }}
    input(
      :type='type'
      :id='id'
      :aria-label='label'
      :name='name'
      @input='onInput($event)'
      @blur='onBlur'
      :value='value'
      aria-describedby='form-group__error'
      :autocomplete='autocomplete'
      :placeholder='placeholder'
      :class='{"form-group__input_invalid" : isInvalid}'
    ).form-group__input.input
    .errors
      span(
        v-for='(error, index) in activeErrorMessages'
        :key='`${error}-${index}`'
      ).errrors__error {{ error }}
</template>

<script>
  import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';
  import nanoid from 'nanoid';

  export default {
    name: 'AppInput',
    mixins: [singleErrorExtractorMixin],
    props: {
      type: {
        type: String,
        default: 'text',
      },
      label: {
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
      placeholder: {
        type: String,
        default: '',
      },
      autocomplete: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        id: null,
      };
    },
    computed: {
      isInvalid() {
        return this.activeErrorMessages.length > 0;
      },
    },
    mounted() {
      this.id = `id-${nanoid()}`;
    },
    methods: {
      onInput(event) {
        this.$emit('input', event.target.value);
      },
      onBlur() {
        this.$emit('blur');
      },
    }
  };
</script>

<style lang="sass">
  @import "AppInput"
</style>
