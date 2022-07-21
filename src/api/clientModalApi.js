import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

/**
 * 주문~고객수취 페이지에서 
 * 업체명을 클릭하였을 때 뜨는 OwModal Component의 테이블에 
 * 바인딩 할 데이터를 서버로부터 가져오기 위한 axios 통신 수행 
 * 
 * @author 이동현
 * @param {number} clientNo 고객번호
 * @param {number} orderNo 주문번호
 * @return {Object} 거래처정보, 진행 주문 정보, 주문 이력을 반환함
 */
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

/**
 * 주문이력 보기 모달에서
 * 주문이력을 클릭하였을 때 상세 내역 테이블에
 * 바인딩 할 데이터를 가져오기 위한 axios 통신 수행
 * 
 * @author 이동현
 * @param {number} orderNo 
 * @return {Object} 주문 이력 상세정보
 */
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
