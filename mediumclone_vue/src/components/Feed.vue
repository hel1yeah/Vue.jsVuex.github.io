<template>
  <div>
    <mcv-loading v-if="isLoading"></mcv-loading>
    <mcv-error-message v-if="error"></mcv-error-message>

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
          <div class="pull-xs-right">
            <mcv-add-to-favorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            >
            </mcv-add-to-favorites>
          </div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Читать больше...</span>
          <mcv-tag-list :tags="article.tagList"></mcv-tag-list>
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
import McvPagination from '@/components/Pagination'
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'
import McvTagList from '@/components/TagList.vue'
import McvAddToFavorites from '@/components/AddToFavorites.vue'

import { mapState } from 'vuex'
import { actionsTypes } from '@/store/modules/feed'

import { limit } from '@/helpers/vars'
import { stringify, parseUrl } from 'query-string'

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
    McvLoading,
    McvErrorMessage,
    McvTagList,
    McvAddToFavorites,
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
    offset() {
      return this.currentPage * limit - limit
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    },
    apiUrl(){
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifyparams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifyparams}`
      this.$store.dispatch(actionsTypes.getFeed, { apiUrl: apiUrlWithParams })
    },
  },
}
</script>

<style lang="scss">
</style>