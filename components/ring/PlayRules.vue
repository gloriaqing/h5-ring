/*
 * @Author: liangxunpei
 * @Date: 2021-04-14 14:57:15
 * @Last Modified by:
 * @Last Modified time:
 * @Desc: 播放规则
 */
<template>
    <vant-popup
        v-model="showPlayRules"
        @close="close"
        @confirm="confirm">
        <div
            slot="body"
            class="popup-content">
            <van-radio-group
                v-if="checkButtonAuthority('zq:EnterpriseList_ring:6')"
                v-model="uploadForm.timeType">
                <template v-for="item in timeTypeList">
                    <van-radio
                        :key="item.key"
                        :name="item.key"
                        checked-color="#675dff">
                        {{ item.value }}
                    </van-radio>
                </template>
            </van-radio-group>
            <time-during
                v-if="uploadForm.timeType === '2' && checkButtonAuthority('zq:EnterpriseList_ring:6')"
                :start="uploadForm.startTime"
                :end="uploadForm.endTime"
                @changeTime="changeTime">
            </time-during>
            <div
                v-if="showWorkPlay&&checkButtonAuthority('zq:EnterpriseList_ring:7')"
                class="play-switch">
                <p>仅工作日播放</p>
                <van-switch
                    v-model="uploadForm.isWorkChecked"
                    active-color="#675dff"
                    size="24" />
            </div>
        </div>
    </vant-popup>
</template>
<script>
import TimeDuring from '@/components/ring/TimeDuring'
import VantPopup from '@/components/common/VantPopup'
import { TIME_TYPE_LIST } from '@/constants/const'
import func from '@/utils/func'
import authMixins from '@/mixins/auth'
export default {
    name: 'PlayRules',
    components: {
        TimeDuring,
        VantPopup
    },
    mixins: [authMixins],
    props: {
        value: {
            type: Boolean,
            default: false
        },
        initTimeType: {
            type: String,
            default: '1'
        },
        showWorkPlay: { // 是否显示仅工作日播放
            type: Boolean,
            default: false
        },
        info: { // 铃音管理默认值
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            uploadForm: {
                timeType: '1', // 播放规则value
                startTime: '00:00', // 开始时间
                endTime: '23:59', // 结束时间
                isWorkChecked: false // 是否仅工作日播放
            },
            timeTypeList: TIME_TYPE_LIST,
            showPlayRules: false
        }
    },
    watch: {
        value (newVal) {
            this.showPlayRules = newVal
        },
        initTimeType (newVal) {
            this.uploadForm.timeType = newVal
        },
        info (newVal) {
            this.uploadForm.timeType = newVal.timeType
            this.uploadForm.isWorkChecked = newVal.isWorkChecked
            this.$nextTick(() => {
                this.uploadForm.startTime = newVal.startTime
                this.uploadForm.endTime = newVal.endTime
            })
        }
    },
    methods: {
        changeTime (startTime, endTime) {
            this.uploadForm.startTime = startTime
            this.uploadForm.endTime = endTime
        },
        // 确定
        confirm () {
            const startTime = func.timeToSec(this.uploadForm.startTime)
            const endTime = func.timeToSec(this.uploadForm.endTime)
            // 开始时间不能大于结束时间
            if (startTime > endTime) {
                this.$notify('开始时间不能大于结束时间')
                return
            }
            const params = this.uploadForm
            if (params.startTime === '00:00') { // 初始化未改变时间时，传入后台参数与web端保持‘秒’一致
                params.startTime = '00:00:00'
            }
            if (params.endTime === '23:59') {
                params.startTime = '23:59:59'
            }
            this.$emit('setForm', this.uploadForm)
            this.close()
        },
        // 取消
        close () {
            this.$emit('close', false)
        }
    }
}
</script>
<style lang="less" scoped>
.popup-content {
    padding: 0.48rem 0.64rem;
    text-align: left;

    .van-radio {
        margin-bottom: 0.48rem;
        font-size: 0.32rem;
    }

    .play-switch {
        vertical-align: middle;
        margin-top: 0.48rem;

        p {
            float: left;
            font-size: 0.32rem;
            color: #675dff;
            margin-right: 0.32rem;
        }
    }

    /deep/ .van-radio__label {
        font-size: 0.32rem;
        margin-left: 12px;
    }

    /deep/ .van-radio__icon--checked + .van-radio__label {
        color: #675dff;
        font-size: 0.32rem;
    }
}
</style>
