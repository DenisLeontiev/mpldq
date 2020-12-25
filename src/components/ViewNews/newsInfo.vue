<template>
    <div class="view-news-info">
        <div class="view-news-service">
            <span>{{date}}</span>
            <span v-if="author !== null">© {{author}}</span>
            <div class="view-news-service__views">
                <img :src="require(`@/assets/images/views.svg`)" alt="views">
                {{views !== null ? views : '0'}}
            </div>
        </div>
        <div class="view-news-tags">
            <a @click.prevent="tagSearch(tag.id)" :href="`#${tag.tag_en}`" v-for="(tag, index) in tags" :key="index">
                #{{tag.tag_ua}}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['date','author', 'views', 'tags'],
    methods: {
        tagSearch(id){
            this.$router.push({path: '/search', query: {tags: id}})
        }
    }
}
</script>