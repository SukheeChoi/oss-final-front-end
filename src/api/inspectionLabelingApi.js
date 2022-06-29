import axios from "axios";
import qs from "qs";
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8"


//맨 위에 현황 List(전체: 1360건 | 오스템: 530건 | 협력사직배송: 470건 | 미출고: 2건)
async function getStatus() {
  let response = null;
  try {
    response = await axios.get("/label/getStatus");
  } catch (error) {
    console.log(error);
  }
  return response.data.status;
}

//왼쪽쪽 화면
async function getTreeList() {
  let response = null;
    try {
      response = await axios.get("/label/getListLeft");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  return response.data.item;
}

//오른쪽 화면
async function getListByEmployeeName(employeeName, searchSelected, searchContent) {
  let response = null;
    try {
      response = await axios.get("/label/getListRight", { params: {employeeName
                                                                , searchSelected
                                                                , searchContent
                                                        } });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  return response;
}


export default {
  getStatus,
  getTreeList,
  getListByEmployeeName,
};