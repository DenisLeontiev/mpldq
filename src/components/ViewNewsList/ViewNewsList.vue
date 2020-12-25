<template>
    <section class="view-section">
        <div class="view-container">
            <div class="view-grid view-grid--align-center">
                <div class="view-grid__column view-grid__column--6">
                    <h2 class="view-title view-title--h2 view-title--section text-medium">
                        Новини
                    </h2>
                </div>
                <div class="view-grid__column view-grid__column--6">
                    <div class="view-news-list__navigation m-b-60">
                        <div class="view-news-list__arrow" @click="prevSlide">
                            <svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="27.5" y1="7" x2="2.5" y2="7" stroke-width="2"/>
                                <path d="M8.5 13L2 7L8.5 1" stroke-width="2"/>
                            </svg>
                        </div>
                        <div class="view-news-list__pagination">
                            <div 
                                v-for="(item, index) in newsList"
                                :key="index"
                                :class="[index == 0 ? 'is-active' : '', 'view-news-list__pagination__item']" 
                                :data-index="index"
                                @click="paginationSlide"
                            >
                            </div>
                        </div>
                        <div class="view-news-list__arrow" @click="nextSlide">
                            <svg width="27" height="14" viewBox="0 0 27 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="-8.74228e-08" y1="7" x2="25" y2="7" stroke-width="2"/>
                                <path d="M19 1L25.5 7L19 13" stroke-width="2"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="view-news-list">
                <VueSlickCarousel 
                    :arrows="true" 
                    :dots="true"
                    :slidesToShow="3"
                    :slidesToScroll="1"
                    :responsive="responsive"
                    v-if="newsList.length"
                    @beforeChange="getCurrentSlide"
                >
                    <div 
                        class="view-news-list__item"
                        v-for="(item, index) in newsList"
                        :key="index"
                    >
                        <div class="view-news-list__item__date text-thin text-gray">{{ item.date }}</div>
                        <router-link 
                            :to="{name: 'singleNews', params: {id: item.slug}}" 
                            class="text-link text-link text-medium"
                        >
                            {{ item.title }}
                        </router-link>
                    </div>
                </VueSlickCarousel>
            </div>
            <div class="m-t-50 ta-center">
                <router-link to="/news/" class="button button--default">До усіх новин</router-link>
            </div>
        </div>
    </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
    name: 'ViewNewsList',
    props: ['newsList'],
    data() {
        return {
            responsive: [
                {
                    "breakpoint": 812,
                    "settings": {
                        "slidesToShow": 2,
                        "slidesToScroll": 1,
                    }
                }, {
                    "breakpoint": 525,
                    "settings": {
                        "slidesToShow": 1,
                        "slidesToScroll": 1,
                    }
                },
            ]
        }
    },
    components: {
        VueSlickCarousel
    },
    methods: {
        getCurrentSlide: function(oldSlideIndex, newSlideIndex) {
            document.querySelector('.view-news-list__pagination__item.is-active').classList.remove('is-active');
            document.querySelectorAll('.view-news-list__pagination__item')[newSlideIndex].classList.add('is-active');
        },

        prevSlide: function(event) {
            event.preventDefault();

            if (document.querySelectorAll('.view-news-list .slick-prev')[0]) {
                document.querySelectorAll('.view-news-list .slick-prev')[0].click();
            }
        },

        nextSlide: function(event) {
            event.preventDefault();

            if (document.querySelectorAll('.view-news-list .slick-next')[0]) {
                document.querySelectorAll('.view-news-list .slick-next')[0].click();
            }
        },

        paginationSlide: function(event) {
            if (event.currentTarget.classList.contains('is-active')) return;

            event.preventDefault();

            const item = event.currentTarget;
            const index = item.dataset.index;

            document.querySelector('.view-news-list__pagination__item.is-active').classList.remove('is-active');
            item.classList.add('is-active');

            document.querySelectorAll('.view-news-list .slick-dots li')[index].click();
        }
    },
    mounted() {
        this.$emit('loadedItem')
    }
}
</script>