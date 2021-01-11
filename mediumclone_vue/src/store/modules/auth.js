// todo: Импортируем наш апи запрос
import authApi from '@/api/auth.js'
import { setItem } from '@/helpers/persistanceStorage.js'
const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}
export const mutationsTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
}
export const actionsTypes = {
  register: '[auth] register'
}
const mutations = {
  [mutationsTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationsTypes.registerSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.registerFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionsTypes.register]({ commit }, objCredentials) {
    return new Promise(resolve => {
      commit(mutationsTypes.registerStart) //  инициализируем мутацию registerStart
      authApi
        .register(objCredentials)
        .then(response => {
          // then срабатывает в случае удачной отправки запроса на сервер и выполняет
          commit(mutationsTypes.registerSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          // catch срабатывает в случае не удачной отправки запроса на сервер и выполняет
          commit(mutationsTypes.registerFailure, result.response.data.errors)
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
