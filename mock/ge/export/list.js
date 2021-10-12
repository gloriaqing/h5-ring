/**
 * 获取企业列表信息 @url /evrms/zhengqi/common/getExportTask
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "pageNum":1,
        "pageSize":10,
        "total":1123,
        "pageCount":10,
        "list|10":[{
            "taskId":"@natural(0, 60)",
            "exportName": "企业名称",
            "status|1":  ["0","1", "2", "3"],
            "createTime": "2020-10-23 15:36:31",
            "downloadUrl": "@natural(0, 60)"
        }]
    }
}

