<template>
    <div class="view-auth">
        <div class="view-auth__image">
            <img :src="require('@/assets/images/Group 2218.png')" alt="Login">
        </div>

        <div class="view-auth__wrapper">
            <div class="view-auth__container">
                <main class="view-auth__content">
                    <h1 class="view-auth__title">
                        Забули пароль?
                    </h1>

                    <form 
                        @submit.prevent="submit()"
                        class="view-auth__form view-form"
                    >
                        <ViewLoader 
                            :trigger="loading"
                        />
                        <div class="view-text">
                            <p class="text-thin">
                                Введіть свій email і ми надішлемо вам інструкції з відновлення пароля
                            </p>
                        </div>
                        <div
                            :class="[$v.email.$error && 'has-error', 'view-form__group']"
                        >
                            <input type="text" class="view-form__field" name="email" placeholder="Email" v-model.trim="$v.email.$model">
                        </div>
                        <div 
                            v-if="error"
                            class="view-form__errors text-details"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="10" fill="#FF0000" fill-opacity="0.5"/>
                                <path d="M8.88963 5.6H11.1216L10.7496 11.084H9.26163L8.88963 5.6ZM10.0056 14.096C9.67763 14.096 9.40163 13.992 9.17763 13.784C8.96163 13.568 8.85363 13.308 8.85363 13.004C8.85363 12.7 8.96163 12.448 9.17763 12.248C9.39363 12.04 9.66963 11.936 10.0056 11.936C10.3416 11.936 10.6176 12.04 10.8336 12.248C11.0496 12.448 11.1576 12.7 11.1576 13.004C11.1576 13.308 11.0456 13.568 10.8216 13.784C10.6056 13.992 10.3336 14.096 10.0056 14.096Z" fill="#B10B0B"/>
                            </svg>
                            You entered an incorrect email, password, or both.
                        </div>
                        <div 
                            v-if="success"
                            class="view-form__success text-details"
                        >
                            Reset password notification sended
                        </div>
                        <div class="view-form__buttons">
                            <button class="button button--primary">Відновити пароль</button>
                            <router-link to="/login" class="text-link text-thin">Назад</router-link>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import ViewLoader from '@/components/ViewLoader/ViewLoader';
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
    data() {
        return {
            email: '',
            error: false,
            loading: false,
            success: false,
        }
    },
    components: {
        ViewLoader
    },
    mixins: [validationMixin],
    validations: {
        email: {
            required,
            email
        }
    },
    methods: {
        ...mapActions(['forgotPassword']),

        submit() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                this.success = false;
                this.error = false;
                this.loading = true;

                const data = new FormData();

                data.append('email', this.email);
                data.append('domain', 'zoz-test.webew.space');

                this.forgotPassword({ email: data }).then((response, error) => {
                    this.loading = false;
                    if (response) {
                        this.success = true;
                        this.email = null;
                        this.$v.$reset();
                    } else if (error) {
                        this.error = true;
                    }
                });
            }
        }
    },
}
</script>