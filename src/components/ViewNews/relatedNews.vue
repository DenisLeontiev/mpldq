<template>
    <div class="view-related-news" :class="{'view-related-news--horizontal': horizontal}">
        <h2 v-if="horizontal==true" class="view-title view-title--h2 view-title--section text-medium">
            {{title}}
        </h2>
        <h3 v-else class="view-related-news__title">{{title}}</h3>
        <div class="view-related-news__list">
            <div class="view-related-news-item" v-for="item in data" :key="item.slug">
                <span>{{item.date}}</span>
                <a :href="originPath + '/news/' + item.slug">{{item.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            originPath: window.location.origin
        }
    },
    props: ['title', 'data', 'horizontal']
}
</script>