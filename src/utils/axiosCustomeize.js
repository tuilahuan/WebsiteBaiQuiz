import axios from "axios";
import NProgress from "nprogress";
import { store } from '../redux/store';
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
})
const intance = axios.create({
    baseURL: 'http://localhost:8081/',
});
// Add a request interceptor
intance.interceptors.request.use(function (config) {
    const access_token = store?.getState()?.user?.account?.access_token
    config.headers["Authorization"] = "Bearer " + access_token;
    NProgress.start();

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
intance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, function (error) {
    console.log(error.response.data)
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});


export default intance