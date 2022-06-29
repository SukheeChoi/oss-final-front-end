import axios from 'axios';

//주문을 한 거래처의 이름과 주문 상태 가져오기
async function getClientInfo(checkboxGroup2, checkboxGroup4) {
  const shippingCategory = checkboxGroup2._rawValue.join(',');
  const status = checkboxGroup4.value;

  let receiptList = [];
  try {
    const response = await axios.get(`/client/`,{params:{shippingCategory, status}});
    receiptList = response.data.list;
  } catch (error) {
    console.log(error);
  }
  return receiptList;
}

//주문 상태 별 건수 가져오기
async function getStatusCnt() {
  let status = [];
  try {
    const response = await axios.get(`/client/sts`);
    status = response.data.statusCnt;
    console.log('status : ' + status);
  } catch (error) {
    console.log(error);
  }
  return status;
}

export default {
  getClientInfo,
  getStatusCnt
};
