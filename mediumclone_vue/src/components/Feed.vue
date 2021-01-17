<template>
  <div>
    <div v-if="isLoading" class="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>

    <div v-if="error">Произошла ошибка</div>

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ДОБАВИТЬ В ИЗБРАННОЕ</div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Читать больше...</span>
          СПИСОК ТЕГОВ
        </router-link>
      </div>
      <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      ></mcv-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionsTypes } from '@/store/modules/feed'
import McvPagination from '@/components/Pagination'
import { limit } from '@/helpers/vars'
import {stringify, parseUrl} from 'query-string'
export default {
  name: 'McvFeed',
  data() {
    return {
      total: 500,
      limit,
      url: '/',
    }
  },
  components: {
    McvPagination,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset(){
      return this.currentPage * limit - limit
    }
  },
  watch:{
    currentPage(){
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods:{
    fetchFeed(){
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifyparams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifyparams}`
      this.$store.dispatch(actionsTypes.getFeed, { apiUrl: apiUrlWithParams })
    }
  }
}
</script>

<style lang="scss">

</style>