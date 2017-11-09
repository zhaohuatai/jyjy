import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadServiceCourseCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/course/serviceCourseCategory/loadServiceCourseCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourseCategory(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/course/serviceCourseCategory/loadServiceCourseCategory`, param).then((data) => {
      resolve(data);
    });
  });
}