import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadAliVedioUploadAuthInfo(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/course/aliVedio/auth/loadAliVedioUploadAuthInfo`, param).then((data) => {
      resolve(data);
    });
  });
}

export function refreshAliVedioUploadAuthInfo(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/course/aliVedio/auth/refreshAliVedioUploadAuthInfo`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadAliVedioPlayAuthInfo(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}admin/course/aliVedio/auth/loadAliVedioPlayAuthInfo`, param).then((data) => {
      resolve(data);
    });
  });
}