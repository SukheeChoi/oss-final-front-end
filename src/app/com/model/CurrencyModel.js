const CurrencyModel = {
  fields: [
    { id: 'rowStatus', value: 'C' },
    { id: 'crnyCd', name: '통화코드', key: 'true', value: '', vType: 'length', min: 1, max: 10 },
    { id: 'crnyNm', name: '통화명', value: '', vType: 'length', min: 1, max: 50 },
    { id: 'crnySymCd', name: '통화기호', value: '', vType: 'length', min: 1, max: 10 },
    { id: 'crnySymLctnCd', name: '통화기호위치', value: 'P' },
    { id: 'crnyUnitAmt', name: '통화단위금액', value: 0 },
    { id: 'crnyDispPntCnt', name: '소수점 자리수', value: 0 },
    { id: 'crnyUnitSymCd', name: '통화단위기호', value: '' },
    { id: 'crnyDispPntSym', name: '소수점 기호', value: '' },
    { id: 'crnyExrtMngtYn', name: '환율관리여부', value: 'N' },
  ],
};

export default CurrencyModel;
