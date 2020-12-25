<template>
  <main class="view-news view-news--full">
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
    <section class="view-section p-t-0 p-b-60">
      <div class="view-news-header">
        <div class="view-news-header__col">
           <h2 class="view-news__title view-title--h2 view-news__title--mob">{{newsData.title}}</h2>
          <img v-if="newsData.image !== null" :src="newsData.image !== null ? newsData.image.url : require(`@/assets/images/hospital.svg`)" alt="MainImage" />
        </div>
        <div class="view-news-header__col">
          <h2 class="view-news__title view-title--h2">{{newsData.title}}</h2>
          <news-info :date="newsData.date" :author="newsData.author" :views="newsData.views" :tags="newsData.tags_values"></news-info>
          <Share></Share>
        </div>
      </div>
    </section>

    <section class="view-section p-t-0">
      <div class="view-container">
        <div class="view-news-conent-wrapper">
          <div class="view-news-line" v-if="Object.keys(newsData.metas).length > 0">
            <div class="view-text" v-for="(block, index) in newsData.metas" :key="index">
              <div :class="block.class_name" v-if="!block.image.url">
                <p v-if="block.title">
                  <b>{{block.title}}</b>
                </p>
                <p v-if="block.text" v-html="block.text"></p>
              </div>

              <div :class="block.class_name" v-else-if="block.class_name == 'view-text__subtitle'">
                <h2 class="view-text__subtitle">{{block.title}}</h2>
              </div>

              <div class="view-text view-text__image" v-else>
                <div class="view-text-col">
                  <img
                    :src="`${block.image.url}`"
                    :alt="block.image.title"
                  />
                </div>
                <div class="view-text-col">
                  <div :class="block.class_name">
                    <p v-if="block.title">
                      <b>{{block.title}}</b>
                    </p>
                    <p v-if="block.text">{{block.text}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="view-news-line" v-else>
            <div class="view-text" v-html="newsData.content"></div>
          </div>
          <div class="view-news-related">
            <Related-News :title="'Схожі Новини'" :data="newsData.related_news" :horizontal="false"></Related-News>
          </div>
        </div>
        <Share></Share>
      </div>
    </section>
    <Comments v-if="newsData.news_type" :params="{type: newsData.news_type, id: newsData.id}"></Comments>
  </main>
</template>

<script>
import newsInfo from "@/components/ViewNews/newsInfo";
import Share from "@/components/ViewNews/share";
import Comments from "@/components/ViewComments/ViewComments";
import RelatedNews from "@/components/ViewNews/relatedNews";

export default {
  props: ["newsData"],
  components: {
    newsInfo,
    Share,
    Comments,
    RelatedNews,
  },
};
</script>