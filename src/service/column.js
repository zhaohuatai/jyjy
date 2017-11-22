import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadColumnChannelDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/channel/columnChannel/loadColumnChannelDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadTopColumnChannelList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/channel/columnChannel/loadTopColumnChannelList`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadColumnChannel(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/channel/columnChannel/loadColumnChannel`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadColumnChannelDto(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/channel/columnChannel/loadColumnChannelDto`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadColumnChannelItem(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/channel/columnChannelItem/loadColumnChannelItem`, param).then((data) => {
      resolve(data);
    });
  });
}