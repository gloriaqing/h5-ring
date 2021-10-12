/**
 * 查询企业部门已经设置的铃音列表 @url /evrms/zhengqi/ring/querySettingList
 */
module.exports = ()=>{
    return {
        code: '0000',
        message: "",
        "data|10": [{
            "coverUrl": "../../assets/ring-play.png",
            "ringProdUrl": "../../assets/video.mp4",
            "ringId": "222",
            "ringInfoId": 14131612,
            "ringName": "吉祥如意公司第一季铃音",
            "createTime": "2020-10-11 09:22",
            "ringBelong": "1",
            "used": 1,
        }],
    }
}