import axios from '@/api/axios' //* импортируем корневой axios 

const getUserProfile = slug => { //* функция которая по get запросу получает пользователя
  return axios.get(`/profiles/${slug}`).then(response => response.data.profile)
}

export default {
  getUserProfile, //* експортирем функцию без експорта к ней невозможно обратиться
}
