<template>
   <section class="view-section">
       <div class="view-container">
            <div class="view-grid view-grid--align-center">
                <div class="view-grid__column view-grid__column--8 view-grid__column-mob--12">
                    <h2 class="view-title view-title--h2 view-title--section text-medium">
                        {{title}}
                    </h2>
                </div>
            </div>
            <ul class="view-stagelist">
                <li
                    class="view-stagelist__item" 
                   
                    v-for="(item, index) in steps" 
                    :key="index"
                    :class="{isActive : item.active}"
                >
                    <div class="view-stagelist__item__stage">
                        <span></span>
                        <div class="text-details text-thin">{{ item.start_date }}</div>
                    </div>
                    <svg width="172" height="14" viewBox="0 0 172 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.00588225" y1="6.00002" x2="170.006" y2="7.00002" :stroke="item.active ? item.color : '#0B2239'" stroke-width="2"/>
                        <path d="M164 1L170.5 7L164 13" :stroke="item.active ? item.color : '#0B2239'" stroke-width="2"/>
                    </svg>
                    <div class="view-stagelist__item__title">{{ item.name }}</div>
                </li>
            </ul>
            <div class="ta-center" v-if="currentIndex < 2">
                <a href="#modal" @click.prevent="openModal()" class="button button--default">Подати заяву на конкурс</a>
            </div>
            <Modal :id="id" :address="address"></Modal>
       </div>
   </section>
</template>

<script>
import Modal from '@/components/ViewCompetition/competitionModal'

export default {
    name: 'Steps',
    props: {
        title: String,
        steps: Array,
        address: String,
        id: Number
    },
    data() {
        return {
            currentIndex: 1
        }
    },
    components: {
        Modal
    },
    methods: {
        pastSteps: function() {
           const steps = document.querySelectorAll('.view-stagelist li')
           this.currentIndex
           steps.forEach((item, index)=>{
               if (item.classList.contains('isActive')){
                   this.currentIndex = index
               }
           })

           steps.forEach((item,index)=>{
               if (index < this.currentIndex) {
                   item.classList.add('past')
               }
           })
        },
        openModal(){
            this.$emit('openCompetitionModal')
        }
    },

    mounted() {
        this.pastSteps()
    }
}
</script>