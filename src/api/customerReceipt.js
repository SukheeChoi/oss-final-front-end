import axios from 'axios';

/**
 * DB에 각 조건에 맞는 데이터 요청
 * 
 * @author 김예원
 * @param {Array} shippingCategory 배송구분(긴급, 일반)
 * @param {number} status 처리 단계
 * @param {number} unrelease 미출고 수량
 * @param {number} orderNo 주문 번호
 * @param {string} clientName 거래처 이름
 * @returns {Object} 필터링한 데이터(Array)를 담은 JSON
 */
async function getFilterList(filterList) {
  let receiptList = null;
  try {
    let params = new URLSearchParams();
    params.append('shippingCategory',filterList.shippingCategory);
    params.append('status',filterList.status);
    params.append('orderUnrelease',filterList.unrelease);
    params.append('orderNo',filterList.orderNo);
    params.append('clientName',filterList.clientName);

    const response = await axios.post(`/client/getFilterList`, filterList);
    receiptList = response.data.list;
  } catch (error) {
    console.log(error);
  }
  return receiptList;
}

/**
 * 주문 단계 별 건수 요청
 * 
 * @author 김예원
 * @returns {Array} 주문 단계 별 건수를 담은 배열
 */
async function getStatusCnt() {
  let status = [];
  try {
    const response = await axios.get(`/client/sts`);
    status = response.data.statusCnt;
  } catch (error) {
    console.log(error);
  }
  return status;
}

/**
 * 미출고 건수 요청
 * 
 * @author 김예원
 * @returns {number} 미출고 건수
 */
async function getUnreleaseCnt() {
  let unreleaseCnt = [];
  try{
    const response = await axios.get(`/client/unreleaseCnt`);
    unreleaseCnt = response.data;
  } catch (error) {
    console.log(error);
  }
  return unreleaseCnt;
}

export default {
  getFilterList,
  getStatusCnt,
  getUnreleaseCnt
};