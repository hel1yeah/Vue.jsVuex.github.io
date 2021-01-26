import axios from '@/api/axios'

const getuserProfile = slug => {
  return axios.get(`/profiles/${slug}`).then(response => response.data.profile)
}

export default {
  getuserProfile,
}
