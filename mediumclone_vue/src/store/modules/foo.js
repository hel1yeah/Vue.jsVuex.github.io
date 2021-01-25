const state  = {
  isLoading: false 
}

const mutations = {
  getArticleStart(state){
    state.isLoading = false
  },
  getArticleSaccess(state){
    state.isLoading = false
  },
  getArticleFailure(state){
    state.isLoading = false
  },
}


const actions = {
  getArticle({commit}) {
    commit('getArticleStart')
  }
  
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}