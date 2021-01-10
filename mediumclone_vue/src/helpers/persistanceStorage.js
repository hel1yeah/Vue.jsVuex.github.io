export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e){
    console.log('error ошибка при поработе с локал сторедж', e);
    return null
  }
}

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e){
    console.log('error ошибка при поработе с локал сторедж', e);
    return null
  }
}