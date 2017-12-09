import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadServiceCourseDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/course/serviceCourse/loadServiceCourseDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourseDto(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/course/serviceCourse/loadServiceCourseDto`, param).then((data) => {
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

export function loadServiceCourseGlobal(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/course/serviceCourse/loadServiceCourseGlobal`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadTopServiceCourse(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/course/serviceCourse/loadTopServiceCourse`, param).then((data) => {
      resolve(data);
    });
  });
}

//  增加播放次数
export function addPalyRecord(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/course/serviceCourse/addPalyRecord`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadVideoPalyAuth(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/course/serviceCourse/loadVideoPalyAuth`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourseConsultationDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/course/serviceCourseConsultation/loadServiceCourseConsultationDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createServiceCourseOrder(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/course/serviceCourseOrder/createServiceCourseOrder?courseItemId`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourseFaverateDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/service/serviceCourseFavorite/loadServiceCourseFaverateDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourseOrder(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/course/serviceCourseOrder/loadServiceCourseOrder`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createServiceCourseFavorite(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/service/serviceCourseFavorite/createServiceCourseFavorite`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createServiceCourseConsultation(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/course/serviceCourseConsultation/createServiceCourseConsultation`, param).then((data) => {
      resolve(data);
    });
  });
}