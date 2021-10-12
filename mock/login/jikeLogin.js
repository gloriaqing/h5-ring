/**
 * jike登录 @url /evrms/userService/jikeTicketValidate
 */
module.exports = {
    data:{
        ssotoken: 'ssotoken0000',
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
            "zq:MemberBelongInfo":["member:10:导出成员归属信息","member:9:成员归属信息查询"],
            "zq:AdvanceRingList":["pre:0:预制铃音查询","pre:1:预制铃音上传","pre:2:标签管理"],
            "zq:EnterpriseList":["dept:0:部门查询","dept:1:部门删除","dept:2:添加部门","ec:0:企业查询",
            "ec:11:企业预制铃音查询","ec:1:企业名称修改","ec:2:企业归属地修改","ec:3:企业管理员手机修改",
            "ec:4:企业客户经理手机（姓名）修改","ec:5:企业成员容量修改","ec:6:导出企业信息",
            "ec:7:导出企业成员","ec:8:平台成员状态日志查询","ec:9:导出平台成员状态日志",
            "member:0:成员查询","member:1:成员编辑","member:2:添加成员","member:3:移动成员",
            "member:4:删除成员","member:5:成员状态日志查询","member:6:excel添加成员",
            "member:7:excel删除成员","member:8:bboss成员查询","ring:0:铃音查询","ring:1:铃音上传",
            "ring:2:铃音设置","ring:3:删除铃音","ring:5:取消铃音","ring:6:铃音分时设置","ring:7:铃音仅工作日播放",
            "ring:8:在线diy编辑"]
        },
        token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODY4MzQzNjExOSIsImlhdCI6MTYwNTA4MzY3MiwianRpIjozfQ.yBbt-IsL5HUzSe1wHdjTl4FWKM_9LjKi3IRdkPwXefSmQ_78xIHBpZaTze0fxwZnS8QehmEsspS1tBgUWcMiUA"
    },
    message: "您没有系统登录权限",
    success:true,
    code: '0101'
}