import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://192.168.100.212:3000/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default{
    getData(url){
        return apiClient.get(url)
    },
    download(url){
        return apiClient.get(url, { responseType: "blob" })
    }
}