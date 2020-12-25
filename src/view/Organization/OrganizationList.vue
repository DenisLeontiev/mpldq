<template>
    <main>
        <div class="view-container">
            <ViewBreadcrumbs />
            <h2 class="view-title view-title--h2">Організації</h2>
        </div>

        <section class="view-section p-t-0">
            <div class="view-container">
                <div class="view-zoz-list">
                    <Organization v-for="(item, index) in organizations" :key="index" :data="{instance: item, instance_category: 'organizations', instance_id: item.id}"></Organization>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Organization from '@/components/Common/ViewAuthoritiesItem'
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs/ViewBreadcrumbs';

export default {
    components: {
        ViewBreadcrumbs,
        Organization

    },
    computed: mapGetters(['organizations']),
    methods: mapActions(['loadOrganizations']),
    beforeCreate() {
        this.$emit('initPreloader')
    },
    async mounted() {
        this.loadOrganizations().then(() => {
            this.$emit('hidePreloader');
        });
    }
}
</script>