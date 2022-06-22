// 출고검수/패킹 관련 통신 통신.

import axios from "axios";

// 조회.
// 조건1. 배송구분: 전체/긴급/일반
// 조건2. 배송방식: 전체/오스템/일반
// 조건3. 미출고: 전체/출고/미출고
// 조건4. 출고검수/패킹담당자(출고검수와 패킹의 모든 담당자 중에서 조회->선택된 담당자정보가 일치하는 리스트 조회.)
async function getAfterPickingList() {
  let afterPickingList = null;
  try {
    const response = await axios.get(`/afterPicking/`);
    afterPickingList = response.data;
  } catch(error) {
    console.log(error);
  }
  return afterPickingList;
}


export default {
  getAfterPickingList
};