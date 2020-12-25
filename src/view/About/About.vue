<template>
    <main
        v-if="pageData"
    >
        <div class="view-container">
            <ViewBreadcrumbs />
        </div>

        <section 
            v-if="pageData"
            class="view-section view-about p-t-0">
            <div class="view-container-fluid">
                <h1 class="view-title view-title--h1 hide-l">{{ pageData.title }}</h1>
                <div class="view-about__image">
                    <img 
                        :src="pageData.image !== null ? pageData.image.url : null" 
                        :alt="pageData.image !== null ? pageData.image.title : null" 
                    >
                </div>
                <div class="view-about__content">
                    <h1 class="view-title view-title--h1 hide-m">{{ pageData.title }}</h1>
                    <div class="view-text" v-html="pageData.metas.section_1"></div>
                </div>
            </div>
            <div class="view-container">
                <div class="view-text" v-html="pageData.metas.section_2"></div>
            </div>
        </section>
        <ViewPartners :title="'Організатори проекту'"/>
        <ViewTeam 
            v-if="pageData.metas.team"
            :team="pageData.metas.team"
        />
    </main>
</template> 

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs/ViewBreadcrumbs';
import ViewPartners from '@/components/ViewPartners/ViewPartners';
import ViewTeam from './ViewTeam';

export default {
    components: {
        ViewBreadcrumbs,
        ViewPartners,
        ViewTeam
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