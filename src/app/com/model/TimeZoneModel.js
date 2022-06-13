export const TimeZoneModel = {
  fields: [
    { id: "rowStatus", value: "C" },
    { id: "tmznId", name: "시간대아이디", value: "", key: "true", vType: "length", min: 1, max: 50 },
    { id: "tmznNm", name: "시간대이름", value: "", vType: "maxLength", max: 10 },
    { id: "stdTmznOffsetId", name: "표준시간대오프셋", value: "", vType: "length", min: 1, max: 50 },
    { id: "useYn", name: "사용여부", value: "Y" },
  ],
};

export default TimeZoneModel;
