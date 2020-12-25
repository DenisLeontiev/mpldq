<template>
    <div class="view-sub-item-col">
        <div class="view-sub-item view-sub-item--organization">
            <h4>{{data.instance.name}}</h4>
            <span>{{data.instance.address}}</span>
            <div class="count-container">
                <span>Всього ЗОЗ: <b>{{data.instance.clinics_count}}</b></span>
                <span>Конкурси на платформі: <b>{{data.instance.last_competitions ? data.instance.last_competitions.length : 0}}</b></span>
            </div>
            <div class="buttons-container">
                <a v-if="isActive" :href="`/organizations/${data.instance.slug}`" class="button button--details">Детальніше</a>
                <span v-else class="not-register"> *не зареєстровано </span>
                <SubscribeButton :category="'organizations'" :instanceId="data.instance_id" :minStyle="true"></SubscribeButton>
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
    computed: {
        isActive(){
            return this.data.instance !== null ? this.data.instance.status === 'active' : false
        }
    }
}
</script>