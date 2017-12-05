import 'whatwg-fetch';
import { hashHistory } from 'react-router';
import { API_DOMAIN, WECHAT_LOGIN } from './config';
import { Modal, Toast } from 'antd-mobile';
import md5 from 'blueimp-md5';

const alert = Modal.alert;
/**
 * 状态码错误名称
 * @param {int} statusCode
 */
const checkCode = (statusCode, message) => {
  if (statusCode === 200) {
    return { code: statusCode, message: '' };
  }
  // 返回码判断
  switch (statusCode) {
    case 300: Toast.fail(message, 2); break;
    case 301:
      alert('未登录', '请先登录', [
        { text: '取消', onPress: () => hashHistory.push('/') },
        { text: '登录', onPress: () => window.location.href=WECHAT_LOGIN },
      ]);
      break;
    case 4010: hashHistory.push('/register'); break;
    case 4011: Toast.fail(message, 2); break;
    case 4004: Toast.fail(message, 2); break; // 非vip
    case 500: Toast.fail(message, 2); break;
    default: Toast.fail(message, 2);
  }
}

/**
 * fetch.get请求封装
 */
export function get(url, params = '') {
  if (params) {
    const paramsArray = [];
    // encodeURIComponent
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join('&')}`;
    } else {
      url += `&${paramsArray.join('&')}`;
    }
  }

  return new Promise(((resolve, reject) => {
    fetch(url, {
      method: 'get',
    }).then((response) => {
      response.json();
    }).then((responseData) => {
      const checkCodeResult = checkCode(responseData.statusCode);
      if (checkCodeResult.code === 200) {
        resolve(responseData);
      } else {
        Toast.info('This is a toast tips !!!', 1);
        reject(checkCodeResult);
      }
    }).catch((err) => {
      reject(err);
    });
  }));
}

/**
 * fetch.post请求封装
 */
export function post(url, params = '') {
  let  paramsurl = '';

  // json 序列化
  if (params) {
    const paramsArray = [];
    // encodeURIComponent
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));

    paramsurl += paramsArray.join('&');
  }

  return new Promise(((resolve, reject) => {
    fetch(url, {
      method: 'post',
      body: paramsurl,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
    }).then((response) => {
      return response.json();
    }).then((responseData) => {
      if (responseData.statusCode) {
        checkCode(responseData.statusCode, responseData.message);
        if (responseData.statusCode === 200) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      } else {
        reject(responseData);
      }
    }).catch((err) => {
      reject(err);
    });
  }));
}

// 获取登录验证码
export function getCaptcha(getDate) {
  fetch(`${API_DOMAIN}api/auth/captcha`, {
    method: 'get',
    mode: 'no-cors',
  }).then((response) => {
    response.json();
  })
    .then((responseData) => {
      getDate(responseData);
    });
}

// web登录
export function doWebLogin(paramsArray, getDate) {
  const salt = 'zhtframework_94DABGioQOq2tTUO0AXYow';
  paramsArray.password = md5(salt + paramsArray.password);

  const formBody = Object.keys(paramsArray).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsArray[key])}`).join('&');

  let headers = new Headers();
  headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  headers.set('X-Requested-With', 'XMLHttpRequest');

  fetch(`${API_DOMAIN}api/auth/login`, {
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: formBody,
  }).then((response) => response.json()).then((responseData) => {
    getDate(responseData);
  });
}

// 获取商品详细信息
// export function getGoodsDetail(param,getDate){
//     Http.post( API_DOMAIN+'mobile/buyer/product/loadProductDetail', {id:1}).then(data=>{
//         getDate(data);
//     });
// }
// 上传商品缩略图
export function uploadProductImage(params, getDate) {
  const headers = new Headers();
  // headers.set('Content-Type','multipart/form-data; boundary=----WebKitFormBoundary4I9QTerA7b4BBalV');
  headers.set('X-Requested-With', 'XMLHttpRequest');

  fetch(`${API_DOMAIN}pc/shop/product/uploadProductImage`, {
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: params,
  }).then((response) => response.json()).then((responseData) => {
    getDate(responseData);
  }).catch(() => {
    getDate({ codeStatus: 400 });
  });
}
