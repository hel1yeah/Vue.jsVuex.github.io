<template>
  <ul class="error-messages">
    <li v-for="error in errorMessages" :key="error">
      {{error}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationErrots',
  props: {
    validationErrots: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages(){
      return Object.keys(this.validationErrots).map(name => {
        const messages = this.validationErrots[name].join(', ')
        return `${name}: ${messages}`
      })
    }
  }
}
</script>