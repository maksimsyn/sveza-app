<template lang="pug">
  .form-group
    label(
      v-if='label'
    ).form-group__label.label {{ label }}
    .form-group__row
      client-only
        AppInput(slot='placeholder' :value='" "')
        vue-phone-number-input(
          ref='tel'
          v-model='tel'
          :border-radius='0'
          :no-flags='true'
          :show-code-on-list='true'
          :no-example='true'
          :translations='{phoneNumberLabel: "___-____-_____"}'
          @phone-number-blur='onBlur'
          @update='onInput'
          :no-validator-state='true'
          :default-country-code='"RU"'
          :class='{"form-group__tel-input_invalid" : isInvalid}'
        ).form-group__tel-input
    .errors
      span(
        v-for='(error, index) in activeErrorMessages'
        :key='`${error}-${index}`'
      ).errors__error {{ error }}
</template>

<script>
  import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';
  import nanoid from 'nanoid';
  import AppInput from '@/components/ui/AppInput/AppInput';

  export default {
    name: 'AppTelInput',
    components: { AppInput },
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
        id: this.label,
        tel: '',
      };
    },
    computed: {
      isInvalid() {
        return this.activeErrorMessages.length > 0;
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.id = `id-${nanoid()}`;
      });
    },
    methods: {
      onInput(event) {
        // console.log(event);
        this.$emit('input', {
          code: event.countryCallingCode,
          num: event.phoneNumber,
        });
      },
      onBlur() {
        this.$emit('blur');
      },
    },
  };
</script>

<style lang="sass">
  @import "AppTelInput"
</style>
