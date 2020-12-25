<template>
    <div>
        <a href="#"
            v-if="!isSubscribe" 
            class="button button--orange button--arrow" :class="{'button--no-border':minStyle}"
            @click.prevent="subscribe()"
        >
            Стежити 
            <img :src="require(`@/assets/images/arrow.svg`)" alt="arrow">
        </a>
        <a href="#" 
            v-else 
            class="button button--arrow" :class="{'button--gray':minStyle, 'button--default': !minStyle}"
            @click.prevent="unsubscribe()"
        >
            Не стежити 
            <img :src="require(`@/assets/images/arrow_gray_s.svg`)" alt="arrow">
        </a>
    </div>
</template>

<script>
export default {
    props: {
       category: String,
       instanceId: Number,
       minStyle: {
           type: Boolean,
           default: false
       }
    },
    data(){
        return {
            isSubscribe: false,
            subscriptionId: null
        }
    },
    computed: {
        userId(){
            let userDetails =  JSON.parse(window.localStorage.getItem('userDetails'))
            if(userDetails !== null) {
                return userDetails.id
            } else {
                return null
            }
            
        },
        token(){
            let token = window.localStorage.getItem('access_token')
            if (token !== null) {
                return JSON.parse(token).token
            } else {
                return null
            }
        }
    },
    methods: {
       async subscribe(){
            const params = new FormData();
            params.append('instance_category', this.category)
            params.append('user_id', this.userId)
            params.append('instance_id', this.instanceId)

            
            if (this.token) {
                const response = await fetch(
                    `${process.env.VUE_APP_API_URL}/subscribtions`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.token}`
                        },
                        body: params
                    }
                );
                const data = await response.json()
                if(data.error == 'Unauthorized') {
                    console.error(data)
                }
                this.checkSubscribe()
            } else {
                this.$router.push({path: '/login'})
            }
        },
        async unsubscribe(){
            if (this.token !== null) {
                const response = await fetch(
                    `${process.env.VUE_APP_API_URL}/subscribtions/${this.subscriptionId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${this.token}`
                        }
                    }
                );
                const data = await response.json()
                if (data.message == 'Deleted') {
                    this.isSubscribe = false
                } else if (data.error == 'Unauthorized'){
                    this.$router.push({path: '/login'})
                } else {
                    console.error(data.error)
                }
            } else {
                this.$router.push({path: '/login'})
            }
        },
        async checkSubscribe(){
            const params = new FormData();
            if (this.userId !== null) {
                params.append('instance_category', this.category)
                params.append('user_id', this.userId)
                params.append('instance_id', this.instanceId)
                let response = await fetch(`${process.env.VUE_APP_API_URL}/subscribtions/check`, {
                    method: 'POST',
                    body: params
                })
                let data = await response.json()
                if (data.exist == true) {
                    this.isSubscribe = true
                    this.subscriptionId = data.id
                }
            }
        }
    },
    created(){
        this.checkSubscribe()
    }
}
</script>