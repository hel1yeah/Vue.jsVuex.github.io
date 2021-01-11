export const getItem = ((key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e){
    console.log('ошибка при получении localStorage', e);
    return null
  }
})

export const setItem = (key, data) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data))
  } catch (e){
    console.log('ошибка при сохрананении localStorage', e);
  }
}