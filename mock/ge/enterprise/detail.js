/**
 * 获取企业信息详情 @url /evrms/zhengqi/enterprise/queryEcOrderDetail
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "ecAccount":10,
        "ordId":"@natural(0, 60)",
        "ecId":"@natural(0, 60)",
        "ecName": "企业名称",
        "sign|1":  ["02", "01"],
        "provId": "1300",
        "provName": '河北省',
        "location": "1301",
        "locationName": "成都",
        "staffName": "@cname(2, 4)",
        "status|1":  ["1", "2", "3", "4", "5", "6"],
        "openTime": "2020-10-23 15:36:31",
        "activateTime":"2020-10-23 15:36:31",
        "memberCount": "@natural(0, 60)",
        "crossProvNum": "@natural(0, 10)",
        "adminEmail": "123@123.com",
        "adminMsisdn": 12345678,
        "contactPhone":  12345678,
        "partyName": "@cname(2, 4)",
        "ecContactPhone":  12345678,
        "isCrossProv": 1,
        "memberCapacity":50000,
        "crossProvDetail": "北京市、天津市、上海市、重庆市、河北省、山西省、辽宁省、吉林省、黑龙江省、江苏省、浙江省、安徽省、福建省、江西省、山东省、河南省、湖北省、湖南省、广东省、海南省、四川省、贵州省、云南省、陕西省、甘肃省、青海省、台湾省、内蒙古自治区、广西壮族自治区、西藏自治区、宁夏回族自治区、新疆维吾尔自治区、香港特别行政区、澳门特别行政区"
    }
}

