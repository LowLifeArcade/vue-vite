//@ts-check
import axios, { AxiosResponse } from 'axios';

// centeralize axios config
// don't forget the forward slash at end
axios.defaults.baseURL = 'http://localhost:3000/api/';

// deal with response object

const responseBody = (response) => response.data;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // we can destructure the error.response to do things with it.
    const {data, status} = error.response 
    switch (status) {
      case '400':
        // use data.title 
        // do something to display error maybe toast 
        break;
      case '401':
        // another thing to handle 
    
      default:
        break;
    }
    console.log('error caught in interceptor');
    // the app will crash if we don't return the error
    return Promise.reject(error.response);
  }
);

// for requests we get the config object
axios.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.get(url, body).then(responseBody),
  put: (url, body) => axios.get(url, body).then(responseBody),
  delete: (url) => axios.get(url).then(responseBody),
};

/**
 * @type {{firstName: String, list: function, details: function(number): Promise}}
 */
const methods = {
  firstName: 'Billy',
  list: () => requests.get('products'),
  details: (id) => requests.get(`products${id}`),
};

// /**
//  * @typedef {Object} Methods
//  * @property {String} firstName
//  * @property {function} list
//  * @property {function(string):any} details
//  */
// /**
//  * @type {Methods}
//  */
// const methods = {
//   firstName: 'Billy',
//   list: () => requests.get('products'),
//   details: (id) => requests.get(`products${id}`),
// };

// /**
//  * @type {{firstName: string, list: function, details: function(number): Promise}}
//  */
// const methods = {
//   firstName: 'Billy',
//   list: () => requests.get('products'),
//   details: (id) => requests.get(`products${id}`),
// };

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorized'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error'),
};

const axiosAgent = { methods, TestErrors };

export default axiosAgent;
