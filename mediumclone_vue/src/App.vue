<template>
  <div id="app">
    <div class="container">
      <!-- <div id="nav">
      <router-link :to="{name : 'globalFeed'}">Домашняя страница</router-link> |
      <router-link :to="{name : 'register'}">Страница регистрации</router-link> |
      <router-link :to="{name : 'signIn'}">Страница входа</router-link>
    </div> -->

      <mcv-topbar></mcv-topbar>
      <router-view />
    </div>
  </div>
</template>


<script>
import McvTopbar from '@/components/Topbar.vue'
import { actionsTypes } from '@/store/modules/auth'
export default {
  name: 'McvApp',
  components: {
    McvTopbar,
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getCurrentUser)
  },
}
</script>

<style lang="scss">
#nav {
  margin: 0 auto;
}
</style>
