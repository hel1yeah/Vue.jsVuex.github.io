import authApi from '@/api/auth.js'

const state = {
  isSubmitting: false
}
const mutations = {
  registerStart( state ) {
    state.isSubmitting = true;
  },
  registerSuccess( state ) {
    state.isSubmitting = false;
  },
  registerFailure( state ) {
    state.isSubmitting = false;
  }
}

const actions = {
  register(context, credentials){
    return new Promise(resolve => {
      context.commit('registerStart')
      authApi
      .register(credentials)
      .then(response => {
        console.log('response', response);
        context.commit('registerSuccess', response.data.user)
        resolve(response.data.user)
      }).catch(result => {
        context.commit('registerFailure', result.response.data.errors)
          console.log('result erors', result);
      })
    })
    // setTimeout(() => {
    //   context.commit('registerStart')
    // }, 1000);
  }
}

export default {
  state,
  mutations,
  actions
}