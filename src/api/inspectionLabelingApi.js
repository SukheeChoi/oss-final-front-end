import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

//맨 위에 현황 List(전체: 1360건 | 오스템: 530건 | 협력사직배송: 470건 | 미출고: 2건)
async function getStatus() {
  let response = null;
  try {
    response = await axios.get('/label/getStatus');
  } catch (error) {
    console.log(error);
  }
  return response.data.status;
}

//트리 그리드 api 요청
async function getTreeList() {
  let response = null;
  try {
    response = await axios.get('/label/getTreeList');
    console.log(response.data.data);

    response.data.data.map((i) => {
      i.startTime = "dd";
      i.workTime = "dd";
      i.progressRate = "dd";
      i.status = "dd";
      i.lateTime = "dd";
      i.passItemQuantity = "dd";
      i.inspectionQuantity = "dd";
      i.labelingItemQuantity = "dd";

      i.child.map((k) => {
        k.startTime = "dd";
        k.workTime = "dd";
        k.progressRate = "dd";
        k.status = "dd";
        k.lateTime = "dd";
        k.passItemQuantity = "dd";
        k.inspectionQuantity = "dd";
        k.labelingItemQuantity = "dd";
        //지연시간에 분 붙이기
        k.childrennn.map((m) => {
          if(m.progressRate) {
            m.progressRate = m.progressRate + "%"
          }
          
          if (m.lateTime) {
            m.lateTime = m.lateTime + '분';
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
  return response.data.data;
}

//담당자 이름 기준으로 작업 세부사항 api 요청
async function getListByEmployeeName(employeeName, searchSelected, searchContent, pageNo, pageSize) {
  let response = null;
  try {
    response = await axios.get('/label/getListByEmployeeName', {
      params: { employeeName, searchSelected, searchContent, pageNo, pageSize },
    });
    console.log(response);
    response.data.data.map((data) => {
      if(data.accepted === false) {
        data.accepted = null;
      } else {
        data.accepted = "승인";
      }
    })
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

export default {
  getStatus,
  getTreeList,
  getListByEmployeeName,
};
