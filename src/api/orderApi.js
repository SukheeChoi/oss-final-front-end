import axios from "axios";

//맨 위에 현황 List(전체: 1360건 | 오스템: 530건 | 협력사직배송: 470건 | 미출고: 2건)
async function getTotal() {
  let response = null;
  try {
    response = await axios.get("/order/orderview");
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

//회사 전체 List()
async function getAllList() {
  let response = null;
  try {
    response = await axios.get("/order/orderview");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

export default {
  getTotal,
  getAllList,
};