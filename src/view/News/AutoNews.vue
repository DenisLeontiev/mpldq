<template>
  <main class="view-news view-news--auto">
		<div class="view-container">
			<div class="view-breadcrumbs text-thin" v-if="newsData">
				<router-link to="/" class="text-link router-link-active">
					Головна сторінка
				</router-link>
				<span> / </span> 
				<router-link to="/news/" class="text-link router-link-active">
					Новини
				</router-link>
				<span> / </span> 
				{{ newsData.title }}
			</div>
		</div>

		<section class="view-section p-t-0 p-b-0">
			<div class="view-container">
				<h2 class="view-news__title view-title--h2">{{newsData.title}}</h2>

				<news-info :date="newsData.date" 
				:author="newsData.author" 
				:views="newsData.views"
				:tags="newsData.tags_values"></news-info>

				<div class="view-news-content" v-html="newsData.content"></div>

				<div class="view-news-share">
					<Share></Share>
				</div>
			</div>
		</section>
		<section class="view-section view-section--top-border">
			<div class="view-container">
				<Related-News :title="'Схожі Новини'" :data="newsData.related_news" :horizontal="true"></Related-News>
			</div>
		</section>
		<Comments v-if="newsData.news_type" :params="{type: newsData.news_type, id: newsData.id}"></Comments>
  </main>
</template>

<script>
import newsInfo from '@/components/ViewNews/newsInfo';
import Share from '@/components/ViewNews/share';
import RelatedNews from '@/components/ViewNews/relatedNews';
import Comments from '@/components/ViewComments/ViewComments';

export default {
	name: 'autoNews',
	props: ['newsData'],
	data(){
		return {
			
		}
	},
	components: {
		newsInfo,
		Share,
		Comments,
		RelatedNews
	}
}
</script>