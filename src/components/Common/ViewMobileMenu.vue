<template>
    <div class="view-mobile-menu">
        <div class="view-mobile-menu-btn" :class="{'is-active': isOpen}" @click="isOpen= !isOpen">
            <div class="view-mobile-menu-btn-box">
                <div class="view-mobile-menu-btn-inner"></div>
            </div>
        </div>
        <div class="view-mobile-menu-main" :class="{'is-active': isOpen}" :style="{height: `calc(100% - ${headerHeight}px`, top: `${headerHeight}px`}">
            <div class="view-mobile-menu-list">
                <div class="view-underheader__search js-header-search text-light is-active">
                    <div class="view-underheader__search__trigger js-header-search-trigger">
                        Пошук
                        <svg width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.9609 16.8922L13.5895 12.5207C14.673 11.1996 15.3262 9.50742 15.3262 7.66309C15.3262 3.43262 11.8936 0 7.66309 0C3.42891 0 0 3.43262 0 7.66309C0 11.8936 3.42891 15.3262 7.66309 15.3262C9.50742 15.3262 11.1959 14.6768 12.517 13.5932L16.8885 17.9609C17.1854 18.2578 17.6641 18.2578 17.9609 17.9609C18.2578 17.6678 18.2578 17.1854 17.9609 16.8922ZM7.66309 13.801C4.275 13.801 1.52148 11.0475 1.52148 7.66309C1.52148 4.27871 4.275 1.52148 7.66309 1.52148C11.0475 1.52148 13.8047 4.27871 13.8047 7.66309C13.8047 11.0475 11.0475 13.801 7.66309 13.801Z"/>
                        </svg>
                    </div>
                    <div class="view-underheader__search__field">
                        <form @submit.prevent="submitRes()">
                            <input type="text" 
                                class="js-header-search-trigger-field"
                                placeholder="Пошук"
                                v-model="searchInput"
                            >
                        </form>
                    </div>
                </div>
                <Navigation :list="navInfo" @routeChange="isOpen = false"></Navigation>
            </div>

            <div class="view-mobile-menu-login">
                <router-link v-if="userDetails == ''"
                    to="/login" 
                    class="button button--primary"
                >
                    Увійти
                </router-link>

                <router-link v-if="userDetails !== ''" class="button button--primary" :to="{name: 'UserDetails', params: {id: userDetails.id}}">Кабінет</router-link>
                    
                <div v-if="userDetails !== ''" class="button button--default" @click="logoutQ()">Вийти</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navigation from '../Navigation/Navigation'

export default {
    props: {
        navInfo: Array,
    },
    data(){
        return {
            isOpen: false,
            searchInput: '',
            userDetails: localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '',
            userToken: localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')).token : '',
            headerHeight: 0
        }
    },
    computed: {

    },
    components: {
        Navigation
    },
    methods: {
        ...mapActions(['logout']),
        submitRes(){
            if(this.searchInput.length > 2) {
                this.isOpen = false
                this.$router.push({path: '/search', query: {s: this.searchInput}})
                this.searchInput = ''
                document.querySelector('.js-header-search-trigger-field').blur();
                this.showSearch = false
            }
        },
        logoutQ() {
            this.logout({token: this.userToken}).then(() => {
                this.userDetails = '';
                this.isOpen = false
            });
        },
    },
    mounted(){
        let headerEl = document.querySelector('.view-header')
        if(headerEl){
            this.headerHeight = headerEl.offsetHeight
        } else {
            this.headerHeight = 0
        }
    }
}
</script>