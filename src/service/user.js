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

export function loadMember(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/member/loadMember`, param).then((data) => {
      resolve(data);
    });
  });
}

export function updateMember(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/member/updateMember`, param).then((data) => {
      resolve(data);
    });
  });
}

export function ishaveOpenId(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/member/memberRegist/ishaveOpenId`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createMemberVipOrder(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/member/memberVipOrder/createMemberVipOrder`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadWXConfig(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/weichatAuth/loadWXConfig`, param).then((data) => {
      resolve(data);
    });
  });
}

export function Sign(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/member/memberSign/sign`, param).then((data) => {
      resolve(data);
    });
  });
}

export function downloadImage(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}/pub/weichatAuth/downloadImage`, param).then((data) => {
      resolve(data);
    });
  });
}

// 分享
export function shareMainPage(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}/user/member/memberShare/shareMainPage`, param).then((data) => {
      resolve(data);
    });
  });
}

export function shareColumnChannel(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}/user/member/memberShare/shareColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}