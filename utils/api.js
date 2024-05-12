import Axios from 'axios';

/* eslint no-console: 0 */
/** @var process */
// const HOST = process.server ? process.env.API_SERVER_HOST : '/'; // process.env.API_BROWSER_HOST;
const HOST = process.server ? process.env.API_SERVER_HOST : process.env.API_BROWSER_HOST;
const BASE_PREFIX = process.server ? '' : process.env.API_BROWSER_PREFIX + '/';
const PREFIX = process.env.API_PREFIX;
let headers = [];
const LOG = false;

export const setHeaders = (userHeaders) => {
  delete userHeaders.host;
  headers = userHeaders;
};

export const request = async(method, path = '', data = {}, params = {}, isPrefixed = true, isJson = true) => {
  // path += (path.includes('?') ? '&' : '?') + Date.now();
  path = path.replace(/^\//, '');
  if (isPrefixed) {
    path = `${PREFIX}/${path}`;
  }
  path = `${BASE_PREFIX}${path}`;
  if (LOG) {
    console.log({ path, method, data, params, host: HOST, headers });
  }

  let response = {};
  try {
    response = await Axios({
      baseURL: HOST,
      url: path,
      method,
      params,
      data,
      responseType: 'json',
      maxContentLength: 2000000,
      headers: {
        ...headers,
        ...(isJson ? {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        } : {})
      },
      // don`t throw an error when status is not ok
      validateStatus: (status) => {
        return true;
      }
    });
    if (response.data.error && LOG) {
      console.log(`Error in request: ${response.data.error}`);
    }
    return response.data;
  } catch (err) {
    if (LOG) {
      console.log(err, `Request method failed: ${method}, url: ${HOST} + ${path}, params: ${JSON.stringify(params)}, data: ${JSON.stringify(data)} : ${err.message}`);
    }
    return response.data;
  }
};

export const get = async(path, params) => {
  return request('get', path, {}, params);
};

export const post = async(path = '', data = {}, params = {}) => {
  return request('post', path, data, params);
};
