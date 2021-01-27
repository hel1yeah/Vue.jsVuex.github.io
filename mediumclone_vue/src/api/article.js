import axios from '@/api/axios' //* импортируем корневой axios 

const getArticle = slug => { // * функция getArticle получает на вход slug для создание полного адреса get запроса 
  return axios.get(`/articles/${slug}`).then(response => response.data.article)
}

const deleteArticle = slug => { // * функция deleteArticle отвечает за запрос delete для удаления поста 
  return axios.delete(`/articles/${slug}`)
}

const createArticle = articleInput => { // * функция deleteArticle отвечает за запрос post для добавления поста и отправляет форму поста 
  return axios
    .post('/articles', { article: articleInput })
    .then(response => response.data.article)
}

const updateArticle = (slug, articleInput) => { // * функция deleteArticle отвечает за запрос put для обновления поста и отправляет форму поста 
  return axios
    .put(`/articles/${slug}`, articleInput)
    .then(response => response.data.article)
}
export default { //* експортирем функции без експорта к ним невозможно обратиться
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle,
}
