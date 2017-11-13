import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadServiceCourseDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/course/serviceCourse/loadServiceCourseDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourse(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/course/serviceCourse/loadServiceCourse`, param).then((data) => {
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
