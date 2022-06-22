// 출고검수/패킹 관련 통신 통신.

import axios from "axios";

async function getAfterPickingList() {
  let afterPickingList = null;
  try {
    const response = await axios.get(`/afterPicking/`);
    afterPickingList = response.data;
  } catch(error) {
    console.log(error);
  }
  return afterPickingList;
}


export default {
  getAfterPickingList
};