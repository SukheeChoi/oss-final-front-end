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

async function getFilterList(checkboxGroup2, checkboxGroup4, checkbox1) {
  const shippingCategory = checkboxGroup2._rawValue.join(',');
  const status = checkboxGroup4.value;
  const unreleaseChk = checkbox1.value;
  
  console.log("unreleaseChk : " + typeof(unreleaseChk));
  let receiptList = [];
  try {
    const response = await axios.get(`/client/getFilterList`,{params:{shippingCategory, status, unreleaseChk}});
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
