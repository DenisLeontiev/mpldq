<template>
    <div class="view-user-info view-grid">
       <div class="view-grid__column view-grid__column--4 view-grid__column-cust-mob--5-12 p-r-10">
           <div class="view-user-photo">
               <div class="view-user-photo__wrapper">
                    <img :src="userInfo.avatar == 'none' || userInfo.avatar == null ? require(`@/assets/images/doctor.svg`) : userInfo.avatar" 
                    :class="{'error_image' : userInfo.avatar == 'none' || userInfo.avatar == null}" 
                    alt="photo">
                    <a href="#" v-if="isOwner" @click.prevent="editPhoto()" class="view-user-photo__edit">
                        <div>
                            <img :src="require(`@/assets/images/camera.svg`)" alt="camera">
                            <span>Змінити фото</span>
                        </div>
                    </a>
               </div>
               <div class="view-user-photo__info">
                   <span>
                       <img :src="require(`@/assets/images/letter.svg`)" alt="mail">
                       <a :href="'mailto:'+userInfo.email">{{userInfo.email}}</a>
                   </span>
                   <span class="m-b-60">
                       <img :src="require(`@/assets/images/phone.svg`)" alt="phone">
                       <a :href="`tel:${('+380 67 234 56 78').replace(/\D/g,'')}`">+380 67 234 56 78</a>
                   </span>
                    <div class="ta-center" v-if="userInfo.id">
                        <SubscribeButton v-if="!isOwner" :category="'users'" :instanceId="userInfo.id"></SubscribeButton>
                        <router-link :to="{name: 'UserEdit'}" v-else class="button button--default">Редагувати профіль</router-link>
                    </div>
               </div>
           </div>
       </div>
       <div class="view-grid__column view-grid__column--8 view-grid__column-cust-mob--7-12 p-l-10">
           <div class="view-user-name">
               <div class="view-user-name__top">
                   <h3 class="view-title view-title--h3">{{userInfo.name + ' ' + userInfo.surname}}</h3>
                   <span>{{userInfo.location_id}}</span>
               </div>
               <div class="view-user-name__bottom">
                   <div class="view-user-row" v-if="userInfo.job !== null">
                       <div class="view-user-col">
                           <span>Назва організації</span>
                       </div>
                       <div class="view-user-col">
                           <span>{{userInfo.job}}</span>
                       </div>
                   </div>

                   <div class="view-user-row" v-if="userInfo.position !== null">
                       <div class="view-user-col">
                           <span>Посада</span>
                       </div>
                       <div class="view-user-col">
                           <span>{{userInfo.position}} від <span v-if="userInfo.position_start_date!==null">{{userInfo.position_start_date}}</span></span>
                       </div>
                   </div>

                   <div class="view-user-row" v-if="tags !== null && tags !== undefined">
                       <div class="view-user-col">
                           <span>Теги</span>
                       </div>
                       <div class="view-user-col view-user-tags">
                            <a @click.prevent="tagSearch(tag.id)" :href="`#${tag.tag_en}`" v-for="(tag, index) in tags" :key="index">
                                #{{tag.tag_ua}}
                            </a>
                       </div>
                   </div>
               </div>
           </div>

           <div class="view-user-socials">
               <div class="view-user-socials__item">
                    <img :src="require(`@/assets/images/fb_square.svg`)" alt="facebook">
                    <a href="#">www.facebook/username.com</a>
               </div>
               <div class="view-user-socials__item">
                    <img :src="require(`@/assets/images/twitter_square.svg`)" alt="twitter">
                    <a href="#">www.twitter/username.com</a>
               </div>
               <div class="view-user-socials__item">
                    <img :src="require(`@/assets/images/web.svg`)" alt="web_site">
                    <a href="#">www.website.com</a>
               </div>
           </div>
       </div>
       <div class="view-grid__column view-grid__column--12" v-if="userInfo.description !== null">
           <div class="view-user-bio">
               <h4 class="view-user__subtitle">Про мене</h4>
               <p v-html="userInfo.description" class="view-text"></p>
           </div>
       </div>
    </div>
</template>

<script>
import SubscribeButton from '@/components/Common/SubscribeButton';

export default {
    props: {
        isOwner: Boolean,
        userInfo: Object,
        tags: Array
    },
    components: {
        SubscribeButton
    },
    methods: {
        editPhoto() {
            //edit photo logic here
        },
        tagSearch(id){
            this.$router.push({path: '/search', query: {tags: id}})
        }
    }
}
</script>