export const LangCodeModel = {
  fields: [
    { id: 'rowStatus', value: 'C' },
    { id: 'langCd', name: '언어코드', key: 'true', vType: 'length', min: 1, max: 10 },
    { id: 'langNm', name: '언어명', value: '', vType: 'length', min: 1, max: 50 },
    { id: 'useYn', name: '사용여부', value: 'Y' },
  ],
};

export default LangCodeModel;
