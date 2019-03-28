import axios from 'axios';
import Utils from '../lib/utils';

const config = {
  headers: {
    'X-QUIRKYCODER-TOKEN': process.env.REACT_APP_API_TOKEN,
    'X-QUIRKYCODER-USER-TOKEN': Utils.getUserToken()
  }
};

const baseUrl = `${process.env.REACT_APP_API_URL}`

export default function ApiService() {}

ApiService.get = function(url){
  return axios.get(baseUrl + url, config);
}

ApiService.post = function(url, data, options = null) {
  return axios.post(baseUrl + url, data, config);
}

ApiService.search = function(url, data, options = null) {
  if (options) {
    data = { "q": Object.assign({}, data['q'], options) }
  }
  return axios.post(baseUrl + url, {"q": Utils.clean(data.q)}, config);
}

ApiService.put = function(url, data) {
  return axios.put(baseUrl + url, data, config);
}

ApiService.delete = function(url) {
  return axios.delete(baseUrl + url, config);
}

ApiService.upload = function(url, data) {
  config['headers']['content-type'] = 'multipart/form-data';
  return axios.post(baseUrl + url, data, config);
}

ApiService.download = function(url){
  return axios.get(url, config);
}
