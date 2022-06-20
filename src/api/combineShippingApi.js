import axios from "axios";

// 합배송품목 수령및전달 페이지에서의 통신.
  // 담당자 띄우기. 이름과 코드 필요.
  
  // param: 담당자 코드, pageNo
  // '수령'탭에서 표시할 list.
  async function getReceiptList(employeeId) {
    let receiptList = null;
    try {
      const response = await axios.get(`/combineShipping/getReceiptList?employeeId=${employeeId}`);
      receiptList = response.data;
    } catch(error) {
      console.log(error);
    }
    return receiptList;
  }
  
  // param: 담당자 코드, pageNo
  // '전달'탭에서 표시할 list.
  async function getDeliveryList(employeeId) {
    let deliveryList = null;
    try {
      const response = await axios.get(`/combineShipping/getDeliveryList?employeeId=${employeeId}`);
      deliveryList = response.data;
    } catch(error) {
      console.log(error);
    }
    return deliveryList;
  }

export default {
  getReceiptList
  , getDeliveryList
};