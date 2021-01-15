<template>
  <div class="home-page">
    Банер
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed :api-url='apiUrl'></mcv-feed>
        </div>
        <div class="col-md-6">
          Популярные теги
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue';
export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
  },
  data() {
    return {
      apiUrl: '/articles'
    }
  },
}
</script>