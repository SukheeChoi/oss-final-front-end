// 합배송품목 수령및전달 페이지에서의 통신.

import axios from "axios";


// 담당자 띄우기. 이름과 코드 필요.
async function getAssigneeList() {
  let assigneeList = null;
  try {
    const response = await axios.get(`/combineShipping/getAssignee`);
    assigneeList = response.data;
  } catch(error) {
    console.log(error);
  }
  return assigneeList;
}


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

// 전달된 항목 update.
async function updateDeliveryList(deliveredList) {
  let result = null;
  try {
    const response = await axios.post(`/combineShipping/updateDelivery`, Array.from(deliveredList));
    result = response.data.result;
  } catch(error) {
    console.log(error);
  }
  return result; //"success" || "fail"
}


export default {
  getAssigneeList
  , getReceiptList
  , getDeliveryList
  , updateDeliveryList
};