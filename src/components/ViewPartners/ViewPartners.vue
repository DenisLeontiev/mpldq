<template>
    <section class="view-section view-section--background" v-if="partnersList.length > 0">
        <div class="view-container">
            <h2 class="view-title view-title--h2 view-title--section text-medium m-b-0">{{title}}</h2>
            <div class="view-partners" :class="{'less-height' : partnersList.length < 4}">
                <simplebar>
                    <template
                        v-for="(item, index) in partnersList"
                    >
                        <a 
                            v-if="item.url"
                            :href="item.url"
                            :key="index"
                        >
                            <img
                                :src="item.logo.url"
                                :alt="item.name"
                                :title="item.name"
                            >
                        </a>
                        <img
                            v-else
                            :key="index"
                            :src="item.logo.url"
                            :alt="item.name"
                            :title="item.name"
                        >
                    </template>
                </simplebar>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import simplebar from 'simplebar-vue';

export default {
    name: 'ViewPartners',
    props: ['title'],
    components: {
        simplebar
    },
    computed: mapGetters(['partnersList']),
    methods: mapActions(['loadPartnersList']),
    async mounted() {
        this.loadPartnersList();
    },
}
</script>