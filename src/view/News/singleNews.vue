<template>
  <div>
    <DetailNews v-if="newsData.news_type == 'news'" :newsData = "newsData"></DetailNews>
    <AutoNews v-else :newsData = "newsData"></AutoNews>
  </div>
</template>

<script>
import AutoNews from './AutoNews'
import DetailNews from './DetailNews'

export default {
	components: {
        AutoNews,
        DetailNews,
	},
	computed: {
		newsData: function() {
			let data = this.$store.getters.getNewsSingle
			return data
		},
		comSlug: function() {
			let slug = this.$route.params.id
			return slug
		}
	},
	metaInfo() {
        return {
            title: this.newsData.title
        }
    },
	beforeCreate(){
        this.$emit('initPreloader')
	},
	async mounted() {
        const path = window.location.pathname
		const slug = path.split("/news/")[1]
		this.$store.dispatch('fetchNewsSingle', {slug})
	},
	watch: {
		newsData: {
			handler: function(val) {
				if(val.error) {
					this.$route.meta.status = '404'
					this.$emit('hidePreloader')
				} else {
					this.$emit('hidePreloader')
				}
			} 
		}
	}
}
</script>