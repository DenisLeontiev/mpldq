<template>
    <main>
        <div class="view-container">
            <ViewBreadcrumbs />
            <h2 class="view-title view-title--h2">Кандидати</h2>
        </div>

        <section class="view-section p-t-0">
            <div class="view-container">
                <div class="view-search-result p-t-0">
                    <Candidate v-for="(item, index) in participantsList" :key="index" :data="{instance: item.user, instance_category: 'users', instance_id: item.user.id}"></Candidate>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Candidate from '@/components/Common/ViewCandidateItem'
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs/ViewBreadcrumbs';

export default {
    components: {
        ViewBreadcrumbs,
        Candidate
    },
    computed: mapGetters(['participantsList']),
    methods: mapActions(['fetchCandidates']),
    beforeCreate() {
        this.$emit('initPreloader')
    },
    async mounted() {
        this.fetchCandidates().then(() => {
            this.$emit('hidePreloader');
        });
    }
}
</script>