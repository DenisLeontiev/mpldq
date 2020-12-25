<template>
    <section class="view-section view-team">
        <div class="view-container">
            <h2 class="view-title view-title--h2 view-title--section text-medium m-b-0">Команда проекту</h2>
            <div class="view-team__list view-grid">
                <div 
                    v-for="(item, index) in team" 
                    :key="index"
                    class="view-team__item view-grid__column view-grid__column--4 view-grid__column-mob--12"
                >
                    <div class="view-team__item__image">
                        <img :src="item.image !== null ? item.image.url : null" :alt="item.title">
                    </div>
                    <div class="view-team__item__title view-title view-title--h3">
                        {{ item.title }}
                    </div>
                    <div class="view-text text-thin">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
export default {
    name: 'ViewTeam',
    props: {
        team: Array
    },
}
</script>