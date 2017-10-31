import 'whatwg-fetch';
import store from '../store';
import {hashHistory} from 'react-router';
import {API_DOMAIN,DELIVER, WECHAT_LOGIN} from './config';
import { Modal, Toast } from 'antd-mobile';
import md5 from 'blueimp-md5';

const alert = Modal.alert;
/**
 * 状态码错误名称
 * @param {int} statusCode
 */
function checkCode(statusCode,message){
    if(statusCode == 200){
        return {code:statusCode, message:''};
    }else{
        //返回码判断
        switch(statusCode){
        case 300 : return {code:statusCode, message:message};
        case 301 :
            alert('未登录', '请先登录', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '登录', onPress: () => doWebLogin({username:'admin',password:'admin',captcha:'1111'},data=>{
                if(data.statusCode == 200){
                  Toast.success('登录成功', 1);
                }else{
                  Toast.fail(data.message, 1);
                }
              }) },
            ])
            break;
        case 4010 : hashHistory.push('/weblogin'); break;
        case 4011 : return {code:statusCode, message:message};
        case 500 : return {code:statusCode, message:message};
        default : return {code:statusCode, message:message};
        }
    }
}

/**
 * fetch.get请求封装
 */
export function get(url,params=''){
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&');
        } else {
            url += '&' + paramsArray.join('&');
        }
    }

    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'get',
        }).then((response) => {
            response.json();})
            .then((responseData) => {
                let checkCodeResult = checkCode(responseData.statusCode);
                if(checkCodeResult.code == 200){
                    resolve(responseData);
                }else{
                }
            })
            .catch((err) => {
                reject(err);
            });
    });

};

/**
 * fetch.post请求封装
 */
export function post(url,params=''){

    //json 序列化
    if (params) {
        var paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));

        var paramsurl = '';
        paramsurl += paramsArray.join('&');

    }

    //console.log(paramsurl);

    return new Promise(function (resolve, reject) {
        fetch( url, {
            method: 'post',
            body:paramsurl,
            mode:'cors',
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((response) => {
            return response.json();
        }).then((responseData) => {
            let checkCodeResult = checkCode(responseData.statusCode,responseData.message);
            if(checkCodeResult.code != 200){
                //触发store action 弹出提示框
            }
            resolve(responseData);
        }).catch((err) => {
            reject(err);
        });
    });
};

//获取登录验证码
export function getCaptcha(getDate){
    fetch(API_DOMAIN+'api/auth/captcha',{
        method:'get',
        mode:'no-cors',
    }).then(response=>{
        response.json();
    })
    .then(responseData=>{
        getDate(responseData);
    });
}

//web登录
export function doWebLogin(paramsArray, getDate){
    let salt = 'zhtframework_94DABGioQOq2tTUO0AXYow';
    paramsArray.password = md5(salt+paramsArray.password);

    const formBody = Object.keys(paramsArray).map(key=>encodeURIComponent(key)+'='+encodeURIComponent(paramsArray[key])) .join('&');

    var headers = new Headers();
    headers.set('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
    headers.set('X-Requested-With','XMLHttpRequest');

    fetch(API_DOMAIN+'api/auth/login',{
        method:'post',
        mode:'cors',
        credentials: 'include',
        headers,
        body: formBody
    }).then((response)=>{
        return response.json();
    }).then((responseData)=>{
        getDate(responseData);
    });
}

//获取商品详细信息
// export function getGoodsDetail(param,getDate){
//     Http.post( API_DOMAIN+'mobile/buyer/product/loadProductDetail', {id:1}).then(data=>{
//         getDate(data);
//     });
// }
//上传商品缩略图
export function uploadProductImage(params, getDate){
    let headers = new Headers();
    //headers.set('Content-Type','multipart/form-data; boundary=----WebKitFormBoundary4I9QTerA7b4BBalV');
    headers.set('X-Requested-With','XMLHttpRequest');

    fetch(API_DOMAIN+'pc/shop/product/uploadProductImage',{
        method:'post',
        mode:'cors',
        credentials: 'include',
        headers,
        body:params
    }).then((response)=>{
        return response.json();
    }).then((responseData)=>{
        getDate(responseData);
    }).catch(()=>{
        getDate({codeStatus:400});
    });
}