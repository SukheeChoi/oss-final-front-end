import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

/**
 * 검품검수 및 라벨링 페이지의 현황
 * 
 * @author 이동현
 * @return {Object} 물품수령 / 검품검수 / 라벨링 / 양품 / 누락 / 파손 내역을 반환함
 */
async function getStatus() {
  let response = null;
  try {
    response = await axios.get('/label/status');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response.data.status;
}

/**
 * 검품검수 및 라벨링 모니터링 페이지에서
 * 담당 작업 및 작업 목록을 트리그리드에 바인딩 하기 위해
 * 데이터를 서버로부터 가져오기 위한 axios 통신 수행 
 * 
 * @author 이동현
 * @return {Object} 전체 / 담당자별 / 업체별 내역을 반환함
 */
async function getTreeList() {
  let response = null;
  try {
    response = await axios.get('/label/treeList');
    console.log(response.data.data);

    response.data.data.map((i) => {
      i.startTime = "dd";
      i.workTime = "dd";
      i.progressRate = "dd";
      i.status = "dd";
      i.lateTime = "dd";
      i.passItemQuantity = "dd";
      i.inspectionQuantity = "dd";
      i.labelingItemQuantity = "dd";

      i.child.map((k) => {
        k.startTime = "dd";
        k.workTime = "dd";
        k.progressRate = "dd";
        k.status = "dd";
        k.lateTime = "dd";
        k.passItemQuantity = "dd";
        k.inspectionQuantity = "dd";
        k.labelingItemQuantity = "dd";
        //지연시간에 분 붙이기
        k.childrennn.map((m) => {
          if(m.progressRate) {
            m.progressRate = m.progressRate + "%"
          }
          
          if (m.lateTime) {
            m.lateTime = m.lateTime + '분';
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
  return response.data.data;
}

/**
 * 검품검수 및 라벨링 모니터링 페이지에서
 * 추가 버튼을 눌렀을 때 뜨는 OwModal Component의 테이블에
 * 바인딩 할 데이터를 서버로부터 가져오기 위한 axios 통신 수행 
 * 
 * @author 이동현
 * @return {Object} 담당자가 정해져 있지 않은 작업을 반환
 */
async function getOvertime() {
  let response = null;
  try {
    response = await axios.get('/label/overTime');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response.data.data;
}

/**
 * 잔업 추가하기 
 * 
 * @param {Object} requestData 작업 내역 정보와 작업 예정 시작시간, 끝시간
 * @return {string} 성공 여부
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

//시간 수정하기
async function updateWorktime(requestData) {
  console.log(requestData);
  let response = null;
  try {
    response = await axios.put('/label/worktime', requestData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  
  return response.data;
}

//담당자 이름 기준으로 작업 세부사항 api 요청
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
