import { post } from '../utils/request';
import { API_DOMAIN } from '../utils/config';

export function loadEnrollAutoBigdataDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/enroll/enrollAutoBigdata/loadEnrollAutoBigdataDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoBigdata(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/enroll/enrollAutoBigdata/loadEnrollAutoBigdata`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoAwardRecommendDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}user/enroll/enrollAutoAwardRecommend/loadEnrollAutoAwardRecommendDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoAwardCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/enroll/enrollAutoAward/loadEnrollAutoAwardCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoAwardEvaluationDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/enroll/enrollAutoAward/loadEnrollAutoAwardEvaluationDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollautoAwardCompetitionDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/enroll/enrollAutoAward/loadEnrollautoAwardCompetitionDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoQuestionCategoryDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/enroll/enrollAutoQuestionCategory/loadEnrollAutoQuestionCategoryDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoQuestion(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/enroll/enrollAutoQuestion/loadEnrollAutoQuestion`, param).then((data) => {
      resolve(data);
    });
  });
}

export function loadEnrollAutoQuestionDataSet(param) {
  return new Promise((resolve, reject) => {
    post(`${API_DOMAIN}pub/enroll/enrollAutoQuestion/loadEnrollAutoQuestionDataSet`, param).then((data) => {
      resolve(data);
    });
  });
}