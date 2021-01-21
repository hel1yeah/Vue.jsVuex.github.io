import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
}

export const mutationsTypes = {
  createArticleStart: '[createArticle ] create Article Start',
  createArticleSuccess: '[createArticle] create Article Success',
  createArticleFailure: '[createArticle] create Article Failure',
}

export const actionsTypes = {
  createArticle: '[createArticle] Create Article',
}

const mutations = {
  [mutationsTypes.createArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationsTypes.createArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationsTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionsTypes.createArticle]({ commit }, { articleInput }) {
    return new Promise(resolve => {
      commit(mutationsTypes.createArticleStart)
      articleApi
      .createArticle(articleInput)
      .then(article => {
        commit(mutationsTypes.createArticleSuccess, article)
        resolve(article)
      }).catch(result => {
        console.log(result.response.data.errors);
        commit(mutationsTypes.createArticleFailure, result.response.data.errors)
      })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
