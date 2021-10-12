/**
 * 获取企业列表信息 @url /evrms/zhengqi/enterprise/queryEcOrderList
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "pageNum":1,
        "pageSize":10,
        "total":1123,
        "pageCount":10,
        "list|10":[{
            "ordId":"@natural(0, 60)",
            "ecId":"@natural(0, 60)",
            "ecName": "企业名称",
            "sign|1":  ["02", "01"],
            "provId": "1300",
            "provName": '河北',
            "location|1": ["1302", "1301", "1303"],
            "locationName": "成都",
            "staffName": "@cname(2, 4)",
            "status|1":  ["1", "2", "3", "4", "5", "6"],
            "openTime": "2020-10-23 15:36:31",
            "memberCount": "@natural(0, 60)",
            "crossProvNum": "@natural(0, 60)",
        }]
    }
}

