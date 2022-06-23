import axios from 'axios';

async function getClientInfo() {
  let clientName = [];
  try {
    const response = await axios.get(`/client/`);
    clientName = response.data.list;
    console.log('clientName[0]["clientName"] : ' + clientName[0]['clientName']);
    console.log('clientName : ' + clientName);
  } catch (error) {
    console.log(error);
  }
  return clientName;
}

export default {
  getClientInfo,
};