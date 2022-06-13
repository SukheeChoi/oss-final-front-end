<template>
  <ow-modal title="수신자 선택" type="XL" ref="modal">
    <ow-tab :items="tabs" v-model="currentTab" popup/>
    <ow-flex-wrap>
      <template v-if="currentTab === 0">
        <ow-flex-item :gap="6">
          <ow-flex-wrap col style="display: block">
            <ow-flex-item style="height:400px;">
              <ow-org-tree-view :with-users="false" :show-checkboxes="false" :item-clicked="clickedOrg" :initialized="initialized"/>
            </ow-flex-item>
          </ow-flex-wrap>
          <ow-flex-wrap col>
            <div class="ow-grid-wrap">
              <wj-flex-grid
                class="ow-grid"
                :initialized="initUser"
                :items-source="userList"
                :is-read-only="true"
              >
                <wj-flex-grid-column header="부서/이름" binding="userNm" width="*">
                  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <template v-if="cell.item.userNm">
                      {{ cell.item.userNm }} {{ cell.item.jbgrNm }}
                    </template>
                    <template v-else>
                      {{ cell.item.orgNm }}
                    </template>
                  </wj-flex-grid-cell-template>
                </wj-flex-grid-column>
              </wj-flex-grid>
            </div>
          </ow-flex-wrap>
          <ow-flex-wrap col style="width:auto">
            <ow-flex-item align="flex-end" justify="center">
              <button class="ow-btn type-add" @click="addOrg">부서 추가</button>
            </ow-flex-item>
            <ow-flex-item align="flex-start" justify="center">
              <button class="ow-btn type-add" @click="addUser">사용자 추가</button>
            </ow-flex-item>
          </ow-flex-wrap>
          <ow-flex-wrap col>
            <div class="ow-grid-wrap">
              <wj-flex-grid
                class="ow-grid"
                :initialized="initRecv"
                :items-source="receiveList"
                :is-read-only="true"
                headersVisibility="Column"
              >
                <wj-flex-grid-column header="부서/이름" binding="userNm" width="*">
                  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <template v-if="cell.item.userNm">
                      {{ cell.item.userNm }} {{ cell.item.jbgrNm }}
                    </template>
                    <template v-else>
                      {{ cell.item.orgNm }}
                    </template>
                  </wj-flex-grid-cell-template>
                </wj-flex-grid-column>
                <wj-flex-grid-column :width="40">
                  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <button class="ow-btn type-icon delete" @click="remove(cell)"></button>
                  </wj-flex-grid-cell-template>
                </wj-flex-grid-column>
              </wj-flex-grid>
            </div>
          </ow-flex-wrap>
        </ow-flex-item>
      </template>
      <template v-else>
        <ow-flex-item :gap="6">
          <ow-flex-wrap col style="display:block;">
            <div class="ow-node-tree-wrap">
              <div class="ow-node-tree-head">
                <h3>그룹 선택</h3>
                <ow-flex-wrap justify="flex-end">
                  <button class="ow-btn type-icon add" @click="openAddGroupModal"></button>
                </ow-flex-wrap>
              </div>
              <div class="ow-node-tree-body">
                <ow-tree-view
                  :initialized="initGroup"
                  :items-source="groupList"
                  :item-clicked="clickedGroup"
                  :display-member-path="['ntfGrpNm']"
                  :show-checkboxes="true"
                  child-items-path="children"
                ></ow-tree-view>
              </div>
            </div>
          </ow-flex-wrap>
          <ow-flex-wrap col>
            <ow-flex-item style="height:400px;">
              <ow-org-tree-view :with-users="true" :show-checkboxes="true" style="height:400px;" :initialized="initOrgTreeView"/>
            </ow-flex-item>
          </ow-flex-wrap>
          <ow-flex-wrap col style="width:auto">
            <ow-flex-item align="center" justify="center">
              <button class="ow-btn type-add" @click="addGroupUser">추가</button>
            </ow-flex-item>
          </ow-flex-wrap>
          <ow-flex-wrap col>
            <div class="ow-grid-wrap">
              <wj-flex-grid
                class="ow-grid"
                :initialized="initGroupRecv"
                :items-source="groupRecvList"
                :is-read-only="true"
                headersVisibility="Column"
              >
                <wj-flex-grid-column header="부서/이름" binding="name" width="*">
                </wj-flex-grid-column>
                <wj-flex-grid-column :width="40">
                  <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
                    <button class="ow-btn type-icon delete" @click="remove(cell)"></button>
                  </wj-flex-grid-cell-template>
                </wj-flex-grid-column>
              </wj-flex-grid>
            </div>
          </ow-flex-wrap>
        </ow-flex-item>
      </template>
    </ow-flex-wrap>
  </ow-modal>

  <ow-modal type="XS" ref="addGroupModal" title="그룹 추가">
    <div class="wj-labeled-input" >
      <ow-input v-model="addGroupItem.ntfGrpId"></ow-input>
      <label for="ntfGrpId">알림그룹ID</label>
    </div>
    <div class="wj-labeled-input" >
      <ow-input v-model="addGroupItem.ntfGrpNm"></ow-input>
      <label for="ntfGrpNm">알림그룹명</label>
    </div>
    <div class="wj-labeled-input" >
      <ow-input v-model="addGroupItem.ntfGrpDesc"></ow-input>
      <label for="ntfGrpDesc">설명</label>
    </div>
    <div class="wj-labeled-input" >
      <ow-input v-model="addGroupItem.useYn"></ow-input>
      <label for="useYn">사용여부</label>
    </div>
    <template #action>
      <button type="button" class="ow-btn type-base color-gray size-sm" @click="closeGroupModal">취소</button>
      <button type="button" class="ow-btn type-base color-dark size-sm" @click="saveGroup">저장</button>
    </template>
  </ow-modal>
</template>

<script>
import { reactive, toRefs, watch, ref, computed } from 'vue';
import { Selector } from '@grapecity/wijmo.grid.selector';
import _ from 'lodash';
import http from '@/api';
import OwTreeView from '@/components/tree/OwTreeView';

const ORG_URI = '/com/OrgMgr';
const NOTI_URI = '/com/NotificationTargetMgr';

export default {
  name: 'OwOrgAddrBook',
  components: {
    OwTreeView
  },
  props: {
    items: [Object, Array],
  },
  setup(props) {
    const modal = ref(null),
          addGroupModal = ref(null);

    const state = reactive({
      recvGrid: null,
      groupRecvGrid: null,
      currentTab: 0,
      currentOrgItem: {ehrOrgCd:'', downOrgYn:'Y', orgNm:''},
      currentUserItem: null,
      tabs : ['조직도', '그룹'],
      userList : [],
      receiveList : [],
      receiveGroupList : computed(() => {
        return state.groupView?.checkedAllItems;
      }),
      selectedItems: [],
      selector: null,
      groupList : [],
      groupRecvList : [],
      popup: null,
      addGroupItem: {ntfGrpId:'', ntfGrpNm: '', ntfGrpDesc: '', useYn: ''},
      groupView: null,
      groupOrgTreeView: null,
      selectedGroupItem: null,
    });

    const initialized = (s) => {
    }

    const initUser = (grid) => {
      state.selector = new Selector(grid, {
        itemChecked: () => {
          state.selectedItems = grid.rows.filter(r => r.isSelected);
        }
      });
    }

    const initGroup = (grid) => {
      state.groupView = grid;
      getGroup();
    }

    const getGroup = async() => {
      const GET_GROUP_LIST = '/getList';
      const res = await http.get(NOTI_URI + GET_GROUP_LIST);
      
      if (res.data.code === "OK") {
        state.groupList = res.data.data;
      }
    }

    const initGroupRecv = (grid) => {
      state.groupRecvGrid = grid;
    }

    const initRecv = (grid) => {
      state.recvGrid = grid;
    }

    const initOrgTreeView = (grid) => {
      state.groupOrgTreeView = grid;
    }

    const clickedOrg = ({ selectedItem: item }) => {
      state.currentOrgItem.ehrOrgCd = item.ehrOrgCd ? item.ehrOrgCd : '';
      state.currentOrgItem.orgNm = item.orgNm ? item.orgNm : '';

      getUserList(item.ehrOrgCd);
    }

    const getUserList = async(ehrOrgCd) => {
      if (!ehrOrgCd) {
        return;
      }
      const GET_USER_LIST = '/getUserList';
      const res = await http.get(ORG_URI + GET_USER_LIST, {
        params: {
          ehrOrgCd,
        },
      });
      
      if (res.data.code === "OK") {
        state.userList = res.data.data;
      }
    }

    const clickedGroup = ({ selectedItem: item }) => {
      state.selectedGroupItem = item;
      getGroupList(item.ntfGrpId);
    }

    const getGroupList = async(ntfGrpId) => {
      if (!ntfGrpId) {
        return;
      }
      const GET_TARGET_LIST = '/getDetailList';
      const res = await http.get(NOTI_URI + GET_TARGET_LIST, {
        params: {
          ntfGrpId,
        },
      });
      
      if (res.data.code === "OK") {
        state.groupRecvList = res.data.data;
      }
    }

    const addOrg = () => {
      const isAdded = state.receiveList.find(item => item.ehrOrgCd === state.currentOrgItem.ehrOrgCd);
      if (!isAdded) {
        let addItem = Object.assign({}, state.currentOrgItem);
        state.recvGrid.collectionView.addNew(addItem);
      }
    }

    const addUser = () => {
      state.selectedItems.forEach((item) => {
        const isAdded = state.receiveList.find(recvItem => recvItem.empNo === item.dataItem.empNo);
        if (!isAdded) {
          state.recvGrid.collectionView.addNew(item.dataItem);
        }
      })
    }

    const addGroupUser = () => {
      const items = state.groupOrgTreeView.checkedAllItems,
            collector = state.groupRecvGrid.collectionView;
      if (items.length <= 0) {
        return;
      }

      items.forEach((item) => {
        const findItem = (recvItem) => {
          if (recvItem.recvTycd === 'EMP') {
            return recvItem.recvId === item.empNo;
          } else if (recvItem.recvTycd === 'ORG') {
            return recvItem.recvId === item.ehrOrgCd;
          }
        }
        const isAdded = state.groupRecvList.find(findItem);

        if (!isAdded) {
          let addItem = { rowStatus: 'C'
                        , ntfGrpId : state.selectedGroupItem.ntfGrpId
                        , recvId : item.empNo ? item.empNo : item.ehrOrgCd
                        , recvTycd : item.empNo ? 'EMP' : 'ORG'
                        , name : item.empNo ? item.userNm : item.orgNm
                        };
          collector.addNew(addItem);
        }
      })

      if (collector.sourceCollection.length > 0) {
        saveGroupUser();
      }
    }

    const saveGroupUser = async() => {
      const GET_TARGET_LIST = '/saveDetail',
            addItem = state.groupRecvGrid.collectionView.sourceCollection;
      const res = await http.post(NOTI_URI + GET_TARGET_LIST, [...addItem]);
      
      if (res.data.code === "OK") {
        await getGroupList(state.selectedGroupItem.ntfGrpId);
      }
    }

    const remove = (c) => {
      c.col.grid.collectionView.remove(c.item);
    }

    const saveGroup = async() => {
      if (!state.addGroupItem.ntfGrpId) {
        return;
      }

      state.addGroupItem.rowStatus = 'C';

      const GET_TARGET_LIST = '/save';
      const res = await http.post(NOTI_URI + GET_TARGET_LIST, [state.addGroupItem]);
      
      if (res.data.code === "OK") {
        await addGroupModal.value.onCancel();
        await getGroup();
      }
    }

    const openAddGroupModal = async () => {
      const modal = addGroupModal.value;
      const { ok, control } = await modal.open();
    }

    const closeGroupModal = () => {
      const modal = addGroupModal.value;
      modal.onCancel();
    }

    return {
      modal,
      addGroupModal,
      ...toRefs(state),
      initialized,
      getUserList,
      initUser,
      initRecv,
      initGroup,
      initGroupRecv,
      initOrgTreeView,
      addOrg,
      addUser,
      clickedOrg,
      clickedGroup,
      addGroupUser,
      remove,
      saveGroup,
      openAddGroupModal,
      closeGroupModal,
    };
  },
};
</script>
<style lang="scss" scoped>
// ow-node-tree
.ow-node-tree-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #d7dce3;
  overflow: auto;
  .ow-node-tree-head {
    border-top: 0;
    border-right: 0;
    border-left: 0;
  }
  .ow-node-tree-body {
    padding: 6px;
    flex: 1;
    overflow: auto;
  }
}
.ow-node-tree-head {
  padding: 0 6px;
  height: 34px;
  border: 1px solid #d7dce3;
  background-color: #f1f5f9;
  display: flex;
  justify-content: normal;
  align-items: center;
  h3 {
    flex-shrink: 0;
    font-size: 12px;
    line-height: 100%;
    + :deep(.ow-combobox) {
      margin-left: 5px;
    }
  }
}
</style>