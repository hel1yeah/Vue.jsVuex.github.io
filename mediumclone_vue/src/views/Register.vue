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
                placeholder="Имя Пользователя"
                v-model="username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Емейл"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Пароль"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Регистрация
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McvRegister',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  components: {},
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
  },
  methods: {
    onSubmit() {
      console.log('тест метода в регистур вью ')
      this.$store
        .dispatch('register', {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then((user) => {
          console.log('удачно зарегестрированный пользователь', user)
          this.$router.push({name: 'home'})
        })
    },
  },
}
</script>

<style lang="scss">
.row {
  margin: 0 15px;
}
</style>