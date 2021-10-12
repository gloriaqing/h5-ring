/**
 * 获取角色分省权限列表信息 @url /evrms/sec/sysRoleProvMgmt/queryList
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "list|10": [{
            "id": "@natural(2, 600)", //角色id
            "provName": "@cname(2, 4)", //省份名称
            "enable|1": [true, false], //是否启用 （角色分省权限控制开关）
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