<template>
    <footer class="view-footer">
        <div class="view-container">
            <div class="view-footer__left-column">
                <a href="/" class="view-footer__logotype">
                    <img :src="require(`@/assets/images/logotype_small.png`)" alt="#">
                </a>
                <ul class="view-footer__social" v-if="footerSocials[0] && footerSocials[0].sub">
                    <li class="view-footer__social__item" v-for="(item, index) in footerSocials[0].sub" :key="index">
                        <a :href="item.url" class="text-link">
                            <img :src="item.title" alt="">
                        </a>
                    </li>
                </ul>
            </div>

            <div class="view-footer__middle-column">
                <Navigation 
                    className="view-footer__navigation"
                    :list="navigationFooter" 
                />
            </div>

            <div class="view-footer__right-column" v-if="footerInfo[0]">
                <div class="text-sub text-light" v-html="footerInfo[0].title"></div>
                <a v-if="footerInfo[0].sub[0] !== null && footerInfo[0].sub[0].url !== null" 
                :href="footerInfo[0].sub[0].url" class="footer-sub-img">
                    <img :src="footerInfo[0].sub[0] !== null && 
                    footerInfo[0].sub[0].title !== null ?
                    footerInfo[0].sub[0].title : null" alt="logo">
                </a>
                <span v-else class="footer-sub-img">
                    <img :src="footerInfo[0].sub[0] !== null && 
                    footerInfo[0].sub[0].title !== null ?
                    footerInfo[0].sub[0].title : null" alt="logo">
                </span>
            </div>
        </div>
        <div class="view-container">
            <div class="view-footer__copyright">
                {{currentYear}} © Коаліція Реанімаційний Пакет Реформ 
            </div>
        </div>
    </footer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Navigation from '../Navigation/Navigation';

export default {
    name: 'ViewFooter',
    data(){
        return {
            currentYear: ''
        }
    },
    components: {
        Navigation
    },
    computed: {
        ...mapGetters([
            'navigationFooter',
            'footerInfo',
            'footerSocials'
        ])
    },
    methods: {
        ...mapActions(['fetchNavigation']),
    },
    async created() {
        this.fetchNavigation('footer-menu');
        this.fetchNavigation('footer-info');
        this.fetchNavigation('footer-social');
        let date = new Date()
        this.currentYear = date.getFullYear()
    }
}
</script>