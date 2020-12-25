<template>
    <div class="view-auth">
        <div class="view-auth__image">
            <img :src="require('@/assets/images/Group 2218.png')" alt="Login">
        </div>

        <div class="view-auth__wrapper">
            <div class="view-auth__container">
                <header class="view-auth__header">
                    <div class="text-details">
                        Ще не зареєстровані
                    </div>

                    <router-link to="/registration" class="button button--details button--blue">
                        Зареєструватися
                    </router-link>
                </header>

                <main class="view-auth__content">
                    <h1 class="view-auth__title">
                        Увійти
                    </h1>
                    <div class="pos-relative view-auth__form">
                        <ViewLoader 
                            :trigger="loginLoading"
                        />
                        <div class="view-form">
                            <div class="view-auth__form__sign-in">
                                <GoogleLogin 
                                    :params="params"
                                    :onSuccess="googleAuth"
                                    class="view-auth__form__sign-in__button"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.6875 9.99997C4.6875 9.00907 4.96051 8.08083 5.4348 7.28603V3.91462H2.0634C0.725313 5.65243 0 7.77036 0 9.99997C0 12.2296 0.725313 14.3475 2.0634 16.0853H5.4348V12.7139C4.96051 11.9191 4.6875 10.9909 4.6875 9.99997Z" fill="#FBBD00"/>
                                        <path d="M10 15.3125L7.65625 17.6562L10 20C12.2296 20 14.3475 19.2747 16.0854 17.9366V14.5688H12.7175C11.9158 15.0448 10.9836 15.3125 10 15.3125Z" fill="#0F9D58"/>
                                        <path d="M5.43488 12.7139L2.06348 16.0853C2.3284 16.4294 2.61688 16.7588 2.92902 17.071C4.81777 18.9597 7.32898 19.9999 10.0001 19.9999V15.3124C8.06164 15.3124 6.3627 14.2687 5.43488 12.7139Z" fill="#31AA52"/>
                                        <path d="M20 10C20 9.39163 19.9449 8.7821 19.8363 8.18843L19.7483 7.708H10V12.3955H14.7442C14.2835 13.3119 13.5752 14.0596 12.7175 14.5689L16.0853 17.9367C16.4294 17.6718 16.7589 17.3833 17.0711 17.0711C18.9598 15.1823 20 12.6711 20 10Z" fill="#3C79E6"/>
                                        <path d="M13.7565 6.24348L14.1708 6.65777L17.4854 3.34324L17.0711 2.92895C15.1823 1.0402 12.6711 0 10 0L7.65625 2.34375L10 4.6875C11.419 4.6875 12.7531 5.24008 13.7565 6.24348Z" fill="#CF2D48"/>
                                        <path d="M10.0001 4.6875V0C7.32902 0 4.81781 1.0402 2.92902 2.92891C2.61688 3.24105 2.3284 3.57055 2.06348 3.91465L5.43488 7.28605C6.36274 5.73125 8.06168 4.6875 10.0001 4.6875Z" fill="#EB4132"/>
                                    </svg>
                                    with Google
                                </GoogleLogin>
                                <fb-signin-button
                                    class="view-auth__form__sign-in__button"
                                    :params="fbSignInParams"
                                    @success="logInWithFacebook">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="10" fill="#0E76F2"/>
                                        <path d="M12.7741 4.0025L11.3349 4C9.71812 4 8.67327 5.15914 8.67327 6.95322V8.31485H7.22629C7.10125 8.31485 7 8.42446 7 8.55966V10.5325C7 10.6677 7.10137 10.7772 7.22629 10.7772H8.67327V15.7553C8.67327 15.8905 8.77452 16 8.89956 16H10.7875C10.9125 16 11.0137 15.8904 11.0137 15.7553V10.7772H12.7056C12.8306 10.7772 12.9319 10.6677 12.9319 10.5325L12.9326 8.55966C12.9326 8.49474 12.9087 8.43257 12.8663 8.38663C12.8239 8.34069 12.7662 8.31485 12.7062 8.31485H11.0137V7.16058C11.0137 6.60579 11.136 6.32415 11.8044 6.32415L12.7738 6.32377C12.8987 6.32377 13 6.21416 13 6.07909V4.24718C13 4.11223 12.8989 4.00275 12.7741 4.0025Z" fill="white"/>
                                    </svg>
                                    with Facebook
                                </fb-signin-button>
                            </div>
                            <div class="text-sub ta-center">
                                or
                            </div>
                        </div>
                        <form 
                            @submit.prevent="submit"
                            class="view-form"
                        >
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
                                <input type="password" class="view-form__field" name="password" placeholder="Пароль" v-model.trim="$v.password.$model">
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
                                v-if="error"
                                class="view-form__errors text-details"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="10" r="10" fill="#FF0000" fill-opacity="0.5"/>
                                    <path d="M8.88963 5.6H11.1216L10.7496 11.084H9.26163L8.88963 5.6ZM10.0056 14.096C9.67763 14.096 9.40163 13.992 9.17763 13.784C8.96163 13.568 8.85363 13.308 8.85363 13.004C8.85363 12.7 8.96163 12.448 9.17763 12.248C9.39363 12.04 9.66963 11.936 10.0056 11.936C10.3416 11.936 10.6176 12.04 10.8336 12.248C11.0496 12.448 11.1576 12.7 11.1576 13.004C11.1576 13.308 11.0456 13.568 10.8216 13.784C10.6056 13.992 10.3336 14.096 10.0056 14.096Z" fill="#B10B0B"/>
                                </svg>
                                <template
                                    v-if="!loginError.error"
                                >
                                    <span
                                        v-for="(error, index) in loginError"
                                        :key="index"
                                    >
                                        {{ error[0] }} 
                                    </span>
                                </template>
                                <span
                                    v-else
                                >
                                    {{ loginError.error }} 
                                </span>
                            </div>
                            <div class="view-auth__form__remember-me">
                                <label class="view-form__checkbox">
                                    <input type="checkbox" v-model="rememberMe">
                                    <span class="text-details text-thin">Запам’ятати</span>
                                </label>
                                <router-link to="/forgot-password" class="text-link text-link--reverse text-thin text-details">Забули пароль?</router-link>
                            </div>
                            <div class="view-form__buttons">
                                <button class="button button--primary">Увійти</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
        <div id="fb-root"></div>
    </div>
</template>

<script>
import Vue from 'vue';
import FBSignInButton from 'vue-facebook-signin-button';
Vue.use(FBSignInButton);

import ViewLoader from '@/components/ViewLoader/ViewLoader';
import GoogleLogin from 'vue-google-login';
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email, minLength, helpers } from 'vuelidate/lib/validators';

const alpha = helpers.regex('alpha', /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/);

export default {
    data() {
        return {
            params: {
                client_id: process.env.VUE_APP_GOOGLE_AUTH
            },
            fbSignInParams: {
                scope: 'email,user_likes',
                return_scopes: true
            },
            email: '',
            password: '',
            rememberMe: false,
            error: false
        }
    },
    components: {
        ViewLoader,
        GoogleLogin
    },
    computed: mapGetters(['loginLoading' ,'loginError']),
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
        }
    },
    methods: {
        ...mapActions(['login']),
        submit() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                const data = new FormData();

                data.append('email', this.email);
                data.append('password', this.password);

                this.login(data).then((response, error) => {
                    if (response) {
                        if (response.status == '200') {
                            this.$router.push({path: '/'});
                        } else {
                            this.error = true;
                        }
                    } else if (error) {
                        this.error = true;
                    }
                });
            }
        },

        async logInWithFacebook(response) {
            await this.createFB();
            await this.initFacebook();

            window.FB.api('/me', data => {
            console.log(response);
                console.log(data)
            });

            return false;
        },

        async initFacebook() {
            window.fbAsyncInit = function() {
                window.FB.init({
                    appId: process.env.VUE_APP_FACEBOOK_AUTH,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.7'
                });
            };
        },

        async createFB() {
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        },

        async googleAuth(data) {
            console.log(data.reloadAuthResponse());
        }
    },
    created() {
        localStorage.getItem('access_token') && this.$router.push({path: '/'});
    },
}
</script>