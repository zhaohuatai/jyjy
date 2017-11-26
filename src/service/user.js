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
