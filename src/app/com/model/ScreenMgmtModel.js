const ScreenMgmtModel = {
  fields: [
    { id: 'rowStatus', value: 'C' },
    { id: 'sysDvcd', name: '시스템구분', value: '' },
    { id: 'bizCd', name: '업무코드', value: '' },
    { id: 'scrnId', name: '화면아이디', value: '', vType: 'length', min: 1, max: 50 }, //key: 'true',
    { id: 'scrnNm', name: '화면명', value: '', vType: 'length', min: 1, max: 50 },
    { id: 'scrnDesc', name: '화면설명', value: '' },
    { id: 'scrnUrl', name: '화면URL', value: '' },
    { id: 'scrnTycd', name: '화면유형', value: 'MAIN' },
    { id: 'scrnRto', name: '화면비율', value: 100, vType: 'number' },
    { id: 'iconNm', name: '아이콘명', value: '' },
    { id: 'dispYn', name: '표시여부', value: 'Y' },
    { id: 'useYn', name: '사용여부', value: 'Y' },
    { id: 'dsbdYn', name: '대쉬보드구성여부', value: 'N' },
    { id: 'crudCtrlYn', name: 'CRUD제어여부', value: 'N' },
    { id: 'dataAuthCd', name: '데이터권한', value: 100 },
  ],
};

export default ScreenMgmtModel;
