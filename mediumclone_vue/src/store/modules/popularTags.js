
import popularTagsApi from '@/api/popularTags'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationsTypes = {
  getPopularTagsStart: '[PopularTags] getPopularTagsStart',
  getPopularTagsSuccess: '[PopularTags] getPopularTagsSuccess',
  getPopularTagsFailure: '[PopularTags] getPopularTagsFailure',
}

export const actionsTypes = {
  getPopularTags: '[PopularTags] Get Popular Tags',
}

const mutations = {
  [mutationsTypes.getPopularTagsStart](state) {
    state.isLoading = true,
    state.data = null
  },
  [mutationsTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false,
    state.data = payload
  },
  [mutationsTypes.getPopularTagsFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionsTypes.getPopularTags]({ commit }) {
    return new Promise(resolve => {
      commit(mutationsTypes.getPopularTagsStart)
      popularTagsApi
        .getPopularTags()
        .then(tags => {
          commit(mutationsTypes.getPopularTagsSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          commit(mutationsTypes.getPopularTagsFailure)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions,
}