import axios from 'axios'

const local = 'http://ahoang.runasp.net'
const apii = axios.create({
  baseURL: `${local}/api`,
})

export default apii