<template>
  <div class="home-page">
    <mcv-banner></mcv-banner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler :tag-name="tagName"> </mcv-feed-toggler>
          <mcv-feed :api-url="apiUrl"></mcv-feed>
        </div>
        <div class="col-md-3">
          <mcv-popular-tags></mcv-popular-tags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue'
import McvPopularTags from '@/components/PopularTags.vue'
import McvBanner from '@/components/Banner.vue'
import McvFeedToggler from '@/components/FeedToggler.vue'
export default {
  name: 'McvTagFeed',
  components: {
    McvFeed,
    McvPopularTags,
    McvBanner,
    McvFeedToggler,
  },
  computed: {
    tagName(){
      return this.$route.params.slug
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`
    },
  },
}
</script>