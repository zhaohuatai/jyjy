import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadDataUniversity(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/data/dataUniversity/loadDataUniversity`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDataUniversityDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/data/dataUniversity/loadDataUniversityDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}