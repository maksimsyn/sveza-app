<template lang="pug">
  section.profile
    .profile__container.container
      h2.profile__title.title.title_color_black Анкета
      form.profile__form
        .profile__actions
          button(
            v-show='currentStep > 0'
            type='button'
            @click='setPrevStep'
            ).profile__back
            svg-icon(
              name='icon-arrow-left'
              width='5'
              height='11'
            )
          span.profile__step Шаг {{currentStep + 1}} из 5
        fieldset.profile__fieldset(v-show='isBlockVisible(0)')
          .profile__row
            AppSelect(
              :label='"Вакансия"'
              :value='profile.vacancy'
              @input='profile.vacancy = $event'
              :validator='$v.profile.vacancy'
              @blur='$v.profile.vacancy.$touch()'
              :options='vacancies'
            ).profile__group
            AppSelect(
              :label='"Комбинат*"'
              :value='profile.plant'
              @input='profile.plant = $event'
              :options='plants'
              :validator='$v.profile.plant'
              @blur='$v.profile.plant.$touch()'
            ).profile__group
          .profile__row
            AppInput(
              :label='"Желаемый уровень дохода"'
              :value='profile.desiredLevel'
              @input='profile.desiredLevel = $event'
            ).profile__group
          .profile__row
            AppInput(
              :label='"ФИО*"'
              :value='profile.name'
              @input='profile.name = $event'
              :validator='$v.profile.name'
              @blur='$v.profile.name.$touch()'
            ).profile__group
            AppTelInput(
              :label='"Телефон*"'
              :value='profile.tel'
              @input='profile.tel = $event'
              :validator='$v.profile.tel'
              @blur='$v.profile.tel.$touch()'
            ).profile__group
          .profile__row
            AppInput(
              :label='"Адрес проживания"'
              :value='profile.currentAddress'
              @input='profile.currentAddress = $event'
            ).profile__group
            AppInput(
              :label='"Адрес по прописке"'
              :value='profile.regAddress'
              @input='profile.regAddress = $event'
            ).profile__group
          .profile__row
            AppDateInput(
              :label='"Дата рождения"'
              :value='profile.dob'
              @input='profile.dob = $event'
            ).profile__group
            AppSelect(
              :label='"Гражданство"'
              :value='profile.nationality'
              @input='profile.nationality = $event'
              :options='nationalities'
            ).profile__group
        fieldset.profile__fieldset( v-show='isBlockVisible(1)')
          legend.profile__heading Паспортные данные
          .profile__row
            AppInput(
              :label='"Номер паспорта"'
              :value='profile.passportNumber'
              @input='profile.passportNumber = $event'
            ).profile__group
            AppInput(
              :label='"Cерия"'
              :value='profile.passportSeries'
              @input='profile.passportSeries = $event'
            ).profile__group
          .profile__row
            AppInput(
              :label='"Кем выдан"'
              :value='profile.passportWhom'
              @input='profile.passportWhom = $event'
            ).profile__group
            AppInput(
              :label='"Когда выдан"'
              :value='profile.passportWhen'
              @input='profile.passportWhen = $event'
            ).profile__group
          .profile__row
            AppCheckbox(
              :type='"radio"'
              :legend='"Пол"'
              :value='profile.sex'
              @input='profile.sex = $event'
              :options='["Женский", "Мужской"]'
            ).profile__group
            AppCheckbox(
              :type='"radio"'
              :legend='"Cемейное положение"'
              :value='profile.mariage'
              @input='profile.mariage = $event'
              :options='["женат/замужем", "холост/не замужем", "разведен/разведена"]'
            ).profile__group
          .profile__row
            AppInput(
              :label='"Дети (пол, возраст)"'
              :value='profile.children'
              @input='profile.children = $event'
            ).profile__group
        fieldset.profile__fieldset(v-show='isBlockVisible(2)')
          legend.profile__heading Образование
          .profile__row
            AppCheckbox(
              :type='"radio"'
              :legend='"Основное образование"'
              :value='profile.education'
              @input='profile.education = $event'
              :options='["высшее", "неоконченное высшее", "среднее профессиональное"]'
            ).profile__group
          .profile__row
            AppDateInput(
              :label='"Год поступления"'
              :value='profile.educationStart'
              @input='profile.educationStart = $event'
            ).profile__group
            AppDateInput(
              :label='"Год окончания"'
              :value='profile.educationEnd'
              @input='profile.educationEnd = $event'
            ).profile__group
          .profile__row
            AppInput(
              :label='"Наименование учебного заведения"'
              :value='profile.educationName'
              @input='profile.educationName = $event'
            ).profile__group
            AppInput(
              :label='"Специальность, квалификация"'
              :value='profile.educationQualify'
              @input='profile.educationQualify = $event'
            ).profile__group
          .profile__row
            AppInput(
              :label='"Форма учебного заведения"'
              :value='profile.educationForm'
              @input='profile.educationForm = $event'
            ).profile__group
        fieldset.profile__fieldset(v-show='isBlockVisible(3)')
          legend.profile__heading опыт работы (за последние 5-7 лет), начиная с последнего места работы, в том числе и без оформления по трудовой книжке:
          .profile__block(
            v-for='(v, index) of $v.profile.jobs.$each.$iter' :key='`job-${index}`'
          )
            strong.profile__row-legend {{Number(index) + 1}} работа
            .profile__row
              AppDateInput(
                :label='"Дата поступления"'
                :value='v.jobStart.$model'
                @input='v.jobStart.$model = $event'
              ).profile__group
              AppDateInput(
                :label='"Дата окончании"'
                :value='v.jobEnd.$model'
                @input='v.jobEnd.$model = $event'
              ).profile__group
            .profile__row
              AppInput(
                :label='"Наименование организации"'
                :value='v.jobName.$model'
                @input='v.jobName.$model = $event'
              ).profile__group
              AppInput(
                :label='"Должность"'
                :value='v.jobPost.$model'
                @input='v.jobPost.$model = $event'
              ).profile__group
            .profile__row
              AppInput(
                :label='"Причина ухода"'
                :value='v.jobReason.$model'
                @input='v.jobReason.$model = $event'
              ).profile__group
        fieldset.profile__fieldset(v-show='isBlockVisible(4)')
          legend.profile__heading Дополнительная информация:
          .profile__row
            AppCheckbox(
              :type='"radio"'
              :legend='"Водительское удостоверение:"'
              :value='profile.driveLicense'
              @input='profile.driveLicense = $event'
              :options='["да", "нет",]'
            ).profile__group
          .profile__row
            AppCheckbox(
              :type='"radio"'
              :legend='"Категория:"'
              :value='profile.driveCategory'
              @input='profile.driveCategory = $event'
              :options='["A", "B", "C", "D", "E"]'
            ).profile__group
          .profile__row
            AppCheckbox(
              :type='"radio"'
              :legend='"Работали ли у нас ранее?"'
              :value='profile.workEarlier'
              @input='profile.workEarlier = $event'
              :options='["нет", "да"]'
            ).profile__group
          .profile__row
            AppInput(
              :label='"Где, в какой должности и в какой период?"'
              :value='profile.workWhere'
              @input='profile.workWhere = $event'
            ).profile__group.profile__group_full
          .profile__row
            AppInput(
              :label='"Работают ли у Вас родственники, знакомые в нашей компании (родство, ФИО, должность)"'
              :value='profile.workParents'
              @input='profile.workParents = $event'
            ).profile__group.profile__group_full
          .profile__row
            AppCheckbox(
              :type='"radio"'
              :legend='"Имеете ли Вы какие-либо ограничения по состоянию здоровья?"'
              :value='profile.hasDesease'
              @input='profile.hasDesease = $event'
              :options='["нет", "да"]'
            ).profile__group
          .profile__row
            AppInput(
              :label='"Какие?"'
              :value='profile.deseaseDesc'
              @input='profile.deseaseDesc = $event'
            ).profile__group.profile__group_full
          .profile__row
            AppInput(
              :label='"Источник информации о вакансии"'
              :value='profile.infoSource'
              @input='profile.infoSource = $event'
            ).profile__group
          .profile__row
            input(
              type='checkbox'
              id='agreement'
              v-model='profile.agree'
              ).profile__agree.visually-hidden
            label(for='agreement').profile__agree-label Согласие на обработку #[br] персональных данных
              a(href='/docs/personal.pdf' target='_blank' aria-label='Показать документ').profile__doc
                svg-icon(
                  name='icor-arrow-green.svg'
                  width='12'
                  height='10'
                )

        button(
          :disabled='isNextBtnDisabled'
          type='button'
          @click='setNextStep'
          ).profile__submit.btn.btn_color_greenfull {{getSubmitText}}
        AppMessage(
          v-if='isMounted'
          :isVisible='isSuccessMessageVisible'
        )
</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import { post } from '@/utils/api';
  import AppInput from '@/components/ui/AppInput/AppInput';
  import AppTelInput from '@/components/ui/AppTelInput/AppTelInput';
  import AppDateInput from '@/components/ui/AppDateInput/AppDateInput';
  import AppCheckbox from '@/components/ui/AppCheckbox/AppCheckbox';
  import AppSelect from '@/components/ui/AppSelect/AppSelect';
  import AppMessage from '@/components/ui/AppMessage/AppMessage';

  export default {
    name: 'AppProfile',
    components: { AppMessage, AppSelect, AppCheckbox, AppDateInput, AppTelInput, AppInput },
    data() {
      return {
        isMounted: false,
        isSuccessMessageVisible: false,
        isMobile: true,
        currentStep: 0,
        plants: [
          {
            title: 'СВЕЗА Усть-Ижора',
            desc: 'Колпинский район, посёлок Понтонный, ул.Фанерная, дом 5, 3 этаж'
          },
          {
            title: 'СВЕЗА Кострома',
            desc: 'Город Кострома, улица Комсомольская, дом 2, 1 этаж'
          },
          {
            title: 'СВЕЗА Уральский',
            desc: 'Пермский край, Нытвенский р-н, пос. Уральский, ул . Московская, дом 1а'
          },
          {
            title: 'СВЕЗА Мантурово',
            desc: 'Город Мантурово, ул.Матросова, дом 2Б, 2 этаж',
          },
          {
            title: 'СВЕЗА Новатор',
            desc: 'Вологодская обл., Великоустюгский район, поселок Новатор'
          },
          {
            title: 'СВЕЗА Верхняя Синячиха',
            desc: 'Алапаевский район, посёлок Верхняя Синячиха, ул.Кедровая, дом 1',
          },
          {
            title: 'СВЕЗА Тюмень',
            desc: 'Город Тюмень, ул.Камчатская, 196',
          },
          {
            title: 'СВЕЗА Ресурс',
            desc: 'Тотемский район, посёлок Советский, ул. Дачная 1А'
          },
        ],
        nationalities: [
          {
            'title': 'Австралия',
            'code': 'AU'
          },
          {
            'title': 'Австрия',
            'code': 'AT'
          },
          {
            'title': 'Азербайджан',
            'code': 'AZ'
          },
          {
            'title': 'Аландские острова',
            'code': 'AX'
          },
          {
            'title': 'Албания',
            'code': 'AL'
          },
          {
            'title': 'Алжир',
            'code': 'DZ'
          },
          {
            'title': 'Виргинские Острова (США)',
            'code': 'VI'
          },
          {
            'title': 'Американское Самоа',
            'code': 'AS'
          },
          {
            'title': 'Ангилья',
            'code': 'AI'
          },
          {
            'title': 'Ангола',
            'code': 'AO'
          },
          {
            'title': 'Андорра',
            'code': 'AD'
          },
          {
            'title': 'Антарктида',
            'code': 'AQ'
          },
          {
            'title': 'Антигуа и Барбуда',
            'code': 'AG'
          },
          {
            'title': 'Аргентина',
            'code': 'AR'
          },
          {
            'title': 'Армения',
            'code': 'AM'
          },
          {
            'title': 'Аруба',
            'code': 'AW'
          },
          {
            'title': 'Афганистан',
            'code': 'AF'
          },
          {
            'title': 'Багамские Острова',
            'code': 'BS'
          },
          {
            'title': 'Бангладеш',
            'code': 'BD'
          },
          {
            'title': 'Барбадос',
            'code': 'BB'
          },
          {
            'title': 'Бахрейн',
            'code': 'BH'
          },
          {
            'title': 'Белиз',
            'code': 'BZ'
          },
          {
            'title': 'Белоруссия',
            'code': 'BY'
          },
          {
            'title': 'Бельгия',
            'code': 'BE'
          },
          {
            'title': 'Бенин',
            'code': 'BJ'
          },
          {
            'title': 'Бермуды',
            'code': 'BM'
          },
          {
            'title': 'Болгария',
            'code': 'BG'
          },
          {
            'title': 'Боливия',
            'code': 'BO'
          },
          {
            'title': 'Бонэйр, Синт-Эстатиус и Саба',
            'code': 'BQ'
          },
          {
            'title': 'Босния и Герцеговина',
            'code': 'BA'
          },
          {
            'title': 'Ботсвана',
            'code': 'BW'
          },
          {
            'title': 'Бразилия',
            'code': 'BR'
          },
          {
            'title': 'Британская территория в Индийском океане',
            'code': 'IO'
          },
          {
            'title': 'Виргинские Острова (Великобритания)',
            'code': 'VG'
          },
          {
            'title': 'Бруней',
            'code': 'BN'
          },
          {
            'title': 'Буркина-Фасо',
            'code': 'BF'
          },
          {
            'title': 'Бурунди',
            'code': 'BI'
          },
          {
            'title': 'Бутан',
            'code': 'BT'
          },
          {
            'title': 'Вануату',
            'code': 'VU'
          },
          {
            'title': 'Ватикан',
            'code': 'VA'
          },
          {
            'title': 'Великобритания',
            'code': 'GB'
          },
          {
            'title': 'Венгрия',
            'code': 'HU'
          },
          {
            'title': 'Венесуэла',
            'code': 'VE'
          },
          {
            'title': 'Внешние малые острова США',
            'code': 'UM'
          },
          {
            'title': 'Восточный Тимор',
            'code': 'TL'
          },
          {
            'title': 'Вьетнам',
            'code': 'VN'
          },
          {
            'title': 'Габон',
            'code': 'GA'
          },
          {
            'title': 'Гаити',
            'code': 'HT'
          },
          {
            'title': 'Гайана',
            'code': 'GY'
          },
          {
            'title': 'Гамбия',
            'code': 'GM'
          },
          {
            'title': 'Гана',
            'code': 'GH'
          },
          {
            'title': 'Гваделупа',
            'code': 'GP'
          },
          {
            'title': 'Гватемала',
            'code': 'GT'
          },
          {
            'title': 'Гвиана',
            'code': 'GF'
          },
          {
            'title': 'Гвинея',
            'code': 'GN'
          },
          {
            'title': 'Гвинея-Бисау',
            'code': 'GW'
          },
          {
            'title': 'Германия',
            'code': 'DE'
          },
          {
            'title': 'Гернси',
            'code': 'GG'
          },
          {
            'title': 'Гибралтар',
            'code': 'GI'
          },
          {
            'title': 'Гондурас',
            'code': 'HN'
          },
          {
            'title': 'Гонконг',
            'code': 'HK'
          },
          {
            'title': 'Гренада',
            'code': 'GD'
          },
          {
            'title': 'Гренландия',
            'code': 'GL'
          },
          {
            'title': 'Греция',
            'code': 'GR'
          },
          {
            'title': 'Грузия',
            'code': 'GE'
          },
          {
            'title': 'Гуам',
            'code': 'GU'
          },
          {
            'title': 'Дания',
            'code': 'DK'
          },
          {
            'title': 'Джерси',
            'code': 'JE'
          },
          {
            'title': 'Джибути',
            'code': 'DJ'
          },
          {
            'title': 'Доминика',
            'code': 'DM'
          },
          {
            'title': 'Доминиканская Республика',
            'code': 'DO'
          },
          {
            'title': 'ДР Конго',
            'code': 'CD'
          },
          {
            'title': ' Европейский союз',
            'code': 'EU'
          },
          {
            'title': 'Египет',
            'code': 'EG'
          },
          {
            'title': 'Замбия',
            'code': 'ZM'
          },
          {
            'title': 'САДР',
            'code': 'EH'
          },
          {
            'title': 'Зимбабве',
            'code': 'ZW'
          },
          {
            'title': 'Израиль',
            'code': 'IL'
          },
          {
            'title': ' Индия',
            'code': 'IN'
          },
          {
            'title': 'Индонезия',
            'code': 'ID'
          },
          {
            'title': 'Иордания',
            'code': 'JO'
          },
          {
            'title': 'Ирак',
            'code': 'IQ'
          },
          {
            'title': 'Иран',
            'code': 'IR'
          },
          {
            'title': 'Ирландия',
            'code': 'IE'
          },
          {
            'title': 'Исландия',
            'code': 'IS'
          },
          {
            'title': 'Испания',
            'code': 'ES'
          },
          {
            'title': 'Италия',
            'code': 'IT'
          },
          {
            'title': 'Йемен',
            'code': 'YE'
          },
          {
            'title': 'Кабо-Верде',
            'code': 'CV'
          },
          {
            'title': 'Казахстан',
            'code': 'KZ'
          },
          {
            'title': 'Острова Кайман',
            'code': 'KY'
          },
          {
            'title': 'Камбоджа',
            'code': 'KH'
          },
          {
            'title': 'Камерун',
            'code': 'CM'
          },
          {
            'title': 'Канада',
            'code': 'CA'
          },
          {
            'title': 'Катар',
            'code': 'QA'
          },
          {
            'title': 'Кения',
            'code': 'KE'
          },
          {
            'title': 'Кипр',
            'code': 'CY'
          },
          {
            'title': 'Киргизия',
            'code': 'KG'
          },
          {
            'title': 'Кирибати',
            'code': 'KI'
          },
          {
            'title': 'Китайская Республика',
            'code': 'TW'
          },
          {
            'title': 'КНДР (Корейская Народно-Демократическая Республика)',
            'code': 'KP'
          },
          {
            'title': 'Китай (Китайская Народная Республика)',
            'code': 'CN'
          },
          {
            'title': 'Кокосовые острова',
            'code': 'CC'
          },
          {
            'title': 'Колумбия',
            'code': 'CO'
          },
          {
            'title': 'Коморы',
            'code': 'KM'
          },
          {
            'title': 'Коста-Рика',
            'code': 'CR'
          },
          {
            'title': 'Кот-д’Ивуар',
            'code': 'CI'
          },
          {
            'title': 'Куба',
            'code': 'CU'
          },
          {
            'title': 'Кувейт',
            'code': 'KW'
          },
          {
            'title': 'Кюрасао',
            'code': 'CW'
          },
          {
            'title': 'Лаос',
            'code': 'LA'
          },
          {
            'title': 'Латвия',
            'code': 'LV'
          },
          {
            'title': 'Лесото',
            'code': 'LS'
          },
          {
            'title': 'Либерия',
            'code': 'LR'
          },
          {
            'title': 'Ливан',
            'code': 'LB'
          },
          {
            'title': 'Ливия',
            'code': 'LY'
          },
          {
            'title': 'Литва',
            'code': 'LT'
          },
          {
            'title': 'Лихтенштейн',
            'code': 'LI'
          },
          {
            'title': 'Люксембург',
            'code': 'LU'
          },
          {
            'title': 'Маврикий',
            'code': 'MU'
          },
          {
            'title': 'Мавритания',
            'code': 'MR'
          },
          {
            'title': 'Мадагаскар',
            'code': 'MG'
          },
          {
            'title': 'Майотта',
            'code': 'YT'
          },
          {
            'title': 'Макао',
            'code': 'MO'
          },
          {
            'title': 'Северная Македония',
            'code': 'MK'
          },
          {
            'title': 'Малави',
            'code': 'MW'
          },
          {
            'title': 'Малайзия',
            'code': 'MY'
          },
          {
            'title': 'Мали',
            'code': 'ML'
          },
          {
            'title': 'Мальдивы',
            'code': 'MV'
          },
          {
            'title': 'Мальта',
            'code': 'MT'
          },
          {
            'title': 'Марокко',
            'code': 'MA'
          },
          {
            'title': 'Мартиника',
            'code': 'MQ'
          },
          {
            'title': 'Маршалловы Острова',
            'code': 'MH'
          },
          {
            'title': 'Мексика',
            'code': 'MX'
          },
          {
            'title': 'Микронезия',
            'code': 'FM'
          },
          {
            'title': 'Мозамбик',
            'code': 'MZ'
          },
          {
            'title': 'Молдавия',
            'code': 'MD'
          },
          {
            'title': 'Монако',
            'code': 'MC'
          },
          {
            'title': 'Монголия',
            'code': 'MN'
          },
          {
            'title': 'Монтсеррат',
            'code': 'MS'
          },
          {
            'title': 'Мьянма',
            'code': 'MM'
          },
          {
            'title': 'Намибия',
            'code': 'NA'
          },
          {
            'title': 'Науру',
            'code': 'NR'
          },
          {
            'title': 'Непал',
            'code': 'NP'
          },
          {
            'title': 'Нигер',
            'code': 'NE'
          },
          {
            'title': 'Нигерия',
            'code': 'NG'
          },
          {
            'title': 'Нидерланды',
            'code': 'NL'
          },
          {
            'title': 'Никарагуа',
            'code': 'NI'
          },
          {
            'title': 'Ниуэ',
            'code': 'NU'
          },
          {
            'title': 'Новая Зеландия',
            'code': 'NZ'
          },
          {
            'title': 'Новая Каледония',
            'code': 'NC'
          },
          {
            'title': 'Норвегия',
            'code': 'NO'
          },
          {
            'title': 'ОАЭ',
            'code': 'AE'
          },
          {
            'title': 'Оман',
            'code': 'OM'
          },
          {
            'title': 'Остров Буве',
            'code': 'BV'
          },
          {
            'title': 'Остров Мэн',
            'code': 'IM'
          },
          {
            'title': 'Острова Кука',
            'code': 'CK'
          },
          {
            'title': 'Остров Норфолк',
            'code': 'NF'
          },
          {
            'title': 'Остров Рождества',
            'code': 'CX'
          },
          {
            'title': 'Острова Питкэрн',
            'code': 'PN'
          },
          {
            'title': 'Острова Святой Елены, Вознесения и Тристан-да-Кунья',
            'code': 'SH'
          },
          {
            'title': 'Пакистан',
            'code': 'PK'
          },
          {
            'title': 'Палау',
            'code': 'PW'
          },
          {
            'title': 'Государство Палестина',
            'code': 'PS'
          },
          {
            'title': 'Панама',
            'code': 'PA'
          },
          {
            'title': 'Папуа — Новая Гвинея',
            'code': 'PG'
          },
          {
            'title': 'Парагвай',
            'code': 'PY'
          },
          {
            'title': 'Перу',
            'code': 'PE'
          },
          {
            'title': 'Польша',
            'code': 'PL'
          },
          {
            'title': 'Португалия',
            'code': 'PT'
          },
          {
            'title': 'Пуэрто-Рико',
            'code': 'PR'
          },
          {
            'title': 'Республика Конго',
            'code': 'CG'
          },
          {
            'title': 'Республика Корея',
            'code': 'KR'
          },
          {
            'title': 'Реюньон',
            'code': 'RE'
          },
          {
            'title': 'Россия',
            'code': 'RU'
          },
          {
            'title': 'Руанда',
            'code': 'RW'
          },
          {
            'title': 'Румыния',
            'code': 'RO'
          },
          {
            'title': 'Сальвадор',
            'code': 'SV'
          },
          {
            'title': 'Самоа',
            'code': 'WS'
          },
          {
            'title': 'Сан-Марино',
            'code': 'SM'
          },
          {
            'title': 'Сан-Томе и Принсипи',
            'code': 'ST'
          },
          {
            'title': 'Саудовская Аравия',
            'code': 'SA'
          },
          {
            'title': 'Эсватини',
            'code': 'SZ'
          },
          {
            'title': 'Северные Марианские Острова',
            'code': 'MP'
          },
          {
            'title': 'Сейшельские Острова',
            'code': 'SC'
          },
          {
            'title': 'Сен-Бартелеми (Карибы)',
            'code': 'BL'
          },
          {
            'title': 'Сен-Мартен',
            'code': 'MF'
          },
          {
            'title': 'Сен-Пьер и Микелон',
            'code': 'PM'
          },
          {
            'title': 'Сенегал',
            'code': 'SN'
          },
          {
            'title': 'Сент-Винсент и Гренадины',
            'code': 'VC'
          },
          {
            'title': 'Сент-Китс и Невис',
            'code': 'KN'
          },
          {
            'title': 'Сент-Люсия',
            'code': 'LC'
          },
          {
            'title': 'Сербия',
            'code': 'RS'
          },
          {
            'title': 'Сингапур',
            'code': 'SG'
          },
          {
            'title': 'Синт-Мартен',
            'code': 'SX'
          },
          {
            'title': 'Сирия',
            'code': 'SY'
          },
          {
            'title': 'Словакия',
            'code': 'SK'
          },
          {
            'title': 'Словения',
            'code': 'SI'
          },
          {
            'title': 'Соломоновы Острова',
            'code': 'SB'
          },
          {
            'title': 'Сомали',
            'code': 'SO'
          },
          {
            'title': 'Судан',
            'code': 'SD'
          },
          {
            'title': 'Суринам',
            'code': 'SR'
          },
          {
            'title': 'США',
            'code': 'US'
          },
          {
            'title': 'Сьерра-Леоне',
            'code': 'SL'
          },
          {
            'title': 'Таджикистан',
            'code': 'TJ'
          },
          {
            'title': 'Таиланд',
            'code': 'TH'
          },
          {
            'title': 'Танзания',
            'code': 'TZ'
          },
          {
            'title': 'Теркс и Кайкос',
            'code': 'TC'
          },
          {
            'title': 'Того',
            'code': 'TG'
          },
          {
            'title': 'Токелау',
            'code': 'TK'
          },
          {
            'title': 'Тонга',
            'code': 'TO'
          },
          {
            'title': 'Тринидад и Тобаго',
            'code': 'TT'
          },
          {
            'title': 'Тувалу',
            'code': 'TV'
          },
          {
            'title': 'Тунис',
            'code': 'TN'
          },
          {
            'title': 'Туркмения',
            'code': 'TM'
          },
          {
            'title': 'Турция',
            'code': 'TR'
          },
          {
            'title': 'Уганда',
            'code': 'UG'
          },
          {
            'title': 'Узбекистан',
            'code': 'UZ'
          },
          {
            'title': 'Украина',
            'code': 'UA'
          },
          {
            'title': 'Уоллис и Футуна',
            'code': 'WF'
          },
          {
            'title': 'Уругвай',
            'code': 'UY'
          },
          {
            'title': 'Фарерские острова',
            'code': 'FO'
          },
          {
            'title': 'Фиджи',
            'code': 'FJ'
          },
          {
            'title': 'Филиппины',
            'code': 'PH'
          },
          {
            'title': 'Финляндия',
            'code': 'FI'
          },
          {
            'title': 'Фолклендские острова',
            'code': 'FK'
          },
          {
            'title': 'Франция',
            'code': 'FR'
          },
          {
            'title': 'Французская Полинезия',
            'code': 'PF'
          },
          {
            'title': 'Французские Южные и Антарктические территории',
            'code': 'TF'
          },
          {
            'title': 'Херд и Макдональд',
            'code': 'HM'
          },
          {
            'title': 'Хорватия',
            'code': 'HR'
          },
          {
            'title': 'ЦАР',
            'code': 'CF'
          },
          {
            'title': 'Чад',
            'code': 'TD'
          },
          {
            'title': 'Черногория',
            'code': 'ME'
          },
          {
            'title': 'Чехия',
            'code': 'CZ'
          },
          {
            'title': 'Чили',
            'code': 'CL'
          },
          {
            'title': 'Швейцария',
            'code': 'CH'
          },
          {
            'title': 'Швеция',
            'code': 'SE'
          },
          {
            'title': ' Шпицберген и Ян-Майен',
            'code': 'SJ'
          },
          {
            'title': 'Шри-Ланка',
            'code': 'LK'
          },
          {
            'title': 'Эквадор',
            'code': 'EC'
          },
          {
            'title': 'Экваториальная Гвинея',
            'code': 'GQ'
          },
          {
            'title': 'Эритрея',
            'code': 'ER'
          },
          {
            'title': 'Эстония',
            'code': 'EE'
          },
          {
            'title': 'Эфиопия',
            'code': 'ET'
          },
          {
            'title': 'ЮАР',
            'code': 'ZA'
          },
          {
            'title': 'Южная Георгия и Южные Сандвичевы Острова',
            'code': 'GS'
          },
          {
            'title': 'Южный Судан',
            'code': 'SS'
          },
          {
            'title': 'Ямайка',
            'code': 'JM'
          },
          {
            'title': 'Япония',
            'code': 'JP'
          }
        ],
        vacancies: [
          {
            title: 'Электросварщик ручной сварки'
          },
          {
            title: 'Окорщик'
          },
          {
            title: 'Оператор агрегатных линий сортировки и переработки бревен'
          },
          {
            title: 'Оператор подачи сырья'
          },
          {
            title: 'Аппаратчик по производству синтетических клеящих смол'
          },
          {
            title: 'Слесарь по ремонту металлообрабатывающего оборудования сортировщик шпона и фанеры (доработка, с правом управления автопогрузчиком)'
          },
          {
            title: 'Транспортировщик'
          },
          {
            title: 'Токарь'
          },
          {
            title: 'Каменщик'
          },
          {
            title: 'Сортировщик шпона и фанеры (маркировка)'
          },
          {
            title: 'Оператор на автоматических и полуавтоматических линиях в деревообработке (с правом управления автопогрузчиком)'
          },
          {
            title: 'Фрезеровщик'
          },
        ],

        profile: {
          vacancy: '',
          plant: '',
          desiredLevel: '',
          name: '',
          tel: '',
          currentAddress: '',
          regAddress: '',
          dob: '',
          nationality: '',

          passportNumber: '',
          passportSeries: '',
          passportWhom: '',
          passportWhen: '',

          sex: '',
          mariage: '',
          children: '',

          education: '',
          educationStart: '',
          educationEnd: '',
          educationName: '',
          educationQualify: '',
          educationForm: '',

          jobs: [
            {
              jobStart: '',
              jobEnd: '',
              jobName: '',
              jobPost: '',
              jobReason: ''
            },
            {
              jobStart: '',
              jobEnd: '',
              jobName: '',
              jobPost: '',
              jobReason: ''
            },
            {
              jobStart: '',
              jobEnd: '',
              jobName: '',
              jobPost: '',
              jobReason: ''
            }
          ],

          driveLicense: '',
          driveCategory: '',
          workEarlier: '',
          workParents: '',
          workWhere: '',
          hasDesease: '',
          deseaseDesc: '',
          infoSource: '',

          agree: '',
        }
      };
    },
    validations: {
      profile: {
        // Шаг 1
        vacancy: {},
        plant: {
          required
        },
        desiredLevel: {},
        name: {
          required,
        },
        tel: {
          required,
        },
        nationality: {},
        dob: {},
        currentAddress: {},
        regAddress: {},
        // Шаг 2
        passportNumber: {},
        passportSeries: {},
        passportWhom: {},
        passportWhen: {},
        sex: {},
        mariage: {},
        children: {},
        // Шаг 3
        education: {},
        educationStart: {},
        educationEnd: {},
        educationName: {},
        educationQualify: {},
        educationForm: {},
        // Шаг 4
        jobs: {
          $each: {
            jobStart: {},
            jobEnd: {},
            jobName: {},
            jobPost: {},
            jobReason: {}
          }
        },
        // Шаг 5
        driveLicense: {},
        driveCategory: {},
        workEarlier: {},
        workWhere: {},
        workParents: {},
        hasDesease: {},
        deseaseDesc: {},
        infoSource: {},
      },
      step1: ['profile.vacancy', 'profile.plant', 'profile.desiredLevel',
        'profile.name', 'profile.tel', 'profile.nationality', 'profile.dob', 'profile.currentAddress', 'profile.regAddress'],
      step2: ['profile.passportNumber', 'profile.passportSeries', 'profile.passportWhom', 'profile.passportWhen', 'profile.sex',
        'profile.mariage', 'profile.children'],
      step3: ['profile.education', 'profile.educationStart', 'profile.educationEnd', 'profile.educationName', 'profile.educationQualify',
        'profile.educationForm'],
      step4: ['profile.jobs'],
      step5: ['profile.driveLicense', 'profile.driveCategory', 'profile.workEarlier', 'profile.workWhere',
        'profile.workParents', 'profile.hasDesease', 'profile.deseaseDesc', 'profile.infoSource'],
    },
    computed: {
      isNextBtnDisabled() {
        if (this.isMobile) {
          const current = this.currentStep;
          return this.$v[`step${current + 1}`].$invalid;
        }

        return false;
      },
      getSubmitText() {
        if (!this.isMobile) {
          return 'Отправить';
        } else if (this.currentStep === 4) {
          return 'Отправить';
        }

        return 'Далее';
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.isMounted = true;

        if ('activeElement' in document) {
          document.activeElement.blur();
        }
      });

      if (window.matchMedia('(min-width: 1024px)').matches) {
        this.isMobile = false;
      }
    },
    beforeDestroy() {
      this.isSuccessMessageVisible = false;
    },
    methods: {
      setPrevStep() {
        this.currentStep--;
      },
      async setNextStep() {
        if (this.currentStep === 4 || !this.isMobile) {
          this.$v.$touch();

          if (this.$v.$invalid) {
            this.$nextTick(() => {
              const firstError = document.querySelector('.errors__error');
              this.$scrollTo(firstError, 1000, { offset: -(window.screen.height / 2) });
            });
          } else {
            try {
              const profile = this.profile;
              const nationalityIndex = this.nationalities.findIndex(item => item.title === profile.nationality);
              const countryCode = this.nationalities[nationalityIndex].code;

              const data = {
                vacancy: profile.vacancy,
                profit: profile.desiredLevel,
                fio: profile.name,
                phone_code: profile.tel.code,
                phone: profile.tel.num,
                address: profile.currentAddress,
                'address-registration': profile.regAddress,
                birth: profile.dob,
                country_code: countryCode,
                plant: profile.plant,
                gender: profile.sex,
                marital_status: profile.mariage,
                childs: profile.children,
                education: profile.education,
                receipt_date: profile.educationStart,
                expiration_date: profile.educationEnd,
                institution: profile.educationName,
                specialty: profile.educationQualify,
                school_uniform: profile.educationForm,

                work_1_date_1: profile.jobs[0].jobStart,
                work_1_date_2: profile.jobs[0].jobEnd,
                work_1_name: profile.jobs[0].jobName,
                work_1_position: profile.jobs[0].jobPost,
                work_1_leave: profile.jobs[0].jobReason,

                work_2_date_1: profile.jobs[1].jobStart,
                work_2_date_2: profile.jobs[1].jobEnd,
                work_2_name: profile.jobs[1].jobName,
                work_2_position: profile.jobs[1].jobPost,
                work_2_leave: profile.jobs[1].jobReason,

                work_3_date_1: profile.jobs[2].jobStart,
                work_3_date_2: profile.jobs[2].jobEnd,
                work_3_name: profile.jobs[2].jobName,
                work_3_position: profile.jobs[2].jobPost,
                work_3_leave: profile.jobs[2].jobReason,

                driver_license: profile.driveLicense,
                category: profile.driveCategory,
                worked: profile.workEarlier,
                form_text_1: profile.workParents,
                form_text_2: profile.workWhere,
                health: profile.hasDesease,
                health_text: profile.deseaseDesc,
                source: profile.infoSource,
              };
              const response = await post('/request.php', data);

              if (response.success) {
                this.isSuccessMessageVisible = true;
              }
            } catch (error) {
              alert('Ошибка при отправке формы. Попробуйте позже');
            }
          }
        } else if (this.isMobile) {
          this.currentStep++;
          const el = document.querySelector('#app');
          this.$scrollTo(el, 600, {});
        }
      },
      isBlockVisible(index) {
        const current = this.currentStep;
        const isMobile = this.isMobile;

        if (isMobile) {
          return current === index;
        } else {
          return true;
        }
      },
    }
  };
</script>

<style lang="sass">
  @import "AppProfile"
</style>
