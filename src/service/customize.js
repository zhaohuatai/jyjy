import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadPubCustomize(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/pubCustomize/loadPubCustomize`, param).then((data) => {
      resolve(data);
    });
  });
}