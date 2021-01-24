// todo: Импортируем наш апи запрос
import authApi from '@/api/auth.js'
import { setItem } from '@/helpers/persistanceStorage.js'

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}
//* actions
export const actionsTypes = {
  register: '[auth] register',
  signIn: '[auth] signIn',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout'
}

export const mutationsTypes = {
  registerStart: '[auth] register Start',
  registerSuccess: '[auth] register Success',
  registerFailure: '[auth] register Failure',

  signInStart: '[auth] sign In Start',
  signInSuccess: '[auth] sign In Success',
  signInFailure: '[auth] sign In Failure',

  getCurrentUserStart: '[auth] get Current User Start',
  getCurrentUserSuccess: '[auth] get Current User Success',
  getCurrentUserFailure: '[auth] get CurrentUser Failure',

  updateCurrentUserStart: '[auth] update UserStart',
  updateCurrentUserSuccess: '[auth] update UserSuccess',
  updateCurrentUserFailure: '[auth] update UserFailure',

  logout: '[outh] logout'
}

export const gettersTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
  updateCurrentUser: '[auth] updateCurrentUser',
}

const getters = {
  [gettersTypes.currentUser]: state => {
    return state.currentUser
  },
  [gettersTypes.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn)
  },
  [gettersTypes.isAnonymous]: state => {
    return state.isLoggedIn === false
  },
}

//* мутации регистрации
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
  //* мутации входа
  [mutationsTypes.signInStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationsTypes.signInSuccess](state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.signInFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  //* мутации получения пользовавтеля
  [mutationsTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationsTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationsTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },
  //* мутации изменения юезера  пользовавтеля
  [mutationsTypes.updateCurrentUserStart]() {},
  [mutationsTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload
  },
  [mutationsTypes.updateCurrentUserFailure]() {},

  [mutationsTypes.logout](state){
    state.currentUser = null
    state.isLoggedIn = false
  }
}

const actions = {
  [actionsTypes.register]({ commit }, objCredentials) {
    return new Promise(resolve => {
      commit(mutationsTypes.registerStart) //  инициализируем мутацию registerStart
      authApi
        .register(objCredentials) // register наш апи метод который создан для auth
        .then(response => {
          // then срабатывает в случае удачной отправки запроса на сервер и выполняет
          commit(mutationsTypes.registerSuccess, response.data.user) // комит запускает мутицию (имя мутации, пейлоад), response.data.user есть наш юзер что возвращается
          setItem('accessToken', response.data.user.token) // сетим наш токин
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

  [actionsTypes.signIn]({ commit }, objCredentials) {
    return new Promise(resolve => {
      commit(mutationsTypes.signInStart)
      authApi
        .signIn(objCredentials)
        .then(response => {
          commit(mutationsTypes.signInSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(result => {
          commit(mutationsTypes.signInFailure, result.response.data.errors)
          console.log('ошибка логина ', result)
        })
    })
  },
  [actionsTypes.getCurrentUser]({ commit }) {
    return new Promise(resolve => {
      commit(mutationsTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then(response => {
          commit(mutationsTypes.getCurrentUserSuccess, response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch(() => {
          commit(mutationsTypes.getCurrentUserFailure)
          console.log('ошибка логина getCurrentUser')
        })
    })
  },
  [actionsTypes.updateCurrentUser]({ commit }, { currentUserInput }) {
    return new Promise(resolve => {
      commit(mutationsTypes.updateCurrentUserStart)
      authApi
        .updateCurrentUser(currentUserInput)
        .then(user => {
          commit(mutationsTypes.updateCurrentUserSuccess, user)
          resolve(user)
        })
        .catch(result => {
          commit(
            mutationsTypes.updateCurrentUserFailure,
            result.response.data.errors,
          )
          console.log('ошибка логина updateCurrentUserFailure')
          console.log(result.response.data.errors)
        })
    })
  },
  [actionsTypes.logout]({commit}){
    return new Promise(resolve => {
      setItem('accessTocken', '')
      commit(mutationsTypes.logout)
      resolve()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
