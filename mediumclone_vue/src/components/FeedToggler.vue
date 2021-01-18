<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          :to="{ name: 'yourFeed' }"
          class="nav-link"
          :class="{ active: routeName === 'yourFeed' }"
          
          >Твои новости
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'globalFeed' }"
          class="nav-link"
          :class="{ active: routeName === 'globalFeed' }"
          >Все новости
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          :to="{ name: 'tag' }"
          class="nav-link"
          :class="{ active: routeName === 'tag' }"
        >
          <i class="ion-pound"></i>
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { gettersTypes } from '@/store/modules/auth'
export default {
  name: 'McvFeedToggler',
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: gettersTypes.isLoggedIn,
    }),
    routeName() {
      return this.$route.name
    },
  },
}
</script>

<style lang="scss">
.active {
  color: red;
}
</style>