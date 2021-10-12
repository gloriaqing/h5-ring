/**
 * 获取企业字典 @url /evrms/zhengqi/common/queryDictionary
 */
module.exports = {
    code: '0000',
    message: "",
    data: {
        "ecStatus":[
            {
                "key": "1",
                "value":"开通未归档"
            },
            {
                "key": "2",
                "value":"已开通"
            },
            {
                "key": "3",
                "value":"已激活"
            },
            {
                "key": "4",
                "value":"已暂停"
            },
            {
                "key": "5",
                "value":"已注销"
            },
            {
                "key": "6",
                "value":"异常"
            }
        ],
        "sign":[
            {
                "key": "01",
                "value":"统付"
            },
            {
                "key": "02",
                "value":"个付"
            }
        ],
        "departmentType":[
            {
                "key": "1",
                "value":"默认部门"
            },
            {
                "key": "2",
                "value":"常规部门"
            },
            {
                "key": "3",
                "value":"个人视频彩铃部门"
            }
        ],
        "ringType":[
            {
                "key": "1",
                "value":"VoTLE手机视频"
            },
            {
                "key": "3",
                "value":"VoTLE手机音频"
            },
            {
                "key": "2",
                "value":"IMS固话视频"
            },
            {
                "key": "4",
                "value":"IMS固话音频"
            }
        ],
        "systemCode":[
            {
                "key": "EVRMS",
                "value":"企业视频彩铃系统"
            },
            {
                "key": "BBOSS",
                "value":"BBOSS系统"
            }
        ],
        "operCode":[
            {
                "key": "01",
                "value":"新增"
            },
            {
                "key": "02",
                "value":"删除"
            },
            {
                "key": "03",
                "value":"变更"
            }
        ],
        "terminalType":[
            {
                "key": "01",
                "value":"IMS手机"
            },
            {
                "key": "02",
                "value":"软终端"
            },
            {
                "key": "03",
                "value":"铁通固定电话号码"
            },
            {
                "key": "04",
                "value":"VoLTE手机"
            }
        ],
        "ringBelong":[
            {
                "key": "1",
                "value":"企业铃音"
            },
            {
                "key": "2",
                "value":"预制铃音"
            }
        ],
         "ringStatus":[
            {
                "key": "1",
                "value":"待审核"
            },
            {
                "key": "2",
                "value":"分发成功"
            },
            {
                "key": "3",
                "value":"审核不通过"
            },
            {
                "key": "4",
                "value":"已过期"
            },
            {
                "key": "5",
                "value":"已删除"
            },
            {
                "key": "6",
                "value":"分发中"
            },
            {
                "key": "7",
                "value":"分发失败"
            }
        ],
        "memberStatus":[
            {
                "key": "00",
                "value":"添加处理中"
            },
            {
                "key": "01",
                "value":"添加待归档"
            },
            {
                "key": "02",
                "value":"添加归档成功"
            },
            {
                "key": "10",
                "value":"删除处理中"
            },
            {
                "key": "11",
                "value":"删除待归档"
            },
            {
                "key": "12",
                "value":"删除归档失败"
            },
            {
                "key": "30",
                "value":"强制添加至媒体组"
            }
        ],
        "tag":[
            {
                "key": "ZQ",
                "value":"政企"
            },
            {
                "key": "GG",
                "value":"广告"
            },
            {
                "key": "QZ",
                "value":"圈子"
            }
        ],
        "ecExportTaskStatus":[
            {
                "key": "0",
                "value":"进行中"
            },
            {
                "key": "1",
                "value":"待下载"
            },
            {
                "key": "2",
                "value":"已完成"
            },
            {
                "key": "3",
                "value":"异常"
            },
        ],
        "businessType": [
            {
                "key": "ZQ",
                "value":"企业"
            },
            {
                "key": "GG",
                "value":"广告"
            },
            {
                "key": "QZ",
                "value":"圈子"
            }
        ],
        "memberOprRst": [
            {
                "key": "DOING",
                "value":"处理中"
            },
            {
                "key": "SUCCESS",
                "value":"成功"
            },
            {
                "key": "FAIL",
                "value":"失败"
            }
        ],
        "displayType": [
            {
                "key": "1",
                "value":"横屏"
            },
            {
                "key": "2",
                "value":"竖屏"
            }
        ]

    }
}

