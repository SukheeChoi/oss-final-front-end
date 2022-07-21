/*
  작성자 : 최숙희
  모듈 기능 : '합배송 품목 수령/전달' 페이지 관련 axios 통신 수행.
*/
import axios from "axios";

/*
  작성자 : 최숙희
  매소드 기능 : '합배송 품목 수령/전달' 페이지에서
    OwFilterRadio component에 바인딩 할 협력사 목록을 서버로부터 가져오기 위한 axios 통신 수행.
    할일/한일 탭 전환 시점과 기간 필터링 값 변경 시점마다 수행.
  return : OwFilterRadio component에 바인딩 할 협력사 목록(List)을 담은 JSON.
  parameter : 할일/한일 선택 값, 선택된 기간 Array.
*/
/**
 * OwFilterRadio component에 바인딩 할 협력사 목록 반환.
 * 
 * @author 최숙희
 * @param {Number} toDo 할일/한일 상태값.
 * @param {Array} dateList [검색 시작일, 검색 종료일] 기간.
 * @returns {Object} 협력사 목록
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

/*
  작성자 : 최숙희
  매소드 기능 : '합배송 품목 수령/전달' 페이지에서
    OwFilterRadio component에 바인딩 할
    (합배송 물품 전달)담당자(Employee - EMP_ID, EMP_NAME) 목록(Array)을
    서버로부터 가져오기 위한 axios 통신 수행.
    할일/한일 탭 전환 시점과 기간 필터링 값 변경 시점마다 수행.
  return : OwFilterRadio component에 바인딩 할 담당자 목록(List)을 담은 JSON.
  parameter : 할일/한일 선택 값, 선택된 기간 Array.
*/
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

/*
  작성자 : 최숙희
  매소드 기능 : '합배송 품목 수령/전달' 페이지에서
    OwNGrid component에 바인딩 할 수령 목록을 서버로부터 가져오기 위한 axios 통신 수행.
    할일/한일 탭 전환, 기간 조회 버튼 클릭
    , 업체 필터링, 수령 업데이트 시점 마다 수행.
  return : OwNGrid component에 바인딩 할 수령 목록(List)과
    페이지네이션을 위한 Pager(Object)를 담은 JSON.
  parameter : 할일/한일 선택 값, 선택된 협력사, 선택된 기간 Array, 패이지 정보.
*/
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

/*
  작성자 : 최숙희
  매소드 기능 : '합배송 품목 수령/전달' 페이지에서
    OwNGrid component에 바인딩 할 전달 목록을 서버로부터 가져오기 위한 axios 통신 수행.
    할일/한일 탭 전환, 기간 조회 버튼 클릭
    , 담당자 필터링, 전달 업데이트 시점 마다 수행.
  return : OwNGrid component에 바인딩 할 수령 목록(List)과
    페이지네이션을 위한 Pager(Object)를 담은 JSON.
  parameter : 할일/한일 선택 값, 선택된 협력사, 선택된 기간 Array, 패이지 정보.
*/
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

/*
  작성자 : 최숙희
  매소드 기능 : '합배송 품목 수령/전달' 페이지에서
    수령 버튼이 체크된 행을 식별할 PK(OI_NO)와 미출고 수량을 담은 객체를 담은 Array를
    서버에 전달하여 합배송 품목들의 수령상태를 업데이트하기 위한 axios 통신 수행.
    '품목수령'버튼 클릭 시점 마다 수행.
  return : 업데이트 성공여부를 가리키는 문자열("success" || "fail").
  parameter : 수령 버튼이 체크된 행을 식별할 PK(OI_NO)와
    사용자로부터 입력받은 미출고 수량을 담은 객체를 담은 Array.
*/
/**
 * 합배송 품목들의 수령상태를 업데이트하고, 결과값을 반환.
 * 
 * @author 최숙희
 * @param {Array} receiptedList 수령 버튼이 체크된 행을 식별할 PK(OI_NO)와 미출고 수량을 담은 객체를 담은 Array
 * @returns {String} 업데이트 성공/실패 여부
 */
async function updateReceiptList(receiptedList) {
  let result = null;
  try {
    const response = await axios.put(`/combineShipping/receipt`, Array.from(receiptedList));
    result = response.data.result;
  } catch(error) {
    console.log(error);
  }
  return result; //"success" || "fail"
}

/*
  작성자 : 최숙희
  매소드 기능 : '합배송 품목 수령/전달' 페이지에서
    전달 버튼이 체크된 행을 식별할 PK(OI_NO)를 담은 Array를
    서버에 전달하여 합배송 품목들의 전달상태를 업데이트하기 위한 axios 통신 수행.
    '품목전달'버튼 클릭 시점 마다 수행.
    합배송 품목 수령시에 미출고가 발생하면, 협력사로부터 추가로 물품을 수령받아서
    미출고가 0인 상태에서만 전달이 이루어지는 것으로 물류 흐름 파악.(예시화면 참고)
  return : 업데이트 성공여부를 가리키는 문자열("success" || "fail").
  parameter : 전달 버튼이 체크된 행을 식별할 PK(OI_NO)를 담은 Array.
*/
/**
 * 업데이트 성공여부 반환.
 * '품목전달'버튼 클릭 시점 마다 수행.
 * 
 * @author 최숙희
 * @param {Array} deliveredList 전달 버튼이 체크된 행을 식별할 PK(OI_NO)를 담은 Arra
 * @returns {String} 업데이트 성공/실패 여부
 */
async function updateDeliveryList(deliveredList) {
  let result = null;
  try {
    const response = await axios.put(`/combineShipping/delivery`, Array.from(deliveredList));
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
