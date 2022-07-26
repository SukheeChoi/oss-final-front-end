import axios from "axios";

/**
 * OwFilterRadio component에 바인딩 할 협력사 목록 반환.
 * 
 * @author 최숙희
 * @param {Number} toDo 할일/한일 상태값.
 * @param {Array} dateList [검색 시작일, 검색 종료일] 기간.
 * @returns {Object} 협력사 목록(Array)을 담은 JSON.
 */
async function getVendorList(toDo=1, dateList=Array.from([])) {
  let vendorList = null;
  try {
    let params = new URLSearchParams();
    params.append('toDo', toDo);
    params.append('dateList', Array.from(dateList));
    const response = await axios.post(`/combineShipping/vendorList`, params);
    vendorList = response.data;
  } catch(error) {
    console.log(error);
  }
  return vendorList;
}

/**
 * OwFilterRadio component에 바인딩 할
 * 담당자 정보 : Employee - EMP_ID, EMP_NAME
 * 
 * @author 최숙희
 * @param {Number} toDo 할일/한일 상태값.
 * @param {Array} dateList [검색 시작일, 검색 종료일] 기간.
 * @returns {Object} 담당자 목록(Array)를 담은 JSON.
 */
async function getAssigneeList(toDo=1, dateList=Array.from([])) {
  let assigneeList = null;
  try {
    let params = new URLSearchParams();
    params.append('toDo', toDo);
    params.append('dateList', Array.from(dateList));
    const response = await axios.post(`/combineShipping/assigneeList`, params);
    assigneeList = response.data;
  } catch(error) {
    console.log(error);
  }
  return assigneeList;
}

/**
 * OwNGrid component에 바인딩 할 수령 목록(Array)을 담은 JSON을 반환.
 * 
 * @author 최숙희
 * @param {Number} toDo 할일/한일 상태값.
 * @param {String} selectedVendor 선택된 담당자.
 * @param {Array} dateList [검색 시작일, 검색 종료일] 기간.
 * @param {Number} pageNo 페이지 번호.
 * @param {Number} perPage 페이지 당 행 수.
 * @returns {Object} OwNGrid component에 바인딩 할 수령 목록(List)과
*                   페이지네이션을 위한 Pager(Object)를 담은 JSON.
 */
async function getReceiptList(
  toDo=1, selectedVendor='전체', dateList=Array.from([])
  , pageNo=1, perPage=40
) {
  let receiptList = null;
  try {
    let params = new URLSearchParams();
    params.append('toDo', toDo);
    params.append('vendorId', selectedVendor);
    params.append('dateList', Array.from(dateList));
    params.append('pageNo', pageNo);
    params.append('perPage', perPage);
    const response = await axios.post(`/combineShipping/receiptList`, params);
    receiptList = response.data;
  } catch(error) {
    console.log(error);
  }
  return receiptList;
}

/**
 * OwNGrid component에 바인딩 할 전달 목록(Array)을 담은 JSON 반환.
 * 
 * @author 최숙희
 * @param {Number} toDo 할일/한일 상태값.
 * @param {String} selectedAssignee 선택된 담당자.
 * @param {Array} dateList [검색 시작일, 검색 종료일] 기간.
 * @param {Number} pageNo 페이지 번호.
 * @param {Number} perPage 페이지 당 행 수.
 * @returns {Object} OwNGrid component에 바인딩 할 전달 목록(List)과
  *                  페이지네이션을 위한 Pager(Object)를 담은 JSON.
 */
async function getDeliveryList(
  toDo=1, selectedAssignee='전체', dateList=Array.from([]), pageNo=1, perPage=40
) {
  let deliveryList = null;
  try {
    let params = new URLSearchParams();
    params.append('toDo', toDo);
    params.append('employeeId', selectedAssignee);
    params.append('dateList', Array.from(dateList));
    params.append('pageNo', pageNo);
    params.append('perPage', perPage);
    const response = await axios.post(`/combineShipping/deliveryList`, params);
    deliveryList = response.data;
  } catch(error) {
    console.log(error);
  }
  return deliveryList;
}

/**
 * 합배송 품목들의 수령상태를 업데이트하고, 결과값을 반환.
 * 
 * @author 최숙희
 * @param {Array} receiptedList 수령 버튼이 체크된 행을 식별할 PK(OI_NO)와
*                              미출고 수량을 담은 객체를 담은 Array
 * @returns {String} 업데이트 성공/실패 여부
 */
async function updateReceiptList(receiptedList) {
  let result = null;
  try {
    const response = await axios.put(`/combineShipping/receipt`
                                    , Array.from(receiptedList));
    result = response.data.result;
  } catch(error) {
    console.log(error);
  }
  return result; //"success" || "fail"
}

/**
 * 업데이트 성공여부 반환.
 * '품목전달'버튼 클릭 시점 마다 수행.
 * 
 * @author 최숙희
 * @param {Array} deliveredList 전달 버튼이 체크된 행을 식별할 PK(OI_NO)를 담은 Array
 * @returns {String} 업데이트 성공/실패 여부
 */
async function updateDeliveryList(deliveredList) {
  let result = null;
  try {
    const response = await axios.put(`/combineShipping/delivery`
                                    , Array.from(deliveredList));
    result = response.data.result;
  } catch(error) {
    console.log(error);
  }
  return result; //"success" || "fail"
}


export default {
  getVendorList
  , getAssigneeList
  , getReceiptList
  , updateReceiptList
  , getDeliveryList
  , updateDeliveryList
};
