export const TemplateModel = {
  fields: [
    { id: 'rowStatus', value: 'C' },
    { id: 'msgGrpId', name: '그룹ID', value: '', key: 'true', vType: 'length', min: 1, max: 50 },
    { id: 'msgGrpNm', name: '그룹명', value: '', vType: 'length', min: 1, max: 255 },
    { id: 'msgGrpTycd', name: '그룹유형', value: '', vType: 'presence' },
    { id: 'tplCn', name: '템플릿 내용', value: '' },
    { id: 'tplTycd', name: '템플릿 내용 포맷 유형', value: '' },
    { id: 'useYn', name: '사용여부', value: 'Y', vType: 'presence' },
    { id: 'msgTycd', name: '템플릿 유형', value: '' },
    { id: 'msgNm', name: '템플릿 명', value: '' },
    { id: 'bascYn', name: '기본여부', value: 'Y', vType: 'presence' },
  ],
};

export default TemplateModel;
