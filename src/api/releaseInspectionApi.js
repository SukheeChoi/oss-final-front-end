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
    console.log(response)
  }catch(error){
    console.log("#######/releaseInspection/getFilterList 통신 실패######")
    console.log(error);
  }
  return response.data;
}

// codes 내용: {"releaseCode":xxx, "scannedBarcode":xxx}
// 검수처리
async function releaseInspectionQtyUpdate(codes){
  let response = null;
  try{
    response = await axios.post(`/releaseInspection/RIQtyUpdate`, codes);
    console.log("releaseInspectionQtyUpdate >> 일단 통신은 됐다.");
    console.log(response);
  }catch(error){
    console.log("#######/releaseInspection/releaseInspectionQtyUpdate 통신 실패######")
    console.log(error);
  }
  return response.data;
}

// codes 내용: {"releaseCode":xxx, "scannedBarcode":xxx}
// 미출고처리
async function unReleaseQtyUpdate(codes) {
  let response = null;
  try{
    response = await axios.post(`/releaseInspection/unRleaseQtyUpdate`, codes);
    console.log("unRleaseQtyUpdate >> 일단 통신은 됐다.");
    console.log(response);
  }catch(error){
    console.log("#######/releaseInspection/unRleaseQtyUpdate 통신 실패######")
    console.log(error);
  }
  return response.data;
}

//스캔 버튼 눌렀을 때,
async function scan(releaseCode) {
  let response = null;
  console.log("releaseCode", releaseCode);
  try{
    response = await axios.get(`/releaseInspection/scanBtnClick?releaseCode=${releaseCode}`);
    console.log("scanBtnClick >> 일단 통신은 됐다.");
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

export default{
  getReleaseInspectionList,
  getFilterList,
  releaseInspectionQtyUpdate,
  unReleaseQtyUpdate,
  scan,
  getTotal
};