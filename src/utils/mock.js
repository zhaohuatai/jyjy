import Mock from 'mockjs';
import FetchMock from 'fetch-mock';
import {API_DOMAIN} from './config';

FetchMock.post(API_DOMAIN+'admin/cases/caseSuccess/loadCaseSuccessDataSet',Mock.mock({
    data:
      [
          {
              id:2,
              title:'书画',
              price:'1800',
              auth:'李大爷',
              year:'120'
          },
          {
              id:3,
              title:'书画',
              price:'1800',
              auth:'李大爷',
              year:'120'
          },
          {
              id:4,
              title:'书画',
              price:'1800',
              auth:'李大爷',
              year:'120'
          },
      ]
}));

// 其他路由使用原生fetch，这段代码必须放最后
FetchMock.once('*', (url, options) => {
    FetchMock.restore();
    return fetch(url, options);
});
