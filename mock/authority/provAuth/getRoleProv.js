/**
 * 获取角色分省详情 @url /evrms/sec/sysRoleProvMgmt/getRoleProv
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "id": "@natural(2, 60)", //省份id
        "roleId": "@natural(2, 60)", //角色id
        "roleName": "@cname(2, 4)", //角色名称
        "roleTags": ["2", "1"], //角色标签
        "enabled|1": [true, false], // 是否生效
        "menuAuth": [{ // 菜单权限
            "menuid": "3", // 菜单id
            "menuName": "@cname(4, 4)", // 菜单名字
            "tagMenuKey": "3" // 唯一码
        },
        {
            "menuid": "6",
            "menuName": "@cname(4, 4)",
            "tagMenuKey": "6"
        }],
        "operateAuth|3": [{ // 操作权限
            "operateId": "@natural(2, 20)", // 操作权限id
            "operateName": "@cname(4, 4)", // 操作权限名字
            "tagMenuKey|1": ['3','6','5']
        }],
        "doCreate|1": ['1', '2'] // 是否可创建角色
    }
}