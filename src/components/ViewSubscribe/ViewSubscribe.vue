<template>
  <div class="view-subscribe">
    <h3 class="view-title view-title--h3">Хочеш отримувати найцікавіше першим?</h3>
    <span class="view-subscribe-undertitle">Підпишись на розсилку</span>
    <form @submit.prevent="submit" class="view-form">
        <div
            :class="[$v.name.$error && 'has-error', 'view-form__group']"
        >
            <input type="text" class="view-form__field" name="name" placeholder="Ім’я"  v-model.trim="$v.name.$model">
        </div>
        <div
            :class="[$v.email.$error && 'has-error', 'view-form__group']"
        >
            <input type="text" class="view-form__field" name="email" placeholder="Email" v-model.trim="$v.email.$model">
        </div>
        <label class="view-form__checkbox" :class="{anim : personalDataError}">
            <input type="checkbox" v-model="personalData">
            <span class="text-details text-thin">Дозвіл на обробку особистих даних</span>
        </label>
        <button class="button button--details" type="submit" >Підписатися</button>
        <div 
            v-if="submitStatus === 'ERROR'"
            class="view-form__errors text-details"
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#FF0000" fill-opacity="0.5"/>
                <path d="M8.88963 5.6H11.1216L10.7496 11.084H9.26163L8.88963 5.6ZM10.0056 14.096C9.67763 14.096 9.40163 13.992 9.17763 13.784C8.96163 13.568 8.85363 13.308 8.85363 13.004C8.85363 12.7 8.96163 12.448 9.17763 12.248C9.39363 12.04 9.66963 11.936 10.0056 11.936C10.3416 11.936 10.6176 12.04 10.8336 12.248C11.0496 12.448 11.1576 12.7 11.1576 13.004C11.1576 13.308 11.0456 13.568 10.8216 13.784C10.6056 13.992 10.3336 14.096 10.0056 14.096Z" fill="#B10B0B"/>
            </svg>
            Будь ласка, заповніть форму правильно.
        </div>
        <p v-if="submitStatus === 'OK'">Ви успішно підписані на новини!</p>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
    data(){
        return {
            email: '',
            name: '',
            personalData: false,
            personalDataError: false,
            error: false,
            submitStatus: null
        }
    },
    mixins: [validationMixin],
    validations: {
        email: {
            required,
            email
        },
        name: {
            required,
            minLength: minLength(2)
        }
    },
    methods: {
        submit() {
            if(this.personalData) {
                this.personalDataError = false
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {

                    // submit logic here

                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                    this.submitStatus = 'OK'
                    }, 500)
                }
            } else {
                this.personalDataError = false
                this.personalDataError = true
            }
        }
    }
}
</script>