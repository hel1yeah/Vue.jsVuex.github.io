<template>
  <div class="crticle ofrm">
    <mcv-article-form
      :initial-value="initialValue"
      :errors="validationValue"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    >
    </mcv-article-form>
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm.vue'
export default {
  name: 'McvCreateArticle',
  components:{
    McvArticleForm,
  },
  data() {
    return {
      initialValue: {
        title: '',
        body: '',
        description: '',
        tagList: [],
      },
      validationValue: null,
      isSubmitting: false,
    }
  },
  methods: {
    onSubmit(form) {
      console.log('onSubmit create article', form)
    },
  },
}
</script>