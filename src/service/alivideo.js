import 'whatwg-fetch';

export function GetVideoPlayAuth(params = '') {
  let url = 'http://vod.cn-shanghai.aliyuncs.com/';

  // json 序列化
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
    }).then(response => {
      return response.json();
    }).then((responseData) => {
      resolve(responseData);
    }).catch((err) => {
      reject(err);
    });
  }));
}
