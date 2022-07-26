import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

/**
 * 업체의 주문이력을 반환함
 * 
 * @author 이동현
 * @param {number} clientNo 고객번호
 * @param {string} orderNo 주문번호
 * @return {Object} 거래처정보, 진행 주문 정보, 주문 이력을 JSON형태로 반환함
 */
async function getModal(clientNo, orderNo) {
  let response = null;
  try {
    response = await axios.get('/client/modal', {
      params: { clientNo, orderNo },
    });
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

/**
 * 업체 주문이력의 상세 정보를 반환함
 * 
 * @author 이동현
 * @param {string} orderNo 주문번호
 * @return {Object} 주문 이력 상세정보 목록을 JSON형태로 반환함
 */
async function getModalDetail(orderNo) {
  let response = null;
  try {
    response = await axios.get('/client/modalDetail', {
      params: { orderNo },
    });
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

export default {
  getModal,
  getModalDetail,
};
