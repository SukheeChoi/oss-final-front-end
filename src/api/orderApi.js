import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

//맨 위에 현황 List(전체: 1360건 | 오스템: 530건 | 협력사직배송: 470건 | 미출고: 2건)
async function getStatus() {
  let response = null;
  try {
    response = await axios.get('/order/orderStatus');
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

//회사 전체 List()
async function getAllList() {
  let response = null;
  try {
    response = await axios.get('/order/orderview');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

async function getFilterList(company, shippingway, unreleased, searchSelected, searchContent, pageNo, pageSize) {
  let response = null;
  let companyURI = encodeURI(company);
  let shippingwayURI = encodeURI(shippingway);
  let unreleasedURI = encodeURI(unreleased);
  if (company.length != 0 || shippingway.length != 0) {
    try {
      response = await axios.get('/order/orderFilter', {
        params: {
          company: companyURI,
          shippingway: shippingwayURI,
          unreleased: unreleasedURI,
          searchSelected,
          searchContent,
          pageNo,
          pageSize,
        },
      });
      
      response.data.data.map((i) => {
        //오스템 제품 & 오스템 상품 (협력사 => 하이픈 처리)
        if (i.itemOSS) {
          i.orderCheckDate = '-';
          i.releaseQuantity = '-';
          i.releaseScheduleDate = '-';
          i.recieveDate = '-';
        }

        //협력사 상품 합배송 & 직배송 (피킹 => 하이픈 처리)
        if (!i.itemOSS) {
          i.pickingDate = '-';
          i.pickingEmployee = '-';
          i.pickingQuantity = '-';
          i.pickingUnrelease = '-';
        }

        //협력사 상품 직배송 (출고검수/패킹, 출고, 인계 => 하이픈 처리)
        if (!i.itemOSS && i.orderShippingWay === '직배송') {
          i.packingInspectionEmployee = '-';
          i.inspectionDate = '-';
          i.releaseEmployee = '-';
          i.releaseDate = '-';
          i.transferEmployee = '-';
          i.transferDate = '-';
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return response.data;
}

export default {
  getStatus,
  getAllList,
  getFilterList,
};
