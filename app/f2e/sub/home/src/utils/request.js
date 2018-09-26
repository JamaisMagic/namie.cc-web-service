import axios from 'axios';


const mInstance = axios.create({
    baseURL: '/',
    timeout: 300000
});

mInstance.interceptors.request.use(config => {
    console.log('request', config);
   return config;
});

mInstance.interceptors.response.use(config => {
    console.log('response', config);
   return config;
});

function post(url, dataObject) {
    return mInstance.post(url, dataObject)
        .catch(error => ({}))
}

export function shorten(longUrl) {
    return post('/api/shorten/', {
        url: longUrl
    })
}
