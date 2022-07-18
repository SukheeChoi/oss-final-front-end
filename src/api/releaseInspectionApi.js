import axios from "axios";

//전체 데이터 가져오기
async function getReleaseInspectionList(){
  let response = null;
  try {
    response = await axios.get(`/releaseInspection/get`)
    console.log(response)
  }catch(error){
    console.log("#######/releaseInspection/get 통신 실패######")
    console.log(error);
  }
  return response.data;
  // return (response != null)? response.data : null;
};

//필터링된 데이터 가져오기
async function getFilterList(newGroup){
  let response = null;
  try{
    response = await axios.post(`/releaseInspection/getFilterList`, newGroup);
  }catch(error){
    console.log("#######/releaseInspection/getFilterList 통신 실패######")
    console.log(error);
  }
  return response.data;
}

// codes 내용: {"releaseCode":xxx, "scannedBarcode":xxx}
// 검수처리
async function releaseInspectionQtyUpdate(releaseCode, barCode){
  let response = null;
  try{
    response = await axios.get(`/releaseInspection/RIQtyUpdate?releaseCode=${releaseCode}&barCode=${barCode}`);
  }catch(error){
    console.log("#######/releaseInspection/releaseInspectionQtyUpdate 통신 실패######")
    console.log(error);
  }
  return response.data;
}

// codes 내용: {"releaseCode":xxx, "scannedBarcode":xxx}
// 미출고처리
async function unReleaseQtyUpdate(releaseCode, barCode) {
  let response = null;
  try{
    response = await axios.get(`/releaseInspection/unRleaseQtyUpdate?releaseCode=${releaseCode}&barCode=${barCode}`);
  }catch(error){
    console.log("#######/releaseInspection/unRleaseQtyUpdate 통신 실패######");
    console.log(error);
  }
  return response.data;
}

//스캔 버튼 눌렀을 때,
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
async function getTotal() {
  let response = null;
  try {
    response = await axios.get("/releaseInspection/releaseInspectionStatus");
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

// n번째 박스 패킹 완료 버튼 클릭 -> update
async function updateBoxTable(boxItemData) {
  let response = null;
  try{
    response = await axios.post(`/releaseInspection/updateBoxTable`, boxItemData);
  }catch(error){
    console.log("#######/releaseInspection/updateBoxTable 통신 실패######")
    console.log(error);
  }
  return response;
}

// n번째 박스 추가 버튼 클릭 -> insert
async function insertToBoxTable(boxItemData) {
  let response = null;
  try{
    response = await axios.post(`/releaseInspection/insertToBoxTable`, boxItemData);
  }catch(error){
    console.log("#######/releaseInspection/packing 통신 실패######")
    console.log(error);
  }
  return response;
}

// 패킹 최종 완료
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

//박스품목별정보 (releaseInspectionView에서 조회)
// async function getBoxInfo(releaseCode) {
//   let response = null;
//   try{
//     response = await axios.get(`/releaseInspection/selectByReleaseCode?releaseCode=${releaseCode}`);
//   }catch(error){
//     console.log("#######/releaseInspection/getBoxInfo 통신 실패######")
//     console.log(error);
//   }
//   return response.data;
// }

//ord_sts가 5,6일 때 박스별 품목정보 가져오기
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




export default{
  getReleaseInspectionList,
  getFilterList,
  releaseInspectionQtyUpdate,
  unReleaseQtyUpdate,
  scan,
  getTotal,
  updateBoxTable,
  packingDone,
  getBoxInfobyOrderNo,
  insertToBoxTable
};