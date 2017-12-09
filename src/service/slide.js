import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadPubSlideDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/pubSlide/loadPubSlideDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadPubSlide(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/pubSlide/loadPubSlide`, param).then((data) => {
      resolve(data);
    });
  });
}


