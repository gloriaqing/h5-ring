/**
 * 获取部门铃音列表信息 @url /evrms/zhengqi/department/ringList
 */
module.exports = {
    code: '0000',
    message: "",
    "data|5": [{
        "ringId": "@natural(2, 60)", //铃音ID
        "ringInfoId": 14131612,
        "ringName": "@cname(2, 4)铃音", //铃音名称
        "ringType": "2", //铃音类型，1：VoLTE视频，2：VoLTE音频，3：固化视频，4：固话音频
        "ringProdUrl": "baidu.com", //铃音播放地址（媒资库）
    }],
}