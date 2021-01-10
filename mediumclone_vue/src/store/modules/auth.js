// todo: Импортируем наш апи запрос
import authApi from '@/api/auth.js'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}
const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  register({ commit }, objCredentials) {
    return new Promise(resolve => {
      commit('registerStart')
      authApi
        .register(objCredentials)
        .then(response => {
          // then срабатывает в случае удачной отправки запроса на сервер и выполняет
          commit('registerSuccess', response.data.user)
          resolve(response.data.user)
        })
        .catch(result => {
          // catch срабатывает в случае не удачной отправки запроса на сервер и выполняет
          commit('registerFailure', result.response.data.errors)
          console.log(
            'Код состояния ответа HTTP 422 Unprocessable Entity указывает, что сервер понимает тип содержимого в теле запроса и синтаксис запроса является правильным, но серверу не удалось обработать инструкции содержимого.',
          )
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
