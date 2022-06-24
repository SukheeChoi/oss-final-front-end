import axios from 'axios';

//주문을 한 거래처의 이름과 주문 상태 가져오기
async function getClientInfo() {
  let receiptList = [];
  try {
    const response = await axios.get(`/client/`);
    receiptList = response.data.list;
    console.log('receiptList[0]["clientName"] : ' + receiptList[0]['clientName']);
    console.log('receiptList[0]["order"]["status"] : ' + receiptList[0]['order']['status']);
  } catch (error) {
    console.log(error);
  }
  return receiptList;
}

//주문 상태 별 건수 가져오기
async function getStatusCnt() {
  let status = [];
  try {
    const response = await axios.get(`/client/sts`);
    status = response.data.statusCnt;
    console.log('status : ' + status);
  } catch (error) {
    console.log(error);
  }
  return status;
}

export default {
  getClientInfo,
  getStatusCnt
};
