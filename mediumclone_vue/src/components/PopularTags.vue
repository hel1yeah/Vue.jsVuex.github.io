<template>
  <div>
    <mcv-loading v-if="isLoading"></mcv-loading>
    <mcv-error-message v-if="error"></mcv-error-message>

    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{ name: 'tag', params: { slug: popularTag } }"
          class="tag-default tag-pill"
          >{{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import McvLoading from '@/components/Loading.vue'
import McvErrorMessage from '@/components/ErrorMessage.vue'
import { mapState } from 'vuex'
import { actionsTypes } from '@/store/modules/popularTags'
export default {
  name: 'McvPopularTags',
  components: {
    McvLoading,
    McvErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      popularTags: (state) => state.popularTags.data,
      error: (state) => state.popularTags.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getPopularTags)
  },
}
</script>

<style lang="scss">
</style>