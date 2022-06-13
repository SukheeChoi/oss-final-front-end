export const MessageModel = {
  fields: [
    { id: 'rowStatus', value: 'C' },
    { id: 'msgKeyId', name: '메시지키', value: '', vType: 'length', min: 1, max: 100 },
    { id: 'langCd', name: '언어코드', value: '', vType: 'length', min: 1, max: 10 },
    { id: 'msgTycd', name: '메시지유형', value: '', vType: 'length', min: 1, max: 10 },
    { id: 'msgDesc', name: '메시지설명', value: '', vType: 'length', min: 1, max: 500 },
    { id: 'useYn', name: '사용여부', value: 'Y', vType: 'presence' },
  ],
};

export default MessageModel;
