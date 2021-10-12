/**
 * 获取角色列表信息 @url /evrms/sec/sysRole/queryRoles
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "list|10": [{
            "id": "@natural(2, 600)", //角色id
            "roleName": "@cname(2, 4)", //角色名称
            "roleTag": "2", //角色标签
            "userCount": "@natural(0, 4)", // 用户人数
            "enable|1": [true, false], //是否启用 （角色开关）
            "defaultRole|1": [true, false], // 是否默认角色
            "menuAuth|3": [{ // 菜单权限
                "id": "@natural(1, 20)", // 菜单id
                "menuName": "@cname(4, 4)" // 菜单名字
            }],
            "operateAuth|3": [{ // 操作权限
                "id": "@natural(1, 20)", // 操作权限id
                "operateName": "@cname(4, 4)" // 操作权限名字
            }]
        }],
        "pageNum": 1,
        "pageSize": 10,
        "pageCount": 10,
        "total": 100,

    }
}