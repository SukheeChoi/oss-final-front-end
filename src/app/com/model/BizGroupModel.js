const BizGroupModel = {
  fields: [
    { id: 'rowStatus', value: 'C' },
    { id: 'sysDvcd', name: '시스템구분', value: '', vType: 'length', min: 1, max: 8 },
    { id: 'bizCd', name: '업무코드', value: '' },
    { id: 'bizGrpId', name: '업무그룹ID', value: '', vType: 'length', min: 1, max: 32 }, //, key: 'true'
    { id: 'bizGrpNm', name: '업무그룹명', value: '' },
    { id: 'bizGrpDesc', name: '업무그룹설명', value: '' },
    { id: 'useYn', name: '사용유무', value: 'Y' },
  ],
};

export default BizGroupModel;
