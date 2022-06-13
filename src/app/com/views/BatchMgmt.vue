<template>
  <ow-search-zone>
    <ow-input label="배치프로그램명" v-model="search.input1"></ow-input>
    <ow-select label="배치유형" :items="search.items1" v-model="search.item1"></ow-select>
    <ow-select label="사용여부" :items="search.items2" v-model="search.item2"></ow-select>
    <ow-select label="대상시스템" :items="search.items3" v-model="search.item3"></ow-select>
    <ow-radio label="대상시스템" :items="search.items4" v-model="search.item4"></ow-radio>
  </ow-search-zone>

  <ow-grid :page-no="pageNo" :page-size="pageSize" :total-count="101" @page-change="pageChange">
    <template #left>
      <h1 class="h1">배치 작업 관리</h1>
    </template>
    <template #right>
      <button class="ow-btn type-state"><span>추가</span></button>
      <button class="ow-btn type-state"><span>삭제</span></button>
    </template>
    <wj-flex-grid class="ow-grid" headersVisibility="Column" selectionMode="Row" :itemsSource="result" :initialized="init">
      <wj-flex-grid-column header="번호" :width="70">
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
          {{ cell.row.index + 1 }}
        </wj-flex-grid-cell-template>
      </wj-flex-grid-column>
      <wj-flex-grid-column header="배치작업명" binding="batch" :width="250"></wj-flex-grid-column>
      <wj-flex-grid-column header="배치유형" binding="bType" :width="250"></wj-flex-grid-column>
      <wj-flex-grid-column header="배치프로그램명" binding="pro" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column header="배치파라미터" binding="param" :width="250"></wj-flex-grid-column>
      <wj-flex-grid-column header="최종상태" binding="status" :width="100"></wj-flex-grid-column>
      <wj-flex-grid-column header="대상시스템" binding="sys" :width="100"></wj-flex-grid-column>
      <wj-flex-grid-column header="사용여부" binding="use" :width="100"></wj-flex-grid-column>
    </wj-flex-grid>
  </ow-grid>
  <ow-tab class="line-split-bottom" :items="tabs" v-model="currentTab"></ow-tab>
  <template v-if="currentTab === 0">
    <ow-grid :total-count="101" :page-size="pageSize" :page-no="pageNo">
      <template #left>
        <h2 class="h2">배치 스케줄 관리</h2>
      </template>
      <template #right>
        <button class="ow-btn type-state"><span>배치즉시실행</span></button>
        <button class="ow-btn type-state"><span>추가</span></button>
        <button class="ow-btn type-state"><span>삭제</span></button>
      </template>
      <wj-flex-grid class="ow-grid" headersVisibility="Column" selectionMode="0" :itemsSource="resultTab1">
        <wj-flex-grid-column :header="'번호'" :width="70">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            {{ cell.row.index + 1 }}
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column header="배치작업명" binding="batch" :width="250" />
        <wj-flex-grid-column :header="'배치실행주기(Cron표현식)'" :binding="'status'" width="*" />
        <wj-flex-grid-column :header="'타임존'" :binding="'tz'" :width="150" />
      </wj-flex-grid>
    </ow-grid>
  </template>
  <template v-if="currentTab === 1">
    <ow-grid :total-count="101" :page-size="pageSize" :page-no="pageNo">
      <template #left>
        <h2 class="h2">배치 결과 관리</h2>
      </template>
      <template #right>
        <button class="ow-btn type-state"><span>배치즉시실행</span></button>
        <button class="ow-btn type-state"><span>추가</span></button>
        <button class="ow-btn type-state"><span>삭제</span></button>
      </template>
      <wj-flex-grid class="ow-grid" headersVisibility="Column" selectionMode="0" :itemsSource="resultTab2">
        <wj-flex-grid-column :header="'번호'" :width="70">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            {{ cell.row.index + 1 }}
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column header="배치결과ID" binding="batchID" :width="250" />
        <wj-flex-grid-column :header="'상태'" :binding="'status'" :width="100" />
        <wj-flex-grid-column :header="'실행결과'" :binding="'result'" width="*" />
        <wj-flex-grid-column :header="'실행시작일시'" :binding="'timeStart'" :width="150" />
        <wj-flex-grid-column :header="'실행종료일시'" :binding="'timeEnd'" :width="150" />
        <wj-flex-grid-column :header="'조치내용'" :binding="'desc'" :width="250" />
        <wj-flex-grid-column :header="'조치자'" :binding="'charge'" :width="150" />
        <wj-flex-grid-column :header="'조치일시'" :binding="'date'" :width="150" />
      </wj-flex-grid>
    </ow-grid>
  </template>
  <template v-if="currentTab === 2">
    <ow-grid :total-count="101" :page-size="pageSize" :page-no="pageNo">
      <template #left>
        <h2 class="h2">배치 담당자 관리</h2>
      </template>
      <template #right>
        <button class="ow-btn type-state"><span>새로고침</span></button>
        <button class="ow-btn type-state"><span>추가</span></button>
        <button class="ow-btn type-state"><span>삭제</span></button>
      </template>
      <wj-flex-grid class="ow-grid" headersVisibility="Column" selectionMode="0" :itemsSource="resultTab3">
        <wj-flex-grid-column :header="'번호'" :width="70">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            {{ cell.row.index + 1 }}
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column :header="'이름'" :binding="'name'" :width="150" />
        <wj-flex-grid-column :header="'로그인ID'" :binding="'loginID'" width="*">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            {{ cell.item.loginID }}
            <button type="button" class="ow-btn type-flat ml-5" @click="lookup(cell.item.loginID)">선택</button>
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column :header="'휴대전화번호'" :binding="'mobile'" :width="150" />
        <wj-flex-grid-column :header="'이메일'" :binding="'emailAdd'" :width="250" />
        <wj-flex-grid-column :header="'SMS수신'" :binding="'sms'" :width="150">
          <wj-flex-grid-cell-template cellType="Cell">
            <input type="checkbox" class="k-checkbox" id="" name="" />
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column :header="'이메일수신'" :binding="'email'" :width="150">
          <wj-flex-grid-cell-template cellType="Cell">
            <input type="checkbox" class="k-checkbox" id="" name="" />
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column :header="'등록일시'" :binding="'date'" :width="150" />
      </wj-flex-grid>
    </ow-grid>
  </template>
  <ow-modal type="XXXL" title="사용자조회" ref="lookup">
    <ow-search-zone>
      <ow-flex-item :gap="2">
        <ow-select label="검색키워드"></ow-select>
        <ow-input></ow-input>
      </ow-flex-item>
    </ow-search-zone>
    <ow-grid :total-count="101" :page-size="pageSize" :page-no="pageNo">
      <wj-flex-grid class="ow-grid" headersVisibility="Column" selectionMode="0" :itemsSource="result_p1">
        <wj-flex-grid-column :header="'번호'" :width="70">
          <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            {{ cell.row.index + 1 }}
          </wj-flex-grid-cell-template>
        </wj-flex-grid-column>
        <wj-flex-grid-column header="로그인ID" binding="id"></wj-flex-grid-column>
        <wj-flex-grid-column header="사용자명" binding="user" width="*"></wj-flex-grid-column>
        <wj-flex-grid-column header="상태" binding="status"></wj-flex-grid-column>
        <wj-flex-grid-column header="휴대전화번호" binding="num"></wj-flex-grid-column>
        <wj-flex-grid-column header="이메일주소" binding="email"></wj-flex-grid-column>
        <wj-flex-grid-column header="유효시작일자" binding="start"></wj-flex-grid-column>
        <wj-flex-grid-column header="유효종료일자" binding="end"></wj-flex-grid-column>
      </wj-flex-grid>
    </ow-grid>
  </ow-modal>
</template>

<script>
import mixins from "@@/com/mixins";

import OwSearchZone from "@@/com/components/input/OwSearchZone";

import { reactive, toRefs } from "@vue/reactivity";

import { ValidatorManager } from "@/utils/wijmo.grid";

export default {
  name: "TheBatchMgmt",
  components: {
    OwSearchZone,
  },
  data() {
    return {
      qwer: false,
      currentTab: 0,
      tabs: ["배치스케줄", "배치결과", "담당자"],
      search: {
        input1: "",
        items1: [
          { name: "Quartz", value: "1" },
          { name: "Shell", value: "2" },
        ],
        item1: "1",
        items2: [
          { name: "사용", value: "1" },
          { name: "미사용", value: "2" },
        ],
        item2: "1",
        items3: [
          { name: "시스템1", value: "1" },
          { name: "시스템2", value: "2" },
        ],
        item3: "1",
        items4: [
          { name: "전체", value: "" },
          { name: "시스템1", value: "1" },
          { name: "시스템2", value: "2" },
        ],
        item4: "1",
      },
      result: [
        {
          batch: "SAP ITEM Master 수집",
          bTpye: "QuartzJob",
          pro: "com.osstem.ows.bm. job.sap.GetItemMasterBeanJob",
          param: "sDate:20200108,eDate:20201231",
          status: "성공",
          sys: "SAP",
          use: "사용",
        },
        {
          batch: "ECRM 영업활동 발송안내",
          bTpye: "Quartzlob",
          pro: "com.osstem.ows.bm. job.ecrm.SendSmsBeanJob",
          param: "sDate 20200113,eDate:20201231",
          status: "성공",
          sys: "ECRM",
          use: "사용",
        },
        {
          batch: "SAP ITEM Master 수집",
          bTpye: "Quartzlob",
          pro: "com.osstem.ows.bm",
          param: "sDate 2021-09-13",
          status: "성공",
          sys: "SAP",
          use: "사용",
        },
        {
          batch: "SAP ITEM Master 수집",
          bTpye: "Quartzlob",
          pro: "com.osstem.ows.bm",
          param: "sDate 2021-09-13",
          status: "성공",
          sys: "SAP",
          use: "사용",
        },
        {
          batch: "SAP ITEM Master 수집",
          bTpye: "Quartzlob",
          pro: "com.osstem.ows.bm",
          param: "sDate 2021-09-13",
          status: "성공",
          sys: "SAP",
          use: "사용",
        },
        {
          batch: "SAP ITEM Master 수집",
          bTpye: "Quartzlob",
          pro: "com.osstem.ows.bm",
          param: "sDate 2021-09-13",
          status: "성공",
          sys: "SAP",
          use: "사용",
        },
      ],
      result_p1: [
        {
          id: "정희원",
          user: "jhwlove",
          status: "활성",
          num: "010-9872-0282",
          email: "heewon@gmail.com",
          start: "2021-09-12 12:00",
          end: "2021-09-12 12:00",
        },
        {
          id: "이미소",
          user: "smaillee",
          status: "비활성",
          num: "010-2232-0833",
          email: "smilelee@nate.com",
          start: "2021-09-12 12:00",
          end: "2021-09-12 12:00",
        },
        {
          id: "",
          user: "",
          status: "",
          num: "",
          email: "",
          start: "",
          end: "",
        },
        {
          id: "",
          user: "",
          status: "",
          num: "",
          email: "",
          start: "",
          end: "",
        },
        {
          id: "",
          user: "",
          status: "",
          num: "",
          email: "",
          start: "",
          end: "",
        },
        {
          id: "",
          user: "",
          status: "",
          num: "",
          email: "",
          start: "",
          end: "",
        },
        {
          id: "",
          user: "",
          status: "",
          num: "",
          email: "",
          start: "",
          end: "",
        },
      ],
      resultTab1: [
        {
          batch: "SAP ITEM Master 수업",
          status: "0 00 01**?",
          tz: "대한민국/서울",
        },
      ],
      resultTab2: [
        {
          batchID: "BTR202007000171",
          status: "실행",
          result: "총 100건 중 100건 수행",
          timeStart: "2020-01-01 01:00:00",
          timeEnd: "2020-01-01 01:10:00",
          desc: "",
          charge: "",
          date: "",
        },
        {
          batchID: "BTR202007000172",
          status: "성공",
          result: "총 100건 중 100건 수행",
          timeStart: "2020-01-01 03:30:01",
          timeEnd: "2020-01-01 04:00:13",
          desc: "",
          charge: "",
          date: "",
        },
        {
          batchID: "BTR202007000173",
          status: "성공",
          result: "총 100건 중 100건 수행",
          timeStart: "2020-01-01 01:30:00",
          timeEnd: "2020-01-01 01:35:59",
          desc: "",
          charge: "",
          date: "",
        },
        {
          batchID: "BTR202007000174",
          status: "성공",
          result: "총 100건 중 100건 수행",
          timeStart: "2020-01-01 01:30:13",
          timeEnd: "2020-01-01 02:14:55",
          desc: "",
          charge: "",
          date: "",
        },
        {
          batchID: "BTR202007000175",
          status: "실패",
          result: "오류발생",
          timeStart: "2020-01-01 01:30:13",
          timeEnd: "2020-01-01 01:40:22",
          desc: "프로그램 수정 및 재실행",
          charge: "정재원",
          date: "2020-01-02 04:35:27",
        },
        {
          batchID: "BTR202007000176",
          status: "성공",
          result: "총 100건 중 100건 수행",
          timeStart: "2020-01-01 01:30:13",
          timeEnd: "2020-01-01 01:35:05",
          desc: "",
          charge: "",
          date: "",
        },
        {
          batchID: "BTR202007000177",
          status: "성공",
          result: "총 100건 중 100건 수행",
          timeStart: "2020-01-01 01:30:13",
          timeEnd: "2020-01-01 01:48:42",
          desc: "",
          charge: "",
          date: "",
        },
        {
          batchID: "BTR202007000178",
          status: "성공",
          result: "총 100건 중 100건 수행",
          timeStart: "2020-01-01 01:30:13",
          timeEnd: "2020-01-01 02:08:01",
          desc: "",
          charge: "",
          date: "",
        },
      ],
      resultTab3: [
        {
          name: "정현희",
          loginID: "24020306",
          mobile: "010-5218-8445",
          emailAdd: "jhh85@osstem.com",
          sms: "",
          email: "",
          date: "2020-09-01 11:20:21",
        },
        {
          name: "이미소",
          loginID: "25062808",
          mobile: "010-9893-0002",
          emailAdd: "lms@osstem.com",
          sms: "",
          email: "",
          date: "2020-01-01 13:55:08",
        },
        {
          name: "정재원",
          loginID: "25062810",
          mobile: "010-5842-4287",
          emailAdd: "jjwon@osstem.com",
          sms: "",
          email: "",
          date: "2020-01-01 07:23:49",
        },
      ],
    };
  },
  computed: {
    pageNo() {
      console.log("pageNo refresh");
      return +this.$route.query.pageNo || 1;
    },
    pageSize() {
      console.log("pageSize refresh");
      return +this.$route.query.pageSize || 10;
    },
  },
  methods: {
    initialized(f) {
      console.log("init2", f);
    },

    init(flex) {
      this.flex = flex;
      console.log("this.flex", this.flex);
      this.flex.validator = new ValidatorManager(this.flex, {
        bType: (value) => {
          console.log("value", value);
          let ok = true;
          if (value.length > 2) {
            ok = false;
          }
          return {
            ok,
            message: "너무 깁니다.",
          };
        },
      });
    },
    pageChange(pageSize, pageNo) {
      console.log("pageChange", pageSize, pageNo);
    },
    lookup_validator() {},
    async lookup(loginId) {
      console.log("loginId", loginId);
      const { ok, control } = await this.$refs.lookup.open(this.lookup_validator);
      if (ok) {
        console.log("okok");
      }
      control.hide();
    },
  },
  mounted() {
    console.log("instance", (window.instance = this));
    console.log("this.getValues", this.getValues);
  },
};
</script>
<style lang="scss" scoped></style>
