<template>
    <section>
       <div class="view-grid view-competition-grid">
            <div class="view-grid__column view-grid__column--6 view-grid__column-mob--12 view-competition-column">
               <div class="view-competition-column-inner">
                   <div class="view-breadcrumbs text-thin" v-if="clinic">
                        <router-link to="/" class="text-link router-link-active">
                            Головна сторінка
                        </router-link>
                        <span> / </span> 
                        <router-link to="/clinics/" class="text-link router-link-active">
                            Конкурси
                        </router-link>
                        <span> / </span> 
                        {{ clinic.name }}
                    </div>
                    <h2 class="view-title view-title--h2">{{clinic.name}}</h2>
                    <div class="view-grid view-competition-info">
                        <div class="view-grid__column view-grid__column--7 view-grid__column-smob--12">
                            <div class="view-competition-info__item">
                                <b>Керівник:</b>
                                <span>{{clinic.lider}}</span>
                            </div>
                        </div>
                        <div class="view-grid__column view-grid__column--5 view-grid__column-smob--12">

                            <!-- <div class="view-competition-file-select" :class="{'view-competition-file-select--single' : clinic.documents.length<2}">
                                <a :href="clinic.documents[0].url" target="_blank" class="view-competition-file-select-current">
                                    <img :src="require(`@/assets/images/file_gray.svg`)" alt="file">
                                    <span>{{clinic.documents[0].name}}</span> 
                                    <img :src="require(`@/assets/images/arrow_gray.svg`)" alt="arrow">
                                </a>
                                <div class="view-competition-file-select-list" v-if="clinic.documents.length>1">
                                    <a :href="item.url" v-for="(item,index) in clinic.documents" :key="index" target="_blank">{{item.name}}</a>
                                </div>
                            </div> -->

                        </div>
                        <div class="view-grid__column view-grid__column--12">
                            <div class="view-competition-info__item">
                                <b>Інформація про заклад:</b>
                                <span>{{clinic.description}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="view-competition-info__item view-competition-info__item--no-line m-b-0">
                        <a :href="clinic.webpage_link" class="view-competition-website">{{clinic.webpage_link}}</a>
                    </div>
                    <div class="view-competition-info__item view-competition-info__item--no-line">
                        <span>{{clinic.address}}</span>
                    </div>
               </div>
            </div>
            <div class="view-grid__column view-grid__column--6 view-competition-column view-grid__column-mob--12 view-competition-column--image">
                <div class="view-competition-column-inner">
                    <div class="image-container" :class="{ 'img_error' : clinic.image == null}">
                        <img :src="clinic.image !== null ? clinic.image.url : require(`@/assets/images/hospital.svg`)" 
                        alt="main_image">
                    </div>
                    <div class="view-grid">
                        <div class="view-grid__column view-grid__column--8">
                            <div class="view-competition-bar-info">
                                <span>Заповнено на</span>
                                <span>{{clinic.consist}}</span>
                            </div>
                            <div class="view-competition-bar">
                                <span :style="{ width: clinic.consist, backgroundColor: '#24E5DB' }"></span>
                            </div>
                        </div>
                        <div class="view-grid__column view-grid__column--4 view-competition-code">
                            <span>ЄДРПОУ:</span>
                            <span>{{clinic.code}}</span>
                        </div>
                        <div class="view-grid__column view-grid__column--12 ta-right">
                            <SubscribeButton :category="'clinics'" :instanceId="competitionId"></SubscribeButton>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </section>
</template>

<script>
import SubscribeButton from '@/components/Common/SubscribeButton';

export default {
    props: {
        clinic: Object,
        competitionId: Number
    },
    components: {
        SubscribeButton
    }
}
</script>