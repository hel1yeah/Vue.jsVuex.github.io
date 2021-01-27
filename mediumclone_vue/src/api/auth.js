// ! в этом майле auth.js будем писать все запросы что относятся к модулю авторизаци

//  импортируем аксиос с нашёго рут аксиоса а не с ноде модулес
import axios from '@/api/axios'

//  создаём метот для роботы с апи register
//  создаём метот который делает post запрос и передаёт наш objCredentials из формы и передаёт их в нужной структуре
const register = objCredentials => {
  return axios.post('/users', { user: objCredentials })
}

const signIn = objCredentials => {
  return axios.post('/users/login', { user: objCredentials })
}

const getCurrentUser = () => {
  return axios.get('/user')
}

const updateCurrentUser = currentUserInput => {
  return axios
    .put('/user', { user: currentUserInput })
    .then(response => response.data.user)
}
//  експортируем наш метод для работі с ним в других файлах
export default {
  register,
  signIn,
  getCurrentUser,
  updateCurrentUser,
}
