import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

export function loadCaseSuccessDataSet(param,getDate){
  post( API_DOMAIN+'admin/cases/caseSuccess/loadCaseSuccessDataSet',param).then(data=>{
    getDate(data);
  });
}
