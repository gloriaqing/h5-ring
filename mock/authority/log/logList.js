/**
 * 日志列表 @url /evrms/mgmt/queryLogs
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "list|10": [{
            "operateTime": "2020.10.23 12:00", // 操作时间
            "operator": "@cname(2, 4)", // 操作人
            "operatePage": "@cname(2, 4)页面", // 操作页面
            "operateName": "@cname(4, 4)", // 操作权限名
        }],
        "pageNum": 1,
        "pageSize": 10,
        "pageCount": 10,
        "total": 100,

    }
}