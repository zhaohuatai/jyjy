import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadPubPartnerDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/pubPartner/loadPubPartnerDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}
