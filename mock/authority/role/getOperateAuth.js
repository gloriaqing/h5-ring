/**
 * 查询‘操作权限’ @url /evrms/sec/sysOperateResources/queryStepAuth
 */
module.exports = {
    code: '0000',
    message: "",
    "data|3": [{
        "operateId": "@natural(2, 60)", //操作权限的ID
        "operateName": "@cname(2, 4)", // 操作权限的名称
        "tagMenuKey|1": ['3','6','5'] // 操作权限的名称
    }]
}