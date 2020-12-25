<template>
    <main>
        <template
            v-if="homeMeta"
        >
            <ViewBelowHeader :meta="homeMeta" v-on:loadedItem="loaded()" />
            <ViewDatabase :title="$options.filters.normalize(homeMeta.stats_section_title)" v-on:loadedItem="loaded()" />
            <ViewGraphs :title="$options.filters.normalize(homeMeta.organizations_section_title)"/>
            <ViewCandidates :title="$options.filters.normalize(homeMeta.participants_section_title)" />
        </template>
        <ViewNewsList v-if="newsList" :newsList="newsList" v-on:loadedItem="loaded()"/>
        <ViewPartners v-if="homeMeta" :title="$options.filters.normalize(homeMeta.partners_section_title)"/>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewBelowHeader from './ViewBelowHeader';
import ViewDatabase from './ViewDatabase';
import ViewGraphs from './ViewGraphs';
import ViewCandidates from './ViewCandidates';
import ViewPartners from '@/components/ViewPartners/ViewPartners';
import ViewNewsList from '@/components/ViewNewsList/ViewNewsList';

export default {
    data() {
        return {
            state: {
                loaded: 0,
                items: 3
            }
        }
    },
    components: {
        ViewBelowHeader,
        ViewDatabase,
        ViewGraphs,
        ViewCandidates,
        ViewPartners,
        ViewNewsList
    },
    computed: mapGetters(['newsList' ,'homeMeta']),
    methods: {...mapActions(['fetchNewsList', 'fetchHomeMeta']),
        loaded() {
            this.state.loaded++
            this.$emit('updateLoaderState', this.state);
        }
    },
    beforeCreate(){
        this.$emit('initPreloader')
    },
    created(){
         this.$emit('updateLoaderState', this.state);
    },
    async mounted() {
        this.fetchNewsList();
        this.fetchHomeMeta();
    },

    filters: {
        normalize: (value) => {
            if (Array.isArray(value)) return value[0];
            return value;
        }
    }
}
</script>
