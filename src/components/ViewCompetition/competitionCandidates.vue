<template>
    <section class="view-section view-section-cust-candidates p-b-0">
       <div class="view-container">
            <div class="view-grid">
                <div class="view-grid__column view-grid__column--9 view-grid__column-mob--12">
                    <h2 class="view-title view-title--h2 view-title--section text-medium">
                        {{title}}
                    </h2>
                </div>
                <div class="view-grid__column view-grid__column--3 view-grid__column-mob--12">
                    <CustomSelect @input="changeFilter" :data="filterData"/>
                </div>
                <div class="view-grid__column view-grid__column--12">
                    <div class="candidate-list">
                        <div class="candidate-item" v-for="(item, index) in displayedCandidates" :key="index">
                            <div class="candidate-item__col">
                                <img :class="{'error_image' : item.avatar == 'none' || item.avatar == null}"
                                :src="item.avatar == 'none' || item.avatar !== null ? item.avatar :require(`@/assets/images/doctor.svg`)" 
                                alt="img">
                            </div>
                            <div class="candidate-item__col">
                                <h3 class="view-title view-title--h3">{{item.name + ' ' + item.surname}}</h3>
                                <span>{{item.job}}</span>
                                <span>Тернопільська міська лікарня №2</span>
                                <span v-if="item.position_start_date">від {{item.position_start_date}}</span>
                                <div class="candidate-item__status" :class="'candidate-item__status--'+item.status">{{status[item.status]}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </section>
</template>

<script>
import CustomSelect from "@/components/ViewSelect/ViewSelect.vue";

export default {
    props: {
        title: String,
        candidates: Array
    },
    data(){
        return {
            currentFilter: 'all',
            filterData: [
                {
                    name: 'Усі учасники',
                    key: 'all'
                },
                {
                    name: 'Кандидат',
                    key: 'candidate'
                },
                {
                    name: 'Учасник',
                    key: 'participant'
                },
                {
                    name: 'Переможець',
                    key: 'winner'
                }
            ],
            status: {
                all: 'Усі учасники',
                candidate: 'Кандидат',
                participant: 'Учасник',
                winner: 'Переможець'
            }
        }
    },
    components: {
        CustomSelect
    },
    computed: {
        displayedCandidates(){
            let vm = this;
            let filtered = {};
            if (vm.currentFilter !== 'all') {
                for(let key in vm.candidates){
                    let obj = vm.candidates[key];
                    if(obj.status === vm.currentFilter){ 
                        filtered[key] = obj
                    }
                }
                return filtered
            } else {
                return vm.candidates
            }
            
        }
    },
    methods: {
        changeFilter(item){
            if (item !=='Усі учасники') {
                this.currentFilter = item
            }
        }
    }
}
</script>