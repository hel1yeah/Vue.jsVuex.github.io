import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationsTypes = {
  getUserProfileStart: '[userProfile] get UserProfile Start',
  getUserProfileSuccess: '[userProfile] get UserProfile Success',
  getUserProfileFailure: '[userProfile] get UserProfile Failure',
}

export const actionsTypes = {
  getUserProfile: '[userProfile] getUserProfile',
}

const mutations = {
  [mutationsTypes.getUserProfileStart](state) {
    (state.isLoading = true), (state.data = null)
  },
  [mutationsTypes.getUserProfileSuccess](state, payload) {
    (state.isLoading = false), (state.data = payload)
  },
  [mutationsTypes.getUserProfileFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionsTypes.getUserProfile]({ commit }, { slug }) {
    console.log('test state')
    return new Promise(resolve => {
      commit(mutationsTypes.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then(userProfile => {
          commit(mutationsTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(() => {
          commit(mutationsTypes.getPopularTagsFailure)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
