<template>
    <section class="view-section view-section--background-light p-t-0">
        <div class="view-container">
            <div class="view-breadcrumbs text-thin">
                <router-link to="/" class="text-link router-link-active">
                    Головна сторінка
                </router-link>
                <span> / </span>
                Інформація про кандидата
            </div>
            <ViewInfo v-if="participantInfo.user" :userInfo="participantInfo.user" :isOwner="isOwner"></ViewInfo>
            <ViewDetail v-if="participantInfo.participant" :participantInfo="participantInfo"></ViewDetail>
            <ViewSubsc v-if="participantInfo.user" :subscriptions="participantInfo.user.subscriptions"></ViewSubsc>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewInfo from '@/components/ViewUser/ViewUserInfo';
import ViewDetail from '@/components/ViewUser/ViewUserDetail';
import ViewSubsc from '@/components/ViewUser/ViewUserSubscriptions';

export default {
    data() {
        return {
            isOwner: false,
            state: {
                loaded: 0,
                items: 1
            }
        }
    },
    components: {
        ViewInfo,
        ViewDetail,
        ViewSubsc
    },
    computed: mapGetters(['participantInfo']),
    methods: mapActions(['fetchCandidateInfo']),
    beforeCreate() {
        this.$emit('initPreloader')
    },
    async mounted() {
        const path = window.location.pathname;
        const id = path.split('/user/')[1].replace(/[^+\d]/g, '');
        let userDetail = JSON.parse(window.localStorage.getItem('userDetails'));

        if (userDetail !== null) {
            this.isOwner = id == userDetail.id;
        } 
        this.fetchCandidateInfo({id: id}).then(() => {
            this.$emit('hidePreloader');
        });
    }
}
</script>