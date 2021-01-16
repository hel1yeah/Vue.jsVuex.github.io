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
      error: (state) => state.feed.data,
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
      console.log('currentPage');
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
      console.log(apiUrlWithParams);
      this.$store.dispatch(actionsTypes.getFeed, { apiUrl: apiUrlWithParams })
    }
  }
}
</script>


<style lang="scss">
.loader {
  position: relative;
  padding-top: 100px;
  width: 40px;
  margin: auto;

  .circle {
    position: absolute;
    width: 38px;
    height: 38px;
    opacity: 0;
    transform: rotate(225deg);
    animation-iteration-count: infinite;
    animation-name: orbit;
    animation-duration: 5.5s;

    &:after {
      content: '';
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 5px;
      background: mediumseagreen; /* Pick a color */
    }

    &:nth-child(2) {
      animation-delay: 240ms;
    }
    &:nth-child(3) {
      animation-delay: 480ms;
    }
    &:nth-child(4) {
      animation-delay: 720ms;
    }
    &:nth-child(5) {
      animation-delay: 960ms;
    }
  }
}

@keyframes orbit {
  0% {
    transform: rotate(225deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }

  7% {
    transform: rotate(345deg);
    animation-timing-function: linear;
  }

  30% {
    transform: rotate(455deg);
    animation-timing-function: ease-in-out;
  }

  39% {
    transform: rotate(690deg);
    animation-timing-function: linear;
  }

  70% {
    transform: rotate(815deg);
    opacity: 1;
    animation-timing-function: ease-out;
  }

  75% {
    transform: rotate(945deg);
    animation-timing-function: ease-out;
  }

  76% {
    transform: rotate(945deg);
    opacity: 0;
  }
  100% {
    transform: rotate(945deg);
    opacity: 0;
  }
}
</style>