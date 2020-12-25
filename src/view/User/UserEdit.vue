<template>
    <section class="view-section view-section--background-light p-t-0">
        <div class="view-container">
            <div class="view-breadcrumbs text-thin">
                <router-link to="/" class="text-link router-link-active">
                    Головна сторінка
                </router-link>
                <span> / </span>
                <router-link :to="{name: 'UserDetails'}" class="text-link router-link-active">
                    Інформація про кандидата
                </router-link>
                <span> / </span>
                Редагувати профіль користувача
            </div>

            <div class="view-grid m-b-60">
                <div class="view-grid__column view-grid__column--9">
                    <h1 class="view-title view-title--h2 view-title--icon m-b-0">
                        <router-link :to="{name: 'UserDetails'}">
                            <svg width="33" height="14" viewBox="0 0 33 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="33" y1="7" x2="3" y2="7" stroke-width="2"/>
                                <path d="M8.5 13L2 7L8.5 1" stroke-width="2"/>
                            </svg>
                        </router-link>
                        Редагувати профіль користувача
                    </h1>
                </div>
                <div class="view-grid__column view-grid__column--3 ta-right">
                    <button
                        class="button button--default"
                        @click.prevent="submit"
                    >
                        Зберегти
                    </button>
                </div>
            </div>

            <div class="view-user-edit view-grid">
                <div class="view-grid__column view-grid__column--4 p-r-10">
                    <div 
                        class="view-user-edit__aside ta-center"
                        v-if="!this.participantInfo.partisipant"
                    >
                        <h3 class="view-title view-title--h3">
                            Заголовк про те щоб стати кандидатом
                        </h3>
                        <div class="view-text">
                            <p class="text-details text-light text-gray">
                                Створи профіль кандидата
                            </p>
                        </div>
                        <router-link :to="{name: 'UserCreateProfile'}" class="button button--orange">
                            створити профіль кандидата
                        </router-link>
                    </div>

                    <div
                        v-else
                        class="view-user-edit__tabs"
                    >
                        <span class="is-active">Особиста інформація</span>
                        <router-link :to="{name: 'UserEditMultiplu'}">інформація про кандидата</router-link>
                    </div>
                </div>
                <div class="view-grid__column view-grid__column--8 p-l-10">
                    <form 
                        @submit.prevent="submit"
                        class="view-form view-user-edit__form"
                    >
                        <ViewLoader 
                            :trigger="loader"
                        />
                        <div v-if="userData">
                            <div class="view-form__group">
                                <label for="secondName">Прізвище</label>
                                <input v-model="userData.surname" type="text" name="secondName" id="secondName" class="view-form__field">
                            </div>
                            <div class="view-form__group">
                                <label for="name">Ім’я</label>
                                <input v-model="userData.name" type="text" name="name" id="name" class="view-form__field">
                            </div>
                            <hr class="view-form__hr">
                            <div class="view-form__group">
                                <label for="email">Електронна адреса</label>
                                <input v-model="userData.email" type="email" name="email" id="email" class="view-form__field">
                            </div>
                            <div class="view-form__group">
                                <label for="phone">телефон</label>
                                <input type="tel" v-model="userData.phone" name="phone" id="phone" class="view-form__field">
                                <button 
                                    v-if="userData.phone"
                                    class="view-form__clear"
                                    @click.prevent="userData.phone = ''"
                                >
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M15.4095 13.6165L11.8559 10.0629L15.4427 6.47616L13.4501 4.4835L9.86327 8.07028L6.3097 4.51671L4.38347 6.44295L7.93704 9.99652L4.35026 13.5833L6.34291 15.576L9.9297 11.9892L13.4833 15.5427L15.4095 13.6165Z" fill="#FF2C2C"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="13.5266" height="15.0296" fill="white" transform="translate(10.627) rotate(45)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <hr class="view-form__hr">
                            <div class="view-form__group">
                                <label for="nasPynkt">адреса</label>
                                <input type="text" v-model="userData.location" name="nasPynkt" id="nasPynkt" class="view-form__field">
                                <button 
                                    v-if="userData.location"
                                    class="view-form__clear"
                                    @click.prevent="userData.location = ''"
                                >
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M15.4095 13.6165L11.8559 10.0629L15.4427 6.47616L13.4501 4.4835L9.86327 8.07028L6.3097 4.51671L4.38347 6.44295L7.93704 9.99652L4.35026 13.5833L6.34291 15.576L9.9297 11.9892L13.4833 15.5427L15.4095 13.6165Z" fill="#FF2C2C"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="13.5266" height="15.0296" fill="white" transform="translate(10.627) rotate(45)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <hr class="view-form__hr">
                            <div class="view-form__group">
                                <label for="organization">Назва організації</label>
                                <input type="text" v-model="userData.job" name="organization" id="organization" class="view-form__field">
                                <button 
                                    v-if="userData.job"
                                    class="view-form__clear"
                                    @click.prevent="userData.job = ''"
                                >
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M15.4095 13.6165L11.8559 10.0629L15.4427 6.47616L13.4501 4.4835L9.86327 8.07028L6.3097 4.51671L4.38347 6.44295L7.93704 9.99652L4.35026 13.5833L6.34291 15.576L9.9297 11.9892L13.4833 15.5427L15.4095 13.6165Z" fill="#FF2C2C"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="13.5266" height="15.0296" fill="white" transform="translate(10.627) rotate(45)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <div class="view-form__group">
                                <label for="posada">Посада</label>
                                <input type="text" v-model="userData.position" name="posada" id="posada" class="view-form__field">
                                <button 
                                    v-if="userData.position"
                                    class="view-form__clear"
                                    @click.prevent="userData.position = ''"
                                >
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M15.4095 13.6165L11.8559 10.0629L15.4427 6.47616L13.4501 4.4835L9.86327 8.07028L6.3097 4.51671L4.38347 6.44295L7.93704 9.99652L4.35026 13.5833L6.34291 15.576L9.9297 11.9892L13.4833 15.5427L15.4095 13.6165Z" fill="#FF2C2C"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="13.5266" height="15.0296" fill="white" transform="translate(10.627) rotate(45)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <hr class="view-form__hr">
                            <div class="view-form__group view-form__group--icon">
                                <label for="facebook">посилання на facebook</label>
                                <div class="view-form__group__icon">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 0H2.5C1.12125 0 0 1.12125 0 2.5V17.5C0 18.8787 1.12125 20 2.5 20H17.5C18.8787 20 20 18.8787 20 17.5V2.5C20 1.12125 18.8787 0 17.5 0Z" fill="#1976D2"/>
                                        <path d="M16.875 10H13.75V7.5C13.75 6.81 14.31 6.875 15 6.875H16.25V3.75H13.75C11.6788 3.75 10 5.42875 10 7.5V10H7.5V13.125H10V20H13.75V13.125H15.625L16.875 10Z" fill="#FAFAFA"/>
                                    </svg>
                                </div>
                                <input type="text" v-model="userData.facebook" name="facebook" id="facebook" class="view-form__field" placeholder="www.">
                                <button 
                                    v-if="userData.facebook"
                                    class="view-form__clear"
                                    @click.prevent="userData.facebook = ''"
                                >
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M15.4095 13.6165L11.8559 10.0629L15.4427 6.47616L13.4501 4.4835L9.86327 8.07028L6.3097 4.51671L4.38347 6.44295L7.93704 9.99652L4.35026 13.5833L6.34291 15.576L9.9297 11.9892L13.4833 15.5427L15.4095 13.6165Z" fill="#FF2C2C"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="13.5266" height="15.0296" fill="white" transform="translate(10.627) rotate(45)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <div class="view-form__group view-form__group--icon">
                                <label for="twitter">посилання на twitter</label>
                                <div class="view-form__group__icon">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                        <path d="M20 3.79875C19.2563 4.125 18.4637 4.34125 17.6375 4.44625C18.4875 3.93875 19.1363 3.14125 19.4412 2.18C18.6488 2.6525 17.7738 2.98625 16.8412 3.1725C16.0887 2.37125 15.0162 1.875 13.8462 1.875C11.5763 1.875 9.74875 3.7175 9.74875 5.97625C9.74875 6.30125 9.77625 6.61375 9.84375 6.91125C6.435 6.745 3.41875 5.11125 1.3925 2.6225C1.03875 3.23625 0.83125 3.93875 0.83125 4.695C0.83125 6.115 1.5625 7.37375 2.6525 8.1025C1.99375 8.09 1.3475 7.89875 0.8 7.5975C0.8 7.61 0.8 7.62625 0.8 7.6425C0.8 9.635 2.22125 11.29 4.085 11.6712C3.75125 11.7625 3.3875 11.8062 3.01 11.8062C2.7475 11.8062 2.4825 11.7913 2.23375 11.7362C2.765 13.36 4.2725 14.5538 6.065 14.5925C4.67 15.6838 2.89875 16.3412 0.98125 16.3412C0.645 16.3412 0.3225 16.3263 0 16.285C1.81625 17.4563 3.96875 18.125 6.29 18.125C13.835 18.125 17.96 11.875 17.96 6.4575C17.96 6.27625 17.9538 6.10125 17.945 5.9275C18.7588 5.35 19.4425 4.62875 20 3.79875Z" fill="#03A9F4"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0">
                                        <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <input type="text" v-model="userData.twitter" name="twitter" id="twitter" class="view-form__field" placeholder="www.">
                                <button 
                                    v-if="userData.twitter"
                                    class="view-form__clear"
                                    @click.prevent="userData.twitter = ''"
                                >
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M15.4095 13.6165L11.8559 10.0629L15.4427 6.47616L13.4501 4.4835L9.86327 8.07028L6.3097 4.51671L4.38347 6.44295L7.93704 9.99652L4.35026 13.5833L6.34291 15.576L9.9297 11.9892L13.4833 15.5427L15.4095 13.6165Z" fill="#FF2C2C"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="13.5266" height="15.0296" fill="white" transform="translate(10.627) rotate(45)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <div class="view-form__group view-form__group--icon">
                                <label for="website">посилання на website</label>
                                <div class="view-form__group__icon">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                        <path d="M17.0711 2.92892C15.1823 1.04019 12.6712 0 10.0002 0H9.99985C7.3288 0 4.81766 1.04019 2.92892 2.92892C1.04019 4.81766 0 7.32895 0 10C0 12.6711 1.04019 15.1823 2.92892 17.0711C4.81766 18.9598 7.32895 20 10 20C12.6711 20 15.1823 18.9598 17.0711 17.0711C18.9598 15.1823 20 12.6711 20 10C20 7.32895 18.9598 4.81766 17.0711 2.92892ZM17.7243 14.2702H14.7975C15.1897 13.1212 15.4259 11.8771 15.481 10.5859H18.8081C18.7207 11.9153 18.3377 13.165 17.7243 14.2702ZM10 18.7415C8.75275 17.9993 7.71835 16.8489 6.97433 15.442H13.0257C12.2816 16.8489 11.2473 17.9993 10 18.7415ZM6.4447 14.2702C6.01379 13.1396 5.75256 11.8913 5.69214 10.5859H14.3079C14.2474 11.8913 13.9861 13.1396 13.5551 14.2702H6.4447ZM1.19186 10.5859H4.51904C4.57413 11.8771 4.81033 13.1212 5.20248 14.2702H2.2757C1.66229 13.165 1.2793 11.9153 1.19186 10.5859ZM2.2757 5.72983H5.20248C4.81033 6.87881 4.57413 8.12286 4.51904 9.41406H1.19186C1.2793 8.08472 1.66229 6.83502 2.2757 5.72983ZM10 1.25854C11.2473 2.00073 12.2816 3.15109 13.0257 4.55795H6.97433C7.71835 3.15109 8.75275 2.00073 10 1.25854ZM13.5553 5.72983C13.9862 6.86035 14.2474 8.10867 14.3079 9.41406H5.69214C5.75256 8.10867 6.01395 6.86035 6.44485 5.72983H13.5553ZM18.8081 9.41406H15.481C15.4259 8.12286 15.1897 6.87881 14.7975 5.72983H17.7243C18.3377 6.83502 18.7207 8.08472 18.8081 9.41406ZM14.3283 4.55795C13.7714 3.35495 13.0304 2.29187 12.1408 1.43494C14.0717 1.91772 15.753 3.03757 16.9467 4.55795H14.3283ZM7.85919 1.43494C6.9696 2.29187 6.22864 3.35495 5.67169 4.55795H3.05328C4.24698 3.03757 5.92834 1.91772 7.85919 1.43494ZM5.67169 15.442C6.22864 16.6451 6.9696 17.7081 7.85919 18.5651C5.92834 18.0823 4.24698 16.9624 3.05328 15.442H5.67169ZM12.1408 18.5651C13.0304 17.7081 13.7714 16.6449 14.3283 15.442H16.9467C15.753 16.9624 14.0717 18.0823 12.1408 18.5651Z" fill="#5E6D7C"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0">
                                        <rect width="20" height="20" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <input type="text" v-model="userData.website" name="website" id="website" class="view-form__field" placeholder="www.">
                                <button 
                                    v-if="userData.website"
                                    class="view-form__clear"
                                    @click.prevent="userData.website = ''"
                                >
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                            <path d="M15.4095 13.6165L11.8559 10.0629L15.4427 6.47616L13.4501 4.4835L9.86327 8.07028L6.3097 4.51671L4.38347 6.44295L7.93704 9.99652L4.35026 13.5833L6.34291 15.576L9.9297 11.9892L13.4833 15.5427L15.4095 13.6165Z" fill="#FF2C2C"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="13.5266" height="15.0296" fill="white" transform="translate(10.627) rotate(45)"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                            <hr class="view-form__hr">
                            <div class="view-form__group">
                                <label for="aboutMe">Про мене</label>
                                <textarea name="aboutMe" v-model="userData.description" id="aboutMe" class="view-form__textarea"></textarea>
                            </div>
                            <div class="view-form__tags">
                                <div class="view-form__tags__title">
                                    Теги, які цікавлять
                                </div>
                                <v-select 
                                    :options="tagsListEx.short"
                                    :placeholder="'Оберіть теги'"
                                    :clearable="false" 
                                    :searchable="false"
                                    v-model="selectedTags"
                                    label="label"
                                    multiple
                                >
                                    <template #no-options>Нічого не знайдено</template>
                                </v-select>
                            </div>
                            <div class="view-form__buttons ta-right">
                                <button class="button button--default">
                                    Зберегти
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import ViewLoader from '@/components/ViewLoader/ViewLoader';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        ViewLoader,
        vSelect
    },
    data() {
        return {
            userId: JSON.parse(window.localStorage.getItem('userDetails')).id,
            userToken: JSON.parse(window.localStorage.getItem('access_token')).token,
            userData: null,
            selectedTags: null,
            tagsListClear: [],
            loader: false,
        }
    },
    computed: {
        ...mapGetters(['userInfo', 'tagsList', 'participantInfo']),
        tagsListEx() {
            let arr = [];
            let cloner = null;

            if (this.tagsList) {

                this.tagsList.forEach(tag => {
                    if(tag.tags.length > 0) {
                        cloner = Object.assign({}, tag);
                        cloner.tags = [];

                        this.tagsListClear.push(cloner);

                        tag.tags.forEach(item => {
                            arr.push({
                                label: `#${item.tag_ua}`, 
                                id: item.id,
                                group_id: item.group_id
                            });
                        })
                    }
                })
            }

            if(arr.length > 0) {
                return {short: arr}
            } else {
                return {short: null}
            }
		},
    },
    methods: {
        ...mapActions([
            'getUserData', 
            'fetchTagsList',
            'updateUserInfo'
        ]),

        selectTags() {
            if (this.selectedTags) {

                this.selectedTags.forEach(tag => {
    
                    this.tagsList.forEach(list => {
                        if (list.id == tag.group_id) {
                            const tags = list.tags.find(item => item.id == tag.id);
    
                            this.tagsListClear.map(item => {
                                if (item.id == tags.group_id) {
                                    item.tags.push(tags);
                                }
                            });
                        }
                    });
                });
    
                return this.tagsListClear.filter(list => list.tags.length);
            } else {
                return null;
            }
        },

        clearField(event) {
            const field = event.target.closest('.view-form__group').querySelector('input');
            field.value = '';
            field.dispatchEvent(new Event('change'));
        },

        submit() {
            this.loader = true;

            const data = new FormData();

            data.append('name', this.userData.name);
            data.append('surname', this.userData.surname);
            data.append('email', this.userData.email);
            data.append('job', this.userData.job);
            data.append('position', this.userData.position);
            data.append('description', this.userData.description);
            data.append('status', this.userData.status);
            data.append('facebook', this.userData.facebook);
            data.append('twitter', this.userData.twitter);
            data.append('website', this.userData.website);
            data.append('location', this.userData.location);
            data.append('phone', this.userData.phone);
            data.append('tags', this.selectTags());

            this.updateUserInfo({
                    id: this.userId, 
                    token: this.userToken, 
                    formData: data
                })
                .then(response => {
                    this.loader = false;
                    console.log(response);
                });
        }
    },
    beforeCreate() {
        this.$emit('initPreloader');
    },
    async mounted() {
        this.fetchTagsList();
        this.getUserData({id: this.userId}).then(() => {
            this.userData = Object.assign({}, this.userInfo);
            this.activeTags = this.userData.tags;
            this.$emit('hidePreloader');
        });
    },
}
</script>