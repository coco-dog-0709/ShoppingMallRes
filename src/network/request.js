import axios from 'axios'

export function request(config) {
  const axiosInstance1 = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  axiosInstance1.interceptors.request.use((config) => {
    return config
  }, err => {
    console.log(err);
  })
  axiosInstance1.interceptors.response.use(res => {

    return res.data
  }, err => {
    console.log(err);
  })

  return axiosInstance1(config)
}