/**
 * BBOSS成员查询 @url /evrms/zhengqi/member/queryBbossMember
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "ecId": "@natural(2, 60)", //EC集团客户编码
        "ordId": "@natural(2, 40)", //企业编号
        "billNum": "18583282610" // 成员电话
    }
}