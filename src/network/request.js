import axios from 'axios'

export function request(config) {
  const instance =axios.create({
    baseURL: 'http://10.66.20.15:5000/',
    timeout: 5000
  })
}