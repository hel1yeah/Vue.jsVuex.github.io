<template>
  <div id="app">
    <div class="container">
<!-- <div id="nav">
      <router-link :to="{name : 'home'}">Домашняя страница</router-link> |
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
export default {
  name: 'McvApp',
  components: {
    McvTopbar,
  },
}
</script>

<style lang="scss">
#nav {
  margin: 0 auto;
}

</style>
