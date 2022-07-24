import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';

const Validator = SimpleVueValidation.Validator;

Vue.use(SimpleVueValidation);

export default {
    data() {
        return {
            title: '',
            content: '',
            intro: [],
        }
    },
    validators: {
        title: function (value) {
            return Validator.value(value)
        },
        content: function (value) {
            return Validator.value(value)
        },
        intro:  function (value)  {
            return Validator.value(value)
        },
        files: function (value) {
            return Validator.value(value)
        }
    },
}
