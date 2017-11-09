import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadPubNewsDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/pubNews/loadPubNewsDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadPubNewsCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/pubNewsCategory/loadPubNewsCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadPubNews(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/pubNews/loadPubNews`, param).then((data) => {
      resolve(data);
    });
  });
}
