import addToFavoritesApi from '@/api/addToFavorites'
// import { mutationsTypes } from './article'
// import { mutationsTypes } from "./article"

export const mutationsTypes = {
  addToFavoritesStart: '[addToFavorites] add To Favorites Start',
  addToFavoritesSuccess: '[addToFavorites] add To Favorites Success',
  addToFavoritesFailure: '[addToFavorites] add To Favorites Failure',
}

const mutations = {
  [mutationsTypes.addToFavoritesStart]() {},
  [mutationsTypes.addToFavoritesSuccess]() {},
  [mutationsTypes.addToFavoritesFailure]() {},
}

export const actionsTypes = {
  addToFavorites: '[addToFavorites] add To Favorites',
}

const actions = {
  [actionsTypes.addToFavorites]({ commit }, { slug, isFavorited }) {
    console.log(mutationsTypes);
    return new Promise(resolve => {
      commit(mutationsTypes.addToFavoritesStart)

      const promise = isFavorited
        ? addToFavoritesApi.removeToFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)

      promise
        .then(article => {
          commit(mutationsTypes.addToFavoritesSuccess, article)
          resolve(article)
        })
        .catch(() => {
          commit(mutationsTypes.addToFavoritesFailure)
        })
    })
  },
}

export default {
  mutations,
  actions,
}
