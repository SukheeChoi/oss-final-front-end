import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';


/**
 * 주문이력 페이지 현황을 반환함
 * 
 * @author 이동현
 * @return {Object} 전체 / 오스템 / 협력사합배송 / 협력사직배송 / 미출고 내역을 JSON형태로 반환함
 */
async function getStatus() {
  let response = null;
  try {
    response = await axios.get('/order/status');
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

/**
 * 주문확인 목록 반환함
 * 
 * @author 이동현
 * @param {Array.<string>} company 회사별
 * @param {Array.<string>} shippingway 배송구분별
 * @param {Array.<string>} unreleased 미출고별
 * @param {string} searchSelected 검색 조건
 * @param {string} searchContent 검색 내용
 * @param {number} pageNo 페이지 번호
 * @param {number} pageSize 한 페이지의 행 수
 * @return {Object} 주문확인 목록을 JSON 형태로 반환
 */
async function getFilterList(company, shippingway, unreleased, searchSelected, searchContent, pageNo, pageSize) {
  console.log(company, shippingway, unreleased, searchSelected, searchContent, pageNo, pageSize);
  let response = null;
  let companyURI = encodeURI(company);
  let shippingwayURI = encodeURI(shippingway);
  let unreleasedURI = encodeURI(unreleased);
  if (company.length != 0 || shippingway.length != 0) {
    try {
      response = await axios.get('/order/orderList', {
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
  console.log(response.data);
  console.log(typeof response.data);
  return response.data;
}

export default {
  getStatus,
  getFilterList,
};
