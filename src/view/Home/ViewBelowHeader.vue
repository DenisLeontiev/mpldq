<template>
    <div class="view-belowheader">
        <div class="view-container">
            <div class="view-belowheader__undertitle view-title view-title--h3 text-blue text-medium">
                {{meta.site_name | normalize}}
            </div>
            <h1 class="view-belowheader__title view-title view-title--h1 text-medium" v-html="$options.filters.normalize(meta.title)">
               
            </h1>
            <ul class="view-stagelist">
                <li
                    class="view-stagelist__item"
                    v-for="(item, index) in stageList" 
                    :key="index"
                >
                    <div class="view-stagelist__item__stage">
                        <span :style="{ borderColor: item.color }"></span>
                        <div class="text-details text-thin">{{ item.stage }}</div>
                    </div>
                    <svg width="172" height="14" viewBox="0 0 172 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.00588225" y1="6.00002" x2="170.006" y2="7.00002" stroke="#0B2239" stroke-width="2"/>
                        <path d="M164 1L170.5 7L164 13" stroke="#0B2239" stroke-width="2"/>
                    </svg>
                    <div class="view-stagelist__item__title">{{ item.title }}</div>
                </li>
            </ul>
            <div class="button-list">
                <router-link to="/registration" class="button button--primary">
                    долучитися
                </router-link>
                <router-link to="/contest" class="button button--default">Дізнатися більше</router-link>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'ViewBelowHeader',
    props: ['meta'],
    data() {
        return {
            stageList: [
                {
                    title: 'Оголошення конкурсу',
                    stage: '1 етап',
                    color: '#63DF7B'
                }, {
                    title: 'Прийом заявок',
                    stage: '2 етап',
                    color: '#FF8B03'
                }, {
                    title: 'Відбір кандидатів',
                    stage: '3 етап',
                    color: '#FE5051'
                }, {
                    title: 'Визначення переможця',
                    stage: '4 етап',
                    color: '#2482FF'
                }, {
                    title: 'Контракт укладено',
                    stage: '5 етап',
                    color: '#24E5DB'
                }
            ]
        }
    },
    mounted() {
        this.$emit('loadedItem')
    },

    filters: {
        normalize: (value) => {
            if (Array.isArray(value)) return value[0];
            return value;
        }
    }
}
</script>