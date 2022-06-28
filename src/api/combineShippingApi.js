// 합배송품목 수령및전달 페이지에서의 통신.

import axios from "axios";

//수령/전달 날짜 필터링 유무로 나눠진 API 합치기!!
async function getVendorList(toDo=1, dateList=Array.from([])) {
  let vendorList = null;
  try {
    let params = new URLSearchParams();
    params.append('toDo', toDo);
    params.append('dateList', Array.from(dateList));
    const response = await axios.post(`/combineShipping/getVendorList`, params);
    vendorList = response.data;
    console.log('## vendorList : ', vendorList);
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
async function getAssigneeList(toDo=1, dateList=Array.from([])) {
  let assigneeList = null;
  try {
    let params = new URLSearchParams();
    params.append('toDo', toDo);
    params.append('dateList', Array.from(dateList));
;    const response = await axios.post(`/combineShipping/getAssignee`, params);
    assigneeList = response.data;
    console.log('## assigneeList : ', assigneeList);
  } catch(error) {
    console.log(error);
  }
  return assigneeList;
}


// param: 담당자 코드, pageNo
// '수령'탭에서 표시할 list.
async function getReceiptList(toDo=1, employeeId='', dateList=Array.from([])) {
  console.log('getReceiptList');
  let receiptList = null;
  try {
    let params = new URLSearchParams();
    params.append('toDo', toDo);
    params.append('employeeId', employeeId);
    params.append('dateList', Array.from(dateList));
    const response = await axios.post(`/combineShipping/getReceiptList`, params);
    receiptList = response.data;
  } catch(error) {
    console.log(error);
  }
  return receiptList;
}

// param: 담당자 코드, pageNo
// '전달'탭에서 표시할 list.
async function getDeliveryList(toDo=1, employeeId='', dateList=Array.from([])) {
  let deliveryList = null;
  try {
    let params = new URLSearchParams();
    params.append('toDo', toDo);
    params.append('employeeId', employeeId);
    params.append('dateList', Array.from(dateList));
    const response = await axios.post(`/combineShipping/getDeliveryList`, params);
    deliveryList = response.data;
  } catch(error) {
    console.log(error);
  }
  return deliveryList;
}

// 수령한 항목 update.
async function updateReceiptList(receiptedList) {
  let result = null;
  console.log('모듈 - updateReceiptList - before try');
  try {
    const response = await axios.put(`/combineShipping/receipt`, Array.from(receiptedList));
    result = response.data.result;
  } catch(error) {
    console.log(error);
  }
  return result; //"success" || "fail"
}

// 전달된 항목 update.
async function updateDeliveryList(deliveredList) {
  let result = null;
  try {
    const response = await axios.put(`/combineShipping/delivery`, Array.from(deliveredList));
    result = response.data.result;
    console.log('모듈 - updateDeliveryList');
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
  , updateReceiptList
  , getDeliveryList
  , updateDeliveryList
};
