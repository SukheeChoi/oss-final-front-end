export const LoginHistoryModel = {
    fields: [
        { id: 'rowStatus', value: 'C' },
        { id: 'loginYmd', name: '로그인일자', value: '', key: 'true' },
        { id: 'userId', name: '사용자아이디', value: '', key: 'true' },
        { id: 'loginId', name: '로그인아이디', value: '' },
        { id: 'userNm', name: '사용자이름', value: '' },
        { id: 'loginCnt', name: '로그인수', value: '' },
    ]
};
export const LoginHistoryDetailModel = {
    fields: [
        { id: 'rowStatus', value: 'C' },
        { id: 'loginId', name: '로그인아이디', value: '' },
        { id: 'userNm', name: '사용자이름', value: '' },
        { id: 'loginIpAddr', name: '로그인아이피주소', value: '' },
        { id: 'loginDt', name: '로그인일시', value: '' },
        { id: 'loginSessId', name: '로그인세션아이디', value: '' },
        { id: 'sessEndDt', name: '세션종료일시', value: '' },
        { id: 'userTp', name: '사용자유형', value: '' },
    ]
};
