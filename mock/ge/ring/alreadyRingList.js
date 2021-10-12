/**
 * 查询企业部门已经设置的铃音列表 @url /evrms/zhengqi/ring/queryRingsByDept
 */
module.exports = ()=>{
    return {
        code: '0000',
        message: "",
        "data|2": [{
            "departmentId": "@natural(2, 60)",
            "departmentName": "业务管理部",
            "memberCount": "20",
            "departmentType": "1",
            "onlyWorkday":"1",
            "timeType":"1",
            "startTime":"00:10:00",
            "endTime":"12:00:12",
            "list": [{
                "ringCoverUrl": "../../assets/ring-play.png",
                "ringProdUrl": "../../assets/video.mp4",
                "ringId": "222",
                "ringBelong": "1",
                "ringInfoId": 14131612,
                "ringName": "吉祥如意公司第一季铃音",
                "createTime": "2020-10-11 09:22",
                "setTime": "2020-10-10 08:20",
                "deadLine": "2021-10-10 08:20"
            }],
        }]
    }
}