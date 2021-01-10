//! axios.js нужен нам как враппер во круг библиотреки axios
// рут файл для импорта акисоса
import axios from 'axios'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

export default axios
