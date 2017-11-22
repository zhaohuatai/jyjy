import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadDataScoreLineProvince(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/data/dataScoreLineProvince/loadDataScoreLineProvince`, param).then((data) => {
      resolve(data);
    });
  });
}