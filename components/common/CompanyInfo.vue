/*
 * @Author: zhengqiang
 * @Date: 2021-04-01 18:16:46
 * @desc: 公共组件-企业基本信息
 */

<template>
    <div :class="['base-info-section', { member: isMemberManage }]">
        <div class="operation-flex">
            <div class="company-title">
                <div class="company-icon">
                    <img
                        class="icon-company"
                        src="../../assets/company.png">
                </div>
                <span>
                    {{ companyInfo.ecName || '--' }}
                    <div class="pay-type">{{ signObj[companyInfo.sign] }}</div>
                    <div class="pay-type">{{ ecStatusObj[companyInfo.status] }}</div>
                </span>
            </div>
        </div>
        <div class="content">
            <div class="info-items-wrap">
                <span class="info-item">
                    <label>产品订购编码</label><span>{{ companyInfo.ordId || '--' }}</span>
                </span>
                <span class="info-item">
                    <label>归属地</label><span>{{ `${companyInfo.provName} ${companyInfo.locationName}` }}</span>
                </span>
            </div>
            <div class="info-items-wrap">
                <span class="info-item">
                    <label>客户经理</label><span>{{ companyInfo.staffName || '--' }}</span>
                </span>
                <span
                    v-if="pageType === 'memberManage' && !departmentId"
                    class="info-item">
                    <label>企业总成员数</label><span>{{ `${companyMemberInfo.memberCount} (跨省${companyMemberInfo.crossProvNum})` }}</span>
                </span>
                <span
                    v-if="pageType === 'memberManage' && departmentId"
                    class="info-item">
                    <label>部门成员数</label><span>{{ `${companyMemberInfo.memberCount} (跨省${companyMemberInfo.crossProvNum})` }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'CompanyInfo',
    props: {
        companyInfo: {
            type: Object,
            default: () => {}
        },
        companyMemberInfo: {
            type: Object,
            default: () => {}
        },
        departmentId: {
            type: [Number, String],
            default: ''
        },
        pageType: { // 页面类型：ringManage:铃音管理；advanceRing:预制铃音；dptManage:部门管理; memberManage: 成员管理
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            signObj: (state) => state.ge.dictionaryObj.sign, // 数据字典对象
            ecStatusObj: (state) => state.ge.dictionaryObj.ecStatus // 数据字典 企业状态对象
        }),
        isMemberManage () {
            return this.pageType === 'memberManage'
        }
    }
}
</script>

<style lang="less" scoped>
    .base-info-section {
        box-sizing: border-box;
        padding: 17px 23px 26px;
        text-align: left;
        background: url('../../assets/company-no-member-bg.png') 0 0 no-repeat;
        background-size: 100% 100%;
        color: #fff;

        &.member {
            background: url('../../assets/company-bg.png') 0 0 no-repeat;
            background-size: 100% 100%;
        }
    }

    .operation-flex {
        .company-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 17px;
            font-weight: 600;
            word-break: break-all;

            .company-icon {
                margin-right: 10px;

                .icon-company {
                    width: 30px;
                    height: 30px;
                }
            }

            .pay-type {
                display: inline-block;
                margin-left: 8px;
                height: 18px;
                text-align: center;
                color: #fff;
                font-size: 12px;
                font-weight: initial;
                background: rgba(255, 255, 255, 0.14);
                border: 1px solid rgba(255, 255, 255, 0.48);
                border-radius: 1px 9px 9px 9px;
                flex-shrink: 0;
                padding: 0 6px;
            }
        }

        .icon-refresh {
            font-size: 12px;
            color: #6a79ff;
        }
    }

    .base-info-section .content {
        padding-left: 40px;

        .info-items-wrap {
            display: flex;
            margin: 7px 0;

            > span {
                flex: 1;
            }
        }

        .info-item {
            width: auto;
            margin-right: 30px;

            label {
                display: block;
                font-size: 12px;
                opacity: 0.6;
            }
        }
    }
</style>
