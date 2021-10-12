/*
 * @Author: mikey.zhangheng
 * @Date: 2021-04-09 16:48:17
 * @Last Modified by: liqiao
 * @Last Modified time: 2021-05-26 14:21:19
 */
<template>
    <div
        v-show="isShown"
        class="ec-detail-modal gradient"
        @touchmove="touchForbidden">
        <section>
            <van-nav-bar
                class="top-nav-bar"
                :title="pageDada.name"
                left-text=""
                right-text=""
                left-arrow
                @click-left="onClickLeft">
                <template #left>
                    <van-icon
                        class="go-back-icon"
                        name="arrow-left" />
                </template>
            </van-nav-bar>
        </section>
        <section>
            <div class="modal-content">
                <textarea
                    v-if="pageDada.openType !== 'adminMsisdn' && pageDada.openType !== 'contactPhone' && pageDada.openType !== 'memberCapacity'"
                    v-model="inputValue"
                    maxlength="30"
                    type="text" />
                <textarea
                    v-else
                    v-model="inputValue"
                    class="edit-phone"
                    :maxlength="pageDada.openType === 'memberCapacity'?8:50"
                    type="number" />
            </div>
        </section>
        <van-button
            class="primary-public"
            size="large"
            type="info"
            @click="onSubmit">
            保存
        </van-button>
    </div>
</template>

<script>
import { VALIDATE_PHONE_REGEXP, VALIDATE_EMAIL_REGEXP } from '@/constants/const'
import { Toast } from 'vant'
import func from '@/utils/func'
import AuthMixins from '@/mixins/auth.js'

export default {
    name: 'EnterpriseDetail',
    mixins: [AuthMixins],
    props: {
        value: {
            type: Boolean,
            default: false
        },
        modalData: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            func: func,
            inputValue: ''
        }
    },
    computed: {
        isShown () {
            return this.value
        },
        pageDada () {
            return this.modalData
        }
    },
    watch: {
        isShown (val) {
            if (val) this.inputValue = this.pageDada.data
        }
    },
    methods: {
        // 阻止滑动穿透
        touchForbidden (e) {
            e.preventDefault()
        },
        // 退出
        onClickLeft () {
            this.$emit('close', '')
        },
        // 提交数据
        onSubmit () {
            // 电话号码
            if (this.pageDada.openType === 'adminMsisdn' || this.pageDada.openType === 'contactPhone') {
                const reg = new RegExp(VALIDATE_PHONE_REGEXP) // 手机号正则
                const regLandtel = /^[0][0-9]{10,11}$/ // 固话正则
                if (!reg.test(this.inputValue) && !regLandtel.test(this.inputValue)) return Toast('电话号码格式错误，请修改')
            }
            // 邮箱
            if (this.pageDada.openType === 'adminEmail') {
                const reg = new RegExp(VALIDATE_EMAIL_REGEXP)
                if (!reg.test(this.inputValue)) return Toast('邮箱格式错误，请修改')
            }
            // 成员容量
            if (this.pageDada.openType === 'memberCapacity') {
                if (!this.checkButtonAuthority('zq:EnterpriseList_ec:13') && Number(this.inputValue) > 50000) return Toast('可配置最大容量5万户成员')
                if (Number(this.inputValue) < Number(this.modalData.memberCount)) return Toast('配置成员容量不能小于使用容量')
                if (Number(this.inputValue) <= 0) return Toast('配置成员容量不能小于或等于0')
                if (this.inputValue.length > 8) return Toast('配置成员容量不能大于上亿')
            }
            this.$emit('close', this.inputValue)
        }
    }
}
</script>

<style lang="less" scoped>
.ec-detail-modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 999;
    top: 0;
    left: 0;
    background-color: #fff;

    .modal-content {
        margin-top: 0.34rem;

        textarea {
            width: 6.86rem;
            height: 3.2rem;
            background-color: #f9f9f9;
            word-wrap: break-word;
            word-break: normal;
            resize: none;
            border: none;
            border-radius: 0.2rem;
            box-sizing: border-box;
            font-size: 0.32rem;
            color: #404257;
            padding: 0.32rem;
        }

        .edit-phone {
            height: 1.2rem;
        }
    }
}
</style>
