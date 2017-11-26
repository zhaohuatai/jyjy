import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadMemberTeacherDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/member/memberTeacher/loadMemberTeacherDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadMemberTeacher(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/member/memberTeacher/loadMemberTeacher`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createMemberTeacherAppointment(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/member/memberTeacher/createMemberTeacherAppointment`, param).then((data) => {
      resolve(data);
    });
  });
}

