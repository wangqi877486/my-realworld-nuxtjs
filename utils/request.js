import axios from 'axios'

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})

export default ({ store }) => {
    request.interceptors.request.use(function (config) {
        const { user } = store.state
        console.log(user)
    })
}