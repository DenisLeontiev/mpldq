<template>
    <div class="view-news-list__item">
        <div class="view-news-list__item__date text-thin text-gray">{{ item.date }}</div>
        <router-link 
            :to="{name: 'singleNews', params: {id: item.slug}}" 
            class="text-link text-link text-medium"
        >
            {{ item.title }}
        </router-link>
    </div>
</template>

<script>
export default {
    props: [
        'item'
    ]
}
</script>