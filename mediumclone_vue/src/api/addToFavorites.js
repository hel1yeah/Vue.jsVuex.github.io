//! файл отвечает за отображение лайков на странице 

import axios from '@/api/axios' //* импортируем корневой axios 

const getUrl = slug => `/articles/${slug}/favorite` //* создаём переменную getUrl, что бы не повторятся в коде  и сделать код читабельнее и чище


// * метод addToFavorites принимает slug
// * const url сокращаем запись 
// * после удачного запроса post возвращаем response.data.article, при нажатии ставит лайк посту 
const addToFavorites = slug => {
  const url = getUrl(slug)
  return axios.post(url).then(response => response.data.article)
}
// * метод addToFavorites наоборот удаляет лайк с поста 
const removeToFavorites = slug => {
  const url = getUrl(slug)
  return axios.delete(url).then(response => response.data.article)
}

export default { //* експортирем функции без експорта к ним невозможно обратиться
  addToFavorites,
  removeToFavorites,
}
