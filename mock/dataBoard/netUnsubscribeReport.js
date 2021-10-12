/**
 * 全网退订统计 @url /evrms/zhengqi/ecReport/queryUnsubscribeReport
 */
module.exports = {
  code: '0000',
    message: "",
    success: true,
    "data|10-30": [{
        "day": "@date('yyyy-MM-dd')",
        "userUnsubscribeCount": "@natural(1000000, 10000000)",
        "ecUnsubscribeCount":  "@natural(100000, 1000000)",
    }]
}