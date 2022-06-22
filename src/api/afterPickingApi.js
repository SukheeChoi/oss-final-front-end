// 출고검수/패킹 관련 통신 통신.

import axios from "axios";

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