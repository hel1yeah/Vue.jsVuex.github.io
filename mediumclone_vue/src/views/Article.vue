<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <div class="info">
            <div class="info-user">
              <router-link
                :to="{
                  name: 'userProfile',
                  params: { slug: article.author.username },
                }"
              >
                <img :src="article.author.image" />
              </router-link>
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
          </div>
          <div class="btn-position" v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit" />
              Редактировать статью
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Удалить статью
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <McvTagList :tags="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import McvErrorMessage from '@/components/ErrorMessage.vue'
import McvLoading from '@/components/Loading.vue'

import { actionsTypes as articleActionsTypes } from '@/store/modules/article'
import { gettersTypes as authGetterTypes } from '@/store/modules/auth'
import { mapState, mapGetters } from 'vuex'
import McvTagList from '@/components/TagList.vue'

export default {
  name: 'McvArticle',
  components: {
    McvErrorMessage,
    McvLoading,
    McvTagList
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      error: (state) => state.article.error,
      article: (state) => state.article.data,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    },
  },
  mounted() {
    this.$store.dispatch(articleActionsTypes.getArticle, {
      slug: this.$route.params.slug,
    })
  },
  methods: {
    deleteArticle() {
      console.log();
      this.$store.dispatch(articleActionsTypes.deleteArticle, {
        slug: this.$route.params.slug }).then(() => {
          this.$router.push({name: 'globalFeed'})
        })
    },
  },
}
</script>

<style lang="scss">
.article-meta {
  text-align: left;
}
.btn-position {
  max-width: 360px;
  display: flex;
  justify-content: space-between;
}
</style>