<template>
  <div>
    feed {{apiUrl}}
  </div>
</template>

<script>

import {actionsTypes} from '@/store/modules/feed'
export default {
  name: 'McvFeed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    }
  },
  mounted() {
    console.log('dfgdfgfgfd');
    this.$store.dispatch(actionsTypes.getFeed, {apiUrl: this.apiUrl})
  },
}
</script>