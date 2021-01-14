export const getItem = ((key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e){
    console.log('ошибка при получении localStorage', e);
    return null
  }
})

// setItem получет на вход = key строку которая даёт имя нашему токину 
// data и есть наш токен 
export const setItem = (key, data) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data)) // JSON.stringify(data) проеобразует значение data в строку 
  } catch (err){
    console.log('ошибка при сохрананении localStorage', err);
  }
}