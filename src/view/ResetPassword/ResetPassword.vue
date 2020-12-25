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
                            <div class="view-form__group__error">
                                <span
                                    v-if="!$v.email.required"
                                >
                                    Обов'язкове поле.
                                </span>
                                <span 
                                    v-if="!$v.email.email"
                                >
                                    Невалідна пошта.
                                </span>
                            </div>
                        </div>
                        <div
                            :class="[$v.password.$error && 'has-error', 'view-form__group']"
                        >
                            <input v-model.trim="$v.password.$model" type="password" class="view-form__field" name="password" placeholder="Пароль">
                            <div class="view-form__group__error">
                                <span
                                    v-if="!$v.password.minLength"
                                >
                                    Мінімальна довжина паролю: 6 символів.
                                </span>
                                <span
                                    v-if="!$v.password.required"
                                >
                                    Обов'язкове поле.
                                </span>
                                <span 
                                    v-if="!$v.password.alpha"
                                >
                                    Невалідний пароль. Пароль має містити: велику літеру, цифру та символ.
                                </span>
                            </div>
                        </div>
                        <div
                            :class="[$v.rePassword.$error && 'has-error', 'view-form__group']"
                        >
                            <input v-model.trim="$v.rePassword.$model" type="password" class="view-form__field" name="rePassword" placeholder="Повторити пароль">
                            <div class="view-form__group__error">
                                <span
                                    v-if="!$v.rePassword.sameAsPassword"
                                >
                                    Паролі не співпадають.
                                </span>
                                <span 
                                    v-if="!$v.rePassword.required"
                                >
                                    Обов'язкове поле.
                                </span>
                            </div>
                        </div>
                        <div 
                            v-if="error"
                            class="view-form__errors text-details"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="10" fill="#FF0000" fill-opacity="0.5"/>
                                <path d="M8.88963 5.6H11.1216L10.7496 11.084H9.26163L8.88963 5.6ZM10.0056 14.096C9.67763 14.096 9.40163 13.992 9.17763 13.784C8.96163 13.568 8.85363 13.308 8.85363 13.004C8.85363 12.7 8.96163 12.448 9.17763 12.248C9.39363 12.04 9.66963 11.936 10.0056 11.936C10.3416 11.936 10.6176 12.04 10.8336 12.248C11.0496 12.448 11.1576 12.7 11.1576 13.004C11.1576 13.308 11.0456 13.568 10.8216 13.784C10.6056 13.992 10.3336 14.096 10.0056 14.096Z" fill="#B10B0B"/>
                            </svg>
                            Посилання на зміну паролю - застріле або не активне
                        </div>
                        <div 
                            v-if="success"
                            class="view-form__success text-details"
                        >
                            Пароль успішно оновленний!
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
import { required, email, minLength, sameAs, helpers } from 'vuelidate/lib/validators';

const alpha = helpers.regex('alpha', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

export default {
    data() {
        return {
            email: '',
            error: false,
            loading: false,
            password: '',
            rePassword: '',
            success: false
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
        },
        password: {
            required,
            alpha,
            minLength: minLength(6)
        },
        rePassword: {
            required,
            sameAsPassword: sameAs('password')
        },
    },
    methods: {
        ...mapActions(['resetPassword']),

        submit() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                const data = new FormData();
                const token = new URL(location.href).searchParams.get('token');

                data.append('email', this.email);
                data.append('password', this.password);
                data.append('c_password', this.rePassword);
                data.append('token', token);

                this.resetPassword({ data: data }).then((response, error) => {
                    if (response) {
                        if (response.message == 'Password has been successfully changed') {
                            this.success = true;
                        } else {
                            this.error = true;
                        }
                    } else if (error) {
                        this.error = true;
                    }
                });
            }
        }
    },
}
</script>