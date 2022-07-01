import axios from 'axios';

// //주문을 한 거래처의 이름과 주문 상태 가져오기
// async function getListAll() {
//   let receiptList = [];
//   try {
//     const response = await axios.get(`/client/getListAll`);
//     receiptList = response.data;
//     console.log("receiptList : " + receiptList[0]['shippingCategory']);
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
    params.append('unreleased',filterList.unreleased);
    params.append('orderNo',filterList.orderNo);
    params.append('clientName',filterList.clientName);
    console.log(params);
    console.log("filterList.shippingCategory : " + filterList.shippingCategory);
    console.log("filterList.status : " + filterList.status);
    console.log("filterList.unreleased : " + filterList.unreleased);
    console.log("1111111111111111111111");
    const response = await axios.post(`/client/getFilterList`, params);
    console.log("222222222222222222222");
    receiptList = response.data.list;
    console.log("receiptList : " + receiptList);
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
  // getListAll,
  getFilterList,
  getStatusCnt
};
