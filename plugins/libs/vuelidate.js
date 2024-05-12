import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VuelidateErrorExtractor from 'vuelidate-error-extractor';
import AppInput from '@/components/ui/AppInput/AppInput';

Vue.use(Vuelidate);
Vue.component('form-group', AppInput);
Vue.use(VuelidateErrorExtractor, {
  messages: {
    required: 'Поле обязательно для заполнения',
    numeric: 'Допустимы только цифры',
    url: 'Адрес должен быть вида https://example.com',
    email: 'Email должен быть формата example@emample.com',
    minLength: 'Минимальная длина: {min} символов',
  },
});
