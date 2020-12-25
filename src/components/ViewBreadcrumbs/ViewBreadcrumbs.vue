<template>
    <div class="view-breadcrumbs text-thin">
        <router-link to="/" class="text-link">Головна сторінка</router-link>
        <div
            v-for="(item, index) in $route.matched" 
            :key="index"
        >
            <slot v-if="index < $route.matched.length - 1">
                <span> / </span>
                <router-link :to="item.path" class="text-link">{{ item.meta.title }}</router-link>
            </slot>

            <slot v-else>
                <span> / </span>
                {{ item.meta.title }}
            </slot>
        </div>
        
    </div>
</template>


<script>
export default {
    name: 'ViewBreadcrumbs',
}
</script>