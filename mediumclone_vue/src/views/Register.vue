<template>
  <div class="auth-page">
    <div class="contauner page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-sx-12">
          <h1 class="test-sx-center">Регистрация</h1>
          <p class="test-sx-center">
            <router-link to="{name : 'login'}"> Есть уже аккаунт? </router-link>
          </p>
          ошибки валидации
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Емейл"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Пароль"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Имя Пользователя"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Регистрация
            </button>
          </form>
          <button @click="incremCounter">icrement</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McvRegister',
  components: {},
  methods: {
    onSubmit() {
      console.log('asfdsgdfhfgdf')
    },
    incremCounter() {
      // eslint-disable-next-line no-undef
      console.log('incremCounter')
      this.$store.commit('inc');
    },
  },
}
</script>