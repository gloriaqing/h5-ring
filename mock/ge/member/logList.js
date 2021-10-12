/**
 * 查询成员操作日志 @url /evrms/zhengqi/member/operLogs
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "list|5": [{
            "createTime": "2020-10-27", //发起时间
            "finishedTime": "2020-10-27", //归档时间
            "billNum": "18584939394", //成员号码
            "locationName": "四川", //号码归属地
            "oprCode": "01", //操作类型
            "operSystem": "BBOSS", //发起方
            "operResult": "SUCCESS", //操作结果
            "transido": "@natural(10, 60)", //BBOSS流水号
            "ordId": "@natural(2, 60)", //订购ID
            "failDesc": "不知道啥原因", //失败原因
        }],
        "failNum": 100,
        "pageNum": 1,
        "pageSize": 5,
        "pageCount": 4,
        "total": 20
    }
}