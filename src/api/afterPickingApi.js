/*
  작성자 : 최숙희
  모듈 기능 : '출고검수/패킹 진행' 페이지 관련 axios 통신 수행.
*/
import axios from "axios";

/*
  작성자 : 최숙희
  매소드 기능 : '출고검수/패킹 진행' 페이지의 현황 정보를 서버로부터 가져오기 위한 axios 통신 수행.
  return : 현황 정보(JSON)를 담은 JSON.
  parameter : 불필요.
*/
async function getSummary() {
  let summaryList = null;
  try {
    const response = await axios.get(`/afterPicking/summary`);
    summaryList = response.data;
  } catch(error) {
    console.log(error);
  }
  return summaryList;
}

/*
  작성자 : 최숙희
  매소드 기능 : '출고검수/패킹 진행' 페이지에서
    '출고검수/패킹 담당자' 필터링을 위해 OwSelect component에 바인딩 할 정보를
    서버로부터 가져오기 위한 axios 통신 수행.
    목록 조회는 페이지마다 수행하지만, 담당자 목록 조회는 필터값 변경시에만 수행하므로 목록 조회 메소드와 별개로 존재.
  return : 전달된 필터링 값으로 목록 조회시의 담당자 목록(List)을 담은 JSON.
  parameter : 목록 조회시 적용하기 위한 필터값들
    (배송구분, 배송방식, 미출고, 부분일치 검색용 키워드(주문번호/거래처/배송지/업체명)).
*/
async function getAssigneeList(filterList) {
  let assigneeList = null;
  try {
    let params = new URLSearchParams();
    params.append('shippingCategory', filterList.shippingCategory);
    params.append('shippingWay', filterList.shippingWay);
    params.append('released', filterList.released);
    params.append('orderNo', filterList.orderNo);
    params.append('clientName', filterList.clientName);
    params.append('shippingDestination', filterList.shippingDestination);
    params.append('vendorName', filterList.vendorName);
    const response = await axios.post(`/afterPicking/assigneeList`, params);
    assigneeList = response.data;
  } catch(error) {
    console.log(error);
  }
  return assigneeList;
}

// 조회.
// params:
  // mainCategory(int): 1(배송구분-String), 2(배송방식-String), 3(미출고-String), 4(출고검수/패킹담당자), 5(주문번호/거래처/배송지/업체명)
    // mc1 - shippingCategory(String): '전체(null)/일반/긴급'
    // mc2 - shippingWay(String): '전체(null)/오스템/합배송'
    // mc3 - released(String): '전체(null)/출고/미출고'
    // subcategory(int) - mc5에 한함.: 1(주문번호-int), 2(거래처-String), 3(배송지-String), 4(업체명-String)
    // inputKeword(String) - mc5에 한함. : .
// 조건2. 배송방식: 전체/오스템/일반
// 조건3. 미출고: 전체/출고/미출고
// 조건4. 출고검수/패킹담당자(출고검수와 패킹의 모든 담당자 중에서 조회->선택된 담당자정보가 일치하는 리스트 조회.)
// 조건5. 주문번호/거래처/배송지/업체명 <- 선택된 기준을 int로 + 입력값을 String으로 전달.
  // 5-1. 주문번호: 부분만 일치해도 검색되도록.
  // 5-2. 거래처: 부분만 일치해도 검색되도록.
  // 5-3. 배송지: 부분만 일치해도 검색되도록.
  // 5-4. 업체명: 부분만 일치해도 검색되도록.
/*
  작성자 : 최숙희
  매소드 기능 : '출고검수/패킹 진행' 페이지에서
    Grid에 바인딩 할 목록을 서버로부터 가져오기 위한 axios 통신 수행.
    필터값 변경 시점과 페이지 변경 시점마다 수행.
  return : 페이지네이션을 위한 Pager 객체와 Grid에 바인딩 할 목록(List)을 담은 JSON.
  parameter : 다중 필터링용 필터값/담당자/부분일치 검색 키워드/페이지네이션 위한 페이지 번호, 페이지 별 행 개수.
*/
/**
 * 
 * @author 최숙희
 * @param {Object} filterList 
 * @param {Number} pageNo 
 * @param {Number} pageSize 
 * @returns 
 */
async function getAfterPickingList(filterList, pageNo=1, pageSize=10) {
  let afterPickingList = null;
  try {
    let params = new URLSearchParams();
    params.append('shippingCategory', filterList.shippingCategory);
    params.append('shippingWay', filterList.shippingWay);
    params.append('released', filterList.released);
    params.append('assignee', filterList.assignee);
    params.append('orderNo', filterList.orderNo);
    params.append('clientName', filterList.clientName);
    params.append('shippingDestination', filterList.shippingDestination);
    params.append('vendorName', filterList.vendorName);
    params.append('pageNo', pageNo);
    params.append('pageSize', pageSize);
    const response = await axios.post(`/afterPicking/`, params);
    afterPickingList = response.data;
  } catch(error) {
    console.log(error);
  }
  return afterPickingList;
}


export default {
  getSummary
  , getAssigneeList
  , getAfterPickingList
};