<template>
    <div class="view-placefinder">
        <div class="view-placefinder__search">
            <div class="view-placefinder__search__field">
                <input type="text" placeholder="Пошук закладів" v-model="search">
                <a href="#">
                    <svg width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9609 17.3004L13.5895 12.9289C14.673 11.6078 15.3262 9.91562 15.3262 8.07129C15.3262 3.84082 11.8936 0.408203 7.66309 0.408203C3.42891 0.408203 0 3.84082 0 8.07129C0 12.3018 3.42891 15.7344 7.66309 15.7344C9.50742 15.7344 11.1959 15.085 12.517 14.0014L16.8885 18.3691C17.1854 18.666 17.6641 18.666 17.9609 18.3691C18.2578 18.076 18.2578 17.5936 17.9609 17.3004ZM7.66309 14.2092C4.275 14.2092 1.52148 11.4557 1.52148 8.07129C1.52148 4.68691 4.275 1.92969 7.66309 1.92969C11.0475 1.92969 13.8047 4.68691 13.8047 8.07129C13.8047 11.4557 11.0475 14.2092 7.66309 14.2092Z"/>
                    </svg>
                </a>
            </div>

            <div class="view-placefinder__result" data-simplebar>
                <simplebar>
                    <div
                        v-for="item in filteredList"
                        :key="item.id"
                        :class="[ 'view-placefinder__result__item', item.status && 'view-placefinder__result__item--orange' ]"
                    >
                        <router-link :to="'/clinics/' + item.slug" class="text-link">{{ item.name }}</router-link>
                        <div class="view-placefinder__result__item__footer">
                            <div class="view-placefinder__result__item__info">
                                <div class="text-thin">{{ item.address }}</div>
                                <hr>
                                <div class="view-placefinder__result__item__rewrapp">
                                    <div class="text-sub text-gray text-thin view-placefinder__result__item__date">{{ new Date(item.created_at).toLocaleString('ru', {year: 'numeric', month: 'numeric', day: 'numeric'}) }}</div>
                                    <router-link :to="{name: 'Clinic', params: {slug: item.slug}}" class="view-placefinder__result__item__link">
                                        {{ item.competition_status | translate}}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </simplebar>
            </div>

            <div class="ta-center m-t-auto">
                <router-link to="/clinics/" class="button button--default">Всі конкурси</router-link>
            </div>
        </div>

        <div class="view-placefinder__map">
            <div class="view-placefinder__map__board" ref="googleMap"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import simplebar from 'simplebar-vue';
import GoogleMapsApiLoader from 'google-maps-api-loader';

export default {
    name: 'ViewPlacefinder',
    data() {
        return {
            search: '',
            itemList: [],
            google: null,
            map: null,
            bounds: null,
        }
    },
    components: {
        simplebar
    },  
    computed: {
        ...mapGetters(['placefinderList', 'locationList', 'placefinderLoader']),

        filteredList() {
            return this.placefinderList.filter(item => {
                return item.name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: {
        ...mapActions(['loadPlacefinderList', 'loadLocationList']),

        initializeMap() {
            this.bounds = new this.google.maps.LatLngBounds();
            const mapContainer = this.$refs.googleMap;

            this.map = new this.google.maps.Map(
                    mapContainer
                );

            this.locationList.forEach(item => {
                const location = new this.google.maps.LatLng(item.latitude, item.longitude);
                this.bounds.extend(location);

                new this.google.maps.Marker({
                    position: location,
                    map: this.map,
                    title: item.name,
                    status: 'active'
                })
            });

            this.map.fitBounds(this.bounds);
            this.map.panToBounds(this.bounds);
        }
    },
    async mounted() {
        const googleMapApi = await GoogleMapsApiLoader({
            apiKey: process.env.VUE_APP_GOOGLE_TOKEN
        });
        this.google = googleMapApi;

        this.loadPlacefinderList();
        this.loadLocationList().then(() => this.initializeMap());

    },

    filters: {
        translate: (val) => {
            switch(val) {
                case 'active':
                    return 'Активний';
                    break; // eslint-disable-line no-unreachable
                case 'planned':
                    return 'Заплановано';
                    break; // eslint-disable-line no-unreachable
                case 'planed':
                    return 'Заплановано';
                    break; // eslint-disable-line no-unreachable
                case 'draft':
                    return 'Чернетка';
                    break; // eslint-disable-line no-unreachable
                case 'finished':
                    return 'Закінчено';
                    break; // eslint-disable-line no-unreachable
                default:
                    return '';
            }
        }
    }
}
</script>