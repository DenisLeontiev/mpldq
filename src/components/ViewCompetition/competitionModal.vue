<template>
  <transition name="fade">
      <div v-if="isOpen" class="view-competition-modal" @click="closeModal($event)">
          <div class="view-competition-modal__inner">
                <div @click.prevent="closeModal()" class="view-competition-modal__close">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.0326 14.7873L12.8906 10.6453L17.0713 6.46461L14.7487 4.14199L10.568 8.3227L6.42599 4.1807L4.18079 6.4259L8.32279 10.5679L4.14208 14.7486L6.4647 17.0712L10.6454 12.8905L14.7874 17.0325L17.0326 14.7873Z" fill="#808080"/>
                    </svg>
                </div>
                <h3 class="view-title view-title--h3">Подати заявку</h3>
                <p v-if="!isAuthorized && token == null" class="view-text">Для подачі заявки необхідно <b>зареєструватися</b> та <b>заповнити профіль кандидата</b></p>
                <p v-if="isAuthorized && !isCandidate" class="view-text">Для того аби подати заявку необхідно створити <b>профіль кандидата</b></p>
                <p v-if="isAuthorized && isCandidate" class="view-text">Для завершення офіційної подачі на конкурс необхідно <b>відправити</b> передбачені процедурою <b>документи на комісію</b></p>
                <div class="view-competition-modal__buttons" v-if="!isAuthorized && token == null">
                        <router-link to="/login" class="button button--default">Увійти</router-link>
                        <router-link to="/registration" class="button button--primary">Зареєструватися</router-link>
                </div>

                <div v-if="isAuthorized && !isCandidate" class="view-competition-modal__buttons" :class="{'view-competition-modal__buttons--full' : !isCandidate}">
                        <router-link :to="`/user/${userId}/create-profile`" class="button button--primary">Створити профіль кандидата</router-link>
                </div>
                
                <div v-if="isAuthorized && isCandidate" class="view-competition-modal-candidate">
                    <div class="view-competition-modal-candidate__row">
                        <h4>Перелік документів:</h4>
                        <div class="view-competition-file-select-current">
                            <img :src="require(`@/assets/images/file_gray.svg`)" alt="file">
                            <span>Про проведення конкурсу</span> 
                        </div>
                        <div class="view-competition-file-select-current">
                            <img :src="require(`@/assets/images/file_gray.svg`)" alt="file">
                            <span>Про визначення секретаря КРК</span> 
                        </div>
                        <div class="view-competition-file-select-current">
                            <img :src="require(`@/assets/images/file_gray.svg`)" alt="file">
                            <span>Про визначення переможців 1 етапу</span> 
                        </div>
                    </div>
                    <div class="view-competition-modal-candidate__row">
                        <h4>Адреса доставки документів:</h4>
                        <span>{{address}}</span>
                    </div>
                    <div class="view-competition-modal__buttons" :class="{'view-competition-modal__buttons--full' : !isCandidate}">
                        <a @click.prevent="closeModal()" class="button button--default" href="#">Зрозуміло</a>
                        <a @click.prevent="sendCandidate()" class="button button--primary" href="#accept">Підтвердити</a>
                    </div>
                </div>
          </div>
      </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: {
        address: String,
        id: Number
    },
    data() {
        return {
            isAuthorized: false,
            isOpen: false
        }
    },
    computed: {
         ...mapGetters(['candidateStatus', 'candidateInfo']),
        token(){
            let token = window.localStorage.getItem('access_token')
            if (token !== null) {
                return JSON.parse(token).token
            } else {
                return null
            }
        },
        userId(){
            if (this.token !== null) {
                return JSON.parse(window.localStorage.getItem('userDetails')).id
            } else {
                return null
            }
        },
        isCandidate(){
            if(this.candidateInfo.partisipant !== null) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
         ...mapActions(['addCandidate', 'fetchCandidateStatus']),
        async sendCandidate(){
            if(this.token !== null) {
                this.addCandidate({comp_id: this.id ,token: this.token})
                let statusError = await this.candidateStatus
                if (statusError == true) {
                    this.closeModal()
                }
            }
        },
        openModal(){
            this.isOpen = true
        },
        closeModal(event){
            if(event !== undefined) {
                if(event.target.classList.contains('view-competition-modal')) {
                    this.isOpen = false
                }
            } else {
               this.isOpen = false 
            }
        }
    },
    created: function() {
        this.$parent.$on('openCompetitionModal', this.openModal);
    },
    async mounted(){
        if(this.userId !== null) {
            this.fetchCandidateStatus({id: this.userId})
        }
    },
    watch: {
        token: {
            immediate: true,
            handler(val) {
                if(val !== null) {
                    this.isAuthorized = true
                } else {
                    this.isAuthorized = false
                }
            }
        },
    }
}
</script>