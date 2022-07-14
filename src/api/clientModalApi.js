import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// http://localhost:8080/client/modal?clientNo=1&orderNo=2207280000
//맨 위에 현황 List(전체: 1360건 | 오스템: 530건 | 협력사직배송: 470건 | 미출고: 2건)
async function getModal(clientNo, orderNo) {
  let response = null;
  try {
    response = await axios.get('/client/modal', {
      params: { clientNo, orderNo },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

//담당자 이름 기준으로 작업 세부사항 api 요청
async function getModalDetail(orderNo) {
  let response = null;
  try {
    response = await axios.get('/client/modalDetail', {
      params: { orderNo },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

export default {
  getModal,
  getModalDetail,
};
