import axios from "axios";

//필터링된 데이터 가져오기
/**
 * 필터링된 데이터를 서버로부터 가져오기 위한 axios 통신 수행
 * @author 신현주
 * @param {object} apiData 필터 조건(긴급/일반)과 페이저 정보(pageNo,pageSize)
 * @returns {object} 필터링된 정보(JSON)을 담는 JSON
 */
async function getFilterList(apiData){
  let response = null;
  try{
    response = await axios.post(`/releaseInspection/getFilterList`, apiData);
    console.log(response);
  }catch(error){
    console.log("#######/releaseInspection/getFilterList 통신 실패######")
    console.log(error);
  }
  return response.data;
}

// codes 내용: {"releaseCode":xxx, "scannedBarcode":xxx}
// 검수처리
/**
 * 검수처리 눌렀을 때, 검수처리된 물품 개수 업데이트
 * @param {String} releaseCode 
 * @param {String} barCode 
 */
async function releaseInspectionQtyUpdate(releaseCode, barCode){
  let response = null;
  try{
    response = await axios.put(`/releaseInspection/RIQtyUpdate?releaseCode=${releaseCode}&barCode=${barCode}`);
  }catch(error){
    console.log("#######/releaseInspection/releaseInspectionQtyUpdate 통신 실패######")
    console.log(error);
  }
  return response;
}

// codes 내용: {"releaseCode":xxx, "scannedBarcode":xxx}
// 미출고처리
/**
 * 미출고처리 눌렀을 때, 미출고처리된 물품 개수 업데이트
 * @param {String} releaseCode 
 * @param {String} barCode 
 */
async function unReleaseQtyUpdate(releaseCode, barCode) {
  let response = null;
  try{
    response = await axios.put(`/releaseInspection/unRleaseQtyUpdate?releaseCode=${releaseCode}&barCode=${barCode}`);
  }catch(error){
    console.log("#######/releaseInspection/unRleaseQtyUpdate 통신 실패######");
    console.log(error);
  }
  return response;
}

//스캔 버튼 눌렀을 때,
/**
 * 출고번호 혹은 바코드를 조회시, 조회된 물품에 대한 정보를 서버로부터 가져오기 위한 axios 통신 수행
 * @author 신현주
 * @param {String} code 
 * @param {String} kind 
 * @returns {Object} 스캔된 물품에 대한 정보를 담는 JSON
 */
async function scan(code, kind) {
  let response = null;
  try{
    response = await axios.get(`/releaseInspection/scanBtnClick?code=${code}&&kind=${kind}`);
  }catch(error){
    console.log("#######/releaseInspection/scanBtnClick 통신 실패######")
    console.log(error);
  }
  return response.data;
}

//맨 위에 현황 (주문건: 1360건 | 피킹완료건: 530건(긴급5건/일반525건) | 출고검수/패킹건: 0건(긴급3건/일반125건))
/**
 * '출고검수/패킹' 페이지의 현황 정보를 서버로부터 가져오기 위한 axios 통신 수행
 * @author 신현주
 * @returns {Object} 현황 정보(JSON)을 담는 JSON
 */
async function getSummary() {
  let response = null;
  try {
    response = await axios.get("/releaseInspection/releaseInspectionStatus");
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

/**
 * n번째 박스 패킹 완료 버튼 클릭 -> update
 * 
 * @author 신현주
 * @param {Object} boxItemData 물품 정보 
 * @returns 
 */
async function updateBoxTable(boxItemData) {
  console.log(boxItemData);
  let response = null;
  try{
    response = await axios.post(`/releaseInspection/updateBoxTable`, boxItemData);
  }catch(error){
    console.log("#######/releaseInspection/updateBoxTable 통신 실패######")
    console.log(error);
  }
  return response;
}

/**
 * n번째 박스 추가 버튼 클릭 -> insert
 * @author 신현주
 * @param {Object} boxItemData 물품 정보 
 */
async function insertToBoxTable(boxItemData) {
  let response = null;
  try{
    response = await axios.post(`/releaseInspection/insertToBoxTable`, boxItemData);
  }catch(error){
    console.log("#######/releaseInspection/packing 통신 실패######")
    console.log(error);
  }
  return response.data;
}

// 패킹 최종 완료
/**
 * 패킹 최종 완료 버튼을 클릭했을 때, 해당 주문번호의 해당하는 ord_sts 갱신 시키기 위한 axios 통신
 * 
 * @author 신현주
 * @param {String} orderNo 
 * @returns {number} 업데이트된 행의 개수
 */
async function packingDone(orderNo) {
  let response = null;
  try{
    response = await axios.get(`/releaseInspection/packingDone?orderNo=${orderNo}`);
  }catch(error){
    console.log("#######/releaseInspection/packingDone 통신 실패######")
    console.log(error);
  }
  return response;
}

//ord_sts가 4,5,6일 때 박스별 품목정보 가져오기
/**
 * 박스별 품목정보를 axios통신을 통해 가져오기
 * @author 신현주
 * @param {String} orderNo 
 * @param {number} index 
 * @returns {Object} 박스별 품목정보
 */
async function getBoxInfobyOrderNo(orderNo, index) {
  let response = null;
  try{
    response = await axios.get(`/releaseInspection/getBoxInfobyOrdNo?orderNo=${orderNo}&&index=${index}`);
  }catch(error){
    console.log("#######/releaseInspection/getBoxInfobyOrdNo 통신 실패######")
    console.log(error);
  }
  return response.data;
}

/**
 * 패킹된 물품 수량 조회하기 위한 axios 통신 요청
 * 
 * @author 신현주
 * @param {String} rlsCode 
 * @returns {number} 패킹된 물품 수량 합계 
 */
async function getTotalItemQty(rlsCode){
  console.log("releaseCode>>", rlsCode);
  let response = null;
  try{
    response = await axios.get(`/releaseInspection/getTotalItemQty?releaseCode=${rlsCode}`);
  }catch(error){
    console.log(error);
  }
  return response.data;
}

async function getTotalRlQty(orderNo){
  console.log("orderNo>>", orderNo);
  let response = null;
  try{
    response = await axios.get(`/releaseInspection/getTotalRlQty?orderNo=${orderNo}`);
  }catch(error){
    console.log(error);
  }
  return response.data;
}

export default{
  getFilterList,
  releaseInspectionQtyUpdate,
  unReleaseQtyUpdate,
  scan,
  getSummary,
  updateBoxTable,
  packingDone,
  getBoxInfobyOrderNo,
  insertToBoxTable,
  getTotalItemQty,
  getTotalRlQty
};