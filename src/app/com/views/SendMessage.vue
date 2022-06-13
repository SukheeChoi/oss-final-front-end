<template>
  <ow-panel>
    <template #title> Send Message </template>
    <ow-flex-wrap>
      <ow-flex-item>
        <button v-if="connect === 'connect'" @click="disconnectSocket" type="button" class="ow-btn type-base color-dark size-sm">disconnect</button>
        <button v-else-if="connect === 'disconnect'" @click="connectSocket" type="button" class="ow-btn type-base color-dark size-sm">connect</button>
        <button v-else type="button" class="ow-btn type-base color-dark size-sm" disabled>connecting...</button>
        <button type="button" class="ow-btn type-base color-dark-green size-sm" @click="sendMessage">Send</button>
        <button class="ow-btn type-icon user" @click="openAddressBook"></button>
      </ow-flex-item>
    </ow-flex-wrap>
    <ow-flex-wrap>
      <ow-flex-item>
        <table class="ow-table-type-info">
          <colgroup>
            <col style="width:80px" />
            <col style="width:auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">대상자</th>
              <td>{{ checkedEmpNo }}</td>
            </tr>
            <tr>
              <th scope="row">대상부서</th>
              <td>{{ checkedEhrOrgCd }}</td>
            </tr>
            <tr>
              <th scope="row">선택그룹</th>
              <td>{{ checkedGrps }}</td>
            </tr>
            <tr>
              <th scope="row">업무구분</th>
              <td><ow-input v-model="sendList.bizCd"></ow-input></td>
            </tr>
            <tr>
              <th scope="row">제목</th>
              <td><ow-input v-model="sendList.title"></ow-input></td>
            </tr>
            <tr>
              <th scope="row">내용</th>
              <td><ow-input v-model="sendList.msg"></ow-input></td>
            </tr>
            <tr>
              <th scope="row">첨부</th>
              <td><input type="file" id="upload-file" @change="fileSelect" ref="file" accept=".xlsx, .csv"/></td>
            </tr>
          </tbody>
        </table>
      </ow-flex-item>
    </ow-flex-wrap>

    <org-addr-book ref="addrBook"/>
  </ow-panel>

</template>
<script>
import { computed, reactive, ref, toRefs } from 'vue';
import store from '@/store';
import _ from 'lodash';
import OrgAddrBook from '@@/com/views/OrgAddrBook';

const userInfo = store.getters.getUserInfo;

export default {
  name: 'SendMessage',
  components: {
    OrgAddrBook,
  },
  setup() {
    const addrBook = ref(null);
    const state = reactive({
      withUsers: true,
      checkedUsers : [],
      checkedOrgs : [],
      checkedEmpNo : computed(
        () => {
          let items = [];
          for (let i = 0; i < state.receiveList?.length; i++) {
            if (state.receiveList[i].empNo) {
              items.push(state.receiveList[i].empNo);
            }
          }
          return _.uniq(items);
        }),
      checkedEhrOrgCd : computed(
        () => {
          let items = [];
          for (let i = 0; i < state.receiveList?.length; i++) {
            if (!state.receiveList[i].empNo) {
              items.push(state.receiveList[i].ehrOrgCd);
            }
          }
          return _.uniq(items);
        }),
      checkedGrps : computed(
        () => {
          let items = [];
          for (let i = 0; i < state.receiveGroupList?.length; i++) {
            items.push(state.receiveGroupList[i].ntfGrpId);
          }
          return _.uniq(items);
        }),
      connect : computed(() => store.getters["socket/status"]),
      sendList : computed(() => {
        let list = {
          rowStatus : 'C',
          // ntfNo : Date.now().toString(),
          // refNtfNo : Date.now().toString(),
          bizCd : '',
          topic : '',
          title : '',
          msg : '',
          recvIds : state.checkedEmpNo,
          recvOrgs : state.checkedEhrOrgCd,
          recvGrpIds : state.checkedGrps,
        }
        return list;
      })
    });

    const initialized = (s) => {
      s.checkedItemsChanged.addHandler(() => {
        if (s.checkedAllItems.length > 0) {
          state.checkedOrgs = _.xor(state.checkedUsers, s.checkedAllItems);
        } else {
          state.checkedOrgs = [];
        }
        state.checkedUsers = s.checkedItems;
      });
    }

    const connectSocket = () => {
      store.dispatch('socket/connect');
    }

    const disconnectSocket = () => {
      store.dispatch('socket/disconnect');
    }

    const sendMessage = (e) => {
      if (state.connect === 'connect') {
        store.dispatch('message/send', state.sendList);
      } else {
        alert('socket disconnect');
      }
    }

    const openAddressBook = async () => {
      const modal = addrBook.value.modal;
      const { ok, control } = await modal.open(receiverAccept);
    }

    const receiverAccept = () => {
      state.receiveList = addrBook.value.receiveList;
      state.receiveGroupList = addrBook.value.receiveGroupList;
      addrBook.value.modal.onCancel();
    }

    return {
      ...toRefs(state),
      addrBook,
      initialized,
      connectSocket,
      disconnectSocket,
      sendMessage,
      openAddressBook,
    };
  },
};
</script>
<style scoped>
.ow-node-tree-body {
  height: 200px;
}

</style>
