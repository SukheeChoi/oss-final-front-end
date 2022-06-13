const DeptBizGroupModel = {
    fields: [
        { id: "rowStatus", value: "C" },
        { id: "sysDvcd", name: "시스템구분", value: "" },
        { id: "bizCd", name: "업무코드", value: "" },
        { id: "ehrOrgCd", name: "조직코드", value: "" },
        { id: "orgNm", name: "부서명", value: "" },
        { id: "bizGrpId", name: "업무그룹ID", value: "", vType: "length", min: 1, max: 30 },
        { id: "bizGrpNm", name: "업무그룹명", value: "" },
        { id: "upOrgYn", name: "상위부서포함", value: "Y" },
        { id: "useYn", name: "사용여부", value: "Y" },
    ],
};

export default DeptBizGroupModel;
