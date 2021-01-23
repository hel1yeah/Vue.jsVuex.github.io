<template>
  <div>
    <McvLoading v-if="isLoading" />
    <mcv-article-form
      v-if="initialValue"
      :initialValue="initialValue"
      :errors="validationError"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    >
    </mcv-article-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionsTypes } from '@/store/modules/editArticle'
import McvLoading from '@/components/Loading.vue'
import McvArticleForm from '@/components/ArticleForm.vue'
export default {
  name: 'McvEditArticle',
  components: {
    McvArticleForm,
    McvLoading,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
      validationError: (state) => state.editArticle.validationErrors,
    }),
    initialValue() {
      if (!this.article) {
        return null
      } else {
        return {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList,
        }
      }
    },
  },
  mounted() {
    const slug = this.$route.params.slug
    this.$store.dispatch(actionsTypes.getArticle, { slug })
  },
  methods: {
    onSubmit(articleInput) {
      console.log('test onSubmit updateArticle');
      const slug = this.$route.params.slug
      this.$store
        .dispatch(actionsTypes.updateArticle, {articleInput, slug })
        .then((article) => {
          this.$router.push({ name: 'article', params: { slug: article.slug } })
          console.log('then onSubmit');
        })
    },
  },
}
</script>