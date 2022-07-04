import axios from 'axios';

//DB에 각 조건에 맞는 데이터 요청
async function getFilterList(checkboxGroup2, checkboxGroup4, checkbox1) {
  const shippingCategory = checkboxGroup2._rawValue.join(','); //배열
  const status = checkboxGroup4.value;
  const unreleaseChk = checkbox1.value;
  
  let receiptList = [];
  try {
    const response = await axios.get(`/client/getFilterList`,{params:{shippingCategory, status, unreleaseChk}});
    receiptList = response.data.list;
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
    console.log('status : ' + status);
  } catch (error) {
    console.log(error);
  }
  return status;
}

export default {
  getFilterList,
  getStatusCnt
};