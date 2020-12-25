<template>
  <main
        v-if="pageData"
        class="view-single-page"
    >
        <div class="view-container">
            <div class="view-breadcrumbs text-thin">
                <router-link to="/" class="text-link router-link-active">
                    Головна сторінка
                </router-link>
                <span> / </span>
                {{pageData.title}}
            </div>
        </div>

        <section 
            v-if="pageData"
            class="view-section view-about p-t-0">
            <div class="view-container-fluid">
                <div class="view-about__image">
                    <img 
                        :src="pageData.image !== null ? pageData.image.url : null" 
                        :alt="pageData.image !== null ? pageData.image.title : null" 
                    >
                </div>
                <div class="view-about__content">
                    <h1 class="view-title view-title--h1">{{ pageData.title }}</h1>
                    <div class="view-text" v-html="pageData.description"></div>
                </div>
            </div>
            <div class="view-container">
                <div class="view-text" v-html="pageData.metas.section_2"></div>
            </div>
        </section>

        <section class="view-section p-t-0">
            <div class="view-container">
                <div class="view-news-conent-wrapper">
                <div class="view-news-line" v-if="Object.keys(pageData.metas).length > 0">
                    <div class="view-text" v-for="(block, index) in pageData.metas" :key="index">
                        <div v-if="block.class_name">
                            <div :class="block.class_name" v-if="!block.image.url">
                                <p v-if="block.title">
                                    <b>{{block.title}}</b>
                                </p>
                                <p v-if="block.text" v-html="block.text"></p>
                            </div>

                            <div :class="block.class_name" v-else-if="block.class_name == 'view-text__subtitle'">
                                <h2 class="view-text__subtitle">{{block.title}}</h2>
                            </div>

                            <div class="view-text view-text__image" v-else>
                                <div class="view-text-col">
                                <img v-if="block"
                                    :src="`${block.image.url}`"
                                    :alt="block.image.title"
                                />
                                </div>
                                <div class="view-text-col">
                                <div :class="block.class_name">
                                    <p v-if="block.title">
                                    <b>{{block.title}}</b>
                                    </p>
                                    <p v-if="block.text">{{block.text}}</p>
                                </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div class="view-news-line" v-else>
                    <div class="view-text" v-html="pageData.content"></div>
                </div>
                </div>
            </div>
            </section>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: mapGetters(['pageData', 'pageLoader']),
    methods: mapActions(['loadPage']),
    beforeCreate() {
        this.$emit('initPreloader');
    },
    mounted() {
        const path = window.location.pathname
		const slug = path.split("/page/")[1]
        this.loadPage('/'+slug).then(() => {
            this.$emit('hidePreloader');
        });
    },
    watch: {
        pageData : {
            immediate: false,
            handler: function(val){
                if(val.error) {
                    this.$route.meta.status = '404';
                    this.$emit('hidePreloader');
                } else {
                    this.$emit('hidePreloader');
                }
            }
        }
    }
}
</script>