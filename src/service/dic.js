import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadProvinceList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/dic/dicAreas/loadProvinceList`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadDicData(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/dic/dicData/loadDicData`, param).then((data) => {
      resolve(data);
    });
  });
}

export function sendSmsCheckCode(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/member/memberRegist/sendSmsCheckCode`, param).then((data) => {
      resolve(data);
    });
  });
}

export function checkSmsCode(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/member/memberRegist/checkSmsCode`, param).then((data) => {
      resolve(data);
    });
  });
}