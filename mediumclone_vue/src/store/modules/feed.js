import feedApi from '@/api/feed'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationsTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[feed] getFeedFailure',
}

export const actionsTypes = {
  getFeed: '[feed] Get feed',
}

const mutations = {
  [mutationsTypes.getFeedStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationsTypes.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationsTypes.getFeedFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionsTypes.getFeed]({ commit }, { apiUrl }) {
    return new Promise(resolve => {
      commit(mutationsTypes.getFeedStart, apiUrl)
      feedApi
        .getFeed(apiUrl)
        .then(response => {
          commit(mutationsTypes.getFeedSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          commit(mutationsTypes.getFeedFailure)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
