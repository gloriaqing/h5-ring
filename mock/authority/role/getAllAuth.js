/**
 * 查询全体权限树 @url /evrms/sec/sysMenuResources/queryStepMenu
 */
module.exports ={
    "code": "0000",
    "data": [
        {
            "label": "企业管理",
            "id": "zq:ec_mgmt",
            "children": [
                {
                    "label": "企业列表",
                    "id": "zq:ec_list",
                    "children": [
                        {
                            "label": "铃音查询",
                            "id": "ring:0",
                            "children": null
                        },
                        {
                            "label": "铃音上传",
                            "id": "ring:1",
                            "children": null
                        },
                        {
                            "label": "铃音设置",
                            "id": "ring:2",
                            "children": null
                        },
                        {
                            "label": "删除铃音",
                            "id": "ring:3",
                            "children": null
                        },
                        {
                            "label": "企业信息查询",
                            "id": "ec:0",
                            "children": null
                        },
                        {
                            "label": "企业名称修改",
                            "id": "ec:1",
                            "children": null
                        },
                        {
                            "label": "企业归属地修改",
                            "id": "ec:2",
                            "children": null
                        },
                        {
                            "label": "企业管理员修改",
                            "id": "ec:3",
                            "children": null
                        },
                        {
                            "label": "企业客户经理手机（姓名）修改",
                            "id": "ec:4",
                            "children": null
                        },
                        {
                            "label": "企业成员容量修改",
                            "id": "ec:5",
                            "children": null
                        },
                        {
                            "label": "部门管理（页面查看）",
                            "id": "dept:0",
                            "children": null
                        },
                        {
                            "label": "部门删除",
                            "id": "dept:1",
                            "children": null
                        },
                        {
                            "label": "添加部门",
                            "id": "dept:2",
                            "children": null
                        },
                        {
                            "label": "成员管理（页面查看）",
                            "id": "member:0",
                            "children": null
                        },
                        {
                            "label": "成员编辑",
                            "id": "member:1",
                            "children": null
                        },
                        {
                            "label": "添加成员",
                            "id": "member:2",
                            "children": null
                        },
                        {
                            "label": "移动成员",
                            "id": "member:3",
                            "children": null
                        },
                        {
                            "label": "删除成员",
                            "id": "member:4",
                            "children": null
                        },
                        {
                            "label": "成员状态日志查询",
                            "id": "member:5",
                            "children": null
                        }
                    ]
                }
            ]
        },
        {
            "label": "铃音管理",
            "id": "zq:ring_mgmt",
            "children": [
                {
                    "label": "我的铃音",
                    "id": "zq:my_ring",
                    "children": null
                },
                {
                    "label": "所有铃音",
                    "id": "zq:all_ring",
                    "children": [
                        {
                            "label": "铃音查询",
                            "id": "ring:0",
                            "children": null
                        },
                        {
                            "label": "铃音上传",
                            "id": "ring:1",
                            "children": null
                        },
                        {
                            "label": "铃音制作",
                            "id": "ring:4",
                            "children": null
                        }
                    ]
                }
            ]
        },
        {
            "label": "权限管理",
            "id": "zq:auth_mgmt",
            "children": [
                {
                    "label": "角色列表",
                    "id": "zq:role_list",
                    "children": null
                },
                {
                    "label": "操作日志",
                    "id": "zq:operate_log",
                    "children": null
                }
            ]
        }
    ],
    "message": "操作成功",
    "success": true
}