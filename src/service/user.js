import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadColumnChannelOrderDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/column/columnChannelOrder/loadColumnChannelOrderDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceCourseOrderDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/course/serviceCourseOrder/loadServiceCourseOrderDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createAccount(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/member/memberRegist/createAccount`, param).then((data) => {
      resolve(data);
    });
  });
}

export function verifyVipCard(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/member/memberVipCard/verifyVipCard`, param).then((data) => {
      resolve(data);
    });
  });
}
