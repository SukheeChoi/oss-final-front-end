// 합배송품목 수령및전달 페이지에서의 통신.

import axios from "axios";
//수령/전달 날짜 필터링 유무로 나눠진 API 합치기!!
async function getVendorList(dateList) {
  let vendorList = null;
  try {
    const response = await axios.post(`/combineShipping/getVendorList`, dateList);
    vendorList = response.data;
  } catch(error) {
    console.log(error);
  }
  return vendorList;
}

// 날짜 필터링을 통한 수령 목록 조회.
async function getReceiptListByDate(dateList) {
  let receiptList = null;
  try {
    const response = await axios.post(`/combineShipping/getReceiptListByDate`, dateList);
    receiptList = response.data;
  } catch(error) {
    console.log(error);
  }
  return receiptList;
}

// 선택된 날짜에 해당하는 목록 조회.

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
async function getReceiptList(employeeId, dateList) {
  let receiptList = null;
  try {
    const response = await axios.post(`/combineShipping/getReceiptList`, {"employeeId": employeeId
                                                                          , "dateList": Array.from(deliveredList)});
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
  getVendorList
  , getReceiptListByDate
  , getAssigneeList
  , getReceiptList
  , getDeliveryList
  , updateDeliveryList
};