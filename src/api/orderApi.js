import axios from "axios";
import qs from "qs";
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8"


//맨 위에 현황 List(전체: 1360건 | 오스템: 530건 | 협력사직배송: 470건 | 미출고: 2건)
async function getTotal() {
  let response = null;
  try {
    response = await axios.get("/order/orderStatus");
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

async function getFilterList(company, shippingway, unreleased, searchSelected, searchContent) {
  let response = null;
  let companyURI = encodeURI(company);
  let shippingwayURI = encodeURI(shippingway);
  let unreleasedURI = encodeURI(unreleased);
  if(company.length != 0 || shippingway.length != 0) {
    try {
      response = await axios.get("/order/orderfilter", { params: {company: companyURI
                                                                , shippingway: shippingwayURI
                                                                , unreleased: unreleasedURI
                                                                , searchSelected: searchSelected
                                                                , searchContent: searchContent
                                                        } });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return response;
}


export default {
  getTotal,
  getAllList,
  getFilterList,
};