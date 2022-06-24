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
    response = await axios.post(`/releaseInspection/getFilterList`, newGroup)
    console.log("response >> 일단 통신은 됐다.")
    console.log(response)
  }catch(error){
    console.log("#######/releaseInspection/getFilterList 통신 실패######")
    console.log(error);
  }
  return response.data;
}

export default{
  getReleaseInspectionList,
  getFilterList
};