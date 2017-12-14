import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadEvalCategoryList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/eval/evalSubjectRecord/loadEvalCategoryList`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createEvalSubjectRecord(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/eval/evalSubjectRecord/createEvalSubjectRecord`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createEvalSubjectRecordItem(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/eval/evalSubjectRecord/createEvalSubjectRecordItem`, param).then((data) => {
      resolve(data);
    });
  });
}

export function createRecordItemForCate3Sep2(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/eval/evalSubjectRecord/createRecordItemForCate3Sep2`, param).then((data) => {
      resolve(data);
    });
  });
}

export function deleteEvalSubjectRecord(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/eval/evalSubjectRecord/deleteEvalSubjectRecord`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEvalSubjectRecordDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/eval/evalSubjectRecord/loadEvalSubjectRecordDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEvalSubjectRecordItemDtoList(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/eval/evalSubjectRecord/loadEvalSubjectRecordItemDtoList`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadRecordItemDtoForCate3Sep2(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/eval/evalSubjectRecord/loadRecordItemDtoForCate3Sep2`, param).then((data) => {
      resolve(data);
    });
  });
}
