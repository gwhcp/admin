import axios from "axios";

const CSRF_COOKIE_NAME = 'csrftoken';
const CSRF_HEADER_NAME = 'X-CSRFToken';

const session = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    xsrfCookieName: CSRF_COOKIE_NAME,
    xsrfHeaderName: CSRF_HEADER_NAME
});

session.defaults.timeout = 30000;

// before a request is made.
session.interceptors.request.use(config => {
    return config;
});

// before a response is returned.
session.interceptors.response.use(response => {
    return response;
});

export default session;