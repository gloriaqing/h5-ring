/**
 * 获取用户列表 @url /evrms/sec/queryUsers
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "list|10": [{
            "id": "@natural(2, 6000)", // 用户id
            "userName": "@cname(2, 4)科技有", // 用户名称
            "enable|1": [true, false], // 是否启用 （角色开关）
            "phone": '17788995656', // 用户手机号
            "doSeeOther｜1": [true, false], // 是否可查看他人
            "respArea|70": "@cname(4, 4)" // 负责区域
        }],
        "pageNum": 1,
        "pageSize": 10,
        "pageCount": 10,
        "total": 100,

    }
}