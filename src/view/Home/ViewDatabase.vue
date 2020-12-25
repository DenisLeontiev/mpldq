<template>
    <section class="view-section p-b-0">
        <div class="view-container">
            <div class="view-grid view-grid--align-center">
                <div class="view-grid__column view-grid__column--6 view-grid__column-mob--12">
                    <h2 class="view-title view-title--h2 view-title--section text-medium">
                        {{title}}
                    </h2>
                </div>
            </div>

            <div class="view-database view-grid text-sub text-light">
                <div 
                    class="view-database__item view-grid__column view-grid__column--3 view-grid__column-mob--12"
                    v-for="(item, index) in databaseList" 
                    :key="index"
                >
                    <div class="view-database__item__header">
                        {{ item.overall_title }}
                        <span>{{ item.overall }}</span>
                    </div>
                    <div class="view-database__item__bar">
                        <span :style="{ width: item.active * 100 / item.overall + '%', background: item.colors }"></span>
                    </div>
                    <div class="view-database__item__footer">
                        {{ item.active_title }}
                        <span :style="{ color: item.colors }">{{ item.active }}</span>
                    </div>
                </div>
            </div>

            <ViewPlacefinder />
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewPlacefinder from './ViewPlacefinder';

export default {
    name: 'ViewDatabase',
    props: ['title'],
    components: {
        ViewPlacefinder
    },
    computed: mapGetters(['databaseList']),
    methods: mapActions(['loadDatabaseList']),
    async mounted() {
        this.loadDatabaseList();
        this.$emit('loadedItem')
    },
}
</script>