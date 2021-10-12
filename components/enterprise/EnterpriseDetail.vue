/*
 * @Author: mikey.zhangheng
 * @Date: 2021-04-09 16:48:17
 * @Last Modified by: liqiao
 * @Last Modified time: 2021-07-01 16:30:17
 */
<template>
    <div class="ec-detail">
        <section class="detail-box">
            <section
                class="info-top">
                <van-cell
                    title="企业名称"
                    :is-link="Number(detail.status)!==5&&checkButtonAuthority('zq:EnterpriseList_ec:1')"
                    class="edit-value show-left"
                    :value="detail.ecName"
                    @click="openModal('企业名称',detail.ecName,'ecName')" />
                <van-cell
                    title="企业编码"
                    :value="detail.ecId" />
                <van-cell
                    title="归属省市"
                    :is-link="Number(detail.status)!==5&&checkButtonAuthority('zq:EnterpriseList_ec:2')"
                    class="edit-value"
                    :value="`${detail.provName}-${detail.locationName}`"
                    @click="openLocaltion" />
                <van-cell
                    title="产品订购编码"
                    :value="detail.ordId" />
                <van-cell
                    title="付费方式"
                    :value="dictionaryObj.sign[detail.sign]" />
                <van-cell
                    title="开通时间"
                    :value="detail.openTime" />
                <van-cell
                    title="业务生效时间"
                    :value="detail.activateTime" />
                <van-cell
                    title="业务状态"
                    :value="dictionaryObj.ecStatus[detail.status]" />
                <van-cell
                    v-show="Number(detail.status)===5"
                    title="业务注销时间"
                    :value="detail.unsubscribeTime" />
            </section>
            <section class="info-top distance">
                <van-cell
                    title="管理员电话"
                    :is-link="Number(detail.status)!==5 && checkButtonAuthority('zq:EnterpriseList_ec:3')"
                    class="edit-value"
                    :value="detail.adminMsisdn"
                    @click="openModal('管理员电话',detail.adminMsisdn,'adminMsisdn')" />
                <van-cell
                    title="管理员邮箱"
                    :is-link="Number(detail.status)!==5 && checkButtonAuthority('zq:EnterpriseList_ec:3')"
                    class="edit-value"
                    :value="detail.adminEmail"
                    @click="openModal('管理员邮箱',detail.adminEmail,'adminEmail')" />
                <van-cell
                    title="客户经理"
                    :is-link="Number(detail.status)!==5 && checkButtonAuthority('zq:EnterpriseList_ec:4')"
                    class="edit-value"
                    :value="detail.staffName"
                    @click="openModal('客户经理',detail.staffName,'staffName')" />
                <van-cell
                    title="客户经理电话"
                    :is-link="Number(detail.status)!==5 && checkButtonAuthority('zq:EnterpriseList_ec:4')"
                    class="edit-value"
                    :value="detail.contactPhone"
                    @click="openModal('客户经理电话',detail.contactPhone,'contactPhone')" />
                <van-cell
                    title="跨省详情"
                    :value="detail.crossProvDetail" />
                <van-cell
                    title="成员容量"
                    :is-link="Number(detail.status)!==5 && checkButtonAuthority('zq:EnterpriseList_ec:5')"
                    class="edit-value"
                    :value="detail.memberCapacity"
                    @click="openModal('成员容量',detail.memberCapacity,'memberCapacity')" />
                <van-cell
                    title="当前成员使用情况"
                    :value="`${detail.memberCount}/${detail.memberCapacity}`" />
            </section>
        </section>
        <van-popup
            v-model="isShowLocal"
            class="btop-radius-14"
            position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="isShowLocal=false"
                @confirm="confirmLocation" />
        </van-popup>
        <detail-edit-modal
            :modal-data="modalData"
            :value="showHideModal"
            @close="closeModal">
        </detail-edit-modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/utils/apiGe'
import DetailEditModal from '@/components/enterprise/DetailEditModal'
import func from '@/utils/func'
import AuthMixins from '@/mixins/auth.js'

export default {
    name: 'EnterpriseDetail',
    components: {
        DetailEditModal
    },
    mixins: [AuthMixins],
    props: {
        value: {
            type: Boolean,
            default: false
        },
        enterpriseInfo: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        // const { ecId, ordId } = func.getRouteParams(this.$route)
        return {
            locationArr: [], // 市级初始列表
            columns: [], // 市级展示列表
            requestParams: {
                ecName: '', // 企业名称
                location: '', // 地市代码
                ecId: '', // 企业ID
                ordId: '', // 企业订购ID
                adminEmail: '', // 管理员邮箱
                adminMsisdn: '', // 管理员手机号
                staffName: '', // 客户经理名称
                contactPhone: '', // 客户经理电话
                memberCapacity: '' // 展示的成员容量
            },
            isShowLocal: false, // 显示省份弹窗
            areaList: {}, // 省份列表
            detail: {
                provName: '请选择',
                locationName: '请选择'
            }, // 详情数据
            showHideModal: false, // 显示隐藏弹窗
            modalData: {}, // 传给弹窗数据
            openType: '' // 弹窗传参类型
        }
    },
    computed: {
        ...mapState({
            proList: (state) => state.common.provAndLocationList, // 初始省市维表
            dictionaryObj: (state) => state.ge.dictionaryObj
        })
    },
    mounted () {
        this.requestParams.ecId = func.getRouteParams(this.$route).ecId
        this.requestParams.ordId = func.getRouteParams(this.$route).ordId
        this.getEnterpriseDetail()
    },
    methods: {
        // 查询企业信息详情
        getEnterpriseDetail () {
            const params = {
                ecId: this.requestParams.ecId,
                ordId: this.requestParams.ordId
            }
            api.getEnterpriseDetail(params).then(res => {
                this.detail = res
                // 初始数据赋值
                const { ecName, location, ecId, ordId, contactPhone, memberCapacity, adminEmail, adminMsisdn, staffName } = this.detail
                this.requestParams = { ecName, location, ecId, ordId, contactPhone, memberCapacity, adminEmail, adminMsisdn, staffName }
                // 处理省份地市的数据
                const newProObj = {}
                const newLocObj = {}
                const arrL = this.proList.filter((item) => {
                    return Number(item.provId) === Number(res.provId)
                })[0]
                newProObj[arrL.provId] = arrL.provName
                const locationArr = func.getCityList(res.provId, this.proList)
                this.locationArr = locationArr
                const list = []
                locationArr.forEach(item => {
                    newLocObj[item.location] = item.locationName
                    list.push(item.locationName)
                })
                this.columns = list
            })
        },
        // 更新企业详情
        updataEnterpriseInfo () {
            const params = this.requestParams
            api.updateEnterpriseInfo(params).then((res) => {
                this.$notify({ type: 'success', message: '更新成功' })
                this.getEnterpriseDetail()
            })
        },
        // 选择地区确认按钮
        confirmLocation (val) {
            // this.requestParams.location = obj[1].code
            this.detail.locationName = val
            this.locationArr.forEach(item => {
                if (item.locationName === val) {
                    this.requestParams.location = item.location
                }
            })
            // this.detail.location = obj[1].code
            this.isShowLocal = false
            this.updataEnterpriseInfo()
        },
        // 打开弹窗
        openModal (name, data, openType) {
            if (Number(this.detail.status) === 5) return false // 企业注销是无法编辑
            if (openType === 'ecName' && !this.checkButtonAuthority('zq:EnterpriseList_ec:1')) return false // 企业名称西修改权限
            if (openType === 'adminMsisdn' && !this.checkButtonAuthority('zq:EnterpriseList_ec:3')) return false //  管理员电话权限
            if (openType === 'adminEmail' && !this.checkButtonAuthority('zq:EnterpriseList_ec:3')) return false // 管理员邮箱权限
            if (openType === 'staffName' && !this.checkButtonAuthority('zq:EnterpriseList_ec:4')) return false // 客户经理权限
            if (openType === 'contactPhone' && !this.checkButtonAuthority('zq:EnterpriseList_ec:4')) return false // 客户经理电话权限
            if (openType === 'memberCapacity' && !this.checkButtonAuthority('zq:EnterpriseList_ec:5')) return false // 成员容权限
            this.showHideModal = true
            this.modalData = {
                name: name,
                data: data,
                openType: openType
            }
            this.openType = openType
        },
        // 打开地址选择
        openLocaltion () {
            if (Number(this.detail.status) === 5 || !this.checkButtonAuthority('zq:EnterpriseList_ec:2')) return false
            this.isShowLocal = true
        },
        // 关闭弹窗
        closeModal (value) {
            this.showHideModal = false
            if (value) {
                this.requestParams[this.openType] = value
                this.detail[this.openType] = value
                this.updataEnterpriseInfo()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.ec-detail {
    width: 100%;
    height: auto !important;
    overflow: hidden;
    position: absolute;
    top: 0.9rem;
    left: 0;

    .detail-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f3f4f9;
        text-align: left;

        /deep/ .van-cell {
            line-height: 40px;

            .van-cell__right-icon {
                line-height: 40px;
                font-size: 10px;
            }
        }

        .info-top {
            width: 6.86rem;
            margin-top: 0.32rem;
            overflow: hidden;
            border-radius: 0.2rem;
            background-color: #fff;

            /deep/ .van-cell__title {
                font-size: 0.28rem;
                color: #12102d;
                font-family: PingFangSC, PingFangSC-Regular;
            }

            .edit-value {
                cursor: pointer;

                /deep/ .van-cell__value {
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-size: 0.28rem;
                    color: #969799;
                }
            }

            .show-left {
                /deep/ .van-cell__value {
                    text-align: left;
                }
            }
        }

        .distance {
            margin-bottom: 0.32rem;
        }
    }
}
</style>
