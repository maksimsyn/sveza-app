<template lang="pug">
  .datepicker(
    v-click-outside='closeDropdown'
  )
    span.datepicker__label {{ label }}
    .datepicker__inner
      button(
        type='button'
        @click='toggleDropdown'
        :class='{"select__btn_focus" : isDropdownVisible}'
        ).datepicker__btn {{date ? new Date(date).toLocaleDateString() : '__-__-___'}}
      transition(name='slide-fade')
        .datepicker__dropdown(
          v-if='isDropdownVisible'
        )
          .datepicker__row
            .datepicker__select
              AppSelect(
                :label='"Месяц*"'
                :value='selectMonth'
                @input='calculateDateFromMonth($event)'
                :options='monthOptions'
                :filterable='false'
              )
            .datepicker__select
              AppSelect(
                :label='"Год*"'
                :value='selectYear'
                @input='calculateDateFromYear($event)'
                :options='yearOptions'
                :filterable='false'
              )
          client-only
            datepicker(
              @selected='calculateDateFromDay'
              v-model='date'
              :language='ru'
              :monday-first='true'
              :format='"dd.MM.yyyy"'
              :inline='true'
              ).datepicker__datepicker.datepicker__day-picker
          button(
            type='button'
            @click='closeDropdown'
          ).datepicker__submit.btn.btn_color_greenfull Выбрать
</template>

<script>
  import { ru } from 'vuejs-datepicker/dist/locale';
  import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';
  import nanoid from 'nanoid';
  import AppSelect from '@/components/ui/AppSelect/AppSelect';

  export default {
    name: 'AppDateInput',
    components: { AppSelect },
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
        monthOptions: [
          {
            title: 'Январь',
          },
          {
            title: 'Февраль',
          },
          {
            title: 'Март',
          },
          {
            title: 'Апрель',
          },
          {
            title: 'Май',
          },
          {
            title: 'Июнь',
          },
          {
            title: 'Июль',
          },
          {
            title: 'Август',
          },
          {
            title: 'Сентябрь',
          },
          {
            title: 'Октябрь',
          },
          {
            title: 'Ноябрь',
          },
          {
            title: 'Декабрь',
          },
        ],
        yearOptions: [],

        selectMonth: '',
        selectYear: '',

        date: '',
        ru,
        id: this.label,
        isDropdownVisible: false,
      };
    },
    created() {
      let START_YEAR = 1969;
      const END_YEAR = 2020;

      while (START_YEAR < END_YEAR) {
        this.yearOptions.push({
          title: START_YEAR + 1,
        });
        START_YEAR++;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.id = `id-${nanoid()}`;
      });
    },
    methods: {
      toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
      },
      closeDropdown() {
        this.isDropdownVisible = false;
        this.$emit('input', this.date);
      },
      calculateDateFromMonth(monthName) {
        this.selectMonth = monthName;
        const monthIndex = this.monthOptions?.findIndex(item => item?.title === monthName);
        const dayIndex = this.date ? new Date(this.date)?.getDate() : 1;
        const yearIndex = this.selectYear ? new Date(this.date)?.getUTCFullYear() : new Date().getUTCFullYear();

        this.date = new Date(yearIndex, monthIndex, dayIndex);
      },
      calculateDateFromYear(year) {
        this.selectYear = year;
        const monthIndex = this.selectMonth ? this.monthOptions?.findIndex(item => item?.title === this.selectMonth) : 0;
        const dayIndex = this.date ? new Date(this.date).getDate() : 1;
        const yearIndex = year;

        this.date = new Date(yearIndex, monthIndex, dayIndex);
      },
      calculateDateFromDay() {
        this.$nextTick(() => {
          this.selectMonth = this.monthOptions[new Date(this.date).getMonth()]?.title;
          this.selectYear = new Date(this.date)?.getUTCFullYear();
        });
      },
    }
  };
</script>

<style lang="sass">
  @import "AppDateInput"
</style>
