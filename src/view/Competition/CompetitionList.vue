<template>
    <main>
        <div class="view-container">
            <ViewBreadcrumbs />
            <h2 class="view-title view-title--h2">Конкурси</h2>
        </div>

        <section class="view-section p-t-0">
            <div class="view-container">
                <div class="view-search-result p-t-0">
                    <Clinic v-for="(item, index) in competitionsList" :key="index" :data="{instance: item, instance_category: 'clinics', instance_id: item.id}"></Clinic>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Clinic from '@/components/Common/ViewOrganizationItem'
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs/ViewBreadcrumbs';

export default {
    components: {
        Clinic,
        ViewBreadcrumbs
    },
    computed: mapGetters(['competitionsList']),
    methods: mapActions(['fetchCompetitionsList']),
    beforeCreate() {
        this.$emit('initPreloader')
    },
    async mounted() {
        this.fetchCompetitionsList().then(() => {
            this.$emit('hidePreloader');
        });
    }
}
</script>