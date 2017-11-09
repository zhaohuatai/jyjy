import {post} from '../utils/request';
import {API_DOMAIN} from '../utils/config';

export function loadDataProfessionSubjectDataSet(param) {
	return new Promise((resolve, reject) => {
			post(`${API_DOMAIN}pub/data/dataProfessionSubject/loadDataProfessionSubjectDataSet`, param).then((data) => {
			resolve(data);
			});
	});
}

export function loadDataProfessionCategoryDataSet(param) {
	return new Promise((resolve, reject) => {
		post(`${API_DOMAIN}pub/data/dataProfessionCategory/loadDataProfessionCategoryDataSet`, param).then((data) => {
			resolve(data);
		});
	});
}

export function loadDataProfessionDataSet(param) {
	return new Promise((resolve, reject) => {
		post(`${API_DOMAIN}pub/data/dataProfession/loadDataProfessionDataSet`, param).then((data) => {
			resolve(data);
		});
	});
}