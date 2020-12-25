<template>
    <section class="view-section p-b-0" v-if="Object.keys(displayedCompetitions).length > 0">
       <div class="view-container">
            <div class="view-grid">
                <div class="view-grid__column view-grid__column--9">
                    <h2 class="view-title view-title--h2 view-title--section text-medium">
                        {{title}}
                    </h2>
                </div>
                <div class="view-grid__column view-grid__column--3 view-grid__column-mob--12">
                    <CustomSelect v-if="sortedYears.length > 1" @input="changeFilter" :data="sortedYears" :last="true"/>
                </div>
                <div class="view-grid__column view-grid__column--12">
                    <div class="competition-item view-grid" v-for="(item, index) in displayedCompetitions" :key="index">
                        <div class="competition-item__main view-grid__column view-grid__column--8 view-grid__column-mob--12">
                             <div class="view-grid">
                                <div class="view-grid__column view-grid__column--6 view-grid__column-mob--12 competition-item-date">
                                    <h3 class="view-title view-title--h3">Дата проведення:</h3>
                                    <span>{{item.start_date}}</span>
                                </div>
                                <div class="view-grid__column view-grid__column--6 view-grid__column-mob--12" v-if="item.winner !== null && item.winner !== undefined">
                                    <h3 class="view-title view-title--h3">Переможець конкурсу:</h3>
                                    <div class="competition-item-winner" v-if="item.winner">
                                        <h4>{{item.winner.name}}</h4>
                                        <span>{{item.winner.position}}</span>
                                        <span>{{item.winner.job}}</span>
                                    </div>
                                </div>
                                <div class="view-grid__column view-grid__column--12 competition-item-commission">
                                    <div class="view-text__bordered view-text__bordered--small">
                                        <div class="view-grid">
                                            <div class="view-grid__column view-grid__column--6">
                                                <div class="competition-item-commission__item">
                                                    <h3 class="">Голова КРК</h3>
                                                    <span>
                                                        {{item.commission.lider}}
                                                    </span>
                                                </div>
                                                <div class="competition-item-commission__item">
                                                    <h3 class="">Секретар КРК</h3>
                                                    <span>
                                                        {{item.commission.secretar}}
                                                    </span>
                                                </div>
                                            </div> 
                                            <div class="view-grid__column view-grid__column--6">
                                                <div class="competition-item-commission__item">
                                                    <h3 class="">Члени Комісії</h3>
                                                    <span v-for="(member, index) in item.commission.members" :key="index">
                                                        {{member}}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div class="competition-item__sidebar view-grid__column view-grid__column--4" v-if="item.candidates.lenght > 0">
                            <h3 class="view-title view-title--h3">Учасники конкурсу:</h3>
                            <div class="competition-item-scroll-list">
                                <simplebar>
                                    <div 
                                    class="competition-item__candidate" 
                                    v-for="(candidate, index) in item.candidates" :key="index"
                                    >
                                        <h4>{{candidate.name}}</h4>
                                        <span>{{candidate.position}}</span>
                                        <span>{{candidate.job}}</span>
                                    </div>
                                </simplebar>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="view-grid__column view-grid__column--12">
                    <div class="ta-center view-competition-show-more" v-if="showMoreBtn">
                        <a @click.prevent="showMore()" href="#" class="button button--default">Показати більше</a>
                    </div>
                </div>
            </div>
       </div>
   </section>
</template>

<script>
import simplebar from 'simplebar-vue';
import CustomSelect from "@/components/ViewSelect/ViewSelect.vue";

export default {
    data() {
        return {
            currentFilter: this.years ? this.years[this.years.length-1] : null,
            years: [],
            showMoreBtn: false,
            compToShow: 2,
            bufferedComp: [],
            sortedYears: [],
            displayedCompetitions: []
        }
    },
    props: {
        title: String,
        competitions: Array 
    },
    components: {
        CustomSelect,
        simplebar
    },
    computed: {
        displayedComp(){
            let vm = this;
            let filtered = {};
            for(let key in vm.competitions){
                let obj = vm.competitions[key];
                if(obj.start_date !== null) {
                    if(obj.start_date.slice(0,4) === vm.currentFilter){ 
                        filtered[key] = obj
                    }
                }
            }
            return filtered
        }
    },
    methods: {
        createdStartData(){
            let set = new Set()

            this.competitions.forEach(item => {
                if(item.start_date !== null) {
                    set.add(item.start_date.slice(0,4))
                    item.candidates.forEach(candidate=>{
                        if(candidate.status == 'winner') {
                            item.winner = candidate
                        }
                    })
                }
            });
            this.years = Array.from(set).sort()

            this.years.forEach(item => {
                let obj = {
                    name : `Конкурси ${item} року`,
                    key : item
                }
                this.sortedYears.push(obj)
            })
            this.currentFilter = this.years[this.years.length-1] 
        },
        changeFilter(item){
            this.currentFilter = item
        },
        showMore(){
            this.showMoreBtn = false

            this.bufferedComp.forEach(item=>{
                this.displayedCompetitions.push(item)
            })
        }
    },
    mounted(){
        this.createdStartData()
    },
    watch: {
        displayedComp: {
            immediate: true,
            handler: function(val){
                if (Object.keys(val).length > this.compToShow) {
                    this.displayedCompetitions = []
                    this.showMoreBtn = true
                    let bufferedKeys = Object.keys(val).slice(this.compToShow, Object.keys(val).length)
                    bufferedKeys.forEach(item=>{
                        this.bufferedComp.push(val[item])
                    })

                    let showedKeys = Object.keys(val).slice(0, this.compToShow)
                    showedKeys.forEach(item=>{
                        this.displayedCompetitions.push(val[item])
                    })
                } else {
                    this.displayedCompetitions = []
                    this.showMoreBtn = false
                    Object.keys(val).forEach(item=>{
                        this.displayedCompetitions.push(val[item])
                    })
                }
            }
        }
    }
}
</script>

<style>

</style>