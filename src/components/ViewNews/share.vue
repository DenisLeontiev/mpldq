<template>
  <div class="view-share">
        <h4>Поділитися статею:</h4>
        <div class="view-share__inner">
            <a :href="facebookShareLink"><img :src="require(`@/assets/images/facebook.svg`)" alt="Facebook"></a>
            <a :href="twitterShareLink"><img :src="require(`@/assets/images/twitter.svg`)" alt="Twitter"></a>
            <a href="#copy" @click.prevent="copyToClipboard()">Копіювати посилання </a>
        </div>
  </div>
</template>

<script>
export default {
    name: 'Share',
    data() {
        return {

        }
    },
    computed: {
        twitterShareLink() {
            const href = 'https://twitter.com/intent/tweet?url=' + window.location.href
            return href
        },
        facebookShareLink() {
            const href = 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(window.location.href)
            return href
        }
    },
    methods: {
       copyToClipboard () {
           const url = window.location.href
           navigator.clipboard.writeText(url).then(()=>{
               
           })
       }
    }
}
</script>