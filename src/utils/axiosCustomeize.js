import axios from "axios";
const intance = axios.create({
    baseURL: 'http://localhost:8081/',
});
// Add a request interceptor
intance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
intance.interceptors.response.use(function (response) {
    console.log('interceptor', response)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    console.log(error.response.data)
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});


export default intance