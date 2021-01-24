<template>
  <div id="app">
    <div class="container">
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
