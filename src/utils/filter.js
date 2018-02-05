import { API_DOMAIN } from './config';
import { hashHistory } from 'react-router'

function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

export default function () {
  const redirect_url = getQueryString('redirect_url');
  //console.log(redirect_url);
  if (redirect_url) {
    //window.location.href = `${API_DOMAIN}#/${redirect_url}`;
    hashHistory.push(redirect_url);
  }
}
