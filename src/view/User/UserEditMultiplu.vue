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
                Редагувати профіль кандидата
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
                        Редагувати профіль кандидата
                    </h1>
                </div>
                <div class="view-grid__column view-grid__column--3 ta-right">
                    <button
                        @click.prevent="submit()"
                        class="button button--default"
                    >
                        Зберегти
                    </button>
                </div>
            </div>

            <div class="view-user-edit view-grid">
                <div class="view-grid__column view-grid__column--4 p-r-10">
                    <div
                        class="view-user-edit__tabs"
                    >
                        <router-link :to="{name: 'UserEdit'}">Особиста інформація</router-link>
                        <span class="is-active">інформація про кандидата</span>
                    </div>
                </div>
                <div class="view-grid__column view-grid__column--8 p-l-10">
                    <form 
                        @submit.prevent="submit()"
                        class="view-form view-user-edit__form"
                    >
                        <ViewLoader 
                            :trigger="loader"
                        />
                        <div
                            v-if="userData"
                        >
                            <div class="view-form__group">
                                <label for="aboutMe">Резюме</label>
                                <textarea name="aboutMe" v-model="cv.text" id="aboutMe" class="view-form__textarea"></textarea>
                            </div>
                            <div class="view-form__upload">
                                <label>
                                    Завантажити з мого комп'ютера
                                    <input 
                                        type="file" 
                                        name="cv" 
                                        id="cv"
                                        accept=".pdf, .doc, .docx, .img, .png"
                                    >
                                </label>
                                <div class="view-form__upload__caption">
                                    .pdf, .doc / max 100 Mb
                                </div>
                            </div>
                            <hr class="view-form__hr">
                            <div class="view-form__group">
                                <label for="dq_1">Останнє навчання, яке Ви відвідував(-ла)</label>
                                <textarea name="dq_1" v-model="userData.last_study" id="dq_1" class="view-form__textarea"></textarea>
                            </div>
                            <div class="view-form__group">
                                <label for="dq_2">Я вирішив  очолити медичний заклад тому, що:</label>
                                <textarea name="dq_2" v-model="userData.comp_reason" id="dq_2" class="view-form__textarea"></textarea>
                            </div>
                            <div class="view-form__group">
                                <label for="dq_3">На мою думку успішний медичний заклад це:</label>
                                <textarea name="dq_3" v-model="userData.i_think" id="dq_3" class="view-form__textarea"></textarea>
                            </div>
                            <div class="view-form__group">
                                <label for="dq_4">Які зміни в медичному закладі Ви будете вважати достойним результатом своєї діяльності на керівній посаді?</label>
                                <textarea name="dq_4" v-model="userData.result_changes" id="dq_4" class="view-form__textarea"></textarea>
                            </div>
                            <hr class="view-form__hr">
                            <div class="view-form__group">
                                <label for="dq_5">РНОКПП</label>
                                <input type="text" v-model="userData.rnokpp" name="dq_5" id="dq_5" class="view-form__field">
                                <button 
                                    v-if="userData.rnokpp"
                                    class="view-form__clear"
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
                                <label for="dq_6">Декларації</label>
                                <input type="text" v-model="userData.dq_6" name="dq_6" id="dq_6" class="view-form__field" placeholder="Посилання на декларацію">
                                <button 
                                    v-if="userData.dq_6"
                                    class="view-form__clear"
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
                                <input type="text" v-model="userData.dq_7" name="dq_7" id="dq_7" class="view-form__field" placeholder="Посилання на декларацію">
                                <button 
                                    v-if="userData.dq_7"
                                    class="view-form__clear"
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
                                <input type="text" v-model="userData.dq_8" name="dq_8" id="dq_8" class="view-form__field" placeholder="Посилання на декларацію">
                                <button 
                                    v-if="userData.dq_8"
                                    class="view-form__clear"
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
                                <input type="text" v-model="userData.dq_9" name="dq_9" id="dq_9" class="view-form__field" placeholder="Посилання на декларацію">
                                <button 
                                    v-if="userData.dq_9"
                                    class="view-form__clear"
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
                                <input type="text" v-model="userData.dq_10" name="dq_10" id="dq_10" class="view-form__field" placeholder="Посилання на декларацію">
                                <button 
                                    v-if="userData.dq_10"
                                    class="view-form__clear"
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
                            <div class="view-form__upload">
                                <label>
                                    Завантажити з мого комп'ютера
                                    <input 
                                        type="file" 
                                        name="cv" 
                                        id="cv"
                                        accept=".pdf, .doc, .docx, .img, .png"
                                        ref="declaretion"
                                        @change.prevent="fileUpload()"
                                    >
                                </label>
                                <div class="view-form__upload__caption">
                                    .pdf, .doc / max 100 Mb
                                </div>
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
import ViewLoader from '@/components/ViewLoader/ViewLoader';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        ViewLoader,
    },
    data() {
        return {
            userId: JSON.parse(window.localStorage.getItem('userDetails')).id,
            userToken: JSON.parse(window.localStorage.getItem('access_token')).token,
            userData: null,
            loader: false,
            newDeclaretion: null,
            cv: {
                text: '',
                file: null,
            },
        }
    },
    computed: {
        ...mapGetters(['participantInfo']),
    },
    methods: {
        ...mapActions(['fetchCandidateInfo', 'updateParticipantsInfo']),

        fileUpload() {
            this.newDeclaretion = this.$refs.declaretion.files[0];
        },

        submit() {
            this.loader = true;

            const data = new FormData();
            /*const cvQ = {
                'text': this.cv.text,
                'file': {
                    'title': this.cv.file.title,
                    'text': this.cv.file.url,
                }
            };*/

            //data.append('user_id', this.userId);
            data.append('status', 'candidate');
            //data.append('resume', cvQ);
            data.append('last_study', this.userData.last_study);
            //data.append('comp_reason', this.userData.comp_reason);
            //data.append('i_think', this.userData.i_think);
            //data.append('result_changes', this.userData.result_changes);

            this.updateParticipantsInfo({
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
        this.$emit('initPreloader')
    },
    async mounted() {
        this.fetchCandidateInfo({id: this.userId}).then(() => {
            this.userData = Object.assign({}, this.participantInfo.partisipant);
            this.cv = Object.assign({}, this.userData.resume);

            this.$emit('hidePreloader');
        });
    },
}
</script>