<template>
    <section class="view-section view-section--black">
        <div class="view-container">
            <h2 class="view-title view-title--h2 view-title--section text-medium">{{title}}</h2>
            <div class="view-canditates">
                <div class="view-canditates__aside">
                    <div class="view-canditates__list" data-simplebar>
                        <ViewPreloader 
                            :className="candidatesLoader"
                        />
                        <simplebar>
                            <template
                                v-if="mView"
                            >
                                <div
                                    v-for="(item, index) in candidatesList" 
                                    :key="index"
                                    :class="[index == position && 'is-active', 'view-canditates__item']"
                                    @click="selectCandidate(index, $event)"
                                >
                                    <div 
                                        :class="item.user.avatar ? 'view-canditates__item__image' : 'view-canditates__item__image no-image'">
                                        <img 
                                            :src="item.user.avatar ? item.user.avatar : require(`@/assets/images/doctor.png`)"
                                            :alt="item.user.name + ' ' + item.user.surname"
                                        >
                                    </div>
                                    <div class="view-canditates__item__info">
                                        <div class="text-medium">
                                            {{ item.user.name + ' ' + item.user.surname }}
                                        </div>
                                        <div 
                                            v-if="item.user.position && item.user.position.length"
                                            class="text-light text-gray">
                                            {{ item.user.position }}
                                        </div>
                                        <div 
                                            class="text-details text-thin text-gray"
                                            v-if="item.user.job && item.user.job.length"
                                        >
                                            {{ item.user.job }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template
                                v-else
                            >
                                <router-link
                                    v-for="(item, index) in candidatesList" 
                                    :key="index"
                                    :class="[index == position && 'is-active', 'view-canditates__item']"
                                    @click="selectCandidate(index, $event)"
                                >
                                    <span 
                                        :class="item.user.avatar ? 'view-canditates__item__image' : 'view-canditates__item__image no-image'">
                                        <img 
                                            :src="item.user.avatar ? item.user.avatar : require(`@/assets/images/doctor.png`)"
                                            :alt="item.user.name + ' ' + item.user.surname"
                                        >
                                    </span>
                                    <span class="view-canditates__item__info">
                                        <span class="text-medium">
                                            {{ item.user.name + ' ' + item.user.surname }}
                                        </span>
                                        <span 
                                            v-if="item.user.position && item.user.position.length"
                                            class="text-light text-gray">
                                            {{ item.user.position }}
                                        </span>
                                        <span 
                                            class="text-details text-thin text-gray"
                                            v-if="item.user.job && item.user.job.length"
                                        >
                                            {{ item.user.job }}
                                        </span>
                                    </span>
                                </router-link>
                            </template>
                        </simplebar>
                    </div>
                    <div class="view-canditates__buttons">
                        <router-link to="/users" class="button button--primary">Усі кандидати</router-link>
                        <router-link to="/register" class="button button--details text-regular">Долучитися</router-link>
                    </div>
                </div>

                <div class="view-canditates__details hide-m"
                    v-if="information.user"
                >
                    <router-link
                        :to="{name: 'UserDetails', params: {id: information.user_id}}"
                        class="view-title view-title--h3 text-link text-link--reverse text-medium view-canditates__details__title"
                    >
                        {{ information.user.name + ' ' + information.user.surname }}
                    </router-link>
                    <div 
                        v-if="information.user.position && information.user.position.length"
                        class="view-canditates__details__position text-light text-gray">
                        {{ information.user.position }}
                    </div>
                    <div 
                        v-if="information.user.job && information.user.job.length"
                        class="view-canditates__details__location text-light text-gray"
                    >
                        {{ information.user.job }}
                    </div>
                    <router-link
                        :to="{name: 'UserDetails', params: {id: information.user_id}}"
                        class="text-link text-link--reverse view-canditates__details__title"
                    >
                        Я вирішив очолити очолити медичний заклад тому, що:
                        <svg width="27" height="14" viewBox="0 0 27 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="-8.74228e-08" y1="7" x2="25" y2="7" stroke-width="2"/>
                            <path d="M19 1L25.5 7L19 13" stroke-width="2"/> 
                        </svg>
                    </router-link>
                    <div class="view-text text-gray">
                        <p>
                            {{ information.comp_reason }}
                        </p>
                    </div>
                    <router-link
                        :to="{name: 'UserDetails', params: {id: information.user_id}}"
                        class="text-link text-link--reverse view-canditates__details__title"
                    >
                        На мою думку успішний медичний заклад це:
                        <svg width="27" height="14" viewBox="0 0 27 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="-8.74228e-08" y1="7" x2="25" y2="7" stroke-width="2"/>
                            <path d="M19 1L25.5 7L19 13" stroke-width="2"/>
                        </svg>
                    </router-link>
                    <div class="view-text text-gray">
                        <p>
                            {{ information.i_think }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewPreloader from '@/components/ViewPreloader/ViewPreloader';
import simplebar from 'simplebar-vue';

export default {
    name: 'ViewCandidates',
    props: ['title'],
    data() {
        return {
            position: 0,
            information: {},
            mView: window.innerWidth > 812 ? false : true,
        }
    },
    components: {
        simplebar,
        ViewPreloader
    },
    computed: mapGetters(['candidatesList', 'candidatesLoader']),
    methods: {
        ...mapActions(['loadCandidatesList']),

        selectCandidate(index, event) {
            this.position = index;
            this.information = this.candidatesList[index];
            event.target.classList.add('is-active');
        }
    },
    async mounted() {
        this.loadCandidatesList().then(() => {
            this.information = this.candidatesList[0];
        });
    }
}
</script>