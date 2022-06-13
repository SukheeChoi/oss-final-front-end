const ProgramMgmtModel = {
    fields: [
        { id: "rowStatus", value: "C" },
        { id: "menuNm", name: "메뉴명", value: "" },
        { id: "menuId", name: "메뉴아이디", key: "true", value: "" },
        { id: "scrnId", name: "메뉴아이디", key: "true", value: "" },
        { id: "dispOrd", name: "순서", value: 1 },
        { id: "dispYn", name: "표시여부", value: "" },
        { id: "dtyCd", name: "직책", value: 0 },
        { id: "dtyScopeCd", name: "직책범위", value: 0 },
        { id: "useYn", name: "사용여부", value: "" },
    ],
};

export default ProgramMgmtModel;
