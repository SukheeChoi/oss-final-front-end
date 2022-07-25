import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

/**
 * 검품검수 및 라벨링 페이지의 현황
 * 
 * @author 이동현
 * @return {Object} 물품수령 / 검품검수 / 라벨링 / 양품 / 누락 / 파손 내역을 JSON형태로 반환함
 */
async function getStatus() {
  let response = null;
  try {
    response = await axios.get('/label/status');
  } catch (error) {
    console.log(error);
  }
  return response.data.status;
}

// 검품검수 및 라벨링 모니터링 페이지에서
// 담당 작업 및 작업 목록을 트리그리드에 바인딩 하기 위해
// 데이터를 서버로부터 가져오기 위한 axios 통신 수행 

/**
 * 담당 작업 및 작업 트리그리드 목록을 반환함
 * 
 * @author 이동현
 * @return {Object} 전체 / 담당자별 / 업체별 내역을 JSON형태로 반환함
 */
async function getTreeList() {
  let response = null;
  try {
    response = await axios.get('/label/treeList');
    console.log(response.data.data);
  } catch (error) {
    console.log(error);
  }
  return response.data.data;
}

// 검품검수 및 라벨링 모니터링 페이지에서
// 추가 버튼을 눌렀을 때 뜨는 OwModal Component의 테이블에
// 바인딩 할 데이터를 서버로부터 가져오기 위한 axios 통신 수행 

/**
 * 잔업 가져오기
 * 
 * @author 이동현
 * @return {Object} 담당자가 정해져 있지 않은 작업목록을 JSON형태로 반환
 */
async function getOvertime() {
  let response = null;
  try {
    response = await axios.get('/label/overtime');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response.data.data;
}

/**
 * 잔업 추가하기 
 * 
 * @author 이동현
 * @param {Object} requestData 작업 내역 정보와 작업 예정 시작시간, 끝시간
 * @return {string} 성공 여부를 반환
 */
async function updateOvertime(requestData) {
  console.log(requestData);
  let response = null;
  try {
    response = await axios.put('/label/overtime', requestData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response.data.result;
}

/**
 * 예정시간 수정하기
 * 
 * @author 이동현
 * @param {Object} requestData 발주번호, 작업번호, 작업 예정 시작시간, 끝시간
 * @return {String} 성공 여부를 반환
 */
async function updateWorktime(requestData) {
  console.log(requestData);
  let response = null;
  try {
    response = await axios.put('/label/worktime', requestData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  
  return response.data.result;
}

/**
 * 작업 물품목록을 반환함
 * 
 * @author 이동현
 * @param {number} labelingWorkTimeNo 작업번호
 * @param {string} searchSelected 검색 조건
 * @param {string} searchContent 검색 내용
 * @param {number} pageNo 페이지 번호
 * @param {number} pageSize 한 페이지의 행 수
 * @return {Object} 해당 담당자의 작업 물품 목록을 JSON형태로 반환함
 */
async function getListByLWTNo(labelingWorkTimeNo, searchSelected, searchContent, pageNo, pageSize) {
  let response = null;
  try {
    response = await axios.get('/label/workDetail', {
      params: { labelingWorkTimeNo, searchSelected, searchContent, pageNo, pageSize },
    }); 
    response.data.data.map((data) => {
      if(data.accepted === false) {
        data.accepted = null;
      } else {
        data.accepted = "승인";
      }
    })
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

export default {
  getStatus,
  getTreeList,
  getOvertime,
  getListByLWTNo,
  updateOvertime,
  updateWorktime,
};
