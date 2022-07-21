import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

//모달에 띄울 데이터() 가져오기
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

//모달의 주문이력 상세 보기 데이터 가져오기
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
