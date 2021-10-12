/**
 * 通过用户token登录 @url /evrms/userService/login/loginByToken
 */
module.exports = {
    success:true,
    data:{
        tel: "18683436119",
        userCenterId: "387302550516402187",
        staffName: "test3",
        staffRoles: [{
            roleId: "1",
            roleName: "超级管理员",
        },
        {
            roleId: "2",
            roleName:"企业客户经理",
        }],
        url: '',
        doCreate: true,
        doSeeOther: true,
        operateAuth: {
            ":": ["default:0:", "system:1:是否可操作他人业务"],
            "zq,qz,gg:AllRingList": ["ring:0:铃音查询", "ring:2:铃音设置", "ring:4:铃音制作"],
            "zq:AdvanceRingList": ["pre:0:预制铃音查询", "pre:1:预制铃音上传", "pre:2:标签管理"],
            "zq:Diy": ["default:0:默认权限"],
            "zq:EcAccountManage": ["default:0:默认权限", "member:2:添加成员", "member:4:删除成员"],
            "zq:EnterpriseData": ["ec:0:企业查询", "ec:10:导出（企业统计）数据"],
            "zq:EnterpriseList":["dept:0:部门管理（页面查看）","dept:1:部门删除","dept:2:添加部门","ec:0:企业信息查询","ec:11:企业预制铃音","ec:12:企业手动激活","ec:1:企业名称修改","ec:2:企业归属地修改","ec:3:企业管理员手机修改","ec:4:企业客户经理手机（姓名）修改","ec:5:企业成员容量修改","ec:6:导出企业信息","ec:7:导出企业成员","ec:8:平台状态日志（查询）","ec:9:平台状态日志导出","member:0:成员查询","member:11:强制添加成员","member:12:强制删除成员","member:13:导出成员列表","member:1:成员编辑","member:2:添加成员","member:3:移动成员","member:4:删除成员","member:5:成员状态日志查询","member:6:excel添加成员","member:7:excel删除成员","member:8:bboss查询成员","ring:0:铃音查询","ring:10:开启固话视频","ring:11:开启固话音频","ring:1:铃音上传","ring:2:铃音设置","ring:3:删除铃音","ring:5:取消铃音","ring:6:铃音分时设置","ring:7:铃音仅工作日播放","ring:8:在线diy编辑","ring:9:开启固话铃音"],"qz:OrderRing":["default:0:默认权限"],
            "zq:EnterpriseQRCodeList": ["qrcode:0:查看一企一码", "qrcode:1:开通一企一码", "qrcode:2:统付企业开启一企一码", "qrcode:3:个付企业开启一企一码"],
            "zq:MemberBelongInfo": ["member:10:导出成员归属信息", "member:4:成员删除", "member:9:成员归属信息查询"],
            "zq:Template": ["default:0:默认权限"],
            "zq:ToolsIndex": ["default:0:默认权限"]
        },
        token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODY4MzQzNjExOSIsImlhdCI6MTYwNTA4MzY3MiwianRpIjozfQ.yBbt-IsL5HUzSe1wHdjTl4FWKM_9LjKi3IRdkPwXefSmQ_78xIHBpZaTze0fxwZnS8QehmEsspS1tBgUWcMiUA"
    }
