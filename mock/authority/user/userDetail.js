/**
 * 获取用户详情 @url /evrms/sec/getUser
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "id": "@natural(2, 60)", //用户id
        "username": "@cname(2, 4)", //用户名称
        "phone": "16677889955", //手机号
        "roleList|2": [{ // 角色
            "roleId": "@natural(1, 600)",
            "roleName": "@cname(4, 4)" // 菜单名字
        }],
        "areaList|3": [{ // 所属区域
            "areaId|1": ['1100','1201','1302'],
            "areaFlag|1": [true, false],
            "areaName": "@cname(4, 4)" // 所属区域名称
        }],
        "doSeeOhter|1": [false,true] // 是否可操作其他用户
    }
}