<template>
  <div class="error-messages">
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'McvErrorMessage',
  props: {
    message:{
      type: String,
      required: false,
      default: 'Что-то пошло не так =`('
    }
  }
}
</script>

<style lang="scss">
.error-messages{
  color: red;
}
</style>