<template>
    <div class="view-sub-item-col">
        <div class="view-sub-item view-sub-item--organization">
            <h4>{{data.instance.name}}</h4>
            <span>{{data.instance.address}}</span>
            <div class="step-container view-stagelist">
                <div
                    class="view-stagelist__item" 
                    :class="{isActive : step.active}"
                >
                    <div class="view-stagelist__item__stage">
                        <span :style="{ borderColor: step.color }"></span>
                        <div class="text-details text-thin">{{ step.stage }}</div>
                    </div>
                    <svg width="172" height="14" viewBox="0 0 172 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.00588225" y1="6.00002" x2="170.006" y2="7.00002" :stroke="step.active ? step.color : '#0B2239'" stroke-width="2"/>
                        <path d="M164 1L170.5 7L164 13" :stroke="step.active ? step.color : '#0B2239'" stroke-width="2"/>
                    </svg>
                    <div class="view-stagelist__item__title">{{ step.title }}</div>
                </div>
            </div>
            <div class="buttons-container">
                <a :href="`/clinics/${data.instance.slug}`" class="button button--details">Детальніше</a>
                <SubscribeButton :category="'clinics'" :instanceId="data.instance_id" :minStyle="true"></SubscribeButton>
            </div>
        </div>
    </div>
</template>

<script>
import SubscribeButton from '@/components/Common/SubscribeButton';

export default {
    props: {
        data: Object
    },
    components: {
        SubscribeButton
    },
    data(){
        return {
            step: {
                active: false,
                title: 'Оголошення конкурсу',
                stage: '23.04.2020',
                color: '#63DF7B'
            }
        }
    }
}
</script>