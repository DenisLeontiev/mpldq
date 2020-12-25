<template>
    <div class="view-user-subscriptions">
        <div class="view-user-subscriptions-nav">
            <div class="view-user-subscriptions-col">
                <div @click.prevent="setActive('1')"
                class="view-user-subscriptions-nav__item" 
                :class="{ active: isActive('1') }" 
                >
                    Органи влади <span v-if="subOrganizations.length !== 0">({{subOrganizations.length}})</span>
                </div>
            </div>
            <div class="view-user-subscriptions-col">
                <div @click.prevent="setActive('2')" 
                class="view-user-subscriptions-nav__item" 
                :class="{ active: isActive('2') }" 
                >
                    Заклади ОЗ <span v-if="subClicins.length !== 0">({{subClicins.length}})</span>
                </div>
            </div>
            <div class="view-user-subscriptions-col">
                <div @click.prevent="setActive('3')" 
                class="view-user-subscriptions-nav__item" 
                :class="{ active: isActive('3') }" 
                >
                    Користувачі <span v-if="subUser.length !== 0">({{subUser.length}})</span>
                </div>
            </div>
        </div>

        <div class="view-user-subscriptions-tabs">

            <div class="view-user-subscriptions-tab" :class="{ 'active show': isActive('1') }">
                <div v-if="subOrganizations.length == 0" class="view-user-tab-err">
                    Підписки відсутні
                </div>
                <Organization  v-for="(item, index) in subOrganizations" :key="index" :data="item"></Organization>
            </div>

            <div class="view-user-subscriptions-tab" :class="{ 'active show': isActive('2') }">
                <div v-if="subClicins.length == 0" class="view-user-tab-err">
                    Підписки відсутні
                </div>
                <Clinic v-for="(item, index) in subClicins" :key="index" :data="item"></Clinic>
            </div>

            <div class="view-user-subscriptions-tab" :class="{ active: isActive('3') }">
                <div v-if="subUser.length == 0" class="view-user-tab-err">
                    Підписки відсутні
                </div>
                <User v-for="(item, index) in subUser" :key="index" :data="item"></User>
            </div>

        </div>
    </div>
</template>

<script>
import Organization from '@/components/Common/ViewAuthoritiesItem.vue'
import Clinic from '@/components/Common/ViewOrganizationItem.vue'
import User from '@/components/Common/ViewCandidateItem'

export default {
    props: {
        subscriptions: Array
    },
    data() {
        return {
            step: {
                active: false,
                title: 'Оголошення конкурсу',
                stage: '23.04.2020',
                color: '#63DF7B'
            },
            activeItem: '1',
            subTab1: [
                {},{},{},{}
            ],
            subTab2: [
                {},{},{}
            ],
            subTab3: null
        }
    },
    components: {
        Clinic,
        Organization,
        User
    },
    computed: {
        subOrganizations(){
           let vm = this;
            let filtered = [];
            for(let key in vm.subscriptions){
                let obj = vm.subscriptions[key];
                if(obj.instance_category === 'organizations'){ 
                      filtered.push(obj)
                }
            }
            return filtered 
        },
        subUser(){
            let vm = this;
            let filtered = [];
            for(let key in vm.subscriptions){
                let obj = vm.subscriptions[key];
                if(obj.instance_category === 'users'){ 
                      filtered.push(obj)
                }
            }
            return filtered
        },
        subClicins(){
            let vm = this;
            let filtered = [];
            for(let key in vm.subscriptions){
                let obj = vm.subscriptions[key];
                if(obj.instance_category === 'clinics'){ 
                    filtered.push(obj)
                }
            }
           
            return filtered
        }
    },
    methods: {
        isActive (menuItem) {
            return this.activeItem === menuItem
        },
        setActive (menuItem) {
            this.activeItem = menuItem
        }
    }
}
</script>