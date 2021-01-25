<template>
  <button
    @click="hendleLike"
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic,
    }"
  >
    <i class="ion-heart" />
    <span>&nbsp; {{ favoritesCountOptimistic }} </span>
  </button>
</template>

<script>
import { actionsTypes } from '@/store/modules/addToFavorites'

export default {
  name: 'McvAddToFavorites',
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    }
  },
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    hendleLike() {
      console.log('slug', this.articleSlug)
      console.log('isFavorited', this.isFavoritedOptimistic)
      console.log('favoritesCount', this.favoritesCountOptimistic)
      console.log(actionsTypes.addToFavorites)
      this.$store.dispatch(actionsTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic,
      })

      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic - 1
      } else {
        this.favoritesCountOptimistic = this.favoritesCountOptimistic + 1
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic

      // this.isFavoritedOptimistic
      //   ? (this.favoritesCountOptimistic = this.favoritesCountOptimistic - 1)
      //   : (this.favoritesCountOptimistic = this.favoritesCountOptimistic + 1)
    },
  },
}
</script>