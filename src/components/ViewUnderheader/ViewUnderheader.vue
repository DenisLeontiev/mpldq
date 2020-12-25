<template>
    <div class="view-underheader">
        <div class="view-container">
            <a 
                @click.prevent="changedVersion"
                href="#" 
                class="view-underheader__vision text-link hide-m"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9102 10.3061L19.0977 10L18.9102 9.69376C18.8788 9.64264 18.1244 8.42499 16.6588 7.20474C14.7095 5.58197 12.413 4.72412 10.0175 4.72412C7.62268 4.72412 5.32059 5.58151 3.36014 7.20352C1.88614 8.42316 1.1232 9.63989 1.09146 9.69116L0.899963 10L1.09146 10.3088C1.1232 10.3601 1.88614 11.5768 3.36014 12.7965C5.32059 14.4185 7.62268 15.2759 10.0175 15.2759C12.413 15.2759 14.7095 14.418 16.6588 12.7953C18.1244 11.575 18.8788 10.3574 18.9102 10.3061ZM15.8778 11.9203C14.1243 13.3693 12.1526 14.1039 10.0175 14.1039C7.88177 14.1039 5.90363 13.3688 4.13818 11.9189C3.2251 11.1691 2.60605 10.4099 2.30286 10C2.6062 9.58984 3.22525 8.83072 4.13818 8.0809C5.90363 6.63116 7.88162 5.896 10.0175 5.896C12.1526 5.896 14.1241 6.63071 15.8778 8.07953C16.7868 8.83057 17.4005 9.59091 17.6996 10C17.4002 10.4092 16.7867 11.1696 15.8778 11.9203Z"/>
                    <path d="M10 6.47913C8.05862 6.47913 6.47919 8.05856 6.47919 9.99994C6.47919 11.9413 8.05862 13.5208 10 13.5208C11.9414 13.5208 13.5208 11.9413 13.5208 9.99994C13.5208 8.05856 11.9414 6.47913 10 6.47913ZM10 12.3489C8.70483 12.3489 7.65106 11.2951 7.65106 9.99994C7.65106 8.70477 8.70483 7.651 10 7.651C11.2952 7.651 12.3489 8.70477 12.3489 9.99994C12.3489 11.2951 11.2952 12.3489 10 12.3489Z"/>
                    <path d="M1.17188 1.17188H3.61816V0H0V3.57422H1.17188V1.17188Z"/>
                    <path d="M16.3818 0V1.17188H18.8281V3.57422H20V0H16.3818Z"/>
                    <path d="M1.17188 16.4258H0V20H3.61816V18.8281H1.17188V16.4258Z"/>
                    <path d="M18.8281 18.8281H16.3818V20H20V16.4258H18.8281V18.8281Z"/>
                    <path d="M6.5 6L1.5 10L2.5 11L5 13.5L10.5 14.5L14.5 13.5L18.5 10L16 7.5L11 5.5L6.5 6Z"/>
                    <circle cx="10" cy="10" r="3" fill="white"/>
                    <circle cx="10" cy="10" r="1"/>
                </svg>
                Людям із порушенням зору
            </a>

            <div class="view-underheader__search js-header-search text-light hide-m" :class="{'is-active' : showSearch}">
                <div class="view-underheader__search__trigger js-header-search-trigger" @click.prevent="openSearch()">
                    Пошук
                    <svg width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9609 16.8922L13.5895 12.5207C14.673 11.1996 15.3262 9.50742 15.3262 7.66309C15.3262 3.43262 11.8936 0 7.66309 0C3.42891 0 0 3.43262 0 7.66309C0 11.8936 3.42891 15.3262 7.66309 15.3262C9.50742 15.3262 11.1959 14.6768 12.517 13.5932L16.8885 17.9609C17.1854 18.2578 17.6641 18.2578 17.9609 17.9609C18.2578 17.6678 18.2578 17.1854 17.9609 16.8922ZM7.66309 13.801C4.275 13.801 1.52148 11.0475 1.52148 7.66309C1.52148 4.27871 4.275 1.52148 7.66309 1.52148C11.0475 1.52148 13.8047 4.27871 13.8047 7.66309C13.8047 11.0475 11.0475 13.801 7.66309 13.801Z"/>
                    </svg>
                </div>
                <div class="view-underheader__search__field" v-show="showSearch">
                    <form @submit.prevent="submitRes()">
                        <input type="text" 
                            class="js-header-search-trigger-field" 
                            id="header-search" 
                            placeholder="Що шукаємо?"
                            v-model="searchInput"
                        >
                    </form>
                    
                    <a href="#" class="js-close-header-search" @click.prevent="closeSearch()">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.42613 6.00184L0.114426 11.3507C-0.0331419 11.4993 -0.0331419 11.74 0.114426 11.8886C0.188117 11.963 0.284871 12 0.381437 12C0.478191 12 0.574757 11.963 0.648447 11.8886L6.00009 6.49956L11.3517 11.8886C11.4256 11.963 11.5222 12 11.6188 12C11.7153 12 11.8121 11.963 11.8858 11.8886C12.0333 11.74 12.0333 11.4993 11.8858 11.3507L6.57424 6.00184L11.8893 0.649248C12.0369 0.500649 12.0369 0.259907 11.8893 0.111308C11.7418 -0.0371026 11.5027 -0.0371026 11.3553 0.111308L6.00028 5.50412L0.644697 0.111497C0.497129 -0.0369138 0.258244 -0.0369138 0.110676 0.111497C-0.0368921 0.260096 -0.0368921 0.500838 0.110676 0.649437L5.42613 6.00184Z" fill="black"/>
                        </svg>
                    </a>
                </div>
            </div>
            <router-link 
                to="/login" 
                class="view-underheader__login text-link hide-m"
                v-if="!userDetails.name"
            >
                Увійти
                <svg width="21" height="20" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.5586 1H4.8086C4.46313 1 4.18359 1.26556 4.18359 1.59376V3.37499H5.43361V2.18751H17.9336V18.8125H5.43361V17.625H4.18359V19.4062C4.18359 19.7344 4.46313 20 4.8086 20H18.5586C18.9041 20 19.1836 19.7344 19.1836 19.4062V1.59376C19.1836 1.26556 18.904 1 18.5586 1V1Z"/>
                    <path class="svg-login-arrow" d="M7.60789 13.5L8.49167 14.3838L12.6836 10.1919L8.49167 6L7.60789 6.88378L10.291 9.56689H1.43359V10.8169H10.291L7.60789 13.5Z"/>
                </svg>
            </router-link>
            <div 
                class="view-underheader__auth hide-m"
                v-else
            >
                <a 
                    @click.prevent="togleUserMenu()"
                    href="#" class="view-underheader__auth__personal-area text-sub"
                >
                    <img 
                        v-if="userDetails.avatar"
                        :src="userDetails.avatar" 
                        :alt="userDetails.name + ' ' + userDetails.surname"
                    >

                    <template
                        v-else
                    >
                        {{userDetails.name[0] + userDetails.surname[0]}}
                    </template>
                </a>
                <div class="view-underheader__auth__dropdown" ref="dropdown">
                    <router-link :to="{name: 'UserDetails', params: {id: userDetails.id}}">Кабінет</router-link>
                    /
                    <div @click="logoutQ()">Вийти</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ViewUnderheader',
    data() {
        return {
            isLogin: true,
            showSearch: false,
            searchInput: '',
            userDetails: localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '',
            userToken: localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')).token : '',
        }
    },
    computed: mapGetters(['getUserDetails']),
    methods: {
        ...mapActions(['logout']),
        togleUserMenu() {
            if (this.$refs['dropdown'].classList.contains('is-active')) {
                this.$refs['dropdown'].classList.remove('is-active');
            } else {
                this.$refs['dropdown'].classList.add('is-active');
            }
        },

        logoutQ() {
            this.logout({token: this.userToken}).then(() => {
                this.userDetails = '';
            });
        },

        openSearch(){
            if(!this.showSearch) {
                setTimeout(() => {
                    document.querySelector('.js-header-search-trigger-field').focus();
                }, 150);
                this.showSearch = true
            } else {
                document.querySelector('.js-header-search-trigger-field').focus();
            }
        },

        closeSearch(){
            this.showSearch = false
        },

        submitRes(){
            if(this.searchInput.length > 2) {
                this.$router.push({path: '/search', query: {s: this.searchInput}})
                this.searchInput = ''
                document.querySelector('.js-header-search-trigger-field').blur();
                this.showSearch = false
            }
        }, 

        changedVersion() {
            const root = document.documentElement;

            if (localStorage.getItem('bodyStyle') == 'zoomed') {
                localStorage.removeItem('bodyStyle', 'zoomed');

                document.body.classList.remove('is-visual');

                root.style.setProperty('--text-color-blue', '#24E5DB');
                root.style.setProperty('--text-color-gray', '#808080');
                root.style.setProperty('--text-color-light-gray', '#D1D2D4');
                root.style.setProperty('--text-color-orange', '#FF8B03');
                root.style.setProperty('--text-color-red', '#ff5722');
            } else {
                localStorage.setItem('bodyStyle', 'zoomed')
                document.body.classList.add('is-visual');

                root.style.setProperty('--text-color-blue', '#004784');
                root.style.setProperty('--text-color-gray', '#464646');
                root.style.setProperty('--text-color-light-gray', '#555');
                root.style.setProperty('--text-color-orange', '#0B2239');
                root.style.setProperty('--text-color-red', '#af0000');
            }
        }
    }
}
</script>