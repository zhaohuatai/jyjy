import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadEvalCategoryList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/eval/evalSubjectRecord/loadEvalCategoryList`, param).then((data) => {
      resolve(data);
    });
  });
}