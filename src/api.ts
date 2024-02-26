import axios from 'axios';
const baseUrl = 'https://devapp.smartzhealth.com'

export default {
    registerApplication(data: any, subscriptionKey: any) {
        return axios.post(`${baseUrl}/api/tapplication/register`, data, {
            headers: {
                'x-context-user': subscriptionKey
            }
        })
    },
    linkOrganisation(data: any, subscriptionKey: any) {
        return axios.post(`${baseUrl}/api/tapplication/linkorganisation`, data, {
            headers: {
                'x-context-user': subscriptionKey
            }
        })
    }
}