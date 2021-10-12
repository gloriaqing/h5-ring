/*
 * @Author: liqiao
 * @Date: 2021-04-14 09:46:16
 * @Last Modified by: liqiao
 * @Last Modified time: 2021-07-05 16:19:34
 */
<template>
    <div>
        <van-form
            ref="form"
            input-align="right"
            error-message-align="right"
            @submit="addDepartment">
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
                    name="部门名称"
                    label="部门名称"
                    placeholder="请输入部门名称"
                    maxlength="30"
                    :rules="rules.departmentName"
                    @click="openModal('selectDepartmentModal')" />
                <van-field
                    v-model="form.ringType"
                    required
                    class="field-block"
                    name="部门类型"
                    label="部门类型"
                    :rules="rules.ringType">
                    <div
                        slot="input"
                        class="field-input">
                        <van-radio-group
                            v-model="form.departmentType"
                            icon-size=".32rem"
                            checked-color="#675DFF"
                            direction="horizontal">
                            <van-radio
                                v-for="item in departmentTypeList"
                                :key="item.key"
                                :name="item.key">
                                {{ item.value }}
                            </van-radio>
                        </van-radio-group>
                    </div>
                </van-field>
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
    </div>
</template>

<script>
import { mapState } from 'vuex'
import companyInfoMixins from '@/mixins/companyInfo'
import { VALIDATE_LEGAL_INCLOUDE_NUMBER_REGEXP } from '@/constants/const'
import api from '@/utils/apiGe'
import func from '@/utils/func'

export default {
    name: 'AddDepartment',
    components: {
        // ViewVideoModal
    },
    mixins: [companyInfoMixins],
    data () {
        var validateName = (value, rule) => {
            if (!value) {
                rule.message = '请输入部门名称'
                return false
            }
            var re = new RegExp(VALIDATE_LEGAL_INCLOUDE_NUMBER_REGEXP)
            if (re.test(value)) {
                return true
            } else {
                rule.message = '部门名称仅支持中英字符及数字'
                return false
            }
        }
        const { ecId, ordId, ecName, provName } = this.$route.params
        return {
            form: {
                ordId, // 企业订购ID
                ecId, // 企业ID
                ecName, // 企业名称
                provName, // 省份
                departmentName: '', // 部门名称
                departmentType: '2' // 部门类型
            },

            rules: {
                departmentName: [{ required: true, validator: validateName, message: '请输入部门名称' }],
                ringType: [{ required: true, message: '请选择铃音类型' }]
            },

            disabled: false // 是否请求中
        }
    },
    computed: {
        ...mapState({
            departmentType: (state) => state.ge.dictionary.departmentType
        }),
        // 部门类型字典（剔除默认部门），默认部门不能创建，所以在使用时处理掉
        departmentTypeList () {
            const typeList = this.departmentType
            for (const index in typeList) {
                if (typeList[index].key === '1') typeList.splice(index, 1)
            }
            return typeList
        }
    },
    watch: {
        // 如果部门名称为空 则清空错误提示
        'form.departmentName' (val) {
            if (!val) this.rules.departmentName[0].message = ''
        }
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
        // 获取列表
        addDepartment () {
            this.$refs.form.validate().then(() => {
                this.disabled = true
                const params = func.disposeParameter(this.form)
                api.addDepartment(params).then(res => {
                    this.$notify({ type: 'success', message: '添加成功' })
                    this.$router.back()
                }).finally(() => {
                    this.disabled = false
                })
            })
        }
    }
}
</script>
