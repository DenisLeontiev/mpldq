<template>
    <main class="view-user">
        <router-view 
            @hidePreloader="hideLoader()" 
        />
    </main>
</template>

<script>
export default {
    data() {
        return {
            showPreloader: true,
        }
    },
    methods: {
        hideLoader() {
            this.$emit('hidePreloader');
        }
    },
    beforeCreate() {
        this.$emit('initPreloader')
    },
    updated() {
        this.$emit('initPreloader')
    },
}
</script>