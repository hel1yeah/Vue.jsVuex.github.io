import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
}

export const mutationsTypes = {
  updateArticleStart: '[updateArticle ] update Article Start',
  updateArticleSuccess: '[updateArticle] update Article Success',
  updateArticleFailure: '[updateArticle] update Article Failure',

  getArticleStart: '[updateArticle ] get Article Start',
  getArticleSuccess: '[updateArticle] get Article Success',
  getArticleFailure: '[updateArticle] get Article Failure',
}

export const actionsTypes = {
  updateArticle: '[updateArticle] update Article',
  getArticle: '[updateArticle] update Article',
}

const mutations = {
  [mutationsTypes.updateArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationsTypes.updateArticleSuccess](state, payload) {
    state.isSubmitting = false
    state.article = payload
  },
  [mutationsTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationsTypes.getArticleStart](state) {
    state.isLoading = true
  },
  [mutationsTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.article = payload
  },
  [mutationsTypes.getArticleFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionsTypes.updateArticle]({ commit }, { slug, articleInput }) {
    console.log('red');
    return new Promise(resolve => {
      console.log('red');
      commit(mutationsTypes.updateArticleStart)
      articleApi
        .updateArticle(slug, articleInput)
        .then(article => {
          commit(mutationsTypes.updateArticleSuccess, article)
          resolve(article)
        })
        .catch(result => {
          console.log(result.response.data.errors)
          commit( mutationsTypes.updateArticleFailure,
            result.response.data.errors,
          )
        })
    })
  },
  [actionsTypes.getArticle]({ commit }, { slug }) {
    return new Promise(resolve => {
      commit(mutationsTypes.getArticleStart)
      articleApi
        .getArticle(slug)
        .then(article => {
          commit(mutationsTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          commit(mutationsTypes.getArticleFailure)
          console.log('getArticleFailure');
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
