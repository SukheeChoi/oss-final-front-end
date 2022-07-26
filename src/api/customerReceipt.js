//김예원
import axios from 'axios';

//DB에 각 조건에 맞는 데이터 요청
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
    receiptList = response.data;
  } catch (error) {
    console.log(error);
  }
  return receiptList;
}

//주문 단계 별 건수 요청
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

//미출고 건수 요청
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