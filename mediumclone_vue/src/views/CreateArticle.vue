<template>
  <mcv-article-form
    :initialValue="initialValue"
    :errors="validationError"
    :isSubmitting="isSubmitting"
    @articleSubmit="onSubmit"
  >
  </mcv-article-form>
</template>

<script>
import { mapState } from 'vuex'
import { actionsTypes } from '@/store/modules/createArticle'
import McvArticleForm from '@/components/ArticleForm.vue'
export default {
  name: 'McvCreateArticle',
  components: {
    McvArticleForm,
  },
  data() {
    return {
      initialValue: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
    }
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationError: (state) => state.createArticle.validationErrors,
    }),
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionsTypes.createArticle, { articleInput })
        .then(article => {
          this.$router.push({ name: 'article', params: { slug: article.slug } })
        })
      console.log('onSubmit create article', articleInput)
    },
  },
}
</script>