/**
 * 用户列表 @url /evrms/zhengqi/staffManage/userList
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "list|10": [{
            "id": "123123", // 用户主键id
            "provName": "四川", // 省份
            "locationName": "成都", // 地市
            "tel": "18282222222", // 电话
            "staffName": "@cname(2, 4)", // 姓名
            "email": "2888222@163.com", // 邮箱
            "enable": false, // 开关
            "ecName": "五方科技公司", // 企业名称
            "ordId": "1231231", // 订购id
            "isCityAll": "" // 为全网则返回-1，否则为空
        }],
        "pageNum": 1,
        "pageSize": 10,
        "pageCount": 10,
        "total": 100,

    }
}