/**
 * 菜单查询 @url /evrms/queryMenus
 */
module.exports = {
    code: '0000',
    message: "",
    data: [
        {
            id: 1,
            tag: "zq",
            menuName: "GeMain",
            leaf: false,
            children: [
                {
                    id: 2,
                    tag: "zq",
                    menuName: "EnterpriseList",
                    leaf: true,
                    pId: 1
                },
                {
                    id: 3,
                    tag: "zq",
                    menuName: "MemberBelongInfo",
                    leaf: true,
                    pId: 1
                },
                {
                    id:45,
                    tag:"zq",
                    menuName:"EnterpriseQRCodeList",
                    leaf:true,
                    pId:1
                }
            ]
        },
        {
            id: 41,
            tag: "zq",
            menuName: "Custom", // 铃音模板定制
            leaf: false,
            children: [
                {
                    id: 42,
                    tag: "zq",
                    menuName: "Template", // 模板在线定制
                    leaf: true,
                    pId: 41
                },
                {
                    id: 43,
                    tag: "zq",
                    menuName: "Diy", // 在线DIY编辑
                    leaf: true,
                    pId: 41
                },
                {
                    id: 44,
                    tag: "zq",
                    menuName: "ToolsIndex", // 快捷工具包
                    leaf: true,
                    pId: 41
                }
            ]
        },
        {
            id: 17,
            tag: "gg",
            menuName: "AdMain",
            leaf: false,
            children: [
                {
                    id: 18,
                    tag: "gg",
                    menuName: "GroupList",
                    leaf: false,
                    children: [
                        {
                            id: 20,
                            tag: "gg",
                            menuName: "EquityGroupList",
                            leaf: true,
                            pId: 18
                        },
                        {
                            id: 22,
                            tag: "gg",
                            menuName: "EquityScheduleList",
                            leaf: true,
                            pId: 18
                        }
                    ],
                    pId: 17
                },
                {
                    id: 23,
                    tag: "gg",
                    menuName: "AuditList",
                    leaf: false,
                    children: [
                        {
                            id: 24,
                            tag: "gg",
                            menuName: "AuditEquityList",
                            leaf: true,
                            pId: 23
                        }
                    ],
                    pId: 17
                },
                {
                    id: 25,
                    tag: "gg",
                    menuName: "SearchTool",
                    leaf: true,
                    pId: 17
                },
                {
                    id: 26,
                    tag: "gg",
                    menuName: "BlackList",
                    leaf: true,
                    pId: 17
                }
            ]
        },
        {
            id: 4,
            tag: "zq",
            menuName: "Ring",
            leaf: false,
            children: [
                {
                    id: 5,
                    tag: "zq",
                    menuName: "AllRingList", // 所有铃音
                    leaf: true,
                    pId: 4
                },
                {
                    id: 6,
                    tag: "zq",
                    menuName: "AdvanceRingList", // 预制铃音管理
                    leaf: true,
                    pId: 4
                },
                {
                    id: 999,
                    tag:"gg",
                    menuName: "AdvertRingList", // 广告铃音
                    leaf: true,
                    pId: 4
                }
            ]
        },
        {
            id: 10,
            tag: "zq,qz,gg",
            menuName: "DataBoard",
            leaf: false,
            children: [
                {
                    id: 11,
                    tag: "zq",
                    menuName: "EnterpriseData",
                    leaf: true,
                    pId: 10
                },
                {
                    id: 27,
                    tag: "gg",
                    menuName: "ReportStatistics",
                    leaf: true,
                    pId: 10
                },
                {
                    id: 28,
                    tag: "gg",
                    menuName: "ReportLaunchList",
                    leaf: true,
                    pId: 10
                }
            ]
        },
        {
            id: 29,
            tag: "qz",
            menuName: "CircleMain",
            leaf: false,
            children: [
                {
                    id: 30,
                    tag: "qz",
                    menuName: "CircleList",
                    leaf: true,
                    pId: 29
                },
                {
                    id: 31,
                    tag: "qz",
                    menuName: "ToDoList",
                    leaf: true,
                    pId: 29
                },
                {
                    id: 32,
                    tag: "qz",
                    menuName: "SensitiveWordList1",
                    leaf: false,
                    children: [
                        {
                            id: 33,
                            tag: "qz",
                            menuName: "SensitiveWordList",
                            leaf: true,
                            pId: 32
                        },
                        {
                            id: 34,
                            tag: "qz",
                            menuName: "ProtectedList",
                            leaf: true,
                            pId: 32
                        },
                        {
                            id: 35,
                            tag: "qz",
                            menuName: "ProvinceLimitList",
                            leaf: true,
                            pId: 32
                        },
                        {
                            id: 36,
                            tag: "qz",
                            menuName: "AccountLimitList",
                            leaf: true,
                            pId: 32
                        }
                    ],
                    pId: 29
                },
                {
                    id: 37,
                    tag: "qz",
                    menuName: "RingReportList1",
                    leaf: false,
                    children: [
                        {
                            id: 38,
                            tag: "qz",
                            menuName: "RingReportList",
                            leaf: true,
                            pId: 37
                        },
                        {
                            id: 39,
                            tag: "qz",
                            menuName: "RingOrderList",
                            leaf: true,
                            pId: 37
                        },
                        {
                            id: 40,
                            tag: "qz",
                            menuName: "RingSetUpList",
                            leaf: true,
                            pId: 37
                        }
                    ],
                    pId: 29
                }
            ]
        },
        {
            id: 77,
            tag: "zq",
            menuName: "AccountMain",
            leaf: false,
            children: [
                {
                    id: 78,
                    tag: "zq",
                    menuName: "EcAccountManage",
                    leaf: true,
                    pId: 77
                }
            ]
        }
    ]
}