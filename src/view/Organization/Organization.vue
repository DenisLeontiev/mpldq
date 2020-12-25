<template>
    <main v-if="organization" class="view-organization-page">
        <div class="view-container">
            <div class="view-breadcrumbs text-thin" v-if="organization">
                <router-link to="/" class="text-link router-link-active">
                    Головна сторінка
                </router-link>
                <span> / </span> 
                <router-link to="/organizations/" class="text-link router-link-active">
                    Організації
                </router-link>
                <span> / </span> 
                {{ organization.name }}
            </div>
            <div class="view-organization-header"
                v-if="organization"
            >
                <h1 class="view-title view-title--h1 view-organization-header__title">
                    <img :src="organization.image !== null ? organization.image.url : null" :alt="organization.name">
                    {{ organization.name }}
                 </h1>
                <div class="view-organization-header__info">
                    <div class="view-organization-header__info__description">
                        <div class="view-organization-header__info__contacts text-sub text-light">
                            <img :src="organization.image !== null ? organization.image.url : null" :alt="organization.name">
                            <div class="view-organization-header__info__contacts__block">
                                <span>ЄДРПОУ: {{ organization.code }}</span>
                                <div>
                                    <template
                                        v-if="organization.tags_values"
                                    >
                                         <a @click.prevent="tagSearch(tag.id)" :href="`#${tag.tag_en}`" v-for="(tag, index) in organization.tags_values" :key="index">
                                            #{{tag.tag_ua}}
                                        </a>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <div class="view-organization-header__info__contacts text-light">
                            {{ organization.address }}
                        </div>
                        <div class="view-text">
                            <p>{{ organization.description }}</p>
                        </div>
                        <a :href="`mailto:${organization.email}`" class="text-link text-light">
                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.2573 10.1025L19.9998 14.365V5.65997L13.2573 10.1025Z"></path>
                                <path d="M0 5.65997V14.365L6.7425 10.1025L0 5.65997Z"></path>
                                <path d="M18.7501 3.125H1.2501C0.626348 3.125 0.131348 3.59 0.0375977 4.18875L10.0001 10.7525L19.9626 4.18875C19.8688 3.59 19.3738 3.125 18.7501 3.125Z"></path>
                                <path d="M12.1125 10.8576L10.3438 12.0226C10.2388 12.0913 10.12 12.1251 10 12.1251C9.88004 12.1251 9.76129 12.0913 9.65629 12.0226L7.88754 10.8563L0.0400391 15.8201C0.136289 16.4138 0.628789 16.8751 1.25004 16.8751H18.75C19.3713 16.8751 19.8638 16.4138 19.96 15.8201L12.1125 10.8576Z"></path>
                            </svg>
                            {{ organization.email }}
                        </a>
                        <br>
                        <a :href="`tel:${organization.phone}`" class="text-link text-light">
                            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.4211 13.1684C17.1873 13.1684 15.979 12.9758 14.8337 12.5979C14.2747 12.4053 13.64 12.5537 13.2726 12.9284L11.0021 14.6432C8.39685 13.2527 6.72948 11.5863 5.35792 9.00001L7.02632 6.78316C7.44632 6.36316 7.59686 5.74841 7.41686 5.17264C7.0358 4.02 6.84213 2.81053 6.84213 1.57895C6.84213 0.708405 6.13372 0 5.26318 0H1.57895C0.708405 0 0 0.708405 0 1.57895C0 11.7358 8.26422 20 18.4211 20C19.2916 20 20 19.2916 20 18.4211V14.7474C20 13.8768 19.2916 13.1684 18.4211 13.1684Z"></path>
                            </svg>
                            {{ organization.phone }}
                        </a>
                    </div>
                    <div class="view-organization-header__info__graph view-organization-header__info__graph--desktop view-graphs">
                        <div class="view-graphs__item">
                            <div class="view-graphs__item__info">
                                <ViewGraph 
                                    :index="1"
                                    :data="organization.competitions_stat"
                                />
                                <div class="view-graphs__item__desription">
                                    <div class="text-light">Всього Закладів: <b>{{ Object.values(organization.competitions_stat).reduce((t, a) => t + Number(a), 0) }}</b></div>
                                    <div class="text-light">Активні конкурси: <b>{{ organization.competitions_stat.active }}</b></div>
                                    <hr>
                                    <ul class="colored-list text-sub">
                                        <li>Планується</li>
                                        <li>Проводиться конкурсів </li>
                                        <li>Завершено</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="view-organization-header__footer">
                    <div class="view-database text-light">
                        <div class="view-database__item">
                            <div class="view-database__item__header">Загальний бютжет<span>{{ organization.budget }}</span></div>
                            <div class="view-database__item__bar">
                                <span :style="`width: calc(100% * ${Number(organization.medicineBudget) / Number(organization.budget)}); background: #2482FF`"></span>
                            </div>
                            <div class="view-database__item__footer">Бютжет на медицину<span style="color: #2482FF">{{organization.medicineBudget}}</span></div>
                        </div>
                        <div class="view-database__item">
                            <div class="view-database__item__header">Кількість населення<span>{{ organization.citizens }}</span></div>
                            <div class="view-database__item__bar">
                                <span :style="`width: calc(100% * ${ Number(organization.oneCitizenBudget) / Number(organization.citizens)} ); background: #19DDD3`"></span>
                            </div>
                            <div class="view-database__item__footer">Бютжет на 1 громадянина<span style="color: #19DDD3">{{ organization.oneCitizenBudget }}</span></div>
                        </div>
                    </div>

                    <div class="view-organization-header__footer__graph view-organization-header__footer__graph--mobile view-graphs">
                        <div class="view-graphs__item">
                            <div class="view-graphs__item__info">
                                <ViewGraph 
                                    :index="2"
                                    :data="organization.competitions_stat"
                                />
                                <div class="view-graphs__item__desription">
                                    <div class="text-light">Всього Закладів: <b>{{ Object.values(organization.competitions_stat).reduce((t, a) => t + Number(a), 0) }}</b></div>
                                    <div class="text-light">Активні конкурси: <b>{{ organization.competitions_stat.active }}</b></div>
                                    <hr>
                                    <ul class="colored-list text-sub">
                                        <li>Планується</li>
                                        <li>Проводиться конкурсів </li>
                                        <li>Завершено</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="view-organization-header__footer__subscribe">
                         <SubscribeButton :category="'organizations'" :instanceId="organization.id"></SubscribeButton>
                    </div>
                   
                </div>
            </div>
        </div>
        <section 
            v-if="organization.commission"
            class="view-section"
        >
            <div class="view-container">
                <h2 class="view-title view-title--h2 view-title--section text-medium">Комісії</h2>
                <div class="view-commissions">
                    <div class="view-commissions__item">
                        <div class="view-commissions__item__title view-title view-title--h3 text-medium">
                            Комісія №1
                        </div>
                        <div class="view-commissions__item__secretary">
                            <div class="text-medium">Голова комісії:</div>
                            <ul class="text-light">
                                <li>{{ organization.commission.lider }}</li>
                            </ul>
                        </div>
                        <div class="view-commissions__item__secretary">
                            <div class="text-medium">Секретар комісії:</div>
                            <ul class="text-light">
                                <li>{{ organization.commission.secretar }}</li>
                            </ul>
                        </div>
                        <div class="view-commissions__item__members">
                            <div class="text-medium">Члени комісії:</div>
                            <ul class="text-light">
                                <li
                                    v-for="(item, index) in organization.commission.members"
                                    :key="index"
                                >
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section 
            v-if="organization.clinics"
            class="view-section p-t-0"
        >
            <div class="view-container">
                <h2 class="view-title view-title--h2 view-title--section text-medium">Перелік ЗОЗ</h2>
                <div class="view-zoz-list">
                    <router-link 
                        v-for="(item, index) in organization.clinics"
                        :key="index"
                        :to="{name: 'Clinic', params: {slug: item.slug}}" 
                        class="view-zoz-list__item"
                    >
                        <span class="view-zoz-list__item__image">
                            <img v-if="item.status == 'active'" :src="organization.image !== null ? organization.image.url : null" :alt="item.name">
                            <img v-else :src="require(`@/assets/images/Group 2272.png`)" alt="#">
                        </span>
                        <span class="view-zoz-list__item__caption ta-center">
                            <span class="view-zoz-list__item__title view-title view-title--h3 text-medium">
                                {{ item.name }}
                            </span>
                            <span class="view-zoz-list__item__location">{{ item.address }}</span>
                        </span>
                        <span 
                            v-if="item.status == 'active'"
                            class="view-zoz-list__item__link text-medium"
                        > 
                            Перейти до конкурсу
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.1743 7.50001L7.05808 8.38379L11.25 4.1919L7.05808 0L6.1743 0.883784L8.8574 3.56689H0V4.8169H8.85744L6.1743 7.50001Z" fill="white"></path>
                            </svg>
                        </span>
                        <span 
                            v-else
                            class="view-zoz-list__item__registration text-light"
                        >
                            *не зареєстровано
                        </span>
                    </router-link>
                </div>
            </div>
        </section>
        <section class="view-section p-t-0 p-b-0">
            <div class="view-container">
                <h2 class="view-title view-title--h2 view-title--section text-medium">Карта</h2>
            </div>
            <div ref="googleMap" style="height: 100vh"></div>
        </section>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GoogleMapsApiLoader from 'google-maps-api-loader';
import ViewGraph from '@/components/ViewGraph/ViewGraph';
import SubscribeButton from '@/components/Common/SubscribeButton';

export default {
    components: {
        ViewGraph,
        SubscribeButton
    },
    data() {
        return {
            state: {
                loaded: 0,
                items: 1,
            },
            google: null,
            map: null,
        }
    },
    computed: {
        ...mapGetters([
            'organization',
            'organizationLoader',
        ])
    },
    methods: {
        ...mapActions(['loadOrganization']),

        loaded() {
            this.state.loaded++
            this.$emit('updateLoaderState', this.state);
        },

        initializeMap(latitude, longitude) {
            this.bounds = new this.google.maps.LatLngBounds();
            const mapContainer = this.$refs.googleMap;

            this.map = new this.google.maps.Map(
                mapContainer,
                {
                    zoom: 14,
                    center: { lat: latitude, lng: longitude },
                }
            );

            new this.google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: this.map,
                title: 'Title',
                status: 'active'
            })

            //this.map.fitBounds(this.bounds);
            //this.map.panToBounds(this.bounds);
        },

        tagSearch(id){
            this.$router.push({path: '/search', query: {tags: id}})
        }
    },
    beforeCreate() {
        this.$emit('initPreloader')
    },
    async created() {
        this.$emit('updateLoaderState', this.state);

        const googleMapApi = await GoogleMapsApiLoader({
            apiKey: process.env.VUE_APP_GOOGLE_TOKEN
        });
        this.google = googleMapApi;

        const slug = window.location.pathname.split('/organizations/')[1];
        this.loadOrganization(slug).then(() => {

            this.loaded();

            if (this.organization) {
                this.initializeMap(Number(this.organization.latitude), Number(this.organization.longitude));
            } else {
                console.error('error -> redirect to 404');
            }
        });
    },
}
</script>