/**
 * 全网用户统计 @url /evrms/zhengqi/ecReport/queryNetUserReport
 */
module.exports = {
  code: '0000',
    message: "",
    success: true,
    "data|10-30": [{
        "day": "@date('yyyy-MM-dd')",
        "userUp": "@natural(1000000, 10000000)",
        "ecUp": "@natural(100000, 1000000)",
        "userCount": "@natural(1000000, 10000000)",
        "ecCount":  "@natural(100000, 1000000)",
        "provName": '四川'
    }]
}