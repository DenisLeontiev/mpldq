<template>
  <main class="view-news-page">
	<div class="view-container">
		<ViewBreadcrumbs />
	</div>
	<section class="view-section p-t-0 p-b-0">
		<div class="view-container">
			<h2 class="view-title view-title--h2">Новини</h2>
			<div class="view-grid">
				<div class="view-grid__column view-grid__column--8 view-grid__column-mob--12  p-r-10">
					<img class="view-news-image-background" :src="require(`@/assets/images/news_background.png`)" alt="news_background">
					<div class="view-news-tags" v-if="tagsList !== null">
						<h3 class="view-title">Найпоширеніші теги:</h3>
						<div class="view-news-tags__list">
							<a @click.prevent="tagSearch(tag.id)" :href="`#${tag.tag_en}`" v-for="(tag, index) in tagsList" :key="index">#{{tag.tag_ua}}</a>
						</div>
					</div>
					<div class="view-news-list">
						<div 
							class="view-news-list__item"
							v-for="(item, index) in displayedPosts"
							:key="index"
						>
							<div class="view-news-list__item__date text-thin text-gray">{{ item.date }}</div>
							<router-link 
								:to="{name: 'singleNews', params: {id: item.slug}}" 
								class="text-link text-link text-medium"
							>
								{{ item.title }}
							</router-link>
						</div>
					</div>
					<div class="view-news-list-bottom m-b-60" v-if="posts.length > perPage">
						<div class="view-news-list__navigation">
							<div class="view-news-list__arrow" @click="prevPage()">
								<svg width="28" height="14" viewBox="0 0 28 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<line x1="27.5" y1="7" x2="2.5" y2="7" stroke-width="2"/>
									<path d="M8.5 13L2 7L8.5 1" stroke-width="2"/>
								</svg>
							</div>
							<div class="view-news-list__pagination">
								<div 
									v-for="(item, index) in pages"
									:key="index"
									:class="[index == page-1 ? 'is-active' : '', 'view-news-list__pagination__item']" 
									:data-index="index"
									@click="paginationSlide(index)"
								>
								</div>
							</div>
							<div class="view-news-list__arrow" @click="nextPage()">
								<svg width="27" height="14" viewBox="0 0 27 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<line x1="-8.74228e-08" y1="7" x2="25" y2="7" stroke-width="2"/>
									<path d="M19 1L25.5 7L19 13" stroke-width="2"/>
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div class="view-grid__column view-grid__column--4 view-grid__column-mob--12  p-l-10">
					<ViewSubscribe></ViewSubscribe>
				</div>
			</div>
		</div>
	</section>

      
  </main>
</template>

<script>
import ViewBreadcrumbs from '@/components/ViewBreadcrumbs/ViewBreadcrumbs';
import ViewSubscribe from '@/components/ViewSubscribe/ViewSubscribe';

export default {
	name: 'newsList',
	data() {
		return {
			page: 1,
			perPage: 5,
			pages: []
		}
	},
	components: {
		ViewBreadcrumbs,
		ViewSubscribe
	},
	methods: { 
		setPages () {
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (posts) {
			if(posts.length) {
				let page = this.page;
				let perPage = this.perPage;
				let from = (page * perPage) - perPage;
				let to = (page * perPage);
				return  posts.slice(from, to);	
			}
		},
		paginationSlide(index){
			this.page = index + 1
		},
		prevPage(){
			if(this.page !== 1) {
				this.page--
			}
		},
		nextPage(){
			if(this.page !== this.pages.length) {
				this.page++
			}
		},
		tagSearch(id) {
			this.$router.push({path: '/search', query: {tags: id}})
		}
	},
	computed: {
		tagsList() {
			let tagsGroups = this.$store.getters.tagsList
			let newsGroup = []
			tagsGroups.forEach(group => {
				if(group.name == 'Новини') {
					newsGroup = group.tags
				}
			});
			if (newsGroup.length > 0) {
				return newsGroup
			} else {
				return null
			}
			
		},
		posts() {
			return this.$store.getters.newsList
		},
		displayedPosts(){
			return this.paginate(this.posts)
		}
	},
	beforeCreate(){
        this.$emit('initPreloader')
    },
    mounted() {
		this.$store.dispatch('fetchTagsList')
		this.$store.dispatch('fetchNewsList');
		
	},
	watch: {
		posts () {
			this.setPages();
			this.$emit('hidePreloader')
		}
	}
}
</script>