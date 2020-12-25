<template>
    <div class="view-sub-item-col">
        <div class="view-sub-item view-sub-item--user">
            <img :src="data.instance.avatar == 'none' || data.instance.avatar == null ? require(`@/assets/images/doctor.svg`) : data.instance.avatar" alt="user"
            :class="{'error_image' : data.instance.avatar == 'none' || data.instance.avatar == null}"
            >
            <div class="view-sub-item-content">
                <h4>{{data.instance.name + ' ' + data.instance.surname}}</h4>
                <div class="buttons-container">
                    <a :href="`/user/${data.instance.id}`" class="button button--details">Детальніше</a>
                    <SubscribeButton :category="'users'" :instanceId="data.instance_id" :minStyle="true"></SubscribeButton>
                </div>
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
    }
}
</script>