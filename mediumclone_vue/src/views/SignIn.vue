<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-sx-12">
          <h1 class="test-sx-center">Вход в аккаунт</h1>
          <p class="test-sx-center">
            <router-link :to="{ name: 'register' }">
              Зарегестрировать аккаунт
            </router-link>
          </p>

          <transition name="slide-fade">
            <mcv-validation-errors
              v-if="validationErrors"
              :validationErrors="validationErrors"
            ></mcv-validation-errors>
          </transition>

          <form @submit.prevent="onSubmit">
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
              Вход
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvValidationErrors from '@/components/ValidationErrors.vue'
import { actionsTypes } from '@/store/modules/auth.js'
export default {
  name: 'McvSingIn',
  components: {
    McvValidationErrors,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting, 
      validationErrors: state => state.auth.validationErrors
    })
    // isSubmitting() {
    //   return this.$store.state.auth.isSubmitting
    // },
    // validationErrors() {
    //   return this.$store.state.auth.validationErrors
    // },
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionsTypes.signIn, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          console.log('Вход успешный')
          this.$router.push({ name: 'globalFeed' })
        })
    },
  },
}
</script>

<style lang="scss">
.row {
  margin: 0 15px;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>