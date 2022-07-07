import axios from 'axios';

//DB에 각 조건에 맞는 데이터 요청
// async function getFilterList(checkboxGroup2, checkboxGroup4, checkbox1) {
//   const shippingCategory = checkboxGroup2._rawValue.join(','); //배열
//   const status = checkboxGroup4.value;
//   const unreleaseChk = checkbox1.value;
  
//   let receiptList = [];
//   try {
//     const response = await axios.get(`/client/getFilterList`,{params:{shippingCategory, status, unreleaseChk}});
//     receiptList = response.data.list;
//   } catch (error) {
//     console.log(error);
//   }
//   return receiptList;
// }

async function getFilterList(filterList) {
  let receiptList = null;
  try {
    let params = new URLSearchParams();
    params.append('shippingCategory',filterList.shippingCategory);
    params.append('status',filterList.status);
    params.append('orderUnrelease',filterList.unrelease);
    params.append('orderNo',filterList.orderNo);
    params.append('clientName',filterList.clientName);

    console.log("api - filterList.shippingCategory : " + filterList.shippingCategory);
    console.log("api - filterList.status : " + filterList.status);
    console.log("api - filterList.unrelease : " + filterList.unrelease);
    console.log("api - filterList.orderNo : " + filterList.orderNo);
    console.log("api - filterList.clientName : " + filterList.clientName);
    const response = await axios.post(`/client/getFilterList`, filterList);
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