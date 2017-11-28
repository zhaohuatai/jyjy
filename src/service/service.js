import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadServiceEntranceDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntrance/loadServiceEntranceDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceEntrance(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntrance/loadServiceEntrance`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadServiceEntranceAtTopDto(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntranceCategory/loadServiceEntranceAtTopDto`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadAllServiceEntranceCatefirstList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntranceCategory/loadAllServiceEntranceCatefirstList`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadSecondDtoByFirstCateId(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntranceCategory/loadSecondDtoByFirstCateId`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadCateThirdDtoBySecondCateId(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntranceCategory/loadCateThirdDtoBySecondCateId`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEntranceByThirdCateId(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntranceCategory/loadEntranceByThirdCateId`, param).then((data) => {
      resolve(data);
    });
  });
}


// 获取分类关系
export function loadServiceEntranceCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntranceCategory/loadServiceEntranceCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

// 判断当前用户是否是会员
export function requestAppointment(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntrance/requestAppointment`, param).then((data) => {
      resolve(data);
    });
  });
}

// 非会员创建请求
export function createAppointment(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/entrance/serviceEntrance/createAppointment`, param).then((data) => {
      resolve(data);
    });
  });
}

// 非会员创建请求
export function userCreateAppointment(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/entrance/serviceEntrance/createAppointment`, param).then((data) => {
      resolve(data);
    });
  });
}
