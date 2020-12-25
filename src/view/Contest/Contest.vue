<template>
    <main
        v-if="pageData"
    >
        <div class="view-container">
            <ViewBreadcrumbs />
            <div class="ta-center">
                <h1 class="view-title view-title--h1">Все про конкурс</h1>
            </div>
        </div>

        <section class="view-section b-bottom">
            <div class="view-container">
                <div class="view-competition-header view-grid">
                    <a 
                        v-for="(item, index) in pageData.metas"
                        :href="'#' + index"
                        :key="index"
                        class="view-competition-header__item view-grid__column view-grid__column--6">
                        <svg width="172" height="14" viewBox="0 0 172 14" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0.00588225" y1="6.00002" x2="170.006" y2="7.00002" stroke-width="2"></line>
                            <path d="M164 1L170.5 7L164 13" stroke-width="2"></path>
                        </svg>
                        {{ index }}
                    </a>
                </div>
            </div>
        </section>
        <div class="view-about__list">
            <section
                v-for="(item, index) in pageData.metas"
                :key="index"
                :class="['view-section view-about']"
                v-html="item"
                :id="index"
            >
            </section>
        </div>
    </main>
</template> 

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs/ViewBreadcrumbs';

export default {
    components: {
        ViewBreadcrumbs
    },
    computed: mapGetters(['pageData', 'pageLoader']),
    methods: mapActions(['loadPage']),
    beforeCreate() {
        this.$emit('initPreloader')
    },
    mounted() {
        this.loadPage(window.location.pathname).then(() => {
            this.$emit('hidePreloader');
        });
    }
}
</script>