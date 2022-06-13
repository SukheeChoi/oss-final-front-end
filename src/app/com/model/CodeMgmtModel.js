export const CodeMgmtModel = {
  fields: [
    { id: 'rowStatus', value: 'C' },
    { id: 'cmmGrpCd', name: '공통코드그룹아이디', value: '', key: 'true', vType: 'length', min: 1, max: 20 },
    { id: 'cmmGrpCdNm', name: '공통코드그룹명', value: '', vType: 'length', min: 1, max: 100 },
    { id: 'cmmGrpCdDesc', name: '공통코드그룹설명', value: '' },
    { id: 'cdKndDvcd', name: '코드종류구분코드', value: '' },
    { id: 'eachCdTblId', name: '개별코드테이블ID', value: '' },
    { id: 'connSysCd', name: '연계시스템코드', value: '' },
    { id: 'aplBizCd', name: '신청업무코드', value: '' },
    { id: 'useYn', name: '사용여부', value: 'Y', vType: 'presence' },
    { id: 'upCmmGrpCd', name: '상위공통그룹코드', value: '' },
  ],
};
export const CodeMgmtDetailModel = {
  fields: [
    { id: 'rowStatus', value: 'C' },
    { id: 'cmmGrpCd', name: '공통코드그룹아이디', value: '', key: 'true' },
    { id: 'cmmCd', name: '공통코드', value: '', key: 'true', vType: 'length', min: 1, max: 20 },
    { id: 'cmmCdNm', name: '공통코드명', value: '', vType: 'length', min: 1, max: 100 },
    { id: 'sortOrd', name: '정렬순서', value: '1', vType: 'number' },
    { id: 'useYn', name: '사용여부', value: 'Y', vType: 'presence' },
  ],
};
