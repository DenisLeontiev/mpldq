<template>
    <div class="view-user-info view-grid">
       <div class="view-grid__column view-grid__column--4 cust-width-4 view-grid__column-mob--12 p-r-10">
           <div class="view-user-competitions" v-if="participantInfo.competitions " :class="{hasScroll : competitionsScroll}">
                <h4 class="view-user__subtitle">Учасник конкурсів</h4>
                <div class="view-user-competitions-list">
                    <simplebar>
                         <a :href="item.url" 
                              v-for="(item, index) in participantInfo.competitions" 
                              :key="index"
                              class="view-user-competitions-list__item">
                              <div class="list-item">
                                   <h5>Дата проведення:</h5>
                                   <div class="list-item__inner">
                                        <span></span>
                                        <div>{{item.start_date}}</div>
                                   </div>
                              </div>
                              <div class="list-item">
                                   <h5>Статус:</h5>
                                   <div class="list-item__inner">
                                        <span></span>
                                        <div>{{status[item.pivot.participant_status]}}</div>
                                   </div>
                              </div>
                         </a>
                    </simplebar>
                </div>
           </div>
           <div class="view-user-declaration">
                <h4 class="view-user__subtitle">Декларації</h4>
                <a :href="item.url" target="_blank" 
                    :title="item.title"
                    v-for="(item, index) in participantInfo.declarations" 
                    :key="index"
                    >
                   <img :src="require(`@/assets/images/file_gray.svg`)"  alt="file">
                   {{item.title}}
                </a>
           </div>
       </div>

       <div class="view-grid__column view-grid__column--8 cust-width-8 view-grid__column-mob--12 p-l-10">
           <div class="view-user-cv" v-if="participantInfo.resume">
               <h4 class="view-user__subtitle">Резюме</h4>
                <div class="view-text">{{participantInfo.resume.text}}</div>
               <a :href="participantInfo.resume.file.url" :title="participantInfo.resume.file.title" target="_blank">
                   <img :src="require(`@/assets/images/file_gray.svg`)"  alt="cv">
                   {{participantInfo.resume.file.title}}
               </a>
           </div>
           <div class="view-user-about" v-if="participantInfo.user">
                <div class="view-user-about__item">
                   <h4 class="view-user-about__title view-user__subtitle">Остання керівна посада:</h4>
                   <div class="view-text">
                        {{participantInfo.user.position}} <br> {{participantInfo.user.job}} <br> від {{participantInfo.user.position_start_date}}
                   </div>
                </div>
                <div class="view-user-about__item">
                   <h4 class="view-user-about__title view-user__subtitle">Останнє навчання, яке Ви відвідував(-ла)</h4>
                   <div class="view-text">
                        {{participantInfo.last_study}}
                   </div>
                </div>
                <div class="view-user-about__item">
                   <h4 class="view-user-about__title view-user__subtitle">Я вирішив очолити очолити медичний заклад тому, що:</h4>
                   <div class="view-text">
                        {{participantInfo.comp_reason}}
                   </div>
                </div>
                <div class="view-user-about__item">
                   <h4 class="view-user-about__title view-user__subtitle">На мою думку успішний медичний заклад це:</h4>
                   <div class="view-text">
                        {{participantInfo.i_think}}
                   </div>
                </div>
                <div class="view-user-about__item">
                   <h4 class="view-user-about__title view-user__subtitle">Які зміни в медичному закладі Ви будете вважати достойним результатом своєї діяльності на керівній посаді?</h4>
                   <div class="view-text">
                        {{participantInfo.result_changes}}
                   </div>
                </div>
           </div>
       </div>
    </div>
</template>

<script>
import simplebar from 'simplebar-vue';

export default {
     props: {
          participantInfo: Object
     },
     data() {
          return {
               status: {
                    all: 'Усі учасники',
                    candidate: 'Кандидат',
                    participant: 'Учасник',
                    winner: 'Переможець'
               }
          }
     },
     computed: {
          competitionsScroll() {
               if (this.participantInfo.competitions !== undefined && this.participantInfo.competitions.length > 2) {
                    return true
               } else {
                    return false
               }
          }
     },
     components: {
          simplebar
     }
}
</script>