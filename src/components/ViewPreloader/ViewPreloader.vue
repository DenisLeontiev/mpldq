<template>
    <transition name="fade" v-if="showPreloader">
        <div class="view-preloader" :class="{'view-preloader--fullpage': fullpage}">
           <div class="view-preloader-inner">
                <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="38.5" x2="38.5" y2="10" stroke="#0B2239"/>
                    <line x1="38.5" y1="66" x2="38.5" y2="76" stroke="#0B2239"/>
                    <line opacity="0.5" x1="38.5" y1="66" x2="38.5" y2="76" stroke="white"/>
                    <line x1="10" y1="38.5" x2="-4.37114e-08" y2="38.5" stroke="#0B2239"/>
                    <line opacity="0.8" x1="10" y1="38.5" x2="-4.37114e-08" y2="38.5" stroke="white"/>
                    <line x1="76" y1="38.5" x2="66" y2="38.5" stroke="#0B2239"/>
                    <line opacity="0.2" x1="76" y1="38.5" x2="66" y2="38.5" stroke="white"/>
                    <line x1="13.4102" y1="24.433" x2="4.7499" y2="19.433" stroke="#0B2239"/>
                    <line opacity="0.9" x1="13.4102" y1="24.433" x2="4.7499" y2="19.433" stroke="white"/>
                    <line x1="70.5679" y1="57.433" x2="61.9076" y2="52.433" stroke="#0B2239"/>
                    <line opacity="0.3" x1="70.5679" y1="57.433" x2="61.9076" y2="52.433" stroke="white"/>
                    <line x1="12.9102" y1="52.433" x2="4.2499" y2="57.433" stroke="#0B2239"/>
                    <line opacity="0.7" x1="12.9102" y1="52.433" x2="4.2499" y2="57.433" stroke="white"/>
                    <line x1="70.0679" y1="19.433" x2="61.4076" y2="24.433" stroke="#0B2239"/>
                    <line opacity="0.1" x1="70.0679" y1="19.433" x2="61.4076" y2="24.433" stroke="white"/>
                    <line x1="24.4204" y1="62.4563" x2="19.4334" y2="71.124" stroke="#0B2239"/>
                    <line opacity="0.6" x1="24.4204" y1="62.4563" x2="19.4334" y2="71.124" stroke="white"/>
                    <line x1="57.335" y1="5.24935" x2="52.3479" y2="13.9171" stroke="#0B2239"/>
                    <line opacity="0.05" x1="57.335" y1="5.24935" x2="52.3479" y2="13.9171" stroke="white"/>
                    <line x1="23.567" y1="12.9103" x2="18.567" y2="4.25002" stroke="#0B2239"/>
                    <line opacity="0.95" x1="23.567" y1="12.9103" x2="18.567" y2="4.25002" stroke="white"/>
                    <line x1="56.567" y1="70.0678" x2="51.567" y2="61.4076" stroke="#0B2239"/>
                    <line opacity="0.4" x1="56.567" y1="70.0678" x2="51.567" y2="61.4076" stroke="white"/>
                </svg>
           </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: [
        'loaded',
        'items',
        'fullpage'
    ],
    data () {
        return {
            showPreloader: true
        }
    },
    computed: {
        percentages(){
            return (100*this.loaded)/this.items
        }
    },
    watch: {
        items: {
            immediate: true,
            handler(val) {
                if(val > 0 && this.loaded == 0) {
                    this.showPreloader = true
                }
            }
        },
        loaded: {
            immediate: true,
            handler(val) {
                if(val !== 0 && val == this.items) {
                    this.showPreloader = false
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>
