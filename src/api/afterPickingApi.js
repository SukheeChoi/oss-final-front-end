import axios from "axios";

/*
  작성자 : 최숙희
  매소드 기능 : '출고검수/패킹 진행' 페이지의 현황 정보를 서버로부터 가져오기 위한 axios 통신 수행.
  return : 현황 정보(JSON)를 담은 JSON.
  parameter : 불필요.
*/
/**
 * 현황 정보를 반환.
 * 
 * @author 최숙희
 * @returns {Object} 주문 건수, 피킹지시 건수, 출고검수/패킹 건수, 출고검수 긴급/일반 건수
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

/**
 * 담당자 필터링을 위해 OwSelect component에 바인딩 할 정보를 반환함.
 * 
 * @author 최숙희
 * @param {Object} filterList 목록 조회시 적용할 필터값
 * @returns {Array} 담당자 목록
 */
async function getAssigneeList(filterList) {
  let assigneeList = null;
  try {
    const response = await axios.post(`/afterPicking/assigneeList`, filterList);
    assigneeList = response.data;
  } catch(error) {
    console.log(error);
  }
  return assigneeList;
}

/**
 * Grid에 바인딩 할 목록을 서버로부터 가져오기 위한 axios 통신
 * 필터값 변경 시점과 페이지 변경 시점마다 수행.
 * 
 * @author 최숙희
 * @param {Object} filterList 
 * @param {Number} pageNo 
 * @param {Number} pageSize 
 * @returns {Object} 페이지네이션을 위한 Pager 객체와
 *                  Grid에 바인딩 할 목록(Array)을 담은 JSON.
 */
async function getAfterPickingList(filterList) {
  let afterPickingList = null;
  try {
    const response = await axios.post(`/afterPicking/`, filterList);
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