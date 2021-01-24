<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h2 class="text-xs-center">Hастройки</h2>
          <mcv-validation-errors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          >
          </mcv-validation-errors>
          <form @submit.prevent="onsubmit">
            <fieldset>
              <fieldset class="from-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.image"
                  placeholder="Вставте URL адрес картинки"
                />
              </fieldset>
              <fieldset class="from-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Имя пользователя"
                />
              </fieldset>
              <fieldset class="from-group">
                <textarea
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="Короткое описание *Обо мне*"
                ></textarea>
              </fieldset>
              <fieldset class="from-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="Email пользователя"
                />
              </fieldset>
              <fieldset class="from-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="Password пользователя"
                />
              </fieldset>
              <button
                type="submit"
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isSubmitting"
              >
                Oбновить настройки
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'

import { mapState, mapGetters } from 'vuex'
import {
  gettersTypes as authGettersTypes,
  actionsTypes as authActionsTypes,
} from '@/store/modules/auth'

export default {
  name: 'McvSettings',
  components: {
    McvValidationErrors,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.validationErrors,
    }),
    ...mapGetters({
      currentUser: authGettersTypes.currentUser,
    }),
    form() {
      if (this.currentUser) {
        return {
          username: this.currentUser.username,
          bio: this.currentUser.bio,
          image: this.currentUser.image,
          email: this.currentUser.email,
          password: '',
        }
      } else {
        return {
          username: '',
          bio: '',
          image: '',
          email: '',
          password: '',
        }
      }
    },
  },

  methods: {
    onsubmit() {
      console.log('onsubmit onsubmit settings', this.form)
      this.$store.dispatch(authActionsTypes.updateCurrentUser, {
        currentUserInput: this.form,
      })
    },
    logout() {
      this.$store.dispatch(authActionsTypes.logout)
      .then(() => {
        this.$router.push({ name: 'globalFeed' })
      })
    },
  },
}
</script>

<style lang="scss">
fieldset {
  margin: 10px 0;
}
</style>