import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationsTypes = {
  getArticleStart: '[article] get Article Start',
  getArticleSuccess: '[article] get Article Success',
  getArticleFailure: '[article] get Article Failure',

  deleteArticleStart: '[article] delete Article Start',
  deleteArticleSuccess: '[article] delete Article Success',
  deleteArticleFailure: '[article] delete Article Failure',
}

export const actionsTypes = {
  getArticle: '[article] get Article',
  deleteArticle: '[article] delete Article',
}

const mutations = {
  [mutationsTypes.getArticleStart](state) {
    (state.isLoading = true), (state.data = null)
  },
  [mutationsTypes.getArticleSuccess](state, payload) {
    (state.isLoading = false), (state.data = payload)
  },
  [mutationsTypes.getArticleFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  },
  [mutationsTypes.deleteArticleStart](){},
  [mutationsTypes.deleteArticleSuccess](){},
  [mutationsTypes.deleteArticleFailure](){},
}

const actions = {
  [actionsTypes.getArticle]({ commit }, { slug }) {
    return new Promise(resolve => {
      commit(mutationsTypes.getArticleStart, slug)
      articleApi
        .getArticle(slug)
        .then(article => {
          commit(mutationsTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch((article) => {
          commit(mutationsTypes.getArticleFailure, article)
        })
    })
  },
  [actionsTypes.deleteArticle]({ commit }, { slug }) {
    return new Promise(resolve => {
      commit(mutationsTypes.deleteArticleStart, slug)
      articleApi
        .deleteArticle(slug)
        .then(() => {
          commit(mutationsTypes.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          commit(mutationsTypes.deleteArticleFailure)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
