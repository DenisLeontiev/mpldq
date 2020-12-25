<template>
    <section class="view-section">
        <div class="view-section--fifty-fifty">
            <div class="view-container">
                <div class="view-grid view-grid--align-center">
                    <div class="view-grid__column view-grid__column--6 view-grid__column-mob--12">
                        <h2 class="view-title view-title--h2 view-title--section text-medium">
                            {{title}}
                        </h2>
                    </div>
                </div>
                <div class="view-graphs view-grid">
                    <template
                        v-if="graphsList"
                    >
                        <div class="view-grid__column view-grid__column--6 view-grid__column-mob--12">
                            <div
                                v-for="(item, index) in graphsList.top"
                                :key="index"
                                class="view-graphs__item"
                            >
                                <h3 class="view-title view-title--h3 text-medium">{{ item.name }}</h3>
                                <div class="view-graphs__item__info">
                                    <ViewGraph 
                                        :index="index"
                                        :data="item.competitions"
                                    />
                                    <div class="view-graphs__item__desription">
                                        <div class="text-light">Всього Закладів: <b>{{ item.clinics_count }}</b></div>
                                        <div class="text-light">Активні конкурси: <b>{{ item.competitions.active }}</b></div>
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

                        <div class="view-grid__column view-grid__column--6 view-grid__column-mob--12 view-grid__column--gray">
                            <div
                                v-for="(item, index) in graphsList.worst"
                                :key="index"
                                class="view-graphs__item"
                            >
                                <h3 class="view-title view-title--h3 text-medium">{{ item.name }}</h3>
                                <div class="view-graphs__item__info">
                                    <ViewGraph 
                                        :index="index + 3"
                                        :data="item.competitions"
                                    />
                                    <div class="view-graphs__item__desription">
                                        <div class="text-light">Всього Закладів: <b>{{ item.clinics_count }}</b></div>
                                        <div class="text-light">Активні конкурси: <b>{{ item.competitions.active }}</b></div>
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
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewGraph from '@/components/ViewGraph/ViewGraph';

export default {
    name: 'ViewGraphs',
    components: {
        ViewGraph
    },
    props: ['title'],
    computed: mapGetters(['graphsList']),
    methods: mapActions(['loadGraphsList']),
    async mounted() {
        this.loadGraphsList();
    },
}
</script>