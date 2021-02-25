import Axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ?
    '/api/' :
    'http://localhost:8080/api/'



var axios = Axios

export default {
    get(endpoint, data) {
        return connectApi(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return connectApi(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return connectApi(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return connectApi(endpoint, 'DELETE', data)
    }
}

async function connectApi(endpoint, method = 'get', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        if (err.response && err.response.status === 401) {
            window.location.assign('/#/signup');
        }
        throw err;
    }
}