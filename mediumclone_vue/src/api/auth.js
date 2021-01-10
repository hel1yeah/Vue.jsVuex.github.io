// ! в этом майле auth.js будем писать все запросы что относятся к модулу авторизаци

//  импортируем аксиос с нашёго рут аксиоса а не с ноде модулес
import axios from '@/api/axios'

//  создаём метот для роботы с апи register
//  создаём метот которій делает апи запрос и передаёт наш objCredentials из формы и передаёт их в нужной структуре
const register = objCredentials => {
  return axios.post('/users', { user: objCredentials })
}

//  експортируем наш метод для работі с ним в других файлах
export default {
  register,
}
