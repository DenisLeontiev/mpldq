<template>
    <nav :class="className">
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <router-link @click.native="beforeClick" :to="item.url" class="text-link">{{ item.title }}</router-link>
            </li>
        </ul>
    </nav>
</template>


<script>
export default {
    name: 'Navigation',
    props: {
        list: Array,
        className: String
    },
    methods: {
        beforeClick() {
            this.$emit('routeChange')
        }
    }
}
</script>