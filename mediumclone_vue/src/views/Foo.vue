<template>
  <div class="foo">
    foo as das das das das ds ad as sfreg trh r5th rt 
  </div>
</template>

<script>
export default {
  name: 'mcvFoo',
  mounted() {
    this.$store.commit('foo/getArticleStart')
  },
}
</script>


<style lang="scss">
.foo{
  background-color: firebrick;
}
</style>