/**
 * 获取简易角色列表信息用于新增用户 @url /evrms/sec/sysRole/querySimpleRoles
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "list|10": [{
            "roleId": "@natural(2, 600)", //角色id
            "roleName": "@cname(2, 4)", //角色名称
            "tags": "2", //角色标签
        }]
    }
}