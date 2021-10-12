/**
 * 获取用户成员列表信息 @url /evrms/zhengqi/member/queryMemberList
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "list|5": [{
            "ecId": "@natural(2, 60)", //企业ID
            "ecName": "@cname(2, 4)科技有限公司", //企业名称
            "departmentId": "2", //部门Id
            "departmentName": "@cname(2, 4)部", // 部门名称
            "realName": "@cname(2, 4)", //成员姓名
            "billNum": "18583282610", // 成员电话
            "type": "02", //01-IMS手机 02-软终端 03-铁通固定电话号码 04-VoLTE手机
            "locationName": "四川 成都", // 号码归属地
            "createTime": "2020-10-23 15:36:31", // 添加时间
            "status": "01", // 成员状态
            "createSystem": "EVRMS" // EVRMS:本系统，BBOSS:BOSS
        }],
        "pageNum": 1,
        "pageSize": 5,
        "pageCount": 2,
        "total": 2,

    }
}