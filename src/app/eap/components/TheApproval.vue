<template>
    <ow-panel>
        <template #title> 결재함 </template>
        <template #side>
            <button class="ow-btn type-icon add">
                <span class="sr-only">new tab</span>
            </button>
            <button class="ow-btn type-icon modify">
                <span class="sr-only">modal</span>
            </button>
        </template>
        <ow-flex-wrap class="small-size mb-7" style="justify-content: flex-end">
            <ow-flex-item fix>
                <ow-radio :items="items" v-model="checkedValue" transparent />
            </ow-flex-item>
            <ow-flex-item fix>
                <ow-input-date v-model="selectedInputDate1" readonly />
                <ow-input-date v-model="selectedInputDate2" readonly />
            </ow-flex-item>
        </ow-flex-wrap>
        <ul class="summary-list pt-5 pb-5 mb-5">
            <li v-for="(tab, index) in docuTabs" :key="`${tab}-${index}`" @click="selectGrid(tab)" class="ow-btn">
                <span class="head">{{ tab }}</span>
                <span class="head point">{{ dataLength(tab) }}</span>
                <span class="head">건</span>
            </li>
        </ul>
        <div class="tab-content">
            <approval-grid :transportData="transportData" ref="animateEvent" />
        </div>
    </ow-panel>
</template>
<script>
import { ref, reactive, toRefs } from 'vue';
import OwPanel from '@/components/common/OwPanel';
import ApprovalGrid from '@@/eap/components/approval/ApprovalGrid';

export default {
    name: 'AppApproval',
    components: {
        OwPanel,
        ApprovalGrid,
    },
    setup() {
        const state = reactive({
            docuTabs: ['대기', '진행', '완료', '반려'],
            items: [
                { name: '1주', value: '1주' },
                { name: '1개월', value: '1개월' },
            ],
            checkedValue: '1주',
            selectedInputDate1: '2022-03-16',
            selectedInputDate2: '2022-03-17',
            animateEvent: null,
        });

        const data1 = ref([
            { id: 0, title: '(OW공통개발팀)정보시스템 지원 요청', total: 4, complete: 1 },
            { id: 1, title: '', total: '', complete: '' },
            { id: 2, title: '', total: '', complete: '' },
            { id: 3, title: '', total: '', complete: '' },
        ]);

        const data2 = ref([
            { id: 0, title: '(OW공통개발팀)정보시스템 지원 요청', total: 7, complete: 6 },
            { id: 1, title: '(OW공통개발팀)노트북, 모니터 구매 신청', total: 3, complete: 2 },
            { id: 2, title: '(OW공통개발팀)신규입사자 방화벽 접속 허용 요청', total: 8, complete: 5 },
            { id: 3, title: '(OW공통개발팀)IP Phone 신규 사용 요청', total: 2, complete: 2 },
        ]);

        const data3 = ref([
            { id: 0, title: '(OW공통개발팀)정보시스템 지원 요청', total: 4, complete: 2 },
            { id: 1, title: '(OW공통개발팀)노트북, 모니터 구매 신청', total: 5, complete: 4 },
            { id: 2, title: '(OW공통개발팀)신규입사자 방화벽 접속 허용 요청', total: 3, complete: 2 },
            { id: 3, title: '(OW공통개발팀)IP Phone 신규 사용 요청', total: 2, complete: 1 },
            { id: 4, title: '', total: null, complete: '' },
        ]);

        const data4 = ref([
            { id: 0, title: '(OW공통개발팀)정보시스템 지원 요청', total: 6, complete: 2 },
            { id: 1, title: '(OW공통개발팀)노트북, 모니터 구매 신청', total: 3, complete: 1 },
            { id: 2, title: '', total: '', complete: '' },
            { id: 3, title: '', total: '', complete: '' },
            { id: 4, title: '', total: '', complete: '' },
            { id: 5, title: '', total: '', complete: '' },
        ]);

        const dataLength = (arr) => {
            return arr == '대기'
                ? data1.value.length
                : arr == '진행'
                ? data2.value.length
                : arr == '완료'
                ? data3.value.length
                : arr == '반려'
                ? data4.value.length
                : '';
        };

        const transportData = ref(data1.value);

        const selectGrid = (tab) => {
            tab == '대기'
                ? (transportData.value = data1.value)
                : tab == '진행'
                ? (transportData.value = data2.value)
                : tab == '완료'
                ? (transportData.value = data3.value)
                : tab == '반려'
                ? (transportData.value = data4.value)
                : '';

            animate(tab);
        };

        const animate = (tab) => {
            state.animateEvent.animate();
        };

        return {
            ...toRefs(state),
            data1,
            data2,
            data3,
            data4,
            dataLength,
            transportData,
            selectGrid,
        };
    },
};
</script>

<style lang="scss" scoped>
.tab-content {
    height: 100%;
}
:deep(.small-size) {
    * {
        font-size: 11px;
    }
    .ow-input {
        width: 72px;
        height: auto;
    }
}
:deep(.wj-control) {
    .wj-input-group .wj-input-group-btn {
        display: none;
    }
}
:deep(.progress-cell) {
    border-right: 0;
    div:not(.progress) {
        width: 100%;
    }
    > div {
        display: flex;
        align-items: center;
        height: 100%;
    }
}
</style>
