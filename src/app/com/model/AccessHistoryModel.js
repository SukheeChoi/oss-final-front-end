export const AccessHistoryModel = {
    fields: [
        { id: 'rowStatus', value: 'C' },
        { id: 'scrnAcesYmd', name: '화면접속일자', value: '', key: 'true' },
        { id: 'scrnId', name: '화면아이디', value: '', key: 'true' },
        { id: 'scrnAcesCnt', name: '화면접속수', value: '' },
    ]
};
export const AccessHistoryDetailModel = {
    fields: [
        { id: 'rowStatus', value: 'C' },
        { id: 'userId', name: '사용자아이디', value: '' },
        { id: 'loginId', name: '로그인아이디', value: '' },
        { id: 'userNm', name: '사용자이름', value: '' },
        { id: 'scrnAcesIpAddr', name: '화면접속IP주소', value: '' },
        { id: 'scrnAcesDt', name: '화면접속일시', value: '' },
        { id: 'scrnId', name: '화면아이디', value: '' },
        { id: 'scrnAcesYmd', name: '화면접속일자', value: '' },
    ]
};
