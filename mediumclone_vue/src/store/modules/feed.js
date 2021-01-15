import feedApi from '@/api/feed'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationsTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSucces: '[feed] getFeedSucces',
  getFeedFailure: '[feed] getFeedFailure',
}

export const actionsTypes = {
  getFeed: '[feed] Get feed',
}

const mutations = {
  [mutationsTypes.getFeedStart](state) {
    (state.isLoading = true), (state.data = null)
  },
  [mutationsTypes.getFeedSucces](state, payload) {
    (state.isLoading = false), (state.data = payload)
  },
  [mutationsTypes.getFeedFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionsTypes.getFeed]({ commit }, { apiUrl }) {
    return new Promise(resolve => {
      commit(mutationsTypes.getFeedStart)
      feedApi
        .getFeed(apiUrl)
        .then(res => {
          commit(mutationsTypes.getFeedSucces, res.data)
          resolve(res.data)
        })
        .cath(() => {
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
