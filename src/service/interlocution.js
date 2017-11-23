import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadInterlocutionCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/interlocution/interlocutionCategory/loadInterlocutionCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadInterlocutionDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/interlocution/interlocution/loadInterlocutionDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadInterlocution(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/interlocution/interlocution/loadInterlocution`, param).then((data) => {
      resolve(data);
    });
  });
}