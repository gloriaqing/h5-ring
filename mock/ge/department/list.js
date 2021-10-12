/**
 * 获取部门列表信息 @url /evrms/zhengqi/department/queryDeptList
 */
module.exports = {
    code: '0000',
    message: "",
    success: true,
    data: {
        "list|10": [{
            "departmentId": "@natural(2, 3000)", //部门ID
            "departmentName": "@cname(2, 4)部", // 部门名称
            "createTime": "2020-10-31 15:36:31", // 部门创建时间
            "memberCount": "@natural(0, 20)", // 部门人员数
            "departmentType|1":  ["2", "1", "3"] // 部门类型
        }],
        "pageNum": 1,
        "pageSize": 10,
        "pageCount": 10,
        "total": 119,

    }
}