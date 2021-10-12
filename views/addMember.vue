/*
 * @Author: liqiao
 * @Date: 2021-04-17 10:55:16
 * @Last Modified by: liqiao
 * @Last Modified time: 2021-07-05 16:21:07
 */
<template>
    <div>
        <van-form
            ref="form"
            input-align="right"
            error-message-align="right"
            @submit="addMember">
            <div class="field-section">
                <van-field
                    v-model="form.ordId"
                    name="产品订购编码"
                    label="产品订购编码"
                    placeholder=""
                    readonly />
                <van-field
                    v-model="form.ecName"
                    name="企业名称"
                    label="企业名称"
                    placeholder=""
                    readonly />
                <van-field
                    v-model="form.provName"
                    name="归属省份"
                    label="归属省份"
                    placeholder=""
                    readonly />
                <van-field
                    v-model="form.departmentName"
                    required
                    name="部门"
                    is-link
                    label="部门"
                    readonly
                    placeholder="选择部门"
                    :rules="rules.department"
                    @click="openModal('selectDepartmentModal')" />
                <van-field
                    v-model="form.realName"
                    name="成员姓名"
                    label="成员姓名"
                    maxlength="20"
                    :rules="rules.realName"
                    placeholder="请输入姓名" />
                <van-field
                    v-model="form.billNums"
                    required
                    class="field-block"
                    type="textarea"
                    name="成员电话"
                    label="成员电话"
                    :placeholder="textareaPlaceholder"
                    :rules="rules.billNums" />
            </div>
            <div class="submit-btn">
                <van-button
                    round
                    block
                    :disabled="disabled"
                    type="info"
                    native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
        <van-popup
            v-model="selectDepartmentModal"
            class="btop-radius-14"
            position="bottom">
            <van-picker
                show-toolbar
                :columns="departmentValOptions"
                @confirm="confirmDepartment"
                @cancel="closeModal('selectDepartmentModal')" />
        </van-popup>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import companyInfoMixins from '@/mixins/companyInfo'
import { PLACEHOLDER_PHONE_AND_IANDTEL, VALIDATE_LEGAL_REGEXP_20 } from '@/constants/const'
import api from '@/utils/apiGe'
import func from '@/utils/func'

export default {
    name: 'AddMember',
    components: {
        // ViewVideoModal
    },
    mixins: [companyInfoMixins],
    data () {
        var checkLegal = func.checkLegal
        var validateName = (value, rule) => {
            if (!value) {
                return true
            }
            var re = new RegExp(VALIDATE_LEGAL_REGEXP_20)
            if (re.test(value)) {
                return true
            } else {
                rule.message = '成员姓名仅支持中英字符'
                return false
            }
        }
        const { ecId, ordId, ecName, provId, provName } = func.getRouteParams(this.$route)
        return {
            form: {
                ordId, // 企业订购ID
                ecId, // 企业ID
                ecName, // 企业名称
                provId, // 省份ID
                provName, // 省份
                departmentId: '', // 部门ID
                departmentName: '', // 部门名称
                realName: '', // 成员姓名
                billNums: '' // 电话号数组
            },

            rules: {
                department: [{ required: true, message: '' }],
                realName: [{ required: false, validator: validateName, message: '' }],
                billNums: [{ required: true, validator: checkLegal, message: '请输入成员电话' }]
            },

            selectDepartmentModal: false, // 选择部门popup控制参数
            departmentOptions: [], // 部门选择的项

            textareaPlaceholder: PLACEHOLDER_PHONE_AND_IANDTEL, // 成员号码的占位符
            disabled: false // 是否请求中
        }
    },
    computed: {
        ...mapState({
            dictionaryObj: (state) => state.ge.dictionaryObj // 数据字典
        }),
        departmentValOptions () {
            const departmentValOptions = []
            this.departmentOptions.map(i => {
                departmentValOptions.push(i.departmentName)
            })
            return departmentValOptions
        }
    },
    mounted () {
        this.getChooseDepartmentList()
    },
    methods: {
        // 打开popup
        openModal (modal) {
            this[modal] = true
        },
        // 关闭popup
        closeModal (modal) {
            this[modal] = false
        },
        // 添加成员
        addMember () {
            this.form.billNums = func.verifyPhoneAndLandTelFormat(this.form.billNums).checkAfter
            this.$refs.form.validate().then(() => {
                this.disabled = true
                const params = func.disposeParameter(this.form)
                api.addMember(params).then(res => {
                    if (res.fullCapacity) {
                        return this.$dialog.alert({
                            title: '提示',
                            message: '企业成员容量已达到上限，请修改成员容量再添加；若超过5万，请发送合同及方案到qyspcl@139.com联系配置！'
                        })
                    }

                    this.$router.replace({
                        name: 'MemberRequestTip',
                        params: {
                            ...res,
                            ordId: this.form.ordId,
                            ecId: this.form.ecId
                        }
                    })
                }).finally(() => {
                    this.disabled = false
                })
            })
        },
        // 获取可选择的部门列表枚举
        getChooseDepartmentList () {
            const params = {
                ...this.form,
                pageSize: 0,
                pageNum: 1
            }
            params.departmentId = ''
            api.getDepartmentList(params).then(res => {
                this.departmentOptions = res.list
                this.form.departmentId = this.departmentOptions[0].departmentId
                this.form.departmentName = this.departmentOptions[0].departmentName
            })
        },
        // 确认选择部门
        confirmDepartment (val, index) {
            const selectedDepartment = this.departmentOptions[index]
            this.form.departmentId = selectedDepartment.departmentId
            this.form.departmentName = selectedDepartment.departmentName
            this.closeModal('selectDepartmentModal')
        }
    }
}
</script>
<style lang="less" scoped>
    .field-section {
        margin-bottom: 1.44rem;
    }
    .submit-btn {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        margin: 0 0 .32rem;
    }
</style>
