/**
 * 查询‘查询权限（菜单）’ @url /evrms/sec/sysMenuResources/queryStepMenuDelete
 */
module.exports = {
    code: '0000',
    message: "",
    "data": [{
        "menuId": 1,
        "tag": "@cname(2, 2)",
        "tagMenuKey": "1",
        "menuName": "@cname(4, 4)"
    },
    {
        "menuId": 2,
        "tag": "@cname(2, 2)",
        "tagMenuKey": "2",
        "menuName": "@cname(4, 4)"
    },
    {
        "menuId": 3,
        "tag": "@cname(2, 2)",
        "tagMenuKey": "3",
        "menuName": "@cname(4, 4)",
        "pid": 1
    },
    {
        "menuId": 4,
        "tag": "@cname(2, 2)",
        "tagMenuKey": "4",
        "menuName": "@cname(4, 4)",
        "pid": 1
    },
    {
        "menuId": 5,
        "tag": "@cname(2, 2)",
        "tagMenuKey": "5",
        "menuName": "@cname(4, 4)",
        "pid": 4
    },
    {
        "menuId": 6, // sys_menu_resources菜单资源的ID
        "tag": "@cname(2, 2)", // 角色标签
        "tagMenuKey": "6", // 数据格式`tag:menuKey`确定唯一的1条数据。
        "menuName": "@cname(4, 4)", // 菜单资源的名称
        "pid": 2 // 菜单资源的父级ID
    }]
}