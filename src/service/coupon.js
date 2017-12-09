import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadMemberCouponDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/member/memberCoupon/loadMemberCouponDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadCouponDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/coupon/coupon/loadCouponDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createMemberCoupon(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/member/memberCoupon/createMemberCoupon`, param).then((data) => {
      resolve(data);
    });
  });
}
