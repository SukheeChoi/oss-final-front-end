import axios from 'axios';

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

async function getStatusCnt() {
  let status = [];
  try {
    const response = await axios.get(`/client/`);
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
