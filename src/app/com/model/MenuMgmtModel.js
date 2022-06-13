const MenuMgmtModel = {
  fields: [
    { id: 'rowStatus', value: 'C' },
    { id: 'sysDvcd', name: '시스템구분', key: 'true', value: '' },
    { id: 'bizCd', name: '업무코드', key: 'true', value: '' },
    { id: 'menuNm', name: '메뉴명', value: '' },
    { id: 'menuId', name: '메뉴아이디', value: '' }, //, key: 'true'
    { id: 'dispOrd', name: '순서', value: '' },
    { id: 'dispYn', name: '표시여부', value: '' },
    { id: 'menuLvlNo', name: '레벨번호', value: '' },
    { id: 'useYn', name: '사용여부', value: '' },
    { id: 'menuTycd', name: '유형코드', value: '' },
  ],
};

export default MenuMgmtModel;
