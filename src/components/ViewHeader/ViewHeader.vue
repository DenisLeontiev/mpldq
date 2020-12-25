<template>
    <header 
        :class="[className, 'view-header']"
    >
        <div class="view-container">
            <router-link to="/" class="view-header__logotype">
                <img :src="require(`@/assets/images/logo.svg`)" alt="#">
            </router-link>
            <span v-if="true" class="view-header-status-label">
                test
            </span>
            <Navigation 
                className="view-header__navigation"
                :list="navigationHeader" 
            />

            <div class="view-mobile-menu-wrapper">
                <MobileMenu :navInfo="navigationHeader"></MobileMenu>
            </div>
        </div>
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Navigation from '../Navigation/Navigation'
import MobileMenu from '../Common/ViewMobileMenu'

export default {
    name: 'ViewHeader',
    props: {
        className: String
    },
    components: {
        Navigation,
        MobileMenu
    },
    computed: {
        ...mapGetters([
            'navigationHeader',
        ])
    },
    methods: {
        ...mapActions(['fetchNavigation']),
    },
    async created() {
        this.fetchNavigation('main-menu');
    }
}
</script>